import React, { useState } from 'react'

const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name || !email) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setSubmitting(true)
    setMessage(null)
    
    try {
      const success = await onAddUser({ name, email })
      if (success) {
        setName('')
        setEmail('')
        setMessage({ type: 'success', text: 'User added successfully!' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to add user' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="user-form">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New User</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-400' 
            : 'bg-red-100 text-red-700 border border-red-400'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={submitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {submitting ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm
