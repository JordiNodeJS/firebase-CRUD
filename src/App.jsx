import { useEffect, useState } from 'react'
import { db } from './config/firebase-config'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])
  const userCollectionRef = collection(db, 'users')

  useEffect(() => {
    const getUser = async _ => {
      const data = await getDocs(userCollectionRef)
      console.log(data)
    }
    getUser()
  }, [])

  return (
    <>
      <button className='btn btn-active'>Button</button>
      <button className='btn btn-active btn-primary'>Button</button>
      <button className='btn btn-active btn-secondary'>Button</button>
      <button className='btn btn-active btn-accent'>Button</button>
      <button className='btn btn-active btn-ghost'>Button</button>
      <button className='btn btn-active btn-link'>Button</button>
      <hr />
    </>
  )
}

export default App
