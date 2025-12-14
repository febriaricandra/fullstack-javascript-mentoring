// models/post.model.js
import pool from '../database/config.js';

export const getAllPosts = async (filters = {}) => {
    let query = `
        SELECT 
            p.*,
            u.username as author_username,
            u.full_name as author_name,
            c.name as category_name,
            c.slug as category_slug,
            COUNT(DISTINCT l.id) as like_count,
            COUNT(DISTINCT cm.id) as comment_count
        FROM posts p
        LEFT JOIN users u ON p.author_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN likes l ON p.id = l.post_id
        LEFT JOIN comments cm ON p.id = cm.post_id
    `;
    
    const conditions = [];
    const params = [];
    
    if (filters.status) {
        conditions.push('p.status = ?');
        params.push(filters.status);
    }
    
    if (filters.category_id) {
        conditions.push('p.category_id = ?');
        params.push(filters.category_id);
    }
    
    if (filters.author_id) {
        conditions.push('p.author_id = ?');
        params.push(filters.author_id);
    }
    
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' GROUP BY p.id ORDER BY p.created_at DESC';
    
    const [rows] = await pool.query(query, params);
    return rows;
};

export const getPostById = async (id) => {
    const [rows] = await pool.query(`
        SELECT 
            p.*,
            u.username as author_username,
            u.full_name as author_name,
            u.avatar_url as author_avatar,
            c.name as category_name,
            c.slug as category_slug,
            COUNT(DISTINCT l.id) as like_count,
            COUNT(DISTINCT cm.id) as comment_count
        FROM posts p
        LEFT JOIN users u ON p.author_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN likes l ON p.id = l.post_id
        LEFT JOIN comments cm ON p.id = cm.post_id
        WHERE p.id = ?
        GROUP BY p.id
    `, [id]);
    return rows[0];
};

export const getPostBySlug = async (slug) => {
    const [rows] = await pool.query(`
        SELECT 
            p.*,
            u.username as author_username,
            u.full_name as author_name,
            u.avatar_url as author_avatar,
            c.name as category_name,
            c.slug as category_slug,
            COUNT(DISTINCT l.id) as like_count,
            COUNT(DISTINCT cm.id) as comment_count
        FROM posts p
        LEFT JOIN users u ON p.author_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN likes l ON p.id = l.post_id
        LEFT JOIN comments cm ON p.id = cm.post_id
        WHERE p.slug = ?
        GROUP BY p.id
    `, [slug]);
    return rows[0];
};

export const createPost = async (postData) => {
    const { title, slug, content, excerpt, featured_image, author_id, category_id, status = 'draft' } = postData;
    
    const [result] = await pool.query(
        `INSERT INTO posts (title, slug, content, excerpt, featured_image, author_id, category_id, status, published_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, slug, content, excerpt, featured_image, author_id, category_id, status, status === 'published' ? new Date() : null]
    );
    return result.insertId;
};

export const updatePost = async (id, postData) => {
    const { title, slug, content, excerpt, featured_image, category_id, status } = postData;
    
    const published_at = status === 'published' ? new Date() : null;
    
    const [result] = await pool.query(
        `UPDATE posts 
         SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, category_id = ?, status = ?, published_at = ?
         WHERE id = ?`,
        [title, slug, content, excerpt, featured_image, category_id, status, published_at, id]
    );
    return result.affectedRows;
};

export const deletePost = async (id) => {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows;
};

export const incrementViewCount = async (id) => {
    const [result] = await pool.query(
        'UPDATE posts SET view_count = view_count + 1 WHERE id = ?',
        [id]
    );
    return result.affectedRows;
};

export const getPostTags = async (postId) => {
    const [rows] = await pool.query(`
        SELECT t.* 
        FROM tags t
        JOIN post_tags pt ON t.id = pt.tag_id
        WHERE pt.post_id = ?
    `, [postId]);
    return rows;
};

export const addPostTag = async (postId, tagId) => {
    const [result] = await pool.query(
        'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
        [postId, tagId]
    );
    return result.affectedRows;
};

export const removePostTag = async (postId, tagId) => {
    const [result] = await pool.query(
        'DELETE FROM post_tags WHERE post_id = ? AND tag_id = ?',
        [postId, tagId]
    );
    return result.affectedRows;
};

export const getPostsByTag = async (tagId) => {
    const [rows] = await pool.query(`
        SELECT p.*, u.username as author_username, c.name as category_name
        FROM posts p
        JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN users u ON p.author_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE pt.tag_id = ? AND p.status = 'published'
        ORDER BY p.published_at DESC
    `, [tagId]);
    return rows;
};

export const getCommentPosts = async (postId) => {
    const [rows] = await pool.query(`
        SELECT c.*, u.username as commenter_username, u.avatar_url as commenter_avatar
        FROM comments c
        JOIN users u ON c.user_id = u.id
        JOIN posts p ON c.post_id = p.id
        WHERE is_approved = 1 AND p.id = ?
        ORDER BY c.created_at DESC
    `, [postId]);
    return rows;
};