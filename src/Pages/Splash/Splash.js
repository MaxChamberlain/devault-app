import { useEffect } from "react"

export default function Splash(){

    useEffect(() => {
        if(localStorage.getItem('_devault:@user_info')){
            window.location.href = '/home'
        }
    }, [])
    return (
        <div>
            <h1>Splash</h1>
        </div>
    )
}