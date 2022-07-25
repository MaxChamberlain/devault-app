import DeviceModal from "../../../Components/Devices/DeviceModal"
import { CSSTransition } from "react-transition-group";

export default function DeviceDisplayDriver({ devices, category, status, make, serial, getDevices, model, owner }){

    devices.forEach(e => {
        if(!e.owner) return e.owner = 'No Owner'
        if(e.owner.trim() === '') e.owner = 'No Owner'
    })

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 350px)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 15,
            gridGap: 15,
        }}>
            {devices[0] !== undefined && devices
                .filter(e => e.category === category || category === 'All')
                .filter(e => {
                    if(status === 'All') return e;
                    if(status === 'Checked Out') return e.checked_out;
                    if(status === 'Damaged') return e.damaged;
                    if(status === 'Reserved') return e.reserved;
                    if(status === 'Available') return !e.checked_out && !e.damaged && !e.reserved;
                    if(status === 'Requested') return e.requested;
                })
                .filter(e => {
                    return serial === null ? e : e.serial.includes(serial)
                })
                .filter(e => e.make === make || make === 'All')
                .sort((a, b) => {
                    // sort by reserved, then requested, then checked out, then damaged
                    if(a.reserved && !b.reserved) return -1;
                    if(!a.reserved && b.reserved) return 1;
                    if(a.requested && !b.requested) return -1;
                    if(!a.requested && b.requested) return 1;
                    if(a.checked_out && !b.checked_out) return -1;
                    if(!a.checked_out && b.checked_out) return 1;
                    if(a.damaged && !b.damaged) return 1;
                    if(!a.damaged && b.damaged) return -1;
                    if(a.make < b.make) return -1;
                    if(a.make > b.make) return 1;
                    if(a.model < b.model) return -1;
                    if(a.model > b.model) return 1;
                    return 0;
                })
                .filter(e => e.model === model || model === 'All')
                .filter(e => e.owner === owner || owner === 'All')
                .map((device, index) => {
                    return <CSSTransition in={devices} timeout={200} classNames="modal-fade">
                    <DeviceModal device={device} getDevices={getDevices} />
                    </CSSTransition>
                })
            }
        </div>
    )
}