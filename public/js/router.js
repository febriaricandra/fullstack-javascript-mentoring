import { api } from './api.js';

// Format date
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Home page - List all posts
const HomePage = async () => {
    try {
        const result = await api.getPosts({ status: 'published' });
        const posts = result.data;

        return `
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-bold mb-8">All Posts</h1>
                
                ${posts.length === 0 ? `
                    <div class="text-center py-12">
                        <p class="text-gray-500 text-lg">No posts yet. Be the first to create one!</p>
                        <a href="/create" class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" data-link>
                            Create Post
                        </a>
                    </div>
                ` : `
                    <div class="grid gap-6">
                        ${posts.map(post => `
                            <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                ${post.featured_image ? `
                                    <img src="${post.featured_image}" alt="${post.title}" class="w-full h-48 object-cover">
                                ` : ''}
                                <div class="p-6">
                                    <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                        <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                            ${post.category_name || 'Uncategorized'}
                                        </span>
                                        <span>•</span>
                                        <span>By ${post.author_name || post.author_username}</span>
                                        <span>•</span>
                                        <span>${formatDate(post.created_at)}</span>
                                    </div>
                                    
                                    <h2 class="text-2xl font-bold mb-2">
                                        <a href="/posts/${post.id}" class="hover:text-blue-600" data-link>
                                            ${post.title}
                                        </a>
                                    </h2>
                                    
                                    <p class="text-gray-600 mb-4">
                                        ${post.excerpt || post.content.substring(0, 150) + '...'}
                                    </p>
                                    
                                    <div class="flex items-center gap-4 text-sm text-gray-500">
                                        <span>👁️ ${post.view_count} views</span>
                                        <span>❤️ ${post.like_count} likes</span>
                                        <span>💬 ${post.comment_count} comments</span>
                                    </div>
                                    
                                    <a href="/posts/${post.id}" class="inline-block mt-4 text-blue-600 hover:underline" data-link>
                                        Read more →
                                    </a>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    } catch (error) {
        return `<div class="text-red-600">Error loading posts: ${error.message}</div>`;
    }
};

// Post detail page
const PostDetailPage = async (id) => {
    try {
        const result = await api.getPostById(id);
        const comments = await api.getCommentsByPostId(id);
        const post = result.data;

        return `
            <article class="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                ${post.featured_image ? `
                    <img src="${post.featured_image}" alt="${post.title}" class="w-full h-64 object-cover">
                ` : ''}
                
                <div class="p-8">
                    <div class="mb-4">
                        <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
                            ${post.category_name || 'Uncategorized'}
                        </span>
                    </div>
                    
                    <h1 class="text-4xl font-bold mb-4">${post.title}</h1>
                    
                    <div class="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
                        <div class="flex items-center gap-2">
                            ${post.author_avatar ? `
                                <img src="${post.author_avatar}" alt="${post.author_name}" class="w-10 h-10 rounded-full">
                            ` : `
                                <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
                                    ${post.author_name ? post.author_name[0].toUpperCase() : 'A'}
                                </div>
                            `}
                            <div>
                                <div class="font-medium">${post.author_name || post.author_username}</div>
                                <div class="text-sm">${formatDate(post.published_at || post.created_at)}</div>
                            </div>
                        </div>
                        
                        <div class="ml-auto flex gap-4 text-sm">
                            <span>👁️ ${post.view_count}</span>
                            <span>❤️ ${post.like_count}</span>
                            <span>💬 ${post.comment_count}</span>
                        </div>
                    </div>
                    
                    <div class="prose max-w-none leading-relaxed">
                        ${post.content.replace(/\n/g, '<br>')}
                    </div>
                    
                    ${post.tags && post.tags.length > 0 ? `
                        <div class="mt-8 pt-6 border-t">
                            <div class="flex gap-2 flex-wrap">
                                ${post.tags.map(tag => `
                                    <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        #${tag.name}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="mt-12 pt-6 border-t">
                        <h2 class="text-2xl font-bold mb-6">Comments (${comments.data.length})</h2>
                        ${comments.data.length === 0 ? `
                            <p class="text-gray-500">No comments yet. Be the first to comment!</p>
                        ` : `
                            <div class="space-y-6">
                                ${comments.data.map(comment => `
                                    <div class="border-b pb-4">
                                        <div class="flex items-center gap-3 mb-2">
                                            <div class="font-medium">${comment.commenter_username}</div>
                                            <div class="text-sm text-gray-500">${formatDate(comment.created_at)}</div>
                                        </div>
                                        <p class="text-gray-700">${comment.content.replace(/\n/g, '<br>')}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>
                    
                    <div class="mt-8 pt-6 border-t">
                        <a href="/" class="text-blue-600 hover:underline" data-link>← Back to all posts</a>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        return `<div class="text-red-600">Error loading post: ${error.message}</div>`;
    }
};

// Create post page
const CreatePostPage = async () => {
    const categories = [];
    const result = await api.getCategories();
    if (result.success) {
        categories.push(...result.data);
    }
    return `
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 class="text-3xl font-bold mb-6">Create New Post</h1>
            
            <form id="createPostForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Title *</label>
                    <input type="text" name="title" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Slug *</label>
                    <input type="text" name="slug" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <p class="text-sm text-gray-500 mt-1">URL-friendly version of the title</p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Content *</label>
                    <textarea name="content" rows="10" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Excerpt</label>
                    <textarea name="excerpt" rows="3"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Featured Image URL</label>
                    <input type="url" name="featured_image"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Author ID *</label>
                    <input type="number" name="author_id" required value="1"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Category ID</label>
                    <select name="category_id" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option value="">-- Select Category --</option>
                        ${categories.map(cat => `
                            <option value="${cat.id}">${cat.name}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Status</label>
                    <select name="status" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                
                <div class="flex gap-4">
                    <button type="submit" 
                        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Create Post
                    </button>
                    <a href="/" data-link 
                        class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition inline-block">
                        Cancel
                    </a>
                </div>
            </form>
            
            <div id="formMessage" class="mt-4"></div>
        </div>
    `;
};

// Router
export const router = async (pathname) => {
    const app = document.getElementById('app');

    let html = '';

    const segments = pathname.split('/').filter(Boolean);
    const route = segments[0] || 'home';

    switch (route) {
        case 'home':
            html = await HomePage();
            break;

        case 'create':
            html = await CreatePostPage();
            break;

        case 'posts':
            const id = segments[1];
            html = await PostDetailPage(id);
            break;

        default:
            html = '<div class="text-center"><h1 class="text-4xl font-bold">404 - Page Not Found</h1></div>';
    }

    app.innerHTML = html;

    // Handle form submission
    const form = document.getElementById('createPostForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Convert numeric fields
            data.author_id = parseInt(data.author_id);
            if (data.category_id) data.category_id = parseInt(data.category_id);

            try {
                const result = await api.createPost(data);
                document.getElementById('formMessage').innerHTML =
                    '<div class="bg-green-100 text-green-700 p-4 rounded">Post created successfully!</div>';
                setTimeout(() => {
                    window.history.pushState({}, '', '/');
                    router('/');
                }, 1500);
            } catch (error) {
                document.getElementById('formMessage').innerHTML =
                    `<div class="bg-red-100 text-red-700 p-4 rounded">Error: ${error.message}</div>`;
            }
        });
    }

    // Auto-generate slug from title
    const titleInput = document.querySelector('input[name="title"]');
    const slugInput = document.querySelector('input[name="slug"]');
    if (titleInput && slugInput) {
        titleInput.addEventListener('input', (e) => {
            const slug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            slugInput.value = slug;
        });
    }
};