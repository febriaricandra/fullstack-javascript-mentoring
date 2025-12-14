// controller/post.controller.js
import * as PostModel from '../models/post.model.js';

export const getAllPosts = async (req, res) => {
    try {
        const filters = {
            status: req.query.status,
            category_id: req.query.category_id,
            author_id: req.query.author_id
        };
        
        const posts = await PostModel.getAllPosts(filters);
        
        res.status(200).json({
            success: true,
            data: posts,
            total: posts.length
        });
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve posts',
            error: error.message
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.getPostById(id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        // Increment view count
        await PostModel.incrementViewCount(id);
        
        // Get tags
        const tags = await PostModel.getPostTags(id);
        post.tags = tags;
        
        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve post',
            error: error.message
        });
    }
};

export const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await PostModel.getPostBySlug(slug);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        // Increment view count
        await PostModel.incrementViewCount(post.id);
        
        // Get tags
        const tags = await PostModel.getPostTags(post.id);
        post.tags = tags;
        
        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve post',
            error: error.message
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, slug, content, excerpt, featured_image, author_id, category_id, status, tags } = req.body;
        
        // Validasi input
        if (!title || !slug || !content || !author_id) {
            return res.status(400).json({
                success: false,
                message: 'Title, slug, content, and author_id are required'
            });
        }
        
        // Validasi category_id dengan memanggil category service (Golang microservice)
        if (category_id) {
            try {
                const categoryServiceUrl = process.env.CATEGORY_SERVICE_URL || 'http://localhost:8080';
                const categoryResponse = await fetch(`${categoryServiceUrl}/api/categories`);
                
                if (!categoryResponse.ok) {
                    return res.status(503).json({
                        success: false,
                        message: 'Category service unavailable'
                    });
                }
                
                const categoryData = await categoryResponse.json();
                const validCategory = categoryData.data.find(cat => cat.id === parseInt(category_id));
                
                if (!validCategory) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid category_id'
                    });
                }
            } catch (error) {
                console.error('Error validating category:', error);
                return res.status(503).json({
                    success: false,
                    message: 'Failed to validate category with category service',
                    error: error.message
                });
            }
        }
        
        const postData = {
            title,
            slug,
            content,
            excerpt,
            featured_image,
            author_id,
            category_id,
            status: status || 'draft'
        };
        
        const postId = await PostModel.createPost(postData);
        
        // Add tags if provided
        if (tags && Array.isArray(tags) && tags.length > 0) {
            for (const tagId of tags) {
                await PostModel.addPostTag(postId, tagId);
            }
        }
        
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: { id: postId }
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create post',
            error: error.message
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, content, excerpt, featured_image, category_id, status, tags } = req.body;
        
        // Cek apakah post exists
        const existingPost = await PostModel.getPostById(id);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        const postData = {
            title: title || existingPost.title,
            slug: slug || existingPost.slug,
            content: content || existingPost.content,
            excerpt: excerpt !== undefined ? excerpt : existingPost.excerpt,
            featured_image: featured_image !== undefined ? featured_image : existingPost.featured_image,
            category_id: category_id !== undefined ? category_id : existingPost.category_id,
            status: status || existingPost.status
        };
        
        const affectedRows = await PostModel.updatePost(id, postData);
        
        // Update tags if provided
        if (tags && Array.isArray(tags)) {
            // Remove existing tags
            const existingTags = await PostModel.getPostTags(id);
            for (const tag of existingTags) {
                await PostModel.removePostTag(id, tag.id);
            }
            
            // Add new tags
            for (const tagId of tags) {
                await PostModel.addPostTag(id, tagId);
            }
        }
        
        if (affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: 'No changes made to post'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Post updated successfully'
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update post',
            error: error.message
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        
        const affectedRows = await PostModel.deletePost(id);
        
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete post',
            error: error.message
        });
    }
};

export const getPostsByTag = async (req, res) => {
    try {
        const { tagId } = req.params;
        const posts = await PostModel.getPostsByTag(tagId);
        
        res.status(200).json({
            success: true,
            data: posts,
            total: posts.length
        });
    } catch (error) {
        console.error('Error getting posts by tag:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve posts',
            error: error.message
        });
    }
};

export const getCommentPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await PostModel.getCommentPosts(id);

        res.status(200).json({
            success: true,
            data: comments,
            total: comments.length
        });
    } catch (error){
        console.error('Error getting comments for post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve comments',
            error: error.message
        });
    }
};

// Proxy endpoint untuk mengambil categories dari Golang service
export const getCategories = async (req, res) => {
    try {
        const categoryServiceUrl = process.env.CATEGORY_SERVICE_URL || 'http://localhost:8080';
        const response = await fetch(`${categoryServiceUrl}/api/categories`);
        
        if (!response.ok) {
            return res.status(503).json({
                success: false,
                message: 'Category service unavailable'
            });
        }
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(503).json({
            success: false,
            message: 'Failed to connect to category service',
            error: error.message
        });
    }
};


export const addCommentToPost = async (req, res) => {
    try {
        const { id } = req.params;
        const commentData = req.body;

        // Validasi input
        if (!commentData.user_id || !commentData.content) {
            return res.status(400).json({
                success: false,
                message: 'user_id and content are required'
            });
        }

        const commentId = await PostModel.addCommentToPost(id, commentData);

        res.status(201).json({
            success: true,
            message: 'Comment added successfully, pending approval',
            data: { id: commentId }
        });
    } catch (error) {
        console.error('Error adding comment to post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add comment',
            error: error.message
        });
    }
}