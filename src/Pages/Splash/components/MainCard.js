export default function MainCard({ children }){
    return (
        <div style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            marginTop: 200,
            borderRadius: 10,
            backgroundColor: 'hsl(235, 85.6%,64.7%)'
        }}>
            {children}
        </div>
    )
}