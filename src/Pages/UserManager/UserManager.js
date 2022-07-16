import useCopy from '../../Hooks/useCopy';
import { useState, useEffect, useContext } from 'react';
import useLoading from '../../Hooks/useLoading';
import { context } from '../../contexts/UserContext';
const axios = require('axios');

export default function UserManager(){
    const [ copied, copyToClipboard ] = useCopy();
    const [ users, setUsers ] = useState([]);
    const [ editing, setEditing ] = useState(null);

    const userPerms = useContext(context);

    const setLoading = useLoading();

    const getUsers = async () => {
        const { data } = await axios.post(
            process.env.REACT_APP_API_DOMAIN + '/users/getall',
            {
                company_code: JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
            },
            {
                headers: {
                    'x-auth-token': localStorage.getItem('_devault:@user_token')
                },
            }
        )
        setUsers(data)
    }

    const handleMakeAdmin = async (user, isAdmin) => {
        setLoading(['loading', 'Promoting user...'])
        try{
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/users/makeadmin',
                {
                    user_id: user,
                    isAdmin
                },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('_devault:@user_token')
                    },
                }
            )
            window.location.reload()
        }catch(e){
            console.log(e)
            setLoading(['error', e.response.data.error])
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return(
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#24262a',
                borderRadius: 10,
                marginTop: 90,
                color: '#aaa',
                marginLeft: '50%', 
                transform: 'translateX(-50%)',
                width: 'fit-content',
                cursor: 'pointer'
            }}
            onClick={() => copyToClipboard(JSON.parse(localStorage.getItem('_devault:@user_info')).company_code)}
            >

                {copied ? 'Code copied!' : `Your team code: ${JSON.parse(localStorage.getItem('_devault:@user_info')).company_code}`}
                <img alt='' src={ copied ? require('../../assets/images/checkmark.webp') : require('../../assets/images/copy_icon.png') } style={{ width: 30, height: 30, filter: 'invert()', opacity: 0.7, marginLeft: 50 }} />
            </div>
            <div style={{
                backgroundColor: '#24262a',
                margin: 20,
                padding: 32,
                marginTop: 50,
                borderRadius: 10,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, 400px)',
            }}>
                {users.map(user => {
                    return(
                        <div style={{
                            backgroundColor: '#36393f',
                            padding: 10,
                            borderRadius: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            <img alt='' src={editing === user._id ? require('../../assets/images/cancel_icon.png') : require('../../assets/images/edit_icon.png')} 
                            style={{ width: 30, height: 30, filter: 'invert()', position: 'absolute', right: 20, top: 20, cursor: 'pointer' }} 
                            onClick={() => setEditing(was => was === user._id ? null : user._id)}
                            />
                            {editing === user._id && <img alt='' src={require('../../assets/images/checkmark.webp')} 
                            style={{ width: 30, height: 30, filter: 'invert()', position: 'absolute', left: 20, top: 20, cursor: 'pointer' }} 
                            onClick={() => handleMakeAdmin(user._id, document.getElementById('isAdmin').checked)}
                            />}
                            <div style={{
                                backgroundColor: '#24262a',
                                padding: 10,
                                borderRadius: 10,
                            }}>
                                {user.name}
                            </div>
                            <span style={{
                                fontSize: 25,
                                marginTop: 20
                            }}>{user.email}</span>
                            <span style={{
                                fontSize: 25,
                                marginTop: 20,
                                color: '#aaa'
                            }}>
                                {userPerms ? 'Admin' : 'Not Admin'} 
                                {editing === user._id && 
                                    <input
                                    type="checkbox"
                                    id='isAdmin'
                                    defaultChecked={user.isAdmin}
                                    style={{
                                        marginLeft: 10,
                                        border: 'none',
                                    }}
                                    />
                                }
                                </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}