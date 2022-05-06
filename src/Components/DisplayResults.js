import firebase from './firebase.js';
import { getDatabase, ref, push } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Card from './UI/Card.js';
import Button from './UI/Button.js';

const DisplayResults = (props) => { 
    const returnedBackronymString = props.returnedBackronym.join(' ');
    const handleSave = (event) => {
        event.preventDefault();
        // created object to store user input and corresponding backronym
        let savedBackronym = {userInput: '', backronym: ''};
        const searchTerm = props.savedSearchTerm;
        savedBackronym.userInput = searchTerm
        savedBackronym.backronym = returnedBackronymString;
        // create reference to database
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        // push saved backronym object (includes userInput and returned Backronym) to the database
        push (dbRef, savedBackronym);
    }

    return(
        <Card className='showResults' >
            <p>{returnedBackronymString}</p>
            {props.returnedBackronym.length > 0 && <Button className='saveButton' onClick={handleSave}><FontAwesomeIcon icon={faFloppyDisk} aria-label='Save'/></Button>}
        </Card>
    )
}

export default DisplayResults