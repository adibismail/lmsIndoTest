-- Sample data for testing

-- Insert test users
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@test.com', '$2b$10$rQZ8kHWiZ8qhExQ7fNVzgOKtGVeabGTj9Q1Zv6FxGxGxGxGxGxGxG', 'admin'),
('manager', 'manager@test.com', '$2b$10$rQZ8kHWiZ8qhExQ7fNVzgOKtGVeabGTj9Q1Zv6FxGxGxGxGxGxGxG', 'manager'),
('user', 'user@test.com', '$2b$10$rQZ8kHWiZ8qhExQ7fNVzgOKtGVeabGTj9Q1Zv6FxGxGxGxGxGxGxG', 'user');

-- Insert categories
INSERT INTO categories (name) VALUES
('Electronics'), ('Clothing'), ('Books'), ('Home & Garden'), ('Sports');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, stock_quantity) VALUES
('Laptop', 'High-performance laptop', 999.99, 1, 50),
('T-Shirt', 'Cotton t-shirt', 19.99, 2, 100),
('Novel', 'Bestselling novel', 12.99, 3, 75),
('Garden Tool', 'Multi-purpose garden tool', 29.99, 4, 30),
('Basketball', 'Professional basketball', 39.99, 5, 25);

-- Insert sample analytics events
INSERT INTO analytics (user_id, event_type, event_data, ip_address, user_agent) 
SELECT 
    (SELECT id FROM users ORDER BY RANDOM() LIMIT 1),
    (ARRAY['login', 'logout', 'view_product', 'purchase', 'search'])[floor(random() * 5 + 1)],
    '{"page": "dashboard"}',
    '192.168.1.' || floor(random() * 255 + 1)::text,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    NOW() - (random() * interval '30 days')
FROM generate_series(1, 1000);