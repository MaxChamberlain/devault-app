export default function DeviceModalHeader({ text }){
    return(
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 10,
                marginBottom: 30,
                marginTop: 20,
                fontWeight: 'bold',
                padding: 5
            }}
        >
            <div style={{
                textAlign: 'center',
                color: 'white',
            }}>{text}</div>
        </div>
    )
}