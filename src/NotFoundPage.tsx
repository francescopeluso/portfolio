import React from 'react';

// import styles
import './styles/404.css';

// import assets
import yoda from './images/yoda.png';

const NotFoundPage = () => {
    return (
        <div className='notfound-body'>
            <div className="notfound-container">
                <img src={yoda} alt="Master Yoda" />
                <div>
                    <h1>Lost you are, young padawan.</h1>
                    <p>HTTP 404 - Page Not Found</p>
                    <a href="/">Go back to home page.</a>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;