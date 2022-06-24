import React, {createContext, useState} from 'react';

export const ContextApp = createContext();

export default function ContextProvider(props) {

    const [dataBd, setDataBd] = useState([]);

    const [displays, setDisplays] = useState({
        stage:"home", // possible values of stage : home, bdStart, bdMid, bdEnd
        activeKey:null,
        fullScreen:false
    });

    const handleDisplays = (type, value) => {

        const newDisplays = {...displays} // spread operator
  
        // on click in home's bd
        if(type === 'key'){
          if(value === 26){
            newDisplays.stage = "bdStart";
            newDisplays.activeKey = value;
          }
        }
  
        // on sliding with btn chevron or dots
        if(type === 'index-slider'){
          if(value > 0 && value < dataBd[displays.activeKey - 1].bdImages.length - 1){
            newDisplays.stage = "bdMid";
          }
          else if(value === 0){
            newDisplays.stage = "bdStart";
          }
          else if(value === dataBd[displays.activeKey - 1].bdImages.length - 1){
            newDisplays.stage = "bdEnd";
          }
        }

        // full screen buttons
        if(type === 'full-screen'){
            if(value === 'active'){
                newDisplays.fullScreen = true;
            } else if(value === 'close-fs'){
                newDisplays.fullScreen = false;
            }
        }

        // home button
        if(type === "home"){
            newDisplays.stage = "home";
            newDisplays.activeKey = null;
        }
        
        setDisplays(newDisplays);  
    }

    const updateDataBd = (newData) => {
        setDataBd(newData);
    }
    

    return (
        <ContextApp.Provider value={{displays, dataBd, updateDataBd, handleDisplays}}>
            {props.children}
        </ContextApp.Provider>
    )
}