import { useEffect, useState } from 'react'
import { db } from './config/firebase-config'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])
  const userCollectionRef = collection(db, 'users')

  useEffect(() => {
    const getUser = async _ => {
      const data = await getDocs(userCollectionRef)

      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      console.log(data.docs[0].data())
    }
    getUser()
  }, [])

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table w-full'>


          {/* head */}
          <thead>
            <tr>
          
              <th>Name</th>
              <th>Age</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => 
                        <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.favoriteColor}</td>
                      </tr>
            
            )}     
   
          </tbody>
        </table>
      </div>

      <button className='btn btn-active btn-ghost'>Button</button>

      <hr />
    </>
  )
}

export default App
