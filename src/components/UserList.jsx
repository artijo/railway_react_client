import React from 'react'

const UserList = ({ users }) => {
  if (users.length === 0) {
    return <p className="text-gray-500 text-center py-4">No users found.</p>
  }

  return (
    <div className="user-list">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-700 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
