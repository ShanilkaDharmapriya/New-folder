import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/feed.css';
import Layout from '../components/Layout';
import '../styles/dashboard.css';

const SupportWall = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const userId = 'user123';

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/Feed');
    setPosts(res.data);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/Feed', {
      userId,
      message,
    });
    setMessage('');
    fetchPosts();
  };

  const handleComment = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText) return;

    await axios.post(`http://localhost:5000/api/Feed/${postId}/comment`, {
      userId,
      comment: commentText,
    });

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout>
    <div className="wall-page">
      <div className="wall-form">
        <h2 className="wall-heading">🌍 Share Your Feelings or Ask for Support</h2>
        <form onSubmit={handlePost} className="wall-post-form">
          <textarea
            rows={4}
            placeholder="What's on your mind? (You’ll appear as anonymous)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Share Anonymously</button>
        </form>
      </div>

      <div className="wall-feed">
        <h3 className="wall-subheading">🫶 Community Positivity Wall</h3>
        {posts.map((post) => (
          <div key={post._id} className="wall-card">
            <div className="wall-header">
              <span className="wall-author">🕊️ Anonymous</span>
              <span className="wall-time">Just now</span>
            </div>
            <p className="wall-message">{post.message}</p>

            <hr className="wall-divider" />

            <div className="comment-section">
              <h4 className="comment-title">Comments</h4>
              {post.comments?.map((c, i) => (
                <div key={i} className="comment-item">🗨️ {c.comment}</div>
              ))}
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Write a kind reply..."
                  value={commentInputs[post._id] || ''}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [post._id]: e.target.value })
                  }
                />
                <button onClick={() => handleComment(post._id)}>Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default SupportWall;
