import { useState } from "react"
import { motion } from "framer-motion"
const trashcan_icon = require('../../../assets/images/trashcan_icon.webp');

export default function OptionsDisplay({ removeOption, options, changingOptions, id }){
    const [ addingOption, setAddingOption ] = useState(false)
    return<div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <span style={{ fontWeight: 'bold', fontSize: 20}}>TAGS:</span>
                {changingOptions && 
                    <div>
                        <motion.svg 
                            animate={{ rotate: addingOption ? 45 : 0 }}
                            style={{
                                backgroundColor: 'hsl(235, 85.6%,64.7%)',
                                height: 30,
                                width: 30,
                                borderRadius: '100%',
                                cursor: 'pointer',
                                marginLeft: 20
                            }}
                            onClick={() => setAddingOption(was => !was)}
                        >
                            <line x1="15" y1="5" x2="15" y2="25" stroke="white" strokeWidth="4" strokeLinecap='round' />
                            <line x1="5" y1="15" x2="25" y2="15" stroke="white" strokeWidth="4" strokeLinecap='round' />
                        </motion.svg>
                    </div>
                }
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 10,
                flexWrap: 'wrap',
            }}>
                {addingOption && <div
                    style={{
                        backgroundColor: changingOptions ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                        padding: 5, borderRadius: 5,
                        margin: 5,
                        fontSize: 22,
                        opacity: 0.8,
                        cursor: changingOptions ? 'pointer' : 'default',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <input
                        id='new_tag_input'
                        style={{
                            border: 'none',
                            width: 'calc(100% - 5px)',
                            borderRadius: 5,
                            height: 30,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            fontSize: 25,
                        }}
                        placeholder='New Tag'
                    />
                </div>}
                {options.map((option, index) => {
                    return <div key={index}
                        style={{
                            backgroundColor: changingOptions ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                            padding: 5, borderRadius: 5,
                            margin: 5,
                            fontSize: 22,
                            opacity: 0.8,
                            cursor: changingOptions ? 'pointer' : 'default',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        onClick={() => changingOptions && removeOption(id, option)}
                    >
                        {option}
                        {changingOptions && <img src={trashcan_icon} style={{ width: 20, height: 20, marginLeft: 10, }} />}
                        </div>
                })}
            </div>
    </div>
}