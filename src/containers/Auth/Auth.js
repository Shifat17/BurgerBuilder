import React, { Component } from 'react';
import Input from '../../components/Layout/UI/Input/Input';
import { connect } from 'react-redux';
import Button from '../../components/Layout/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import classes from './Auth.css';
import { auth, setAuthRedirectPath } from '../../store/actions/auth';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utilities';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      return this.props.onSetAuthRedirect();
    }
  }

  inputChangedHandler = (event, controleName) => {
    const updateControls = {
      ...this.state.controls,
      [controleName]: {
        ...this.state.controls[controleName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controleName].validation
        ),
        touched: true,
      },
    };

    this.setState({ controls: updateControls });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthMethodHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        inValid={!formElement.config.valid}
        shouldValid={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <br />
        <Button btnType="Danger" clicked={this.switchAuthMethodHandler}>
          Switch to {!this.state.isSignup ? 'SignUp' : 'SignIn'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(auth(email, password, isSignup));
    },
    onSetAuthRedirect: () => {
      return dispatch(setAuthRedirectPath('/'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
