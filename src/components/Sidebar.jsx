import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import playerImg from '../game/user.svg';

export default props => {
    const userProfile = props.userProfile;
    const { show: showStopGame, method: handleStopGame } = props.menuOptions.stopGame;
    const { show: showLogout, method: handleLogout } = props.menuOptions.logout;
    const { show: showGoAway, method: handleGoAway } = props.menuOptions.goAway;

    const styles = {
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
        <Menu right styles={ styles }>
            {userProfile ? (
                <div className="menu-profile">
                    <h2>{userProfile.fullname}</h2>
                    <h3>{userProfile.rating}</h3>
                    <img alt=" " className="menu-profile-ava" src={userProfile.avatar ? userProfile.avatar : playerImg} />
                </div>
            ) : null}

            {showGoAway ? (
                <a onClick={handleGoAway} className="menu-item">
                    Go away
                </a>
            ) : null}

            {showStopGame ? (
                <a onClick={handleStopGame} className="menu-item">
                    Stop game
                </a>
            ) : null}

            {!userProfile ? (
                <a className="menu-item" href="/login">
                    Login
                </a>
            ) : null}

            <a className="menu-item" href="/">
                Lobby
            </a>

            <a className="menu-item" href="/leaderboard">
                Leaderboard
            </a>

            {showLogout ? (
                <a onClick={handleLogout} className="menu-item">
                    Logout
                </a>
            ) : null}
        </Menu>
    );
};
