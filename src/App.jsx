import { useState, useEffect } from 'react'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import { getUsers, addUser } from './services/userService'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (userData) => {
    try {
      const newUser = await addUser(userData)
      setUsers([...users, newUser])
      return true
    } catch (err) {
      setError('Failed to add user')
      console.error(err)
      return false
    }
  }

  return (
    <div className="container">
      <h1>User Management</h1>
      
      {error && <div className="error">{error}</div>}
      
      <UserForm onAddUser={handleAddUser} />
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  )
}

export default App
