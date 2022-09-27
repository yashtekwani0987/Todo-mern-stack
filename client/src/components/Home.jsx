import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let newData = false
  // const [style, setstyle] = useState('')
  // const [style1, setstyle1] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [data, setData] = useState(false)
    const [title, setTitle] = useState('')
  const ref = useRef();
  const handleAdd = () => {
    ref.current.click();
  };
  const handleSearch = (e)=>{
    setSearch(e.target.value)
   newData = data.filter((val , id)=>{ return val.title.includes(search)})
   console.log(newData)
   setData(newData)
  }

  //ADD TODO
  const addNote =async ()=>{
    const response = await fetch("http://localhost:5000/note/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body:JSON.stringify({title})
    });
    setTitle('')
    ref.current.click()
  }
  //DELETE TODO
  const handleDelete = async(val)=>{

    const response = await fetch(`http://localhost:5000/note/deletenote/${val}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      
    });
  }
  //Update TODO

  const updateTodo = async(val)=>{
    // console.log(val)
    const response = await fetch(`http://localhost:5000/note/updatenote/${val._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body:JSON.stringify({value:true})
    });
  }

  //FETCH TODO
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/note/getallnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const parsedData = await response.json()
    setData(parsedData)
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){

      fetchData()
    }
    else{
      navigate('/login')
    }
  },[addNote])

  return (
    <div className="">
      <div className="md:w-3/6 w-11/12 mx-auto p-4 mt-5">
        <h1 className="text-2xl font-bold">ToDo List</h1>
        <div className="flex justify-end w-full">
          <button
            onClick={handleAdd}
            className="flex justify-items-end bg-blue-300 text-center py-1 px-2 rounded"
          >
            Add Task
          </button>
        </div>
        {data.length>0?
         <div>
          <input type="text" value={search} onChange={handleSearch} className="w-full mt-2 rounded py-1 px-2 border" placeholder="Search ToDo" />
        </div>:"Nothing to Show! Add Task to List here..."}

        { data? data.filter(val=> val.title.includes(search)).map((val)=>{
            return(
            
        <div className="p-4 mt-5 bg-white rounded border border-black border-2 flex justify-between">
          <div className="flex items-center">
            {/* <svg 
              //  onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 rounded-full h-6 hover:cursor-pointer`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
            <button  className="hover:cursor-pointer h-5">

            <input type="checkbox" checked={val.done} disabled={val.done}  onClick={()=>{updateTodo(val)}} className="w-4 rounded-full h-4" />
            </button>
             <h1 className={`ml-2 ${val.done===true?'line-through decoration-2':'none'}`}>{val.title}</h1>
           
          </div>
          
          <svg
            
             onClick={()=>{handleDelete(val._id)}}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            disabled
            className="w-6 h-6 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          
        </div>
            
            )
        }):'nothing'}
      </div>
      <button
        type="button"
        ref={ref}
        className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hidden
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Add ToDo
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text"
                placeholder="ToDo"
                className="bg-gray-200 w-full py-1 px-2 rounded drop-shadow"
              />
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
              onClick={addNote}
                type="button"
                className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
