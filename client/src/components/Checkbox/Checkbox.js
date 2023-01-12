import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import {BsCheck2All} from 'react-icons/bs';
import './checkbox.scss';

const Checkbox = (props) => {
    return (
        <div className={`checkbox`} >
            {props.checked ? (
                <BsCheck2All className={`checkbox-icon`} />
            ) : (
                <AiFillCheckCircle className={`checkbox-icon`} />
            )}
        </div>
    )
}

export default Checkbox;