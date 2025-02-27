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
      <h2>Add New User</h2>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
        </div>
        
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm
