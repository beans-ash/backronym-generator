import firebase from "./firebase.js";
import { getDatabase, ref, onValue, remove, onDisconnect } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopUpModal from "./PopUpModal.js";
import Card from './UI/Card.js';

const SavedBackronym = (props) => {
    const [savedBackronym, setSavedBackronym] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database) 
        
        onValue(dbRef, (response) => {  
            const backronymList = [];
            const data = response.val()
            for(let key in data) {
                backronymList.push({key: key, backronym: data[key].backronym, userInput: data[key].userInput});
            }
            setSavedBackronym(backronymList);
        })
        return () => {onDisconnect(dbRef)}
    }, [])
    const handleRemoveBackronym = (backronymId) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${backronymId}`);
        remove(dbRef);
    }

    console.log(savedBackronym)
    return (
        <section className="savedBackronyms wrapper">
            {savedBackronym.length !== 0
            ?
            savedBackronym.map((backronymObject) => {
                console.log(backronymObject)

                return (
                    <Card className='savedBackronym' key={backronymObject.key}>
                        <p>{backronymObject.userInput}:</p>
                        <p>{backronymObject.backronym}</p>
                        <PopUpModal handleRemoveBackronym={handleRemoveBackronym} id={backronymObject.key}></PopUpModal>
                    </Card>
                )
            })
            :
            <p>Please return to home page to save a backronym</p>
            }
        <Link to='/'>Return Home</Link>
        </section>
    )
}

export default SavedBackronym;