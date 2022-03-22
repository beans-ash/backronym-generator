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

    return(
        <div>
            {props.returnedBackronym.map(word => {
                return (
                    <p key={word}>{word}</p>
                )
            })}
            {props.returnedBackronym.length > 0 && <button onClick={handleSave}>Save</button>}
        </div>
    )
}

export default DisplayResults