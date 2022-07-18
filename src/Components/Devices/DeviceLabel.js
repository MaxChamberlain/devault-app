export default function DeviceLabel({ model, variant, owner }){

    const images = {
        macbook: 'https://support.apple.com/content/dam/edam/applecare/images/en_US/psp_content/content-block-md-macos_2x.png',
        imac: 'https://www.pngmart.com/files/22/Imac-PNG-Transparent.png',
        iphone: 'https://www.freeiconspng.com/thumbs/iphone-6-png/white-iphone-6-png-image-22.png',
        ipad: 'https://clipart.world/wp-content/uploads/2020/08/ipad-pro-png-transparent.png',
        "magic keyboard": 'https://freepngimg.com/save/63174-vector-magic-apple-painted-bluetooth-wireless-computer/1334x703',
        'magic trackpad': 'https://www.pngkey.com/png/full/80-800037_apple-magic-trackpad-apple-magic-trackpad-bluetooth-trackpad.png',
        'magic mouse': 'https://dlb99j1rm9bvr.cloudfront.net/apple-magic-mouse/parts/angle-1/model/size-1000/bg.png',
        'socket mobile s700 series': 'https://cdn.shopify.com/s/files/1/0553/3925/products/socketscan-s700-linear-barcode-scanner-barcode-scanner-794573.png?v=1649346406'
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