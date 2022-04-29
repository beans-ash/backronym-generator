import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from './UI/Button';
import Card from './UI/Card';

const PopUpModal = (props) => {

    return (
      
        <Popup
            trigger={<Button className='removeButton'><FontAwesomeIcon icon={faTrashCan} aria-label='Remove'/></Button>}     
            modal    
            nested>
                {close => (
                    <Card className="modal">                    
                        <p className="header">Are you sure?</p>        
                        <p className="content">Your backronym will be permanently deleted!</p>        
                        <div className="actions">                
                            <Button className='actionsButton' onClick={() => {props.handleRemoveBackronym(props.id);}}>Yes, please</Button>             
                            <Button className='actionsButton' onClick={() => {close();}}>No, go back</Button>
                        </div>      
                    </Card>       
                   
                )}
        </Popup>
    )
}

export default PopUpModal;