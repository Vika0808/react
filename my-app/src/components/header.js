import React from 'react';
import { Link } from 'react-router-dom';
import LogoTd from './Logo';

const TdHeader = ({isLoggedIn, userName, onLogOut}) => {
    console.log('userName:', userName);
    console.log('isLoggedIn:', isLoggedIn);

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogOut && onLogOut();
    };

    return (
        <header className="header">
            <Link to="/">
                <div className="header-logo">
                    <LogoTd />
                    <div>
                        <h2>Щоденник мандрівника</h2>
                    </div>
                </div>
            </Link>
            <div className="user-info">
                { 
                    isLoggedIn 
                        ? <div className="dropdown">
                            <button className="dropbtn">{userName ?? ''}</button>
                            <div className="dropdown-content">
                                <Link to="/subscriptions">
                                    <button>Підписки</button>
                                </Link>
                                <button onClick={handleLogout}>Вийти</button>
                            </div>
                        </div>
                        : <Link to="/login">
                            Реєстрація / Вхід
                        </Link>
                }
            </div>
        </header>
    );
};

export default TdHeader;
