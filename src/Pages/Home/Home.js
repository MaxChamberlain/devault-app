import { useState, useEffect, useContext } from "react"
import AddButton from "./components/AddButton";
const axios = require("axios");

export default function Home(){
    const [ devices, setDevices ] = useState([]);

    const getDevices = async () => {
        const devices = await axios.post(
            process.env.REACT_APP_API_DOMAIN + "/devices/getall",
            {
                company_code: JSON.parse(localStorage.getItem("_devault:@user_info")).company_code
            },
            { headers: { "x-auth-token": localStorage.getItem("_devault:@user_token") } }
        )
    }

    useEffect(() => {
        getDevices();
    }, [])

    return(
        <div style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
        }}>
            {devices.length > 0 ? 
                JSON.parse(devices) :
                <div>
                    <h3 style={{
                        textAlign: "center",
                    }}>Looks like you don't have any devices... Let's get some inserted!</h3>
                    <AddButton />
                </div>
            }
        </div>
    )
}