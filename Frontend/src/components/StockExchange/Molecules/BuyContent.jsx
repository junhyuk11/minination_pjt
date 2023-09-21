import React from 'react';
import './BuySell.css';

const BuyContent = () => {
    return (
        <div>
            <button class="btn" type="button">
                <strong>SPACE</strong>
                <div id="container-stars">
                    <div id="stars" />
                </div>

                <div id="glow">
                    <div class="circle" />
                    <div class="circle" />
                </div>
            </button>
        </div>
    );
};

export default BuyContent;
