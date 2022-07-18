import { useState } from "react"

export default function MoreOptions(){
    const [ isOpen, setIsOpen ] = useState(false)
    
    return(
        <div style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: 5,
            fontSize: 25,
            cursor: 'pointer',
            margin: 10,
            marginBottom: 40
        }}
        onClick={() => setIsOpen(was => !was)}
        >
            {isOpen ? 'Close' : 'More Options...'}
        </div>
    )
}