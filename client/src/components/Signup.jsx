import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Signup = ({showAlert}) => {
    const [credentials, setCredentials] = useState({
      name:'',
      email:'',
      password:''
    })
    const navigate = useNavigate()
    const handleNext = async()=>{
      if(credentials.name&&credentials.email&&credentials.password){

      const response = await fetch('http://localhost:5000/user/createuser',{
              method:'POST',
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
            })
            const json = await response.json()
            if(json.success===true){
             localStorage.setItem('token',json.authtoken)
             navigate('/home')
            }
            else{
              showAlert('yellow' , 'User already Exist')
            }
          }}
    const onChange = (e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }



  return (
    <>
    <div className='flex md:flex-row flex-col'>
    <div className='mt-40 w-2/4 ml-12'>
        <h1 className='font-bold text-3xl text-blue-400' >TODO</h1>
        <h1 className='text-2xl'> 
             Manage Your daily Tasks 
        </h1>
    </div>
    <div className='md:w-2/4'>
    <div className='md:w-3/5 w-4/5 bg-blue-300 rounded mx-auto'>
        <div className='flex flex-col px-8 py-8 drop-shadow-lg mt-24 rounded'>
            <h1 className='text-center text-xl'>Register</h1>
            <input name='name' value={credentials.name} onChange={onChange} type="text" placeholder='Name' className='mt-4 rounded drop-shadow py-1 px-2' />
            <input name='email' value={credentials.email} onChange={onChange} type="text" placeholder='email' className='mt-4 rounded drop-shadow py-1 px-2' />
            <input name='password' value={credentials.password} onChange={onChange}  type="password" placeholder='Password' className='mt-4 rounded drop-shadow py-1 px-2'  />
            <button onClick={handleNext} className='mt-6 mb-2 bg-blue-100 drop-shadow-lg py-1 rounded'>Submit</button>
           
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Signup