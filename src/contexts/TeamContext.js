import { createContext, useState, useEffect } from 'react';
const axios = require('axios');

export const TeamsContext = createContext();

export default function TeamContext( { children }) {
    const [ team, setTeam ] = useState(false);
    

    const getTeamInfo = async () => {
        try{
        const { data } = await axios.post(
            process.env.REACT_APP_API_DOMAIN + '/team/get',
            {
            company_code: JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
            },
            { headers: { 'x-auth-token': localStorage.getItem('_devault:@user_token') } }
        )
        setTeam(data)
        }catch(e){
        console.log(e)
        }
    }

    useEffect(() => {
        getTeamInfo();
    }, [])

    return(
        <TeamsContext.Provider value={team}>
            {children}
        </TeamsContext.Provider>
    );
}