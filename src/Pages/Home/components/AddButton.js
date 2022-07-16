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
                    position: "absolute",
                    top: 10,
                    right: 20,
                    zIndex: 100,
                    backgroundColor: 'hsl(235, 85.6%,64.7%)',
                    height: 50,
                    width: 50,
                    borderRadius: '100%',
                    cursor: 'pointer',
                }}
                onClick={() => setAdding(was => !was)}
            >
                <line x1="25" y1="10" x2="25" y2="40" stroke="white" strokeWidth="5" strokeLinecap='round' />
                <line x1="10" y1="25" x2="40" y2="25" stroke="white" strokeWidth="5" strokeLinecap='round' />
            </motion.svg>
            {adding && <DeviceInputForm />}
        </div>
    )
}