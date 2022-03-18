// UserInput.js
import { useState } from 'react';
import axios from 'axios';
import DisplayResults from './DisplayResults';
import { Link } from 'react-router-dom';

const UserInput = ()=> {

    const [userInput, setUserInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [returnedBackronym, setReturnedBackronym] = useState([]);

    const handleInput = (event) => {
        setUserInput(event.target.value.trim());   
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(userInput);
        // setUserInput('');
        search(userInput);
    }

    const search = (enteredSearchTerm, returnedWord = searchTerm) => {
        if(enteredSearchTerm !== '') {
            const arrayOfLetters = [...enteredSearchTerm];
            if (arrayOfLetters.length >= 3) {
                const request = arrayOfLetters.map(letter => {
                    return axios({
                        method: 'GET',
                        url: 'https://api.datamuse.com/words?',
                        responseType: 'json',
                        params: {
                            ml: returnedWord,
                            sp: `${letter}*`
                        }
                    })
                        .then((res) => {
                            console.log(res)
                            const returnedFilteredArray = res.data.filter(wordObj => wordObj.word.length > 1 && !wordObj.word.includes(' '))
                            return returnedFilteredArray;
                        });
                })
                const randomizer = (array) => {
                    const index = Math.floor(Math.random() * array.length);
                    returnedWord = array[index].word;
                    console.log(returnedWord)
                    return (array[index]);
                }


                Promise.all(request)
                    .then((jsonData) => {
                        const backronymArray = [];
                        jsonData.forEach((wordArray) => {
                            const randomWord = randomizer(wordArray);
                            backronymArray.push(randomWord.word);
                        })
                        setReturnedBackronym(backronymArray);
                    }
                );
            }
        }
    }
    console.log(returnedBackronym)

    return(
        <>
        <h2></h2>
        <p></p>
        {searchTerm !== '' && searchTerm.length < 3 && <p>Oops - please enter a word with 3 or more letters</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="userInput">Enter Backronym</label>
            <input onChange={handleInput} type="text" id="userInput" value={userInput}/>
            <button>Search</button>
        </form>

        <DisplayResults returnedBackronym={returnedBackronym} />
        <Link to='/saved'>View your Saved Results</Link>
        </>
    )
}

export default UserInput