import React from 'react'
import Login from './Login'
import Signup from './Signup'
import './Start.css'

const Start = () => {
  return (
    <div className='flex'>
    <div className='mt-40 w-2/4 ml-12'>
        <h1 className='font-bold text-3xl text-blue-400' >TODO</h1>
        <h1 className='text-2xl'> 
             Manage Your daily Tasks 
        </h1>
    </div>
    <div className='w-2/4'>
    <Signup/>
    {/* <Login/> */}
    </div>
    </div>
  )
}

export default Start