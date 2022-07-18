import { useState } from "react"

export default function MoreOptions({ id, deleteItem }){
    const [ isOpen, setIsOpen ] = useState(false)
    const [ changingCategory, setChangingCategory ] = useState(false)
    const [ newCategory, setNewCategory ] = useState(null)
    
    return(
        <div style={{
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
        >
            <div style={{
                padding: 5,
                borderRadius: 5,
                width: '95%',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'rgba(0,0,0,0.2)',
                margin: 10,
                marginTop: 0,
                marginBottom: 0
            }}
            onClick={() => setIsOpen(was => !was)}
            >
                {isOpen ? 'Close' : 'More Options...'}
            </div> 
            {isOpen && <div style={{
                padding: 5,
                borderRadius: 5,
                width: '95%',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'rgba(0,0,0,0.2)',
                margin: 5,
                marginTop: 10,
            }}
            onClick={() => setChangingCategory(was => !was)}>
                {changingCategory ? 
                    <input 
                        style={{
                            border: 'none',
                            width: 'calc(100% - 5px)',
                            borderRadius: 5,
                            height: 30,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            fontSize: 25,
                            textAlign: 'center',
                        }}
                        placeholder="Category"
                        autoFocus
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                :
                    'Change Category'
                }
                
            </div> 
            }
            {isOpen && <div style={{
                padding: 5,
                borderRadius: 5,
                width: '95%',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'rgb(176, 51, 42)',
                margin: 5,
                marginTop: 10,
            }}
            onClick={() => deleteItem(id)}>
                Delete Item
            </div> 
            }
        </div>
    )
}