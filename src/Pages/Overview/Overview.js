import { useContext, useState, useEffect } from 'react';
import useLoading from '../../Hooks/useLoading';
import DeviceDisplayDriver from './components/DeviceDisplayDriver';
const axios = require('axios');

export default function Overview(){
    const [ devices, setDevices ] = useState([]);
    
    const setLoading = useLoading();

    const getDevices = async () => {
        const { data } = await axios.post(
            process.env.REACT_APP_API_DOMAIN + "/devices/getall",
            {
                company_code: JSON.parse(localStorage.getItem("_devault:@user_info")).company_code
            },
            { headers: { "x-auth-token": localStorage.getItem("_devault:@user_token") } }
        )
        setDevices(data)
    }

    useEffect(() => {
        const init = async () => {
            setLoading(["loading", "Loading..."])
            setDevices('loading')
            await getDevices()
            setLoading(null)
        }
        init()
    }, [])

    return(
        <div>
            {devices.length > 0 && devices !== 'loading' ?
                <DeviceDisplayDriver devices={devices} />
            : devices !== 'loading' ?
            <div>
                <h3 style={{
                    textAlign: "center",
                }}>Looks like you don't have any devices... Let's get some inserted!</h3>
            </div>
            :
            <div>
                <h3 style={{
                    textAlign: "center",
                }}>Loading Devices</h3>
            </div>
            }
        </div>
    )
}