import { useEffect } from "react"
const logo = require('../../assets/images/lock-512.webp')

export default function Splash(){

    useEffect(() => {
        if(localStorage.getItem('_devault:@user_info')){
            window.location.href = '/home'
        }
    }, [])
    return (
        <div>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <span>Welcome to DeVault</span>
                <img src={logo} style={{
                    filter: 'invert()',
                    width: 30,
                    marginLeft: 20
                }} alt='' />
            </div>
        </div>
    )
}