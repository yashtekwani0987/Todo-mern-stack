import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
   const handleLogout = ()=>{
   localStorage.removeItem('token');
   navigate('/login')
   }
  return (
    <div className='flex justify-between p-4 drop-shadow-lg items-center h-16' style={{backgroundColor:'#74d2e7'}} >
        <div className='text-xl'>
            <h1>TODO - <span> Task Manager </span>  </h1>
        </div>
        <div>
          {!localStorage.getItem('token')?<>
            <Link to='/' className='bg-blue-200 drop-shadow px-2 py-1 rounded mx-2 '>SignUp</Link>
            <Link to='/login' className='bg-blue-200 drop-shadow px-2 py-1 rounded mx-2 '>Login</Link>
            </>:<button onClick={handleLogout} className='bg-blue-200 drop-shadow px-2 py-1 rounded mx-2' >Logout</button>    }
            </div>
    </div>

  )
}

export default Navbar