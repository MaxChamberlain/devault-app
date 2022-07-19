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
import DamageDisplay from "../../Pages/Home/components/DamageDisplay"
import ReservingModal from "../../Pages/Home/components/ReservingModal"
import { CSSTransition } from "react-transition-group"
require('../../App.css')
const axios = require("axios")

export default function DeviceModal({ device, getDevices }){
    const setLoading = useLoading()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ checkingOut, setCheckingOut ] = useState(false)
    const [ changingOptions, setChangingOptions ] = useState(false)
    const [ reserving, setReserving ] = useState(false)
    
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
                            <div>
                                <CheckOutButton text='Complete Checkout' func={() => setCheckingOut(was => was === device.serial ? null : device.serial)} /> 
                                <CheckOutButton text='Cancel Reservation' func={() => checkIn(device.serial)} />
                            </div>:
                        device.requested ? <div style={{display: 'flex'}}><CheckOutButton text='Deny' func={() => checkIn(device.serial)} /><CheckOutButton text='Approve' func={() => checkOut(device.serial, device.owner)} /></div> :
                            <CheckOutButton text='Check Out' func={() => setCheckingOut(was => was === device.serial ? null : device.serial)} />)
                        : device.requested && device.owner === JSON.parse(localStorage.getItem('_devault:@user_info')).name ?
                            <CheckOutButton text='Cancel request' func={() => checkIn(device.serial)} />
                        : !device.owner && !device.damaged && 
                        <CheckOutButton text='Request' func={() => request(device.serial)} />
                    }
                </CSSTransition>
                {perms && !device.checked_out && !device.damaged && !device.reserved && !device.requested &&
                    <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' >
                        <CheckOutButton text={reserving ? 'Cancel' : 'Reserve'} func={() => setReserving(was => was === device.serial ? null : device.serial)} />
                    </CSSTransition>
                }
                {isOpen && <CSSTransition in={reserving} unmountOnExit timeout={300} classNames='modal-scale-opacity' >
                    <ReservingModal serial={device._id} checkOut={reserve} />
                </CSSTransition>}
                {device.damage_description && <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' ><DamageDisplay damage={device.damage_description} /></CSSTransition>}
                <CSSTransition in={checkingOut} unmountOnExit timeout={200} classNames='modal-fade' ><CheckingOutModal serial={checkingOut} checkOut={checkOut} /></CSSTransition>
                <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' ><OptionsDisplay id={device._id} removeOption={removeOption} setChangingOptions={setChangingOptions} changingOptions={changingOptions} options={device.options} /></CSSTransition>
                {perms && <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='modal-scale-opacity' ><MoreOptions damage={device.damaged} setDamage={setDamage} addOption={addOption} setChangingOptions={setChangingOptions} changingOptions={changingOptions} serial={device.serial} id={device._id} deleteItem={deleteItem} changeCategory={changeCategory} /></CSSTransition>}
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
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
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
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
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
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
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
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
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
            setIsOpen(false)
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
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }

    async function removeOption(_id, tag){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Requesting...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/removeTag', 
                { _id, company_code, tag },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Requested!'])
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }

    async function addOption(_id, tag){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Requesting...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/addTag', 
                { _id, company_code, tag },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Requested!'])
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }

    async function setDamage(_id, damage_description){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Requesting...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/reserve', 
                { _id, company_code, damage_description },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Requested!'])
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }

    async function reserve(_id, owner){
        const company_code = JSON.parse(localStorage.getItem('_devault:@user_info')).company_code
        try{
            setLoading(['loading', 'Requesting...'])
            await axios.post(
                process.env.REACT_APP_API_DOMAIN + '/devices/reserve', 
                { _id, owner, company_code },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            )
            setLoading(['success', 'Requested!'])
            setIsOpen(false)
            setChangingOptions(false)
            setReserving(false)
            getDevices()
        }catch(err){
            setLoading(['error', err.response.data.message])
            console.log(err)
        }
    }
    
} 