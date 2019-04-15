import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Field from './Field';
import Config from '../config/config';
import "./Auth.css";

const apiUrl = Config.api_url;

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignIn: true,
            login: '',
            fullname: '',
            password: ''
        };
    }

    async send() {
        const { isSignIn, login, fullname, password } = this.state;

        if (isSignIn) {

            const { data } = await axios({
                method: 'post',
                url: `${apiUrl}/auth/login/${login}`,
                withCredentials: true,
                data: {
                    password: password
                }
            });

            this.props.onLogin(data.user);
            this.props.history.push('/');

        } else {
            const { data } = await axios({
                method: 'post',
                url: `${apiUrl}/user`,
                withCredentials: true,
                data: {
                    login: login,
                    password: password,
                    fullname: fullname
                }
            });

            this.props.onLogin(data.user);
        }
    }

    render() {
        const { isSignIn, login, fullname, password } = this.state;

        const classButton = isSignIn ? 'button_signin' : 'button_signup';

        return (<div className='auth_root'>
            <div className='auth_togglerWrapper'>
                <div
                    onClick={() => {this.setState({isSignIn: true})}}
                    style={isSignIn ? {fontWeight: 'bold'} : null}
                    className='auth_toggler'
                >
                    sign in
                </div>
                <div
                    onClick={() => {this.setState({isSignIn: false})}}
                    style={!isSignIn ? {fontWeight: 'bold'} : null}
                    className='auth_toggler'
                >
                    sign up
                </div>
            </div>
            <div className='auth_table'>
            { !isSignIn ? (
                    <div className='auth_reg'>
                        <Field
                            title='login *'
                            value={login}
                            onChange={(event) => {this.setState({login: event.target.value})}}
                        />
                        <Field
                            title='fullname'
                            value={fullname}
                            onChange={(event) => {this.setState({fullname: event.target.value})}}
                        />
                        <Field
                            title='password *'
                            value={password}
                            type={'password'}
                            onChange={(event) => {this.setState({password: event.target.value})}}
                        />
                    </div>
                )
                : (
                    <div className='auth_log'>
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
            <button className={`button_ok ${classButton}`} onClick={this.send.bind(this)}>
                OK
            </button>
            </div>
        </div>);
    }
}

export default withRouter(Auth);
