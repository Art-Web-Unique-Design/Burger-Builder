import React from 'react';
import classes from './Button.css';

const button = (props) => {
    let classesArr = [classes.Button, classes[props.btnType]];
    if (props.btnClasses) {
        classesArr = classesArr.concat(props.btnClasses);
    }
    return (
        <button
            disabled={props.disabled}
            className={classesArr.join(' ')}
            onClick={props.clicked}>{props.children}
        </button>
    )
}


export default button;