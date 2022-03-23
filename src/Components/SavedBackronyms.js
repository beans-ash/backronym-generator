import firebase from "./firebase.js";
import { getDatabase, ref, onValue, remove, onDisconnect } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopUpModal from "./PopUpModal.js";

const SavedBackronym = () => {
    const [savedBackronym, setSavedBackronym] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database) 
        
        onValue(dbRef, (response) => {  
            const backronymList = [];
            const data = response.val()
            for(let key in data) {
                backronymList.push({key: key, backronym: data[key]});
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
        <>
            {savedBackronym.length !== 0
            ?
            savedBackronym.map(backronymObject => {
                const displayedBackronym = [...backronymObject.backronym]
                return (
                    <div key={backronymObject.key}>
                        <p>{displayedBackronym.join(' ')}</p>
                        <PopUpModal handleRemoveBackronym={handleRemoveBackronym} id={backronymObject.key}></PopUpModal>
                    </div>
                )
            })
            :
            <p>Please return to home page to save a backronym</p>
        }
        <Link to='/'>Return Home</Link>
        </>
    )
}

export default SavedBackronym;