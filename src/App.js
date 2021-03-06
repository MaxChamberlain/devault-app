import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Splash from './Pages/Splash/Splash';
import SplashHeader from './Components/Header/SplashHeader';
import Header from './Components/Header/Header';
import UserManager from './Pages/UserManager/UserManager';
import Home from './Pages/Home/Home';
import Overview from './Pages/Overview/Overview';

import UserContext from './contexts/UserContext';
import TeamContext from './contexts/TeamContext';
import useLoading from './Hooks/useLoading';

const axios = require('axios');

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const setLoading = useLoading

  const allowedRoutes = ['/login', '/register', '/'];

  const checkToken = async () => {
    try{
      await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/testroutes',
      {},
      { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('_devault:@user_info')).token}` } }
      )
    }catch(e){
      localStorage.removeItem('_devault:@user_info');
      setLoading(['error', 'Your login has expired. Please refresh the page.'])
    }
  }

  const location = useLocation();

  useEffect(() => {

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
  }, [allowedRoutes, location, loggedIn])


  return (
    <AnimatePresence exitBeforeEnter>
      <UserContext>
        <TeamContext>
          <div className="App-header" location={location} key={location.pathname}>
            {allowedRoutes.includes(location.pathname) ? <SplashHeader /> : <Header />}
            { loggedIn ?
              <>
                <div style={{marginTop: 60}}></div>
                <Routes>
                  <Route path='/' element={<Splash /> } />
                  <Route path='/login' element={<Login /> } />
                  <Route path='/register' element={<Register /> } />
                  <Route path='/users' element={<UserManager /> } />
                  <Route path='/home' element={<Home /> } />
                  <Route path='/overview' element={<Overview /> } />
                  <Route path='*' element={<Home />} />
                </Routes>
              </>
              :
              <Routes>
                <Route path='/' element={<Splash /> } />
                <Route path='/login' element={<Login /> } />
                <Route path='/register' element={<Register /> } />
              </Routes>
            }
          </div>
        </TeamContext>
      </UserContext>
    </AnimatePresence>
  );
}

export default App;
