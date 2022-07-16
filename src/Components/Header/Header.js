import { useState } from 'react';
const dropdown_arrow = require('../../assets/images/dropdown_arrow.png');

export default function Header() {
    const [ dropdown, setDropdown ] = useState(false);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: '#24262a',
        }}>
            <div style={{ cursor: 'pointer', height: 50, color: '#ccc', fontSize: 15, position: 'absolute', right: 10, top: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => setDropdown(was => !was)}>
                <span>Options</span>
                <img src={dropdown_arrow} style={{ width: 30, height: 20, filter: 'invert()' }} />
            </div>
                {dropdown &&
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        padding: 10,
                        backgroundColor: '#24262a',
                        borderRadius: '0 0 5px 5px',
                    }}>
                        <div style={{
                            padding: 10,
                            marginTop: 30,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            border: '1px solid #ccc',
                            borderRadius: 5,
                            cursor: 'pointer',
                        }}>
                            Manage Users
                        </div>
                    </div>
                }
        </div>
    )
}