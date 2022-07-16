import { useState } from "react";
import CheckInput from "../../../Components/Form/CheckInput";
import SubmitButton from "../../../Components/Form/SubmitButton";
import TextInput from "../../../Components/Form/TextInput";
const axios = require("axios");

export default function Form(){
    const [ options, setOptions ] = useState([])
    const [ owned, setOwned ] = useState(false);
    const [ damaged, setDamaged ] = useState(false);
    const [ reserved, setReserved ] = useState(false);

    const placeholders=['Blue', '256GB', 'Rechargable', 'With USB-C Port', ]
    
    return(
        <div style={{
            backgroundColor: '#36393f',
            padding: 20,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 0 10px 10px rgba(0,0,0,0.5)',
        }}>
            <span style={{ justifySelf: 'center' }}>Add a new device</span>
            <form onSubmit={e => handleSubmit(e)}>
                <TextInput label='Device Make' id='device_make' placeholder='Apple' required={true} />
                <TextInput label='Device Model' id='device_model' placeholder='Macbook' required={true} />
                <TextInput label='Device Variant' id='device_variant' placeholder='Macbook Pro' required={true} />
                <TextInput label='Device Serial' id='device_serial' placeholder='123456789' required={true} />
                <TextInput label='Device Category' id='device_category' placeholder='Warehouse' required={true} />
                <div style={{ textAlign: 'center' }}>Options:</div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    paddingLeft: 50,
                    position: 'relative',
                    paddingBottom: 30
                }}>
                    {options.map((option, index) => {
                        return <TextInput label='Option' id={`option-${index}`} required={true} placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]} />
                    })}
                        <svg 
                            style={{
                                position: "absolute",
                                bottom: 10,
                                right: 20,
                                zIndex: 100,
                                backgroundColor: 'hsl(235, 85.6%,64.7%)',
                                height: 30,
                                width: 30,
                                borderRadius: '100%',
                                cursor: 'pointer',
                            }}
                            onClick={() => setOptions(was => [...was, options.length])}
                        >
                            <line x1="15" y1="5" x2="15" y2="25" stroke="white" strokeWidth="4" strokeLinecap='round' />
                            <line x1="5" y1="15" x2="25" y2="15" stroke="white" strokeWidth="4" strokeLinecap='round' />
                        </svg>
                        <svg 
                            style={{
                                position: "absolute",
                                bottom: 10,
                                right: 60,
                                zIndex: 100,
                                backgroundColor: 'hsl(235, 85.6%,64.7%)',
                                height: 30,
                                width: 30,
                                borderRadius: '100%',
                                cursor: 'pointer',
                            }}
                            onClick={() => setOptions(was => [...was].slice(0, -1))}
                        >
                            <line x1="5" y1="15" x2="25" y2="15" stroke="white" strokeWidth="4" strokeLinecap='round' />
                        </svg>
                </div>
                <CheckInput label='CHECKED OUT?' func={setOwned} />
                {owned && <TextInput label='OWNER' id='owner' placeholder='John Doe' required={true} />}
                <CheckInput label='DAMAGED?' func={setDamaged} />
                {damaged && <TextInput label='DAMAGE DESCRIPTION' id='damage_description' placeholder='Description' required={true} />}
                <CheckInput label='RESERVED?' func={setReserved} />
                {reserved && <TextInput label='RESERVED FOR' id='reservation_description' placeholder='John Doe' required={true} />}
                <SubmitButton label='SUBMIT' />
            </form>
        </div>
    )

    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            make: e.target.device_make.value,
            model: e.target.device_model.value,
            variant: e.target.device_variant.value,
            serial: e.target.device_serial.value,
            category: e.target.device_category.value,
            options: options.map(option => document.getElementById(`option-${option}`).value),
            checked_out: owned,
            damaged: damaged,
            reserved: reserved,
            company_code: JSON.parse(localStorage.getItem('_devault:@user_info')).company_code, 
        };
        if(owned){
            data.owner = e.target.owner.value;
        }
        if(damaged){
            data.damage_description = e.target.damage_description.value;
        }
        if(reserved){
            data.reservation_description = e.target.reservation_description.value;
        }

        await axios.post(
            process.env.REACT_APP_API_DOMAIN + '/devices/addone',
            data,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        )

        window.location.reload();

    }
}