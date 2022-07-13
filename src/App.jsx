import { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [users, setUsers] = useState([])
  const [list, setList] = useState(false)
  const userCollectionRef = collection(db, 'users')

  const createUser = async _ => {
    await addDoc(userCollectionRef, { name: name, age: +age })
    setList(!list)
  }
  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id)
    localStorage.setItem(id, age + 1)
    await updateDoc(userDoc, { age: age + 1 })
    setAge(prev => prev + 1)
  }

  const deteteUser = async id => {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
    setList(!list)
  }

  useEffect(() => {
    const getUser = async _ => {
      const data = await getDocs(userCollectionRef)

      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      console.log(data.docs[0].id)
    }
    getUser()
  }, [age, list])

  return (
    <div className='mycontainer'>
      <div className='grid place-items-center card p-6 bg-base-300 rounded-box'>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Your Name</span>
          </label>
          <label className='input-group'>
            <input
              onChange={e => setName(e.target.value)}
              type='text'
              placeholder='name'
              className='input mb-4 input-bordered'
            />
          </label>
          <label className='label'>
            <span className='label-text'>Your Age</span>
          </label>
          <label className='input-group'>
            <input
              onChange={e => {
                setAge(e.target.value)
                localStorage.setItem('age', e.target.value)
              }}
              type='text'
              placeholder='age'
              className='input mb-4 input-bordered'
            />
          </label>
          <button onClick={createUser} className='btn btn-active btn-ghost mt-3'>
            Button
          </button>
        </div>
      </div>
      <div className='divider'></div>
      <div className='grid  card bg-base-300 p-1 rounded-box place-items-center overflow-x-auto'>
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
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.favoriteColor}</td>
                <td>
                  <div className='btn-group'>
                    <button
                      onClick={_ => updateUser(user.id, user.age)}
                      className='btn btn-primary'>
                      Increment Age
                    </button>
                    <button onClick={_ => deteteUser(user.id)} className='btn btn-warning'>
                      D E L E T E U S E R
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
