import { useState } from "react";
const search_icon = require("../../../assets/images/search_icon.png");

export default function SearchBar({ devices, setSerial, searching, setSearching }){
    return(
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 20
        }}>
            <img src={search_icon} alt="search" style={{ height: 30, filter: 'invert()', marginLeft: 20, cursor: 'pointer' }} 
                onClick={() => {
                    setSerial(null)
                    setSearching(was => !was)
                }}
            />
            {searching && 
                <input 
                    style={{
                        marginLeft: 10,
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        height: 30,
                        color: 'white',
                        fontSize: 20,
                    }}
                    placeholder="Serial"
                    autoFocus
                    onChange={(e) => {
                        setSerial(e.target.value)
                    }}
                />
            }
        </div>
    )
}