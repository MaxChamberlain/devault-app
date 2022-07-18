import DeviceLabel from "./DeviceLabel"
import DeviceModalHeader from "./DeviceModalHeader"
import OpenArrow from "./OpenArrow"
import SerialDisplay from "./SerialDisplay"
import CheckingOutModal from "../../Pages/Home/components/CheckingOutModal"
import OptionsDisplay from "../../Pages/Home/components/OptionsDisplay"
import MoreOptions from "../../Pages/Home/components/MoreOptions"
import { context } from "../../contexts/UserContext"
import CheckOutButton from "../../Pages/Home/components/CheckOutButton"
import { useState, useContext, useEffect } from "react"
import useLoading from "../../Hooks/useLoading"
import { CSSTransition } from "react-transition-group"
require('../../App.css')
const axios = require("axios")

export default function DeviceModal({ device, getDevices }){
    const setLoading = useLoading()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ checkingOut, setCheckingOut ] = useState(false)
    
    const perms = useContext(context)

    useEffect(() => {
        setCheckingOut(false)
    }, [isOpen])

    const colors = {
        blue: 'rgba(88, 101, 242, 0.6)',
        red: 'rgba(176, 51, 42, 0.6)',
        orange: 'rgba(232, 159, 0, 0.6)',
        cyan: 'rgba(83, 166, 151, 0.6)',
    }

    const modalBg = device.checked_out ? colors.blue : 
                        device.damaged ? colors.red :
                        device.reserved ? colors.orange :
                        device.requested ? colors.cyan : 'rgba(0,0,0,0.2)'

    return(
            <div style={{
                padding: 10,
                paddingBottom: 20,
                backgroundColor: modalBg,
                borderRadius: 5,
                position: 'relative',
                backgroundOpacity: 0.9,
                boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.2)',
            }}>
                <SerialDisplay serial={device.serial} />
                <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' ><DeviceModalHeader text={device.make + ' ' + device.model} /></CSSTransition>
                <DeviceLabel model={device.model} variant={device.variant} owner={device.owner} />
                <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' >
                    {perms ?
                        (device.checked_out ? 
                            <CheckOutButton text='Check In' func={() => checkIn(device.serial)} /> :
                        device.damaged ?
                            <CheckOutButton text='Repair' func={() => repair(device.serial)} /> :
                        device.reserved ?
                            <CheckOutButton text='Complete Checkout' func={() => setCheckingOut(was => was === device.serial ? null : device.serial)} /> :
                        device.requested ? <div style={{display: 'flex'}}><CheckOutButton text='Deny' func={() => checkIn(device.serial)} /><CheckOutButton text='Approve' func={() => checkOut(device.serial, device.owner)} /></div> :
                            <CheckOutButton text='Check Out' func={() => setCheckingOut(was => was === device.serial ? null : device.serial)} />)
                        : device.requested && device.owner === JSON.parse(localStorage.getItem('_devault:@user_info')).name ?
                            <CheckOutButton text='Cancel request' func={() => checkIn(device.serial)} />
                        : !device.owner && !device.damaged && 
                        <CheckOutButton text='Request' func={() => request(device.serial)} />
                    }
                </CSSTransition>
                <CSSTransition in={checkingOut} unmountOnExit timeout={200} classNames='modal-fade' ><CheckingOutModal serial={checkingOut} checkOut={checkOut} /></CSSTransition>
                <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' ><OptionsDisplay options={device.options} /></CSSTransition>
                {perms && <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' ><MoreOptions id={device._id} deleteItem={deleteItem} changeCategory={changeCategory} /></CSSTransition>}
                <OpenArrow click={setIsOpen} isActive={isOpen} />
            </div>
    )

    async function checkOut(serial, owner){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Checking Out...'])
            const { data } = await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/checkout', 
                { serial, company_code, owner },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Checked Out!'])
            setCheckingOut(false)
            getDevices()
        }catch(err){
            console.log(err)
        }
    }

    async function checkIn(serial){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Checking In...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/checkin', 
                { serial, company_code },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Checked In!'])
            getDevices()
        }catch(err){
            console.log(err)
        }
    }

    async function repair(serial){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Setting as repaired...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/repair', 
                { serial, company_code },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Done!'])
            getDevices()
        }catch(err){
            console.log(err)
        }
    }

    async function request(serial){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        const owner = JSON.parse(localStorage.getItem('_devault:@user_info')).name
        try{
            setLoading(['loading', 'Requesting...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/request', 
                { serial, company_code, owner },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Requested!'])
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }

    async function deleteItem(_id){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Deleting...'])
            axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/delete',
                { _id, company_code },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Deleted!'])
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }

    async function changeCategory(_id, category){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Requesting...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/changecategory', 
                { _id, company_code, category },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Requested!'])
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }
    
} 