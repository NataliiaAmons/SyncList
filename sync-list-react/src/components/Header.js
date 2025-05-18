import React from 'react';

export default function Header(){
    return (
        <div className = "header bg-support border-bottom-gray">

        <div className = "left-section">
            <img className="logo-image" src="logo.png" alt="logo"/> 
        </div>

        <div className = "middle-section">
            <p className="header-link text-dark">All lists</p>
            <p className="header-link text-dark">Claimed tasks</p>
            <p className="header-link text-dark">Upcoming</p>
            <p className="header-link text-dark">Friends</p>
        </div>

        <div className = "right-section">
            <img className="profile-picture" src="images\user-profile-picture.jpg" alt="profile"/>
            <p className="username-header text-dark">Nataliia</p>
        </div>
        </div>
    );
}