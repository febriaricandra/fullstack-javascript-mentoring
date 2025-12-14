const API_BASE = '/api';

export const api = {
    // Get all posts
    async getPosts(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/posts?${params}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return response.json();
    },

    // Get post by ID
    async getPostById(id) {
        const response = await fetch(`${API_BASE}/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        return response.json();
    },

    // Create post
    async createPost(postData) {
        const response = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) throw new Error('Failed to create post');
        return response.json();
    },

    // Update post
    async updatePost(id, postData) {
        const response = await fetch(`${API_BASE}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) throw new Error('Failed to update post');
        return response.json();
    },

    // Delete post
    async deletePost(id) {
        const response = await fetch(`${API_BASE}/posts/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete post');
        return response.json();
    },

    async getCommentsByPostId(postId) {
        const response = await fetch(`${API_BASE}/posts/${postId}/comments`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        return response.json();
    },

    async getCategories() {
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    }
};