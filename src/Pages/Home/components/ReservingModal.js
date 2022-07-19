import TextInput from '../../../Components/Form/TextInput';
import SubmitButton from '../../../Components/Form/SubmitButton';

export default function ReservingModal({ serial, checkOut }){
    return(
        <form style={{
            width: '95%',
            margin: 'auto',
            border: '1px solid white',
            borderRadius: 5,
            padding: 10,
            textAlign: 'center',
            marginBottom: 20,
        }}
        onSubmit={(e) => {
            e.preventDefault();
            checkOut(serial, document.getElementById('reserving-name').value);
        }}
        >
            <h3>Reserve for later</h3>
            <p>Who is this for?</p>
            <TextInput label='ENTER NAME' width='100%' id='reserving-name' placeholder='John Doe' required={true} type='text' />
            <SubmitButton label='Reserve' />
        </form>
    )
}