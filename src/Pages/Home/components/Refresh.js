const reload_icon = require('../../../assets/images/reload_icon.png');

export default function Refresh({ click }){
    return(
        <div style={{marginLeft: 20, cursor: 'pointer'}}>
            <img src={reload_icon} style={{ filter: 'invert()', width: 30, height: 30 }} onClick={click} />
        </div>
    )
}