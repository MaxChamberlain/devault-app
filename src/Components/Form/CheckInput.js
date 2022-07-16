export default function CheckInput({ label, width, id, required, func }){
    const styles = {
        input:{
            width: width || '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            border: 'none',
            height: 30,
            borderRadius: 5,
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            flex: 1
        },
        label:{
            fontWeight: 600,
            fontSize: 25,
            color: '#999',
            flex: 4
        }
    }

    if(func){
        return <div style={{
            margin: 30, 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            }}>
            <div style={styles.label}>{label}</div>
            <input type="checkbox" id={id} style={styles.input} required={required} onChange={e => func(e.target.checked)} />
        </div>
    }

    return <div style={{
        margin: 30, 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        }}>
        <div style={styles.label}>{label}</div>
        <input type="checkbox" id={id} style={styles.input} required={required} />
    </div>
}