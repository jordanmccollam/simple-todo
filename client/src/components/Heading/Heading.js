import "./heading.scss";

const Heading = (props) => {
    return (
        <div className={`heading ${props.filled ? 'heading-filled' : ''}`}>
            {props.children}
            <div className='heading-subtext'>{props.subtext}</div>
        </div>  
    )
}

export default Heading;