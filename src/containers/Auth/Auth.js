import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

const validStateFuncCreation = (elementConf, validation = { required: true }, valid = false, value = '', elType = 'input', touched = false) => {
    return ({
        elementType: elType,
        elementConfig: { ...elementConf },
        value: value,
        validation: { ...validation },
        valid: valid,
        touched: touched
    });
}

class Auth extends Component {
    state = {
        controls: {
            email: validStateFuncCreation({ type: 'email', placeholder: 'Mail Address' },
                { required: true, isEmail: true }),
            password: validStateFuncCreation({ type: 'password', placeholder: 'Password' },
                { required: true, minLength: 6 })
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.id}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        console.log(this.props.error);

        // Firebase Backend returns error(Object) with a message prop
        if (this.props.error) {
            let msg = '';
            switch (this.props.error.message) {
                case 'EMAIL_EXISTS':
                    msg = "This email address already exists.";
                    break;
                case "OPERATION_NOT_ALLOWED":
                    msg = "Password sign-in is disabled."
                    break;
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    msg = "Due to unusual activity we blocked your login. Try again later."
                    break;
                case "TOKEN_EXPIRED":
                    msg = "Please sign in again!";
                    break;
                case "USER_DISABLED":
                    msg = "Your account was blocked by administrator.";
                    break;
                case "USER_NOT_FOUND":
                    msg = "Your account was not found.";
                    break;
                case "INVALID_REFRESH_TOKEN":
                    msg = "An invalid refresh token is provided.";
                    break;
                case "INVALID_GRANT_TYPE":
                    msg = "The grant type specified is invalid.";
                    break;
                case "MISSING_REFRESH_TOKEN":
                    msg = "No refresh token provided.";
                    break;
                case "INVALID_PASSWORD":
                    msg = "Password is invalid.";
                    break;
            }
            errorMessage = (
                <p>{msg}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN_IN' : 'SIGN_UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);