import DeviceModal from "../../../Components/Devices/DeviceModal"

export default function DeviceDisplayDriver({ devices, category, status, serial, getDevices }){

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 350px)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 20,
            gridGap: 20,
        }}>
            {devices
                .filter(e => category === 'All' ? e : e.category === category)
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
                .map((device, index) => {
                    return <DeviceModal device={device} getDevices={getDevices} />
                })
            }
        </div>
    )
}