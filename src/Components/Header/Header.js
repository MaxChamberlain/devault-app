import { useState, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { context } from '../../contexts/UserContext';
const dropdown_arrow = require('../../assets/images/dropdown_arrow.png');
const home_icon = require('../../assets/images/home_icon.png');

export default function Header() {
    const [ dropdown, setDropdown ] = useState(false);

    const userPerms = useContext(context);

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
            <div style={{ cursor: 'pointer', height: 50, color: '#ccc', fontSize: 15, position: 'absolute', right: 25, top: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => setDropdown(was => !was)}>
                <span>Options</span>
                <img src={dropdown_arrow} style={{ width: 30, height: 20, filter: 'invert()' }} alt='' />
            </div>
            <div style={{ cursor: 'pointer', height: 50, color: '#ccc', fontSize: 15, position: 'absolute', left: 10, top: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => window.location.href = '/home'}>
                <img src={home_icon} style={{ width: 40, height: 40, filter: 'invert()' }} alt='' />
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
                            }}
                            onClick={() => window.location.href = '/users'}
                            >
                                Manage Users
                            </div>}
                        </div>
                    </CSSTransition>
                }
            </TransitionGroup>
        </div>
    )
}