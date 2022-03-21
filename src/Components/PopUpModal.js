import Popup from 'reactjs-popup';

const PopUpModal = (props) => {

    return (
        <>
        <Popup
        trigger={<button className="button">Remove</button>}    
        modal    
        nested>
        {close => (
        <div className="modal">        
        <button className="close" onClick={close}>          
        &times;        
        </button>        
        <div className="header">Are you sure?</div>        
        <div className="content">{' '}Your backronym will be permanently deleted!</div>        
        <div className="actions">          
        <Popup            
        trigger={<button className="button" onClick={() => {props.handleRemoveBackronym(props.key)}}>Yes, remove backronym</button>}            
        position="top center"            
        nested>
        </Popup>          
        <button className="button"            
        onClick={() => {console.log('modal closed ');close();}}
        >
        No, go back</button>
        </div>      
        </div>    
        )}
         </Popup>
        </>
    )
}

export default PopUpModal;