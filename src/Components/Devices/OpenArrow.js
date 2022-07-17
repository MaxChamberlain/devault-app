import { motion } from "framer-motion"
const dropdown_arrow = require("../../assets/images/dropdown_arrow.png")

export default function OpenArrow({ click, isActive }){
    return(
        <motion.img src={dropdown_arrow} style={{
            position: 'absolute',
            bottom: 5,
            width: 30,
            filter: 'invert()',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
        }} 
        onClick={() => click(was => !was)}
        animate={{ rotate: isActive ? 180 : 0 }}
        />
    )
}