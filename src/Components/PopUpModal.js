import Popup from 'reactjs-popup';
import firebase from "./firebase.js";
import { getDatabase, ref, onValue, remove } from 'firebase/database';

const PopUpModal = (props) => {

    return (
      
        <Popup
            trigger={<button className="button">Remove</button>}    
            modal    
            nested>
                {close => (
                <div className="modal">        
                    <p className="header">Are you sure?</p>        
                    <p className="content">Your backronym will be permanently deleted!</p>        
                    <div className="actions">                
                        <button className="button" onClick={() => {props.handleRemoveBackronym(props.id);}}>Yes, remove backronym</button>             
                        <button className="button" onClick={() => {close();}}>No, go back</button>
                    </div>      
                </div>    
                )}
        </Popup>
    )
}

export default PopUpModal;