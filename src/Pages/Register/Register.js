import './Register.css'
import useLoading from '../../Hooks/useLoading'
import { useState, useEffect } from 'react'
const axios = require('axios');

export default function Login() {
    const setLoading = useLoading()
    const [ companyCode, setCompanyCode ] = useState('')

    useEffect(() => {
        if(localStorage.getItem('_devault:@user_info')){
            window.location.href = '/home'
        }
    }, [])

    return (
        <div style={{
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
        }}>
            <div className="main-content-wrapper"
            style={ window.innerWidth > 1080 ? { width: 750 } : { width: 'fit-content' } }
            >
                <div className="title-text">Create an account</div>
                <form className='input-form' onSubmit={e => {e.preventDefault(); document.getElementById('password-input').value === document.getElementById('confirm-password-input').value ? createAccount( e, document.getElementById('email-input').value, document.getElementById('name-input').value, document.getElementById('password-input').value, document.getElementById('company-code-input'), document.getElementById('company-name') ) : setLoading(['error', 'Password and Confirm Password do not match!'])}}>
                    <div className="input-wrapper">
                        <div className='label-text'>EMAIL ADDRESS</div>
                        <input type="text" className='input-box' id='email-input' required />
                        <div className='label-text'>NAME (FIRST LAST)</div>
                        <input type="text" className='input-box' id='name-input' required />
                        <div className='label-text'>PASSWORD</div>
                        <input type="password" className='input-box' id='password-input' required />
                        <div className='label-text'>CONFIRM PASSWORD</div>
                        <input type="password" id='confirm-password-input' className='input-box' />
                        <br />
                        <br />
                        <div style={{ textAlign: 'center', color: 'white' }} className='label-text'>Enter a team code below to join an existing team, or leave blank to create a new one</div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div>
                                <div className='label-text' style={{ width: '14em', marginLeft: '50%', transform: 'translateX(-50%)' }}>TEAM CODE (optional)</div>
                                <input className='input-box' id='company-code-input' style={{ width: '8em', marginLeft: '50%', transform: 'translateX(-50%)' }} onChange={e => setCompanyCode(e.target.value)} />
                            </div>
                            {companyCode === '' && 
                            <div>
                                <div className='label-text' style={{ width: '14em', marginLeft: '50%', transform: 'translateX(-50%)' }}>TEAM NAME</div>
                                <input className='input-box' id='company-name' style={{ width: '8em', marginLeft: '50%', transform: 'translateX(-50%)' }} required />
                            </div>
                            }
                        </div>
                        <input type="submit" className='input-button' value='Register' />
                    </div>
                </form>
                <div className="fine-print-text" style={{marginTop: 450}}><a className='link-text' href='/login'>Already have an account?</a></div>
            </div>
        </div>
    );

    async function createAccount(event, email, name, password, company_code_input, company_name_element){
        event.preventDefault();

        let company_name
        try{
            company_name = company_name_element.value
        }catch(e){
            company_name = null
        }

        const data = {
            email,
            name,
            password,
            company_code_input: company_code_input.value,
            company_name: company_name
        }
        
        if(data.company_code_input === '') delete data.company_code_input
        if(data.company_name === '') delete data.company_name

        console.log(data)

        try{
            setLoading(['loading', 'Creating account...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/users/register',
                data,
                {headers: {
                    'Content-Type': 'application/json'
                }},
            );
            company_code_input ? setLoading(['success', 'Account created! Check your user manager for your company code.']) : setLoading(['success', 'Account created! Please ask your administrator to activate your account.']) 
            setTimeout(() => setLoading(null), 8000);
        }catch(err){
            console.log(err)
            setLoading(['error', err.response.data.error])
            setTimeout(() => setLoading(null), 3000);
        }

    }
}