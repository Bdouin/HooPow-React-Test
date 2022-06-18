import React, {createContext, useState} from 'react';

export const ContextApp = createContext();

export default function ContextProvider(props) {

    const [displays, setDisplays] = useState({
        stage:"home", // possible values of stage : home, beginBd, midBd, endBd
        fullScreen:false,
    });

    const updateDisplays = (newDisplays) => {
        setDisplays(newDisplays);
    }
    

    return (
        <ContextApp.Provider value={{displays, updateDisplays}}>
            {props.children}
        </ContextApp.Provider>
    )
}
