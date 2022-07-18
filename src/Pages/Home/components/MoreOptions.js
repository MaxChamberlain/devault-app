import { CSSTransition } from "react-transition-group"
import { useState, useRef } from "react"
import html2canvas from 'html2canvas';


export default function MoreOptions({ serial, id, deleteItem, changeCategory }){
    const [ isOpen, setIsOpen ] = useState(false)
    const [ changingCategory, setChangingCategory ] = useState(false)
    const [ newCategory, setNewCategory ] = useState(null)
    const [ confirm, setConfirm ] = useState(false)
    
    const printRef = useRef();

    const handleDownloadImage = async () => {
    
        const element = printRef.current;
        const canvas = await html2canvas(element);
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === 'string') {
          link.href = data;
          link.download = 'image.jpg';
    
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      };
    
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
                backgroundColor: changingCategory ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)',
                margin: 10,
                marginTop: 0,
                marginBottom: 0
            }}
            onClick={!changingCategory ? () => setIsOpen(was => !was) : () => {
                changeCategory(id, newCategory)
                setChangingCategory(false)
                setNewCategory(null)
            }}
            >
                {isOpen ? changingCategory ? 'Save' : 'Close' : 'More Options...'}
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
                backgroundColor: 'rgba(0,0,0,0.2)',
                margin: 5,
                marginTop: 10,
            }}
            onClick={handleDownloadImage}
            >
                Download Barcode
            </div> 
            }
            <div style={{
                padding: 10,
                backgroundColor: 'white',
                color: 'black',
                fontSize: 10,
                textAlign: 'center',
                zIndex: -1,
                position: 'absolute',
            }}
            ref={printRef}
            >
                <div style={{ fontFamily: 'code128', width: '100%', fontSize: 40 }}>{serial}</div>
                {serial}
            </div>
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
            onClick={confirm ? () => deleteItem(id) : () => {
                setConfirm(3)
                setTimeout(() => setConfirm(2), 1000)
                setTimeout(() => setConfirm(1), 2000)
                setTimeout(() => setConfirm(false), 3000)
            }}>
                {confirm ? `Confirm (${confirm})` : 'Delete'}
            </div> 
            }
        </div>
    )
}