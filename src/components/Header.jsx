import React from "react";
import RedditLogo from '../Reddit_Logo.png';

export const Header = () => {
    return (
        <div className=" items-baseline flex-col border-b-2 border-gray-200 p-4 justify-center">
            <div>
                <img className="aspect 3/2 object-cover" src={RedditLogo} alt="Logo" height={200} width={200} />
            </div>
            <div className=" -mt-6 text-4xl font-bold text-black-500 text-center"> 
                Reddit App
            </div>
            
        </div>
    )
};