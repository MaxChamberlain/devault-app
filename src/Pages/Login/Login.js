import './Login.css';
import { useEffect, useState } from 'react';
import useLoading from '../../Hooks/useLoading';
const axios = require('axios');

export default function Login() {
    const setLoading = useLoading();

    useEffect(() => {
        if(localStorage.getItem('_devault:@user_info')){
            window.location.href = '/home'
        }
    }, [])
    return (
        // <TransitionGroup component='div'>
        //     <CSSTransition classNames='modal-inout-over' timeout={300}>
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#5865F2',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div 
                        className="main-content-wrapper"
                        style={{
                            width: window.innerWidth > 1080 ? 720 : '80vw',
                        }}
                    >
                        <div className="title-text">Welcome back!</div>
                        <div className="sub-title-text">We're happy you're here!</div>
                        <form className='input-form' onSubmit={e => login(e, document.getElementById('email-input').value.toLowerCase(), document.getElementById('password-input').value, )} >
                            <div className="input-wrapper">
                                <div className='label-text'>EMAIL ADDRESS</div>
                                <input type="text" id='email-input' className='input-box'  />
                                <div className='label-text'>PASSWORD</div>
                                <input type="password" id='password-input' className='input-box' />
                                <input type="submit" className='input-button' value='Login' />
                            </div>
                        </form>
                        <div className="fine-print-text" style={{marginTop: 170}}>Need an account? <a className='link-text' href='/register'>Register</a></div>
                    </div>
                </div>
        //     </CSSTransition>
        // </TransitionGroup>
    );

    async function login(event, email, password){
        event.preventDefault();
        try{
            setLoading(['loading', 'Logging in...'])
            const { data } = await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/users/login',
                {
                    email,
                    password
                },
                {headers: {
                    'Content-Type': 'application/json'
                }},
            );
            localStorage.setItem('_devault:@user_info', JSON.stringify(data));
            setLoading(['success', 'Logged in!']) 
            window.location.href = '/home'
            setTimeout(() => setLoading(null), 3000);
        }catch(err){
            setLoading(['error', err.response.data.error])
            setTimeout(() => setLoading(null), 3000);
        }

    }
}
