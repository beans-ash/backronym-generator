// DisplayResults

const DisplayResults = (props) => {
    return(
        <div>
            {props.returnedBackronym.map(word => {
                return (
                    <p key={word}>{word}</p>
                )
            })}
        </div>
        
        )
        
}

export default DisplayResults