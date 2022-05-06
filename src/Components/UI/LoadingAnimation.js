import Header from '../Header.js'

const LoadingAnimation = () => {
    return (
        <div className="loadingAnimation">
            <Header />
            <div className="loadingBar">
                <div className="loadingProgress"></div>
                <p className="loadingText">Loading...</p>
            </div>  
        </div>

    )
}

export default LoadingAnimation;