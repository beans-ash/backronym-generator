import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from './UI/Button';

const PopUpModal = (props) => {

    return (
      
        <Popup
            trigger={<Button className='removeButton'><FontAwesomeIcon icon={faTrashCan} aria-label='Remove'/></Button>}    
            modal    
            nested>
                {close => (
                <div className="modal">        
                    <p className="header">Are you sure?</p>        
                    <p className="content">Your backronym will be permanently deleted!</p>        
                    <div className="actions">                
                        <Button onClick={() => {props.handleRemoveBackronym(props.id);}}>Yes, remove backronym</Button>             
                        <Button onClick={() => {close();}}>No, go back</Button>
                    </div>      
                </div>    
                )}
        </Popup>
    )
}

export default PopUpModal;