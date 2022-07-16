export default function TextInput({ label, width, id, placeholder, required, type, func }){

    const styles = {
        input:{
            width: width || '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            border: 'none',
            height: 40,
            borderRadius: 5,
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
        },
        label:{
            fontWeight: 600,
            fontSize: 15,
            color: '#999',
        }
    }

    if(func){
        return <div style={{margin: 30}}>
            <div style={styles.label}>{label}</div>
            <input type={type} placeholder={placeholder} id={id} style={styles.input} required={required}/>
        </div>
    }
    
    return <div style={{margin: 30}}>
        <div style={styles.label}>{label}</div>
        <input type={type} placeholder={placeholder} id={id} style={styles.input} required={required} />
    </div>

}