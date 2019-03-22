import React, { useState } from 'react';

import Auth from '../auth/Auth';
import Game from '../game/Game';

const Main = props => {

    return (
        <div className='main_root'>
                <Game
                    {...props}
                />
        </div>
    );
}

export default Main;
