import CategorySelect from "./CategorySelect";
import StatusSelect from "./StatusSelect";
import { useState } from "react";

const filter_icon = require("../../../assets/images/filter_icon.png");

export default function Filters({ devices, category, status, setCategory, setStatus }){
    const [ show, setShow ] = useState(false);
    return(
        <div>
            <div style={{
                marginLeft: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: 'column',
                cursor: "pointer",
                border: "1px solid #ccc",
                width: 'fit-content',
                padding: 5,
                borderRadius: 5,
                fontSize: 20,
                maxWidth: '95vw'
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                    onClick={() => setShow(was => !was)}
                    >
                        Filters
                        <img src={filter_icon} alt="filter" style={{ height: 30, filter: 'invert()' }} />
                    </div>
                    {(category !== 'All' || status !== 'All') && <span style={{margin: '0 10px', cursor: 'pointer', fontSize: 25}}
                    onClick={() => {
                        setCategory('All');
                        setStatus('All');
                    }}>x</span>}
                </div>
                {show && <>
                    <CategorySelect devices={devices} currCategory={category} setCategory={setCategory} />
                    <StatusSelect devices={devices} currStatus={status} setStatus={setStatus} />
                </>}
            </div>
        </div>
    )
}