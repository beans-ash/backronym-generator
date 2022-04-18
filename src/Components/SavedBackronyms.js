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
                backronymList.push({key: key, backronym: data[key]});
                console.log(key);
                console.log(data[key]);
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

    return (
        <section className="savedBackronyms wrapper">
            {savedBackronym.length !== 0
            ?
            savedBackronym.map((backronymObject, index) => {
                // const displayedBackronym = [...backronymObject.backronym]
                return (
                    <Card key={backronymObject.key}>
                        {/* <p>{displayedBackronym.join(' ')}</p> */}
                        <p>{backronymObject.backronym.index}</p>
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