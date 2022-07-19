import { useEffect, useState } from "react"
import MainCard from "./components/MainCard"
import InfoCard from "./components/InfoCard"
const logo = require('../../assets/images/lock-512.webp')

export default function Splash(){
    const [ scroll, setScroll ] = useState(0)

    useEffect(() => {
        if(localStorage.getItem('_devault:@user_info')){
            window.location.href = '/home'
        }
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY)
        }
        , false);
    }, [])
    return (
        <div>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 100,
            }}>
                <span style={{fontSize: 40, fontWeight: 'bold'}}>Welcome to DeVault</span>
                <img src={logo} style={{
                    filter: 'invert()',
                    width: 30,
                    marginLeft: 20
                }} alt='' />
            </div>
                <MainCard>
                    <InfoCard 
                        top={250}
                        scroll={1}
                        bgColor='rgba(232, 159, 0, 1)'
                        header='Keep Track of your Devices' 
                        body="DeVault is a space to keep track of all of your team's devices, along with all the details that come with them" 
                        symbol={
                            <div style={{
                                display: 'flex',
                                flex: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <div style={{
                                    padding: 25,
                                    width: 150,
                                    marginTop: 10,
                                    height: 40,
                                    marginRight: 20,
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(88, 101, 242, 0.8)',
                                }}>
                                    <div style={{
                                        padding: '5px 0',
                                        textAlign: 'center',
                                        borderRadius: 5,
                                        width: '100%',
                                        fontSize: 15,
                                        backgroundColor: 'rgba(0,0,0,0.2)'
                                    }}>
                                        Apple Iphone
                                    </div>
                                </div>
                                <div style={{
                                    padding: 25,
                                    width: 150,
                                    height: 40,
                                    marginRight: 20,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(83, 166, 151, 0.8)',
                                }}>
                                    <div style={{
                                        padding: '5px 0',
                                        textAlign: 'center',
                                        borderRadius: 5,
                                        width: '100%',
                                        fontSize: 15,
                                        backgroundColor: 'rgba(0,0,0,0.2)'
                                    }}>
                                        Apple Macbook
                                    </div>
                                </div>
                                <div style={{
                                    padding: 25,
                                    marginRight: 20,
                                    width: 150,
                                    height: 40,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(176, 51, 42, 0.8)',
                                }}>
                                    <div style={{
                                        padding: '5px 0',
                                        textAlign: 'center',
                                        borderRadius: 5,
                                        width: '100%',
                                        fontSize: 15,
                                        backgroundColor: 'rgba(0,0,0,0.2)'
                                    }}>
                                        HP Monitor
                                    </div>
                                </div>
                            </div>
                        }
                    /> 
                    <InfoCard 
                        top={300}
                        bgColor='rgba(83, 166, 151, 1)'
                        header='Distribute Efficiently' 
                        scroll={(scroll / 100) + 0.1}
                        body="While admin users can manage the status and category of all devices, non-admin users can request available devices to be assigned to them" 
                        symbol={
                            <div style={{
                                display: 'flex',
                                flex: 0.5,
                                marginRight: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                fontSize: 20,
                            }}>
                                <div style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    textAlign: 'center',
                                    width: '100%',
                                    backgroundColor: `rgba(88, 101, 242,${scroll / 500})`,
                                }}>Request</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: `rgba(88, 101, 242,${scroll / 500})`,
                                }}>Check Out</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: `rgba(88, 101, 242,${scroll / 500})`,
                                }}>Check In</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: `rgba(88, 101, 242,${scroll / 500})`,
                                }}>Reserve</div>
                            </div>
                        }
                    /> 
                    <InfoCard 
                        top={350}
                        scroll={(scroll - 500) / 100}
                        bgColor='rgba(176, 51, 42, 1)'
                        header='Manage Your Internal Inventory' 
                        body="View an overview of all devices and their status, filter your devices to find the one you need, print and scan barcodes for each serial number and more" 
                        symbol={
                            <div style={{
                                display: 'flex',
                                flex: 0.5,
                                marginRight: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                fontSize: 20,
                            }}>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: `rgba(232, 159, 0,${scroll / 500})`,
                                }}>Print Barcode</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: `rgba(232, 159, 0,${scroll / 500})`,
                                }}>Change Category</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: `rgba(232, 159, 0,${scroll / 500})`,
                                }}>Change Tags</div>
                            </div>
                        }
                    /> 
                    <InfoCard 
                        top={500}
                        scroll={0}
                    /> 
                </MainCard>
        </div>
    )
}