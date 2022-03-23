// UserInput.js
import { useState } from 'react';
import axios from 'axios';
import DisplayResults from './DisplayResults';
import { Link } from 'react-router-dom';

const UserInput = () => {

    const [userInput, setUserInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [returnedBackronym, setReturnedBackronym] = useState([]);
    const [networkError, setNetworkError] = useState(false);

    const handleInput = (event) => {
        setUserInput(event.target.value.trim());   
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(userInput);
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
                        if(res.statusText === 'OK') {
                            setNetworkError(false);
                            const returnedFilteredArray = res.data.filter(wordObj => wordObj.word.length > 1 && !wordObj.word.includes(' '))
                            return returnedFilteredArray;
                        } else {
                            throw new Error();
                        }
                    }).catch((err) => {
                        if (err) {
                            setNetworkError(true);
                        }
                    });
                })
                const randomizer = (array) => {
                    const index = Math.floor(Math.random() * array.length);
                    returnedWord = array[index].word;
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

    return(
        <>
        <h2>How to Use</h2>
        <p>Enter your word below and hit search! If you like what you see hit save, and if not, hit the search button again.</p>
        {searchTerm !== '' && searchTerm.length < 3 && <p>Oops - please enter a word with 3 or more letters</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="userInput">Enter Backronym</label>
            <input onChange={handleInput} type="text" id="userInput" value={userInput}/>
            <button>Search</button>
        </form>

        {networkError && <p>Sorry, something went wrong please try again.</p>}

        <DisplayResults returnedBackronym={returnedBackronym} />
        <Link to='/saved'>View your Saved Results</Link>
        </>
    )
}

export default UserInput