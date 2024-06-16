import React from 'react';
import TdHeader from './header';

const MasterLayout = ({children, isLoggedIn, username, onLogout}) => {
    return (
        <div>
            <div>
                <TdHeader isLoggedIn={isLoggedIn} userName={username} onLogOut={() => {onLogout && onLogout()}}/>
            </div>
            <div>
                { children }
            </div>
        </div>
    );
};

export default MasterLayout;