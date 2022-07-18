import { useState, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { context } from '../../contexts/UserContext';
import { TeamsContext } from '../../contexts/TeamContext';
const { useLocation } = require('react-router-dom');
const dropdown_arrow = require('../../assets/images/dropdown_arrow.png');
const home_icon = require('../../assets/images/home_icon.png');

export default function Header() {
    const [ dropdown, setDropdown ] = useState(false);
    const location = useLocation();

    const userPerms = useContext(context);
    const team = useContext(TeamsContext);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: '#24262a',
            zIndex: 9000
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>{team[0] ? team[0].company_name : ''}</div>
            <div style={{ cursor: 'pointer', height: 50, color: '#ccc', fontSize: 15, position: 'absolute', right: 25, top: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => setDropdown(was => !was)}>
                <span>Options</span>
                <img src={dropdown_arrow} style={{ width: 30, height: 20, filter: 'invert()' }} alt='' />
            </div>
            <div style={{ cursor: 'pointer', height: 40, color: '#ccc', fontSize: 15, position: 'absolute', left: 10, top: 5, display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={home_icon} style={{ width: 30, height: 30, filter: 'invert()', opacity: location.pathname === '/home' ? 1 : .5 }} alt='' onClick={() => window.location.href = '/home'} />
                    <span style={{ fontSize: 15, cursor: 'pointer', opacity: location.pathname === '/home' ? 1 : .5 }} onClick={() => window.location.href = '/home'} >Home</span>
                </div>
                <span style={{ fontSize: 25, marginLeft: 20, cursor: 'pointer', opacity: location.pathname === '/overview' ? 1 : .5 }} onClick={() => window.location.href = '/overview'} >Overview</span>
            </div>
            <TransitionGroup component='div'>
                {dropdown &&
                    <CSSTransition classNames='animate-down' timeout={100}>
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            padding: 10,
                            backgroundColor: '#24262a',
                            borderRadius: '0 0 5px 5px',
                            fontSize: 20,
                            zIndex: 8999
                        }}>
                            {userPerms && <div style={{
                                padding: 10,
                                marginTop: 10,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                border: '1px solid #ccc',
                                borderRadius: 5,
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                            onClick={() => window.location.href = '/users'}
                            >
                                Manage Users
                            </div>}
                            <div style={{
                                padding: 10,
                                marginTop: 10,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                border: '1px solid rgb(176, 51, 42)',
                                borderRadius: 5,
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                            onClick={() => {localStorage.removeItem('_devault:@user_info'); window.location.href = '/'}}
                            >
                                Logout
                            </div>
                        </div>
                    </CSSTransition>
                }
            </TransitionGroup>
        </div>
    )
}