import { useState } from "react"
import { motion } from "framer-motion"
import DeviceInputForm from "./DeviceInputForm"

export default function AddButton(){
    const [ adding, setAdding ] = useState(false);

    return(
        <div>
            <motion.svg 
                animate={{ rotate: adding ? -45 : 0 }}
                style={{
                    position: "fixed",
                    top: 55,
                    right: 20,
                    zIndex: 100,
                    backgroundColor: 'hsl(235, 85.6%,64.7%)',
                    height: 40,
                    width: 40,
                    borderRadius: '100%',
                    cursor: 'pointer',
                }}
                onClick={() => setAdding(was => !was)}
            >
                <line x1="20" y1="5" x2="20" y2="35" stroke="white" strokeWidth="5" strokeLinecap='round' />
                <line x1="5" y1="20" x2="35" y2="20" stroke="white" strokeWidth="5" strokeLinecap='round' />
            </motion.svg>
            {adding && <DeviceInputForm />}
        </div>
    )
}