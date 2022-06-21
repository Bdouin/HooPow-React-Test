import React, {createContext, useState} from 'react';

export const ContextApp = createContext();

export default function ContextProvider(props) {

    const [dataBd, setDataBd] = useState([]);

    const [displays, setDisplays] = useState({
        stage:"bdStart", // possible values of stage : home, bdStart, bdMid, bdEnd
        activeKey:26,
        fullScreen:false,
    });

    const updateDisplays = (newDisplays) => {
        setDisplays(newDisplays);
    }

    const updateDataBd = (newData) => {
        setDataBd(newData);
    }
    

    return (
        <ContextApp.Provider value={{displays, updateDisplays, dataBd, updateDataBd}}>
            {props.children}
        </ContextApp.Provider>
    )
}