import { TransitionGroup } from 'react-transition-group'
import Form from './Form'

export default function DeviceInputForm(){
    return(
        <TransitionGroup component='div'
            style={{
                position: "absolute",
                top: 20,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 20,
            }}
        >
            <Form />
        </TransitionGroup>
    )
}