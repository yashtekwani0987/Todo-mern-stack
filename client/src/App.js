import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Start from './components/Start';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (type , message)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <Router>
      <Navbar/>
      <Alert alert={alert} />
      <Routes>
        <Route exact path='/home' element={<Home showAlert={showAlert} key='home'/>}/>
        <Route exact path='/' element={<Signup showAlert={showAlert} key='signup'/>}/>
        <Route exact path='/login' element={<Login showAlert={showAlert} key='login'/>}/>
        
        
      </Routes>
      </Router>
      
  );
}

export default App;
