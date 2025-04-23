import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import '../styles/dashboard.css';

const AdminModeration = () => {
  const [posts, setPosts] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  const fetchPosts = async (date) => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: date ? { date } : {},
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">🧹 Moderate Support Wall</h2>
        <p className="dashboard-subtext">View and remove inappropriate anonymous posts</p>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Filter by date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              fetchPosts(e.target.value);
            }}
            className="border px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div className="space-y-4">
          {posts.length === 0 && <p className="text-sm text-gray-500">No posts found.</p>}
          {posts.map((post) => (
            <div key={post._id} className="bg-gray-50 p-4 rounded-lg border relative">
              <p className="text-sm font-semibold mb-2">Anonymous</p>
              <p className="text-gray-700 text-sm">{post.content}</p>
              <p className="text-xs text-gray-400 mt-2">Posted on {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}</p>
              <button
                onClick={() => handleDelete(post._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminModeration;
