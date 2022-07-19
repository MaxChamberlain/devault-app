import { useState, useEffect } from 'react';

export default function InfoCard({ header, body, footer, symbol, top, bgColor, scroll }) {
    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        }
        , false);
    })
    return(
        <div style={{
            position: 'sticky',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 100%))',
            alignItems: 'center',
            justifyContent: 'center',
            top: top,
            margin: 20,
            marginTop: 100,
            padding: 32,
            borderRadius: 10,
            backgroundColor: bgColor,
            boxShadow: bgColor ? '0px 0px 20px 1px rgba(0,0,0,0.5)' : '',
            opacity: scroll,
        }}>
            <div>
                <h1 style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    textAlign: 'center',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    padding: 10,
                    borderRadius: 10,
                }}>{header}</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                    {width > 800 && symbol}
                    <p style={{
                        color: '#fff',
                        fontSize: width > 800 ? 30 : 15,
                        marginBottom: 20,
                        flex: 1,
                        border: '1px solid #fff',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        padding: 20,
                        borderRadius: 10,
                    }}>{body}</p>
                </div>
                <p style={{
                    color: '#fff',
                    fontSize: 20,
                    marginBottom: 20
                }}>{footer}</p>
            </div>
        </div>
    )
}