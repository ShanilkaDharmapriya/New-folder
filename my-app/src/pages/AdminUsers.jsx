import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setUsers(res.data);
    }).catch(err => {
      console.error('Failed to fetch users:', err);
    });
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">👥 Manage Users</h2>
        <p className="dashboard-subtext">View and manage all users in the system</p>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr className="bg-sky-100 text-sky-700 text-left text-sm">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t text-sm text-gray-700 hover:bg-sky-50">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
