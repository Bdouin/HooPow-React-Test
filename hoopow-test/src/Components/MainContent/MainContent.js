import React, {useContext, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import { ContextApp } from '../../context/context';
import './MainContent.css';
import {ReactComponent as BoyProfil} from '../../assets/main-content-assets/boy-profil.svg';
import BdDuJour from './BdDuJour/BdDuJour';
import HomePage from './HomePage/HomePage';
import Slider from './Slider/Slider';
import AsideBds from './AsideBds/AsideBds';



export default function MainContent() {

    const {displays, dataBd, updateDataBd} = useContext(ContextApp);

    const getDateInfos = (date) => {
      const infoDate = {};

      // Day name of the week;
      const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
      const dateObject = new Date(date);
      const indexDate = dateObject.getDay();
      infoDate.dayName = days[indexDate];

      // Day number of the month;
      const dayNumber = date.split('-')[2];
      infoDate.dayNumber = dayNumber;

      return infoDate;
    }

    useEffect(() => {
      fetch('https://api.jsonbin.io/b/60d15d6c8ea8ec25bd12c083')
      .then(response => response.json())
      .then(data => {
        const dataAPI = [];
        // console.log(data);
        
        for(const bd of data){
          const bdDetails = {};
          bdDetails.name = bd.name;
          bdDetails.keyReact = uuidv4();
          bdDetails.bdKey = bd.bdKey;
          bdDetails.imageHomepage = bd.imageHomepage;
          bdDetails.publicationDate = getDateInfos(bd.publicationDate);
          bdDetails.bdImages = [];
          if(bd.name === "MATUVU"){
            fetch('https://api.jsonbin.io/b/60d15d485ed58625fd1658cb')
            .then(response => response.json())
            .then(bdData => {
              const images = [];
              bdData.bdImage.forEach(image => {
                images.push(image.bdImageFr);
              })
              bdDetails.bdImages = images;
            })
          }
          
          dataAPI.push(bdDetails);
        }

        updateDataBd(dataAPI);
      }) 
    }, [])

  return (
    <div className={displays.fullScreen ? 'main-content fullscreen' : 'main-content'} >
      <div className={displays.fullScreen ? "main-content-container fullscreen" : "main-content-container"}>

        {((displays.stage === "bdStart" || displays.stage === "bdMid") && !displays.fullScreen) && <BdDuJour />}

        {displays.stage === "home" && <BoyProfil className="boy-profil" />}

        {displays.stage === "home" ? <HomePage stage={"home"} /> : displays.stage === "bdStart" && <HomePage stage={'not-home'} />}
          
        {(dataBd.length !== 0 && displays.stage !== "home") && <Slider />}

        {(displays.stage === "bdEnd") && <AsideBds />}

      </div>
    </div>
  )
}