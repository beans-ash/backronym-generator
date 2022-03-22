import firebase from "./firebase.js";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopUpModal from "./PopUpModal.js";

const SavedBackronym = () => {
    const [savedBackronym, setSavedBackronym] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database) 
        let abortController = new AbortController();
        
        onValue(dbRef, (response) => {  
            const backronymList = [];
            // console.log(response.val());
            const data = response.val()
            for(let key in data) {
                backronymList.push({key: key, backronym: data[key]});
                // console.log(backronymList);
            }
            setSavedBackronym(backronymList);
            // console.log(backronymList);
        })
        abortController.abort();
    }, [])
    
    const handleRemoveBackronym = (backronymId) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${backronymId}`);
        remove(dbRef);
    }

    return (
        <>
        {savedBackronym.map(backronymObject => {
            const displayedBackronym = [...backronymObject.backronym]
            return (
                <div key={backronymObject.key}>
                    <p>{displayedBackronym.join(' ')}</p>
                    <PopUpModal handleRemoveBackronym={handleRemoveBackronym} id={backronymObject.key}></PopUpModal>
                    {/* <button onClick={() => {handleRemoveBackronym(backronymObject.key)}}>Remove</button> */}
                </div>
            )
        })}
        <Link to='/'>Return Home</Link>
        </>
    )
}

export default SavedBackronym;