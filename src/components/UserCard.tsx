import React, { useEffect, useState } from 'react'
import './App.css'
const UserCard = () => {
    type user={
        id:number;
        name:string;
        email:string;
        age:number;
        profilePicture:string;
    }


    const[users,setUsers]= useState<user[]>()
    const [searchUser,setSearchUser] = useState('')
    const[user,setUser]=useState<user|null>()
    const[error,setError]=useState('')

    const handleSearchUser=(e:React.ChangeEvent<HTMLInputElement>)=>{setSearchUser(e.target.value)}
    

    const fetchusers= async()=>{
        try {
            const response = await fetch('/users.json')
            if (!response.ok) {
                throw new Error;
            }
            const data = await response.json()
            setUsers(data.users)
        } catch (error) {
            console.error('error:',error)
        }
    }

    const findUser=()=>{
        const foundUser = users?.find(u=>(
            u.name.toLowerCase().includes(searchUser.toLowerCase())
        ))
        if (foundUser) {
            setUser(foundUser)
            setError('')
        }
        else{
            setUser(null)
        }
    }

useEffect(()=>{fetchusers()},[])



  return (
    <div className='user-card'>
      <div className='search-section'>
    <label htmlFor="userName">Enter User Name</label>
    <input value={searchUser} onChange={handleSearchUser} type="text" className='userName' placeholder='Enter user name...'/>
    <button onClick={findUser}>Search</button>
      </div>
      <div className='results-section'>
        {error ? <p>{error}</p>:''} 
        {user && (
            <div className='user-info'>
                <img src={user.profilePicture} alt={user.name} className='profile-picture' />
                <div className='user-details'>
                    <p>ID:{user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
