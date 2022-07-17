export default function DeviceLabel({ model, variant, owner }){

    const images = {
        macbook: 'https://support.apple.com/content/dam/edam/applecare/images/en_US/psp_content/content-block-md-macos_2x.png',
        imac: 'http://assets.stickpng.com/images/580b57fbd9996e24bc43bfe1.png',
        iphone: 'https://www.freeiconspng.com/thumbs/iphone-6-png/white-iphone-6-png-image-22.png'
    }

    return(
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
                width: 70,
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '50%',
                marginRight: 20
            }}>
                {images[model.trim().toLowerCase()] ? 
                    <img src={images[model.trim().toLowerCase()]} style={{
                        width: 50,
                    }} />
                    :
                    <div style={{ fontSize: 40 }}>{model.slice(0,1).toUpperCase()}</div>
                }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
                <span style={{
                    textAlign: 'center',
                    color: 'white',
                    width: 220,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textAlign: 'left'
                }}>{variant}</span>
                <span style={{
                    textAlign: 'center',
                    fontSize: 25,
                    opacity: 0.8,
                    color: 'white',
                    width: 220,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textAlign: 'left'
                }}>{owner}</span>
            </div>
        </div>
    )
}