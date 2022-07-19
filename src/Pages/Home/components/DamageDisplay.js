export default function DamageDisplay({ damage }){
    return(
        <div style={{
            border: '1px solid white',
            borderRadius: 10,
            margin: 10,
            textAlign: 'center',
            fontSize: 25
        }}>
            <div style={{ padding: 5, backgroundColor: 'rgba(0,0,0,0.2)' }}>Description:</div>
            <div style={{ marginTop: 10,marginBottom: 10 }}>{damage}</div>
        </div>
    )
}