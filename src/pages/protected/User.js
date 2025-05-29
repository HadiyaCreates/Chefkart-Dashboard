
import React, { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://chefkart-backend-1.onrender.com/auth/all")
      .then((res) => res.json())
      .then((data) => setUsers(data.data || []))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="font-bold text-2xl mb-6 text-gray-800">User List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="text-center hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.role || "User"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;