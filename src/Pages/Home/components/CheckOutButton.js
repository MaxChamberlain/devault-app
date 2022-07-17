export default function CheckOutButton({ text, func }){
    return(
        <div
            style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.4)',
                fontSize: 25,
                textAlign: 'center',
                width: 'fit-content',
                margin: '20px auto',
                cursor: 'pointer',
            }}
            onClick={func}
        >
            {text}
        </div>
    )
}