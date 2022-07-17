import TextInput from '../../../Components/Form/TextInput';
import SubmitButton from '../../../Components/Form/SubmitButton';

export default function CheckingOutModal({ serial, checkOut }){
    return(
        <form style={{
            width: '95%',
            margin: 'auto',
            border: '1px solid white',
            borderRadius: 5,
            padding: 10,
            textAlign: 'center',
        }}
        onSubmit={(e) => {
            e.preventDefault();
            checkOut(serial, document.getElementById('checking-out-name').value);
        }}
        >
            <h3>Checking Out</h3>
            <p>Who is this for?</p>
            <TextInput label='ENTER NAME' width='100%' id='checking-out-name' placeholder='John Doe' required={true} type='text' />
            <SubmitButton label='Check Out' />
        </form>
    )
}