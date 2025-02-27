import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-md">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Users</h2>
      
      {users.length === 0 ? (
        <p className="text-center text-gray-500 my-8">No users found</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id || user._id} className="py-4 hover:bg-gray-50 transition-colors rounded-md px-3">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {user.name?.charAt(0) || "U"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;
