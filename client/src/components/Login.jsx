import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const Login = ({showAlert}) => {
   const navigate  = useNavigate()
    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })
    const handleNext = async()=>{
        const response = await fetch('http://localhost:5000/user/loginuser',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:credentials.email,password:credentials.password})
              })
              const json = await response.json()
              console.log(json)
              if(json.success===true){
                localStorage.setItem('token',json.authtoken)
                navigate('/home')
              }
              else{
                console.log('not')
                console.log(showAlert)
                showAlert('red' , 'Invalid Credentials')
              }
    }
    const onChange=(e)=>{
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
    <div className='flex flex-col px-8 py-12 drop-shadow-lg mt-24 rounded'>
        <h1 className='text-center text-xl'>Login Here</h1>
        <input type="text" onChange={onChange} name='email' value={credentials.email} placeholder='email' className='mt-4 rounded drop-shadow py-1 px-2' />
        <input type="password" value={credentials.password} name='password' onChange={onChange} placeholder='Password' className='mt-4 rounded drop-shadow py-1 px-2'  />
        <button onClick={handleNext} className='mt-6 mb-2 bg-blue-100 drop-shadow-lg py-1  rounded'>Login</button>
    </div>
</div>
</div>
</div>
</>
  )
}

export default Login