import { useState, useEffect, useContext } from "react"
import Filters from "./components/Filters";
import AddButton from "./components/AddButton";
import DeviceDisplayDriver from "./components/DeviceDisplayDriver";
import SearchBar from "./components/SearchBar";
import Refresh from "./components/Refresh";
const axios = require("axios");

export default function Home(){
    const [ devices, setDevices ] = useState([]);
    const [ category, setCategory ] = useState('All');
    const [ status, setStatus ] = useState('All');
    const [ make, setMake ] = useState('All');
    const [ serial, setSerial ] = useState(null);
    const [ searching, setSearching ] = useState(false);
    const [ width, setWidth ] = useState(window.innerWidth);

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
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
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
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <SearchBar serial={serial} setSerial={setSerial} searching={searching} setSearching={setSearching} />
                        <Refresh click={getDevices} />
                        {window.innerWidth > 1080 && <Filters devices={devices} category={category} status={status} setCategory={setCategory} setStatus={setStatus} make={make} setMake={setMake} />}
                    </div>
                    {window.innerWidth < 1080 && <Filters devices={devices} category={category} status={status} setCategory={setCategory} setStatus={setStatus} make={make} setMake={setMake} />}
                    <DeviceDisplayDriver devices={devices} category={category} status={status} serial={serial} getDevices={getDevices} make={make} />
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