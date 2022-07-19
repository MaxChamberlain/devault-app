import { useEffect } from "react"
import MainCard from "./components/MainCard"
import InfoCard from "./components/InfoCard"
const logo = require('../../assets/images/lock-512.webp')

export default function Splash(){

    useEffect(() => {
        if(localStorage.getItem('_devault:@user_info')){
            window.location.href = '/home'
        }
    }, [])
    return (
        <div>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <span>Welcome to DeVault</span>
                <img src={logo} style={{
                    filter: 'invert()',
                    width: 30,
                    marginLeft: 20
                }} alt='' />
            </div>
                <MainCard>
                    <InfoCard 
                        header='Keep Track of your Devices' 
                        body="DeVault is a space to keep track of all of your team's devices, along with all the details that come with them" 
                        symbol={
                            <div style={{
                                display: 'flex',
                                flex: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}>
                                <div style={{
                                    padding: 25,
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(88, 101, 242, 0.6)',
                                }}></div>
                                <div style={{
                                    padding: 25,
                                    borderRadius: 10,
                                    marginTop: 10,
                                    backgroundColor: 'rgba(232, 159, 0, 0.6)',
                                }}></div>
                                <div style={{
                                    padding: 25,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(83, 166, 151, 0.6)',
                                }}></div>
                                <div style={{
                                    padding: 25,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(176, 51, 42, 0.6)',
                                }}></div>
                            </div>
                        }
                    /> 
                    <InfoCard 
                        header='Distribute Efficiently' 
                        body="While admin users can manage the status and category of all devices, non-admin users can request available devices to be assigned to them" 
                        symbol={
                            <div style={{
                                display: 'flex',
                                flex: 0.5,
                                marginRight: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                fontSize: 20
                            }}>
                                <div style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    textAlign: 'center',
                                    width: '100%',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                }}>Request</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                }}>Check Out</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                }}>Check In</div>
                                <div style={{
                                    marginTop: 10,
                                    padding: 10,
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                }}>Reserve</div>
                            </div>
                        }
                    /> 
                </MainCard>
        </div>
    )
}