import { useState, useEffect } from 'react'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import { getUsers, addUser } from './services/userService'

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
      fetchUsers()
      return true
    } catch (err) {
      setError('Failed to add user')
      console.error(err)
      return false
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">User Management</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <UserForm onAddUser={handleAddUser} />
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <UserList users={users} />
        )}
      </div>
    </div>
  )
}

export default App
