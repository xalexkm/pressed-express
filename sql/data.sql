USE mydatabase;

INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com');

INSERT INTO posts (user_id, title, content) VALUES
  (1, 'Alice\'s Post', 'This is a post by Alice.'),
  (2, 'Bob\'s Post', 'This is a post by Bob.');