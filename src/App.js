import './styles/App.css';
import SavedBackronym from './Components/SavedBackronyms';
import UserInput from './Components/UserInput';
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';


const App = () => {
  return (
    <div className="App"> 
      <Header /> 
      <Routes>
        <Route path='/' element={<UserInput /> } />
        <Route path='/saved' element={<SavedBackronym /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// Component to capture user's input
  // Input can only contain letters from A-Z, transform input to lowercase
  // Display error to user for entering number/symbol/spaces ///// maybe prevent user from putting in anything but letters
  // maybe limit word length?
  // use spread operator to capture each letter of user's word
  // save letters in an array
  // set array into state

// Component for API call to data muse
  // use forEach() on saved array from user input
  //on submit, API call for first letter (ie index 0 of array) 
  //returned word is save in a new array for backronym, and also saved in a variable
  // subsequent API call with remaining letters, each returned word is saved in backronym array and as a variable for subsequent API call
  // once letter array length === backronym array length, set backronym  array into state

// Component to display backronym 
  // props from results in API component will be displayed
  // save button to add backronym to Firebase 

// Component for Firebase
  // Display user's input and associated saved backronyms
  // Option to delete a backronym from list
  // Conditional rendering -> if there are no saved backronym, display message
