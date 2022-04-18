// DisplayResults
import firebase from './firebase.js';
import { getDatabase, ref, push } from 'firebase/database';
import Card from './UI/Card.js';

const DisplayResults = (props) => {
    
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
        // push saved backronym to the database
        push (dbRef, savedBackronym);
    }
    const returnedBackronymString = props.returnedBackronym.join(' ');

    return(
        <Card className="wrapper">
            <p>{returnedBackronymString}</p>
            {props.returnedBackronym.length > 0 && <button onClick={handleSave}>Save</button>}
        </Card>
    )
}

export default DisplayResults