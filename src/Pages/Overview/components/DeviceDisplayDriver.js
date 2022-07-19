import { useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group";
const dropdown_arrow = require("../../../assets/images/dropdown_arrow.png");

export default function Overview({ devices }) {
    const [ isOpen, setIsOpen ] = useState([])
    const [ openDevice, setOpenDevice ] = useState([])
    const [ width, setWidth ] = useState(window.innerWidth)
    
    const makes = [...new Set(devices.map(device => device.make))]

    const variantsTotal = [...new Set(devices.map(device => {return {variant: device.variant, make: device.make}}))]
    //remove all duplicates from the variants array based on variant.variant property
    const variants = variantsTotal.filter((variant, index, self) =>
        index === self.findIndex((t) => (t.variant === variant.variant && t.make === variant.make))
    )

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

    const consolidatedDevices = []

    variants.forEach(variant => {
        if(!consolidatedDevices[variant.variant]){
            consolidatedDevices[variant.variant] = {
                total_count: 0,
                damaged_count: 0,
                checked_out_count: 0,
                available_count: 0,
                reserved_count: 0,
                requested_count: 0,
            }
        }
        devices.forEach(device => {
            if(device.variant === variant.variant){
                consolidatedDevices[variant.variant].make = device.make
                consolidatedDevices[variant.variant].model = device.model
                consolidatedDevices[variant.variant].variant = device.variant
                consolidatedDevices[variant.variant].total_count++
                
                if(device.damaged){
                    consolidatedDevices[variant.variant].damaged_count++
                }else if(device.checked_out){
                    consolidatedDevices[variant.variant].checked_out_count++
                }else if(device.reserved){
                    consolidatedDevices[variant.variant].reserved_count++
                }else{
                    consolidatedDevices[variant.variant].available_count++
                }
                if(device.requested){
                    consolidatedDevices[variant.variant].requested_count++
                }
            }
        })
    })    

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
    }, [])

    return(
            <CSSTransition timeout={0} in={true} classNames='just-fade-in'>
            <div style={{
                position: 'absolute',
                top: 90,
                left: 5,
                right: 5,
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 20,
                textAlign: 'center',
                minHeight: '100%'
            }}>
                    {consolidatedDevices && makes.map(make => 
                        <div style={{
                            marginBottom: 50,
                            width: '100%',
                            position: 'relative'
                        }}>  
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 5,
                                margin: 10,
                                marginBottom: 0,
                                marginTop: 0,
                                textAlign: 'center',
                                borderRadius: '10px 10px 0 0',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                            }}>{make}</div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                marginBottom: 0,
                                margin: 10,
                                marginTop: 0,
                                borderRadius: '0 0 10px 10px',
                                border: '5px solid rgba(0,0,0,0.4)',
                                textAlign: 'center',
                            }}>
                                {!isOpen.includes(make) && <><span></span>
                                <span style={{color: 'rgba(255,255,255,0.2)'}}>Expand to view content</span></>}
                                {isOpen.includes(make) && variants.filter(e => e.make === make).map(variant => {
                                    return (
                                        <div>
                                            {Object.keys(consolidatedDevices).filter(e => consolidatedDevices[e].variant === variant.variant).map(device => {
                                                return (
                                                    <div style={{
                                                        padding: 10,
                                                        margin: 10,
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        boxShadow: '0 0 8px 4px rgba(0,0,0,0.5)',
                                                        border: '1px solid #aaa',
                                                        borderRadius: 10
                                                    }}>
                                                        <div style={{
                                                            width: '100%',
                                                            padding: '5px 0',
                                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                                            borderRadius: 10,
                                                            margin: '10px 0',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                            
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
                                                                {images[consolidatedDevices[device].model.trim().toLowerCase()] ? 
                                                                    <img src={images[consolidatedDevices[device].model.trim().toLowerCase()]} style={{
                                                                        width: 50,
                                                                    }} />
                                                                    :
                                                                    <div style={{ fontSize: 40 }}>{consolidatedDevices[device].model.slice(0,1).toUpperCase()}</div>
                                                                }
                                                            </div>
                                                            <span>{consolidatedDevices[device].variant}</span>
                                                            <img src={dropdown_arrow} style={{
                                                                marginLeft: 40,
                                                                cursor: 'pointer',
                                                                height: 30,
                                                                filter: 'invert()',
                                                                transform: openDevice.includes(consolidatedDevices[device].variant) ? 'rotate(180deg)' : 'rotate(0deg)',
                                                            }} 
                                                            onClick={() => setOpenDevice(was => was.includes(consolidatedDevices[device].variant) ? [...was].filter(e => e !== consolidatedDevices[device].variant) : [...was, consolidatedDevices[device].variant])} />
                                                        </div>

                                                        {openDevice.includes(consolidatedDevices[device].variant) && <>
                                                        <div style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'space-around',
                                                            alignItems: 'center',
                                                            flexDirection:  width < 1080 ? 'column' : 'row',
                                                        }}>
                                                        
                                                            <div style={{
                                                                    width: '100%',
                                                                    border: '1px solid #2A3C6F',
                                                                    borderRadius: 10,
                                                                    margin: '20px 5px',
                                                                    backgroundColor: 'rgba(88, 101, 242, 0.2)',
                                                                }}>
                                                                <div style={{
                                                                    width: '100%',
                                                                    backgroundColor: 'rgba(88, 101, 242, 0.6)',
                                                                    padding: '5px 0',
                                                                    fontSize: 25,
                                                                    borderRadius: '5px 5px 0 0',
                                                                }}>Checked Out</div>
                                                                <div style={{ margin: '10px 0' }}>{consolidatedDevices[device].checked_out_count}
                                                                </div>
                                                            </div>
                                                            
                                                            <div style={{
                                                                    width: '100%',
                                                                    border: '1px solid rgba(255, 170, 0, 0.6)',
                                                                    borderRadius: 10,
                                                                    margin: '20px 5px',
                                                                    backgroundColor: 'rgba(255, 170, 0, 0.2)',
                                                                }}
                                                                >
                                                                <div style={{
                                                                    width: '100%',
                                                                    backgroundColor: 'rgba(255, 170, 0, 0.6)',
                                                                    padding: '5px 0',
                                                                    fontSize: 25,
                                                                    borderRadius: '5px 5px 0 0',
                                                                }}>Reserved</div>
                                                                <div style={{ margin: '10px 0' }}>{consolidatedDevices[device].reserved_count}
                                                                </div>
                                                            </div>
                                                            
                                                            <div style={{
                                                                    width: '100%',
                                                                    border: '1px solid rgba(176, 51, 42, 0.6)',
                                                                    backgroundColor: 'rgba(176, 51, 42, 0.2)',
                                                                    borderRadius: 10,
                                                                    margin: '20px 5px',
                                                                }}>
                                                                <div style={{
                                                                    width: '100%',
                                                                    backgroundColor: 'rgba(176, 51, 42, 0.6)',
                                                                    padding: '5px 0',
                                                                    fontSize: 25,
                                                                    borderRadius: '5px 5px 0 0',
                                                                }}>Damaged</div>
                                                                <div style={{ margin: '10px 0' }}>{consolidatedDevices[device].damaged_count}
                                                                </div>
                                                            </div>
                                                            
                                                            <div style={{
                                                                    width: '100%',
                                                                    border: '1px solid rgba(83, 166, 151, 0.6)',
                                                                    backgroundColor: 'rgba(83, 166, 151, 0.2)',
                                                                    borderRadius: 10,
                                                                    margin: '20px 5px',
                                                                }}>
                                                                <div style={{
                                                                    width: '100%',
                                                                    backgroundColor: 'rgba(83, 166, 151, 0.6)',
                                                                    padding: '5px 0',
                                                                    fontSize: 25,
                                                                    borderRadius: '5px 5px 0 0',
                                                                }}>Requested</div>
                                                                <div style={{ margin: '10px 0' }}>{consolidatedDevices[device].requested_count}
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div style={{
                                                            marginBottom: -15,
                                                            marginTop: 30,
                                                            textAlign: 'center',
                                                            fontWeight: 700,
                                                            fontSize: 15,
                                                            color: '#ccc',
                                                        }}>TOTAL QUANTITY</div>
                                                        <div style={{
                                                            width: '100%',
                                                            padding: '5px 0',
                                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                                            borderRadius: 10,
                                                            margin: '20px 0'
                                                        }}>{consolidatedDevices[device].total_count} total <span style={{color: '#aaa'}}>({consolidatedDevices[device].total_count - consolidatedDevices[device].checked_out_count - consolidatedDevices[device].damaged_count} available)</span>
                                                        </div></>}
                                                    </div>
                                                )})}
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: 10,
                                right: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '0 10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => setIsOpen(was => was.includes(make) ? [...was].filter(e => e !== make) : [...was, make] )}>
                                <span style={{fontSize: 20, marginRight: 10, color: '#aaa'}}>
                                    {isOpen.includes(make) ? 'close' : 'open'}
                                </span>
                                <img src={dropdown_arrow} style={{
                                    height: 30,
                                    filter: 'invert()',
                                    transform: isOpen.includes(make) ? 'rotate(180deg)' : 'rotate(0deg)',
                                }} />
                            </div>
                        </div>
                    )}
                    </div>
            </CSSTransition>
    )
}