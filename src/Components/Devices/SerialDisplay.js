import useCopy from '../../Hooks/useCopy';
const copy_icon = require('../../assets/images/copy_icon.png');
const checkmark = require('../../assets/images/checkmark.webp');

export default function SerialDisplay({ serial }){
    const [ copied, copy ] = useCopy();
    
    return(
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'calc(100% + 20px)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                fontSize: 15,
                padding: '2px 0',
                borderRadius: 5,
                position: 'relative',
                cursor: 'pointer',
                opacity: 0.7,
                marginBottom: 10,
                marginLeft: -10,
                marginTop: -10,
            }}
            onClick={() => copy(serial)}
        >
            {copied ? 'Serial Copied!' : `SN ${serial}`}
            <img src={copied ? checkmark : copy_icon} style={{
                position: 'absolute',
                right: 5,
                top: 5,
                cursor: 'pointer',
                width: 15,
                height: 15,
                filter: 'invert()',
            }} onClick={copy} />
        </div>
    )
}