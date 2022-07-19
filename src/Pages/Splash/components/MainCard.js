export default function MainCard({ children }){
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 45%)',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            marginTop: 100,
            padding: 32,
            borderRadius: 10,
            backgroundColor: 'hsl(235, 85.6%,64.7%)'
        }}>
            {children}
        </div>
    )
}