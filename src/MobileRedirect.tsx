import React from "react";

// import styles
import "./styles/_mobileredirect.css";

// import assets
import mobile from "./images/homer-hiding.gif";

const MobileRedirect = () => {
    return (
        <div className='mobileredirect-body'>
            <div className="mobileredirect-container">
                <img src={mobile} alt="Homer Simpson hiding" />
                <div>
                    <h1>Oh, how embarrassing.</h1>
                    <p>I didn't make my portfolio mobile-friendly yet.</p>
                    <p>But you can still view it on your desktop!</p>
                </div>
            </div>
        </div>
    );
};

export default MobileRedirect;