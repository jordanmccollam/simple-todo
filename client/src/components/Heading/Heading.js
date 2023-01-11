import "./heading.scss";

const Heading = (props) => {
    return (
        <div className={`heading ${props.filled ? 'heading-filled' : ''}`}>
            {props.children}
        </div>  
    )
}

export default Heading;