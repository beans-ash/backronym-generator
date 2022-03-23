// DisplayResults
import firebase from './firebase.js';
import { getDatabase, ref, push } from 'firebase/database';

const DisplayResults = (props) => {

    const handleSave = (event) => {
        event.preventDefault();
        // create reference to database
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        // push saved backronym to the database
        push (dbRef, props.returnedBackronym);
    }

    const returnedBackronymString = [...props.returnedBackronym]

    return(
        <div>
            <p>{returnedBackronymString.join(' ')}</p>
            {props.returnedBackronym.length > 0 && <button onClick={handleSave}>Save</button>}
        </div>
    )
}

export default DisplayResults