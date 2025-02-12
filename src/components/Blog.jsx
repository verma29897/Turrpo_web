import React from 'react';
import '../style/Blog.css'; // Import the CSS file

const Blog = () => {
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Our Blog</h1>
        <h2>Latest Updates and Insights</h2>
      </header>

      <div className="blog-list">
        <div className="blog-item">
          <h3>Blog Post 1</h3>
          <p>
            Description of Blog Post 1. This post covers the latest trends and insights in cybersecurity.
          </p>
        </div>
        <div className="blog-item">
          <h3>Blog Post 2</h3>
          <p>
            Description of Blog Post 2. This post covers the latest trends and insights in cybersecurity.
          </p>
        </div>
        <div className="blog-item">
          <h3>Blog Post 3</h3>
          <p>
            Description of Blog Post 3. This post covers the latest trends and insights in cybersecurity.
          </p>
        </div>
        <div className="blog-item">
          <h3>Blog Post 4</h3>
          <p>
            Description of Blog Post 4. This post covers the latest trends and insights in cybersecurity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
