import TextInput from '../../../Components/Form/TextInput';
import SubmitButton from '../../../Components/Form/SubmitButton';

export default function CheckingOutModal({ _id, setDamage }){
    return(
        <form style={{
            width: '95%',
            margin: 'auto',
            border: '1px solid white',
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 20,
        }}
        onSubmit={(e) => {
            e.preventDefault();
            setDamage(_id, document.getElementById('damage-description').value);
        }}
        >
            <h3>Set Damage</h3>
            <p>Provide a damage description</p>
            <TextInput label='ENTER DESCRIPTION' width='100%' id='damage-description' placeholder='Description' required={true} type='text' />
            <SubmitButton label='Submit Status' />
        </form>
    )
}