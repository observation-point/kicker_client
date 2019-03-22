import React, { useState } from 'react';
import axios from 'axios';
import { v4 } from 'uuid'

import Field from './Field';

const Auth = props => {
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

        let apiUrl = 'http://0.0.0.0:8888/api';
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

        props.authentificate(res.data.user);
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
                            onChange={onLoginChange}
                        />
                        <Field
                            title='first name'
                            value={state.firstName}
                            onChange={onFirstNameChange}
                        />
                        <Field
                            title='second name'
                            value={state.secondName}
                            onChange={onSecondNameChange}
                        />
                        <Field
                            title='password'
                            value={state.pass}
                            onChange={onPassChange}
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
