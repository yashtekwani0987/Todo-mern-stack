import React from 'react'

const Alert = ({alert}) => {
 
    return (
        
    <div>
        {alert &&
        <div className={`alert bg-${alert.type}-200 rounded-lg py-1 items-center px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show`} role="alert">
  <strong className="mr-1">{alert.msg}</strong> 
  <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline font-bold" data-bs-dismiss="alert" aria-label="Close">X</button>
</div>}
    </div>
  )
}

export default Alert