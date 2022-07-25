import CategorySelect from "./CategorySelect";
import StatusSelect from "./StatusSelect";
import MakeSelect from "./MakeSelect";
import ModelSelect from "./ModelSelect";
import OwnerSelect from "./OwnerSelect";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
const filter_icon = require("../../../assets/images/filter_icon.png");

export default function Filters({ devices, category, status, setCategory, setStatus, make, setMake, model, setModel, owner, setOwner }){
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
                    maxWidth: window.innerWidth < 1080 ? 'calc(100% - 50px)' : '',
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 20,
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
                        {(category !== 'All' || status !== 'All' || make !== 'All') && <span style={{margin: '0 10px', cursor: 'pointer', fontSize: 25}}
                        onClick={() => {
                            setCategory('All');
                            setStatus('All');
                            setMake('All');
                        }}>x</span>}
                    </div>
                    <CSSTransition in={show} timeout={300} unmountOnExit classNames='modal-scale-opacity' >
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                        }}>
                            <CategorySelect devices={devices} currCategory={category} setCategory={setCategory} />
                            <StatusSelect devices={devices} currStatus={status} setStatus={setStatus} />
                            <MakeSelect devices={devices} currMake={make} setMake={setMake} />
                            <ModelSelect devices={devices} currModel={model} setModel={setModel} />
                            <OwnerSelect devices={devices} currOwner={owner} setOwner={setOwner} />
                        </div>
                        </CSSTransition>
                </div>
            </div>
    )
}