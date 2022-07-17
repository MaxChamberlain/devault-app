import { useState } from "react"
import { motion } from "framer-motion"
const dropdown_arrow = require("../../../assets/images/dropdown_arrow.png")

export default function StatusSelect({ currStatus, setStatus }){
    const [ open, setOpen ] = useState(false);

    return(
        <div style={{ margin: '10px 0' }}>
            <div style={{  marginLeft: 35, marginBottom: -10, fontSize: 22, opacity: 0.6, fontWeight: 640, letterSpacing: 1}}
                onClick={() => setOpen(was => !was)} 
            >
                STATUS 
                <motion.img 
                    src={dropdown_arrow} 
                    animate={{ rotate: open ? 180 : 0, duration: 0.1 }}
                    transition={{ duration: 0.1 }}
                    style={{ marginLeft: 5, marginBottom: -5, width: 25, filter: 'invert()', cursor: 'pointer' }} 
                /> 
            </div>
            <div style={{
                margin: 10,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                backgroundColor: 'rgba(0,0,0,0.2)',
                boxShadow: 'inset 0 0 5px 5px rgba(0,0,0,0.2)',
                width: 'fit-content',
            }}>
                {open && ['All', 'Checked Out', 'Damaged', 'Reserved', 'Available', 'Requested'].map((status, index) => {
                    return <div style={{
                        cursor: 'pointer',
                        backgroundColor: status === currStatus ? 'hsl(235, 85.6%,64.7%)' : 'transparent',
                        padding: 5,
                        borderRadius: 5,
                        outline: status === currStatus ? 'none' : '1px solid hsl(235, 85.6%,64.7%)',
                        margin: 10,
                        fontSize: 22
                    }}
                    onClick={() => setStatus(status)}
                    >{status}</div>
                })}
            </div>
        </div>
    )
}