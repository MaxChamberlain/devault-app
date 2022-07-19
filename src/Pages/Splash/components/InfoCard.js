export default function InfoCard({ header, body, footer, symbol }){
    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 350px)',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            marginTop: 100,
            padding: 32,
            borderRadius: 10,
            backgroundColor: '#36393f',
        }}>
            <div>
                <h1 style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 20
                }}>{header}</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {symbol}
                    <p style={{
                        color: '#fff',
                        fontSize: 20,
                        marginBottom: 20,
                        flex: 1
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