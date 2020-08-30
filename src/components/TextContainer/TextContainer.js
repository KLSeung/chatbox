
import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
    <div className="textContainer">
        {
        users 
            ? ( <div>
                    <h1>People currently chatting:</h1>
                    <div className="activeContainer">
                        <h2>
                            {Object.values(users).map(({users}) => (
                                <div key={users} className="activeItem">
                                    {users}
                                    <img alt="online icon" src={onlineIcon}></img>
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            )
            : null   
        }
    </div>
);

export default TextContainer;