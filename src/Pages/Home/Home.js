import { useState, useEffect, useContext } from "react"
import Filters from "./components/Filters";
import AddButton from "./components/AddButton";
import DeviceDisplayDriver from "./components/DeviceDisplayDriver";
import SearchBar from "./components/SearchBar";
const axios = require("axios");

export default function Home(){
    const [ devices, setDevices ] = useState([]);
    const [ category, setCategory ] = useState('All');
    const [ status, setStatus ] = useState('All');
    const [ serial, setSerial ] = useState(null);
    const [ searching, setSearching ] = useState(false);

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
        getDevices();
        window.addEventListener('keydown', e => {
            if(e.code === 'AltRight'){
                e.preventDefault()
                e.stopPropagation()
                setSearching(was => !was)
            }
        })
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
                <>
                    <SearchBar devices={devices} setSerial={setSerial} searching={searching} setSearching={setSearching} />
                    <Filters devices={devices} category={category} status={status} setCategory={setCategory} setStatus={setStatus} />
                    <DeviceDisplayDriver devices={devices} category={category} status={status} serial={serial} getDevices={getDevices} />
                </>
                :
                <div>
                    <h3 style={{
                        textAlign: "center",
                    }}>Looks like you don't have any devices... Let's get some inserted!</h3>
                </div>
            }
            <AddButton />
        </div>
    )
}