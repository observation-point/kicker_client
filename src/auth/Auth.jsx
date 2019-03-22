import React, { useState } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import Field from './Field';
import Config from '../config/config';

const apiUrl = Config.api_url;

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignIn: false,
            login: '',
            firstName: '',
            secondName: '',
            password: ''
        };
    }

    async send() {
        const { isSignIn, login, firstName, secondName, password } = this.state;

        if (!isSignIn) {
            const { data } = await axios({
                method: 'post',
                url: `${apiUrl}/auth/${login}`,
                withCredentials: true,
                data: {
                    password: password
                }
            });

            this.props.onLogin(data.user);
        } else {
            const { data } = await axios({
                method: 'post',
                url: `${apiUrl}/user`,
                withCredentials: true,
                data: {
                    id: v4(),
                    login: login,
                    password: password,
                    firstName: firstName,
                    lastName: secondName
                }
            });

            this.props.onLogin(data.user);
        }
    }

    render() {
        const { isSignIn, login, firstName, secondName, password } = this.state;

        return (<div className='auth_root'>
            <div className='auth_togglerWrapper'>
                <div
                    onClick={() => {this.setState({isSignIn: true})}}
                    style={isSignIn ? {fontWeight: 'bold'} : null}
                    className='auth_toggler'
                >
                    Sign in
                </div>
                <div
                    onClick={() => {this.setState({isSignIn: false})}}
                    style={!isSignIn ? {fontWeight: 'bold'} : null}
                    className='auth_toggler'
                >
                    Sign up
                </div>
            </div>
            { isSignIn ? (
                    <div className='auth_reg'>
                        <Field
                            title='login'
                            value={login}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                        <Field
                            title='first name'
                            value={firstName}
                            onChange={(event) => {this.setState({firstName: event.target.value})}}
                        />
                        <Field
                            title='second name'
                            value={secondName}
                            onChange={(event) => {this.setState({secondName: event.target.value})}}
                        />
                        <Field
                            title='password'
                            value={password}
                            type={'password'}
                            onChange={(event) => {this.setState({password: event.target.value})}}
                        />
                    </div>
                )
                : (
                    <div className='auth_reg'>
                        <Field
                            title='login'
                            value={login}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                        <Field
                            title='password'
                            value={password}
                            type={'password'}
                            onChange={(event) => {this.setState({password: event.target.value})}}
                        />
                    </div>
                )
            }
            <button onClick={this.send.bind(this)}>
                send
            </button>
        </div>);
    }
}

const Auth2 = props => {
    const [state, setState] = useState({
        authPage: 'reg',
        login: '',
        firstName: '',
        lastName: '',
        pass: ''
    });

    const onLoginChange = (event) => {
        const target = event.nativeEvent ? event.nativeEvent.target : event.target;

        setField('login', target.value);
    }

    const onFirstNameChange = (event) => {
        const target = event.nativeEvent ? event.nativeEvent.target : event.target;

        setField('firstName', target.value);
    }

    const onSecondNameChange = (event) => {
        const target = event.nativeEvent ? event.nativeEvent.target : event.target;

        setField('secondName', target.value);
    }

    const onPassChange = (event) => {
        const target = event.nativeEvent ? event.nativeEvent.target : event.target;

        setField('pass', target.value);
    }

    const setField = (fieldName, fieldValue) => {
        setState((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    }

    const send = async() => {

        let apiUrl = Config.api_url;
        let res;

        if (state.authPage === 'reg') {
            res = await axios.post(apiUrl + '/user', {
                id: v4(),
                login: state.login,
                password: state.pass,
                firstName: state.firstName,
                lastName: state.lastName
            });
        } else {
            res = await axios.post(`${apiUrl}/auth/${state.login}`, {
                password: state.pass
            });
        }

        // props.authentificate(res.data.user);
    }

    return (
        <div className='auth_root'>
            <div className='auth_togglerWrapper'>
                <div
                    onClick={() => setField('authPage', 'auth')}
                    style={state.authPage === 'auth' ? {fontWeight: 'bold'} : {} }
                    className='auth_toggler'
                >
                    auth
                </div>
                <div
                    onClick={() => setField('authPage', 'reg')}
                    style={state.authPage === 'reg' ? {fontWeight: 'bold'} : {} }
                    className='auth_toggler'
                >
                    reg
                </div>
            </div>
            {state.authPage === 'reg'
                ? (
                    <div className='auth_reg'>
                        <Field
                            title='login'
                            value={state.login}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                        <Field
                            title='first name'
                            value={state.firstName}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                        <Field
                            title='second name'
                            value={state.secondName}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                        <Field
                            title='password'
                            value={state.password}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                    </div>
                )
                : (
                    <div className='auth_reg'>
                        <Field
                            title='login'
                            value={state.login}
                            onChange={onLoginChange}
                        />
                        <Field
                            title='password'
                            value={state.pass}
                            onChange={onPassChange}
                        />
                    </div>
                )
            }

            <button onClick={() => send()}>
                send
            </button>
        </div>
    );
}

export default Auth;
