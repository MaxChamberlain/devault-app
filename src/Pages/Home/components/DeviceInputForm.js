import Form from './Form'

export default function DeviceInputForm(){
    return(
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}
        >
            <Form />
        </div>
    )
}