export default function OptionsDisplay({ options }){
    return<div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontWeight: 'bold', opacity: 0.7, fontSize: 20}}>TAGS:</span>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 10,
                flexWrap: 'wrap',
            }}>
                {options.map((option, index) => {
                    return <div key={index}
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            padding: 5, borderRadius: 5,
                            margin: 5,
                            fontSize: 22,
                            opacity: 0.8
                        }}
                    >
                        {option}
                        </div>
                })}
            </div>
    </div>
}