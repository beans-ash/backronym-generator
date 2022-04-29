// import Popup from 'reactjs-popup';
import Button from './UI/Button';
import Card from './UI/Card';


const ErrorModal = (props) => {

    return (  
        <div className='errorPopup'>        
            <Card className="modal">
                <p className="content">Please try again! Can only contain letters a-z.</p>
                {/* <div className="actions"> */}
                <Button className='actionsButton' onClick={() => {props.setErrorPopup(false); }}>Okay</Button>
                {/* </div> */}
            </Card>
        </div>
    )
}

export default ErrorModal;