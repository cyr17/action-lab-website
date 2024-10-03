import React from 'react';

type props = {
    active: boolean;
}
export const Hamburger : React.FC = () => {
    const active = false;

    return(
        <svg width="64" height="31" viewBox="0 0 64 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8.32663" width="48" height="4" rx="2" fill="#FCFCFC"/>
            <rect x="8" y="18.3266" width="48" height="4" rx="2" fill="#FCFCFC"/>
        </svg>
    );
}
