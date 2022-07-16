import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Splash from './Pages/Splash/Splash';
import SplashHeader from './Components/Header/SplashHeader';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Components/Header/Header';

const axios = require('axios');

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  const allowedRoutes = ['/login', '/register', '/'];

  useEffect(() => {
    const checkToken = async () => {
      try{
          const { data } = await axios.post(
        process.env.REACT_APP_API_DOMAIN + '/testroutes',
        {},
        { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('_devault:@user_info')).token}` } }
        )
        console.log(data)
      }catch(e){
        localStorage.removeItem('_devault:@user_info');
      }
    }

    checkToken()

    if(localStorage.getItem('_devault:@user_info')){
      setLoggedIn(true);
    }
    else if(allowedRoutes.includes(location.pathname)){
      setLoggedIn(true);
    }
    else if(!loggedIn){
      location.pathname = '/';
    }
  }, [])



    const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="App-header" location={location} key={location.pathname}>
        {allowedRoutes.includes(location.pathname) ? <SplashHeader /> : <Header />}
        { loggedIn ?
          <Routes>
            <Route path='/' element={<Splash /> } />
            <Route path='/login' element={<Login /> } />
            <Route path='/register' element={<Register /> } />
          </Routes>
          :
          <Routes>
            <Route path='/' element={<Splash /> } />
            <Route path='/login' element={<Login /> } />
            <Route path='/register' element={<Register /> } />
          </Routes>
        }
      </div>
    </AnimatePresence>
  );
}

export default App;
