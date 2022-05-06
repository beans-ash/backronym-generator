import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DisplayResults from './DisplayResults';
import Card from './UI/Card';
import Button from './UI/Button';
import ErrorModal from './ErrorModal';

const UserInput = () => {
    const [userInput, setUserInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [returnedBackronym, setReturnedBackronym] = useState([]);
    const [networkError, setNetworkError] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false)

    const handleInput = (event) => {
        console.log(event.target.value)
        setUserInput(event.target.value.trim());   
    };

    const inputCheck = (input) => {
        const regex = new RegExp(/^[A-Za-z]+$/)
        const check = regex.test(input)
        if(check) {
            setSearchTerm(input)
            search(input)
        } else {
            setErrorPopup(true)
            setUserInput('')
            setReturnedBackronym([])
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        inputCheck(userInput)
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
        <main className="wrapper">
            <section className="userInput">
                <h2>How to Use</h2>
                <p>Enter your word below and hit search! If you like the Backronym hit save, if not search again.</p>
                {searchTerm !== '' && searchTerm.length < 3 && <p>Oops - please enter a word with 3 or more letters</p>}
                <Card className='form'>
                    <form  onSubmit={handleSubmit}>
                        <label htmlFor="userInput">Enter a Word</label>
                        <input onChange={handleInput} type="text" id="userInput" value={userInput}/>
                        <Button className='searchButton' >Search</Button>

                    </form>
                </Card>
                {networkError && <p>Sorry, something went wrong please try again.</p>}
            </section>

            <section className="results">
                        
            {returnedBackronym.length !== 0  &&
                <DisplayResults returnedBackronym={returnedBackronym} savedSearchTerm={searchTerm} />
            }    
            <Link to='/saved'>View your Saved Results
                <div>
                    <FontAwesomeIcon icon={faChevronRight} aria-label="hidden" className="first"/>
                    <FontAwesomeIcon icon={faChevronRight} aria-label="hidden" className="second"/>
                    <FontAwesomeIcon icon={faChevronRight} aria-label="hidden" className="third"/>
                </div>
            </Link>
            </section>

            <section>
              {errorPopup === true ? <ErrorModal errorPopup={errorPopup} setErrorPopup={setErrorPopup} setUserInput={setUserInput} /> : null}
            </section>

        </main>
    )
}

export default UserInput