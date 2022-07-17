export default function SubmitButton({ label }){

    const styles = {
        width: '100%',
        backgroundColor: 'hsl(235, 85.6%,64.7%)',
        border: 'none',
        height: 40,
        borderRadius: 5,
        marginTop: 32,
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
        cursor: 'pointer',
    }

    return(
        <input type="submit" style={styles} value={label} />
    )
}