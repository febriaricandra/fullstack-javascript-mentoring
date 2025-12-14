-- database/seed.sql

-- Clear existing data (optional, uncomment if needed)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE likes;
-- TRUNCATE TABLE comments;
-- TRUNCATE TABLE post_tags;
-- TRUNCATE TABLE posts;
-- TRUNCATE TABLE tags;
-- TRUNCATE TABLE categories;
-- TRUNCATE TABLE users;
-- SET FOREIGN_KEY_CHECKS = 1;

-- Seed Users
INSERT INTO users (username, email, password, full_name, bio, avatar_url, role, is_active) VALUES
('john_doe', 'john@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'John Doe', 'Full-stack developer and tech enthusiast', 'https://i.pravatar.cc/150?img=12', 'admin', true),
('jane_smith', 'jane@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Jane Smith', 'UI/UX Designer passionate about creating beautiful experiences', 'https://i.pravatar.cc/150?img=5', 'author', true),
('bob_wilson', 'bob@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Bob Wilson', 'DevOps engineer who loves automation', 'https://i.pravatar.cc/150?img=33', 'author', true),
('alice_brown', 'alice@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Alice Brown', 'Data scientist exploring AI and ML', 'https://i.pravatar.cc/150?img=9', 'user', true),
('charlie_davis', 'charlie@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Charlie Davis', 'Mobile app developer for iOS and Android', 'https://i.pravatar.cc/150?img=15', 'user', true);

-- Seed Categories
INSERT INTO categories (name, slug, description) VALUES
('Technology', 'technology', 'All about latest tech trends and innovations'),
('Programming', 'programming', 'Coding tutorials, tips, and best practices'),
('Design', 'design', 'UI/UX design principles and inspiration'),
('DevOps', 'devops', 'Infrastructure, CI/CD, and deployment strategies'),
('AI & Machine Learning', 'ai-machine-learning', 'Artificial Intelligence and ML topics'),
('Web Development', 'web-development', 'Frontend and backend web development'),
('Mobile Development', 'mobile-development', 'iOS, Android, and cross-platform development'),
('Career', 'career', 'Career advice and professional development');

-- Seed Tags
INSERT INTO tags (name, slug) VALUES
('JavaScript', 'javascript'),
('Python', 'python'),
('React', 'react'),
('Node.js', 'nodejs'),
('TypeScript', 'typescript'),
('CSS', 'css'),
('HTML', 'html'),
('Docker', 'docker'),
('Kubernetes', 'kubernetes'),
('AWS', 'aws'),
('Machine Learning', 'machine-learning'),
('TensorFlow', 'tensorflow'),
('Vue.js', 'vuejs'),
('Angular', 'angular'),
('MongoDB', 'mongodb'),
('PostgreSQL', 'postgresql'),
('MySQL', 'mysql'),
('GraphQL', 'graphql'),
('REST API', 'rest-api'),
('Git', 'git');

-- Seed Posts
INSERT INTO posts (title, slug, content, excerpt, featured_image, author_id, category_id, status, view_count, published_at) VALUES
(
  'Getting Started with Node.js in 2025',
  'getting-started-with-nodejs-2025',
  'Node.js has evolved significantly over the years. In this comprehensive guide, we will explore the latest features and best practices for building scalable applications with Node.js.\n\nNode.js is a powerful JavaScript runtime built on Chrome''s V8 engine. It allows developers to use JavaScript for server-side programming, enabling full-stack JavaScript development.\n\nKey topics we''ll cover:\n1. Setting up your development environment\n2. Understanding async/await patterns\n3. Building RESTful APIs\n4. Database integration\n5. Error handling and debugging\n6. Testing strategies\n7. Deployment best practices\n\nWhether you''re a beginner or an experienced developer, this guide will help you master Node.js development.',
  'Learn how to build modern applications with Node.js, covering setup, best practices, and deployment strategies.',
  'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
  1,
  2,
  'published',
  1250,
  '2025-12-01 10:00:00'
),
(
  'Modern CSS Techniques Every Developer Should Know',
  'modern-css-techniques-2025',
  'CSS has come a long way from simple styling to powerful layout systems. Modern CSS offers incredible features that make web development faster and more efficient.\n\nIn this article, we''ll explore:\n\n**CSS Grid and Flexbox**\nThese layout systems have revolutionized how we build responsive designs. CSS Grid excels at two-dimensional layouts, while Flexbox is perfect for one-dimensional flows.\n\n**CSS Custom Properties (Variables)**\nCreate reusable values that can be updated dynamically, making theming and maintenance much easier.\n\n**Container Queries**\nThe future of responsive design is here! Container queries allow components to respond to their container size, not just viewport size.\n\n**CSS Animations and Transitions**\nCreate smooth, performant animations without JavaScript.\n\n**Modern Selectors**\nNew pseudo-classes like :is(), :where(), and :has() make selectors more powerful and maintainable.',
  'Discover the latest CSS features and techniques that will level up your web development skills.',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
  2,
  3,
  'published',
  890,
  '2025-12-03 14:30:00'
),
(
  'Docker and Kubernetes: A Practical Guide',
  'docker-kubernetes-practical-guide',
  'Containerization has become essential in modern software development. Docker and Kubernetes are the industry standards for container orchestration.\n\n**Understanding Docker**\nDocker allows you to package applications with all their dependencies into containers. This ensures consistency across development, testing, and production environments.\n\nBenefits of Docker:\n- Consistency across environments\n- Faster deployment\n- Better resource utilization\n- Easier scaling\n- Simplified dependency management\n\n**Introduction to Kubernetes**\nKubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized applications.\n\nKey Kubernetes concepts:\n- Pods: The smallest deployable units\n- Services: Network abstraction for pods\n- Deployments: Declarative updates for pods\n- ConfigMaps and Secrets: Configuration management\n- Ingress: External access to services\n\n**Best Practices**\n1. Use multi-stage builds\n2. Implement health checks\n3. Set resource limits\n4. Use namespaces for organization\n5. Implement proper logging and monitoring',
  'Master containerization with this comprehensive guide to Docker and Kubernetes deployment strategies.',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800',
  3,
  4,
  'published',
  2100,
  '2025-12-05 09:15:00'
),
(
  'Introduction to Machine Learning with Python',
  'introduction-machine-learning-python',
  'Machine Learning is transforming how we solve complex problems. Python has become the go-to language for ML development thanks to its rich ecosystem of libraries.\n\n**Why Python for Machine Learning?**\n- Rich ecosystem (NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch)\n- Easy to learn and read\n- Strong community support\n- Excellent visualization libraries\n\n**Core Concepts**\n\n1. **Supervised Learning**\nLearn from labeled data to make predictions. Common algorithms include:\n- Linear Regression\n- Logistic Regression\n- Decision Trees\n- Random Forests\n- Neural Networks\n\n2. **Unsupervised Learning**\nFind patterns in unlabeled data:\n- Clustering (K-Means, DBSCAN)\n- Dimensionality Reduction (PCA, t-SNE)\n- Association Rules\n\n3. **Data Preprocessing**\n- Handling missing values\n- Feature scaling\n- Encoding categorical variables\n- Train/test split\n\n4. **Model Evaluation**\n- Accuracy, Precision, Recall\n- F1 Score\n- ROC-AUC\n- Cross-validation\n\n**Getting Started**\nWe''ll build a simple classifier using scikit-learn and explore model evaluation techniques.',
  'Start your machine learning journey with Python. Learn core concepts and build your first ML model.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
  4,
  5,
  'published',
  1560,
  '2025-12-07 11:00:00'
),
(
  'Building Progressive Web Apps with React',
  'building-progressive-web-apps-react',
  'Progressive Web Apps (PWAs) combine the best of web and mobile apps. They''re fast, reliable, and engaging.\n\n**What are PWAs?**\nPWAs are web applications that use modern web capabilities to deliver app-like experiences. They can work offline, send push notifications, and be installed on devices.\n\n**Key Features**\n1. **Offline Support**\nService Workers cache assets and data for offline access.\n\n2. **Installable**\nUsers can add PWAs to their home screen without app stores.\n\n3. **Fast Loading**\nOptimized performance with code splitting and lazy loading.\n\n4. **Push Notifications**\nRe-engage users with timely updates.\n\n5. **Responsive Design**\nWork seamlessly across all devices.\n\n**Building with React**\nCreate React App includes PWA support out of the box. We''ll cover:\n- Setting up Service Workers\n- Implementing offline functionality\n- Creating a web app manifest\n- Optimizing performance\n- Adding push notifications\n\n**Best Practices**\n- Use HTTPS\n- Optimize images\n- Implement proper caching strategies\n- Test on real devices\n- Monitor performance metrics',
  'Learn how to build fast, reliable Progressive Web Apps using React and modern web technologies.',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
  1,
  6,
  'published',
  780,
  '2025-12-09 16:45:00'
),
(
  'GraphQL vs REST: Choosing the Right API',
  'graphql-vs-rest-choosing-right-api',
  'APIs are the backbone of modern applications. Both GraphQL and REST are popular choices, but which one should you use?\n\n**REST (Representational State Transfer)**\nREST has been the standard for years. It''s simple, cacheable, and well-understood.\n\nPros:\n- Simple and intuitive\n- Great caching support\n- Stateless\n- Wide tooling support\n\nCons:\n- Over-fetching or under-fetching data\n- Multiple requests for related data\n- Versioning challenges\n\n**GraphQL**\nGraphQL is a query language for APIs developed by Facebook. It allows clients to request exactly what they need.\n\nPros:\n- Request exactly what you need\n- Single endpoint\n- Strong typing\n- Real-time subscriptions\n- Great developer experience\n\nCons:\n- Steeper learning curve\n- Caching complexity\n- More complex queries can impact performance\n\n**When to Use REST**\n- Simple, resource-based APIs\n- Need strong HTTP caching\n- Team is familiar with REST\n- Public APIs\n\n**When to Use GraphQL**\n- Complex, nested data requirements\n- Mobile applications (bandwidth considerations)\n- Rapid frontend iteration\n- Multiple clients with different needs\n\n**Conclusion**\nBoth have their place. Choose based on your specific requirements, team expertise, and use case.',
  'Compare GraphQL and REST APIs to make informed decisions for your next project.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  2,
  2,
  'published',
  1420,
  '2025-12-11 10:30:00'
),
(
  'TypeScript Best Practices for Large Applications',
  'typescript-best-practices-large-applications',
  'TypeScript has become essential for building maintainable large-scale applications. Here are the best practices every team should follow.\n\n**1. Strict Mode Configuration**\nAlways enable strict mode in tsconfig.json for maximum type safety.\n\n**2. Type Everything**\n- Avoid using ''any'' type\n- Use unknown instead of any when type is uncertain\n- Leverage type inference where appropriate\n- Define explicit return types for functions\n\n**3. Interface vs Type**\nUse interfaces for objects that can be extended, types for unions and intersections.\n\n**4. Utility Types**\nLeverage built-in utility types:\n- Partial<T>\n- Required<T>\n- Pick<T, K>\n- Omit<T, K>\n- Record<K, T>\n\n**5. Generics**\nUse generics to create reusable, type-safe components.\n\n**6. Discriminated Unions**\nCreate type-safe state machines and reducers.\n\n**7. Project Structure**\nOrganize types in dedicated files or folders.\n\n**8. Error Handling**\nDefine custom error types for better error handling.\n\n**9. Testing**\nWrite type-safe tests with proper type assertions.\n\n**10. Performance**\n- Use const assertions\n- Avoid deep type nesting\n- Split large types\n\nFollowing these practices will make your codebase more maintainable and reduce runtime errors.',
  'Master TypeScript with these essential best practices for building robust, scalable applications.',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
  1,
  2,
  'published',
  950,
  '2025-12-12 13:20:00'
),
(
  'Career Guide: From Junior to Senior Developer',
  'career-guide-junior-to-senior-developer',
  'Making the transition from junior to senior developer requires more than just technical skills. Here''s a comprehensive roadmap.\n\n**Technical Skills**\n\n**Junior Level**\n- Master one programming language\n- Understand data structures and algorithms\n- Learn version control (Git)\n- Write clean, readable code\n- Debug effectively\n\n**Mid Level**\n- Multiple programming paradigms\n- Design patterns\n- Testing strategies\n- Database design\n- API design\n- Performance optimization\n\n**Senior Level**\n- System architecture\n- Scalability considerations\n- Security best practices\n- Multiple tech stacks\n- Code review expertise\n\n**Soft Skills**\n\n**Communication**\n- Explain technical concepts to non-technical stakeholders\n- Write clear documentation\n- Present ideas effectively\n\n**Leadership**\n- Mentor junior developers\n- Lead technical discussions\n- Make architectural decisions\n- Influence team practices\n\n**Problem Solving**\n- Break down complex problems\n- Consider trade-offs\n- Think long-term\n- Balance technical debt\n\n**Continuous Learning**\n- Stay updated with technology\n- Read technical books and blogs\n- Contribute to open source\n- Attend conferences\n- Build side projects\n\n**Time Management**\n- Prioritize tasks effectively\n- Estimate accurately\n- Meet deadlines\n- Balance multiple projects\n\nRemember: It''s a journey, not a destination. Focus on consistent growth.',
  'A complete roadmap for advancing your software development career from junior to senior level.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  3,
  8,
  'published',
  2300,
  '2025-12-13 08:00:00'
),
(
  'Database Optimization Techniques',
  'database-optimization-techniques',
  'Database performance is critical for application success. Let''s explore practical optimization techniques.\n\n**Indexing Strategies**\n\nIndexes speed up queries but have trade-offs:\n- B-tree indexes for equality and range queries\n- Hash indexes for exact matches\n- Full-text indexes for text search\n- Composite indexes for multiple columns\n\n**Query Optimization**\n\n1. Use EXPLAIN to analyze queries\n2. Avoid SELECT *\n3. Use appropriate JOINs\n4. Limit result sets\n5. Use WHERE clauses effectively\n6. Avoid N+1 queries\n\n**Schema Design**\n\n- Normalize to reduce redundancy\n- Denormalize for read-heavy workloads\n- Use appropriate data types\n- Consider partitioning for large tables\n\n**Connection Pooling**\n\nReuse database connections instead of creating new ones for each request.\n\n**Caching Strategies**\n\n1. **Query caching**\nCache frequently executed queries.\n\n2. **Application-level caching**\nUse Redis or Memcached.\n\n3. **CDN for static assets**\n\n**Monitoring**\n\n- Track slow queries\n- Monitor connection pool usage\n- Watch for lock contention\n- Analyze query patterns\n\n**Database-Specific Tips**\n\n**MySQL/MariaDB**\n- Use InnoDB engine\n- Optimize buffer pool size\n- Use query cache wisely\n\n**PostgreSQL**\n- VACUUM regularly\n- Use ANALYZE for statistics\n- Leverage advanced indexes (GiST, GIN)\n\n**MongoDB**\n- Create appropriate indexes\n- Use aggregation pipeline efficiently\n- Implement sharding for scale\n\nRemember: Measure before and after optimization to verify improvements.',
  'Improve your application performance with these proven database optimization strategies and techniques.',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
  4,
  2,
  'published',
  1670,
  '2025-12-14 09:30:00'
),
(
  'Understanding Microservices Architecture',
  'understanding-microservices-architecture',
  'Microservices have revolutionized how we build scalable applications. But are they right for your project?\n\n**What are Microservices?**\n\nMicroservices break down applications into small, independent services that communicate over networks.\n\n**Benefits**\n\n1. **Scalability**\nScale individual services based on demand.\n\n2. **Technology Diversity**\nUse the best tool for each service.\n\n3. **Team Autonomy**\nSmall teams own specific services.\n\n4. **Fault Isolation**\nFailures are contained to specific services.\n\n5. **Easier Deployment**\nDeploy services independently.\n\n**Challenges**\n\n1. **Complexity**\nDistributed systems are inherently complex.\n\n2. **Data Consistency**\nManaging transactions across services is hard.\n\n3. **Network Overhead**\nService-to-service communication adds latency.\n\n4. **Monitoring**\nRequires sophisticated observability tools.\n\n5. **Testing**\nEnd-to-end testing becomes challenging.\n\n**When to Use Microservices**\n\n✓ Large, complex applications\n✓ Need for independent scaling\n✓ Large development teams\n✓ Long-term projects\n\n**When NOT to Use**\n\n✗ Small applications\n✗ Limited resources\n✗ Unclear domain boundaries\n✗ Early-stage startups\n\n**Key Patterns**\n\n- API Gateway\n- Service Discovery\n- Circuit Breaker\n- Event Sourcing\n- CQRS\n- Saga Pattern\n\n**Conclusion**\n\nStart with a monolith, evolve to microservices when needed. Don''t build microservices just because it''s trendy.',
  'Learn when and how to implement microservices architecture for building scalable, maintainable systems.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  1,
  1,
  'draft',
  45,
  NULL
);

-- Seed Post_Tags (many-to-many relationships)
INSERT INTO post_tags (post_id, tag_id) VALUES
-- Post 1: Getting Started with Node.js
(1, 4), -- Node.js
(1, 1), -- JavaScript
(1, 19), -- REST API

-- Post 2: Modern CSS Techniques
(2, 6), -- CSS
(2, 7), -- HTML

-- Post 3: Docker and Kubernetes
(3, 8), -- Docker
(3, 9), -- Kubernetes
(3, 10), -- AWS

-- Post 4: Machine Learning with Python
(4, 2), -- Python
(4, 11), -- Machine Learning
(4, 12), -- TensorFlow

-- Post 5: Building PWAs with React
(5, 3), -- React
(5, 1), -- JavaScript
(5, 7), -- HTML

-- Post 6: GraphQL vs REST
(6, 18), -- GraphQL
(6, 19), -- REST API
(6, 4), -- Node.js

-- Post 7: TypeScript Best Practices
(7, 5), -- TypeScript
(7, 1), -- JavaScript

-- Post 8: Career Guide
(8, 20), -- Git

-- Post 9: Database Optimization
(9, 17), -- MySQL
(9, 16), -- PostgreSQL
(9, 15), -- MongoDB

-- Post 10: Microservices Architecture
(10, 4), -- Node.js
(10, 8), -- Docker
(10, 9); -- Kubernetes

-- Seed Comments
INSERT INTO comments (post_id, user_id, parent_id, content, is_approved) VALUES
(1, 4, NULL, 'Great introduction to Node.js! Really helpful for beginners.', true),
(1, 5, NULL, 'Thanks for the detailed explanation. Looking forward to more content like this.', true),
(1, 2, 1, 'I agree! The async/await section was particularly useful.', true),
(2, 3, NULL, 'CSS Grid has been a game-changer for me. Thanks for covering it!', true),
(2, 1, 4, 'Glad you found it helpful! Container queries are even more exciting.', true),
(3, 4, NULL, 'Been looking for a practical Docker guide. This is exactly what I needed!', true),
(3, 5, NULL, 'The Kubernetes section could use more examples, but overall great article.', true),
(4, 1, NULL, 'Machine learning seems less intimidating now. Thank you!', true),
(4, 2, 8, 'Check out the scikit-learn documentation for more examples!', true),
(5, 3, NULL, 'PWAs are the future! Excited to build one for my project.', true),
(6, 5, NULL, 'This comparison really helped me choose GraphQL for my new project.', true),
(7, 4, NULL, 'TypeScript tips are gold! Saved this for reference.', true),
(8, 2, NULL, 'As a junior dev, this roadmap is invaluable. Thank you!', true),
(8, 5, 13, 'Focus on building projects and contributing to open source. That helped me a lot!', true),
(9, 1, NULL, 'Database optimization is often overlooked. Great article!', true);

-- Seed Likes
INSERT INTO likes (user_id, post_id) VALUES
-- Post 1 likes
(2, 1), (3, 1), (4, 1), (5, 1),
-- Post 2 likes
(1, 2), (3, 2), (4, 2),
-- Post 3 likes
(1, 3), (2, 3), (4, 3), (5, 3),
-- Post 4 likes
(1, 4), (2, 4), (3, 4), (5, 4),
-- Post 5 likes
(2, 5), (3, 5), (4, 5),
-- Post 6 likes
(1, 6), (3, 6), (4, 6), (5, 6),
-- Post 7 likes
(2, 7), (3, 7), (5, 7),
-- Post 8 likes
(1, 8), (2, 8), (3, 8), (4, 8), (5, 8),
-- Post 9 likes
(2, 9), (3, 9), (4, 9), (5, 9);

-- Verify data
SELECT 'Users' as Table_Name, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Posts', COUNT(*) FROM posts
UNION ALL
SELECT 'Tags', COUNT(*) FROM tags
UNION ALL
SELECT 'Post_Tags', COUNT(*) FROM post_tags
UNION ALL
SELECT 'Comments', COUNT(*) FROM comments
UNION ALL
SELECT 'Likes', COUNT(*) FROM likes;