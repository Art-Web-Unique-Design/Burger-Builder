import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.touched && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>
            Please enter a correct {props.valueType}!
                          </p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed} />;
            break;

        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed} />;
            break;

        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    )}
                </select>
            );
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig} />
    }

    return (
        <div className={classes.Input}>
            {validationError}
            {inputElement}
        </div>
    );

};

export default input;