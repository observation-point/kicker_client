import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import playerImg from '../game/user.svg';

export default props => {
    const user = props.userProfile;
    const handleStopGame = props.menuOptions.stopGame.method;
    const handleLogout = props.menuOptions.logout.method;

    var styles = {
        bmBurgerBars: {
            height: '8%'
        },
        bmMenuWrap: {
            width: '250px'
        },
        bmOverlay: {
            backgroundColor: 'rgba(200, 200, 200, 0.3)'
        }
    }
    return (
        // Pass on our props
        <Menu right styles={ styles }>
            {user ? (
                <div className="menu-profile">
                    <h2>{user.fullname}</h2>
                    <h3>{user.rating}</h3>
                    <img alt=" " className="menu-profile-ava" src={playerImg} />
                </div>
            ) : null}
            {user ? (
                <a onClick={handleStopGame} className="menu-item" href="/">
                    Stop game
                </a>
            ) : null}

            {user ? (
                <a onClick={handleLogout} className="menu-item" href="/">
                    Logout
                </a>
            ) : null}

            <a className="menu-item" href="/">
                Game
            </a>

            <a className="menu-item" href="/">
                Leaderboard
            </a>
        </Menu>
    );
};
