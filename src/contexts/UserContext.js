import { createContext, useState, useEffect } from 'react';
const axios = require('axios');

export const context = createContext();

export default function UserContext( { children }) {
    const [ perms, setPerms ] = useState(false);
    

    const getPerms = async () => {
        try{
        const { data } = await axios.post(
            process.env.REACT_APP_API_DOMAIN + '/users/getpermissions',
            {
            _id: JSON.parse(localStorage.getItem('_devault:@user_info'))._id
            },
            { headers: { 'x-auth-token': localStorage.getItem('_devault:@user_token') } }
        )
        setPerms(data)
        }catch(e){
        console.log(e)
        }
    }

    useEffect(() => {
        getPerms();
    }, [])

    return(
        <context.Provider value={perms}>
            {children}
        </context.Provider>
    );
}