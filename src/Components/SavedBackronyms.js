import firebase from "./firebase.js";
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

const SavedBackronym = () => {
    const [savedBackronym, setSavedBackronym] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database)
        const backronymList = []; 

        onValue(dbRef, (response) => {
            // console.log(response.val());
            const data = response.val()
            for(let key in data) {
                backronymList.push(data[key]);
                // console.log(backronymList);
            }
            setSavedBackronym(backronymList);
        })
    }, [])
    console.log(savedBackronym);
    return (
        <>
        {savedBackronym.map(backronymArray => {
            const displayedBackronym = [...backronymArray]
            return (
                <p>{displayedBackronym.join(' ')}</p>
            )
        })}
        </>
    )
}

export default SavedBackronym;