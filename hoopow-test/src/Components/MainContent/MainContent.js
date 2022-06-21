import React, {useState, useContext, useEffect, useRef} from 'react';
import {v4 as uuidv4} from 'uuid';
import { ContextApp } from '../../context/context';
import './MainContent.css';
import {ReactComponent as BoyProfil} from '../../assets/main-content-assets/boy-profil.svg';



export default function MainContent() {

    const {displays, updateDisplays, dataBd, updateDataBd} = useContext(ContextApp);
    const homePage = useRef();

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

    const bdReading = key => {
      if(key === 26){
        const newDisplays = {
          ...displays,
          stage:"bdStart",
          activeKey:key,
        }
        // updateDisplays(newDisplays);
      }
    }

    // Home scrolling wheel

    const wheelFunction = e => {
      homePage.current.scrollTop += e.deltaY;
    }

    // Home scrolling click (desktop) or touch (tablet and mobile)

    let holding = false;
    let firstClickY;
    let alreadyTopScrolled;
    let velocity;
    let rafID;

    const mouseDownFunction = e => {
      holding = true;
      firstClickY = e.pageY;
      alreadyTopScrolled = homePage.current.scrollTop;
      stopTransition();
    }

    const mouseMoveFunction = e => {
      if(!holding) return;

      const y = e.pageY;
      const scrolled = (y - firstClickY);
      const prevScrollTop = homePage.current.scrollTop;
      homePage.current.scrollTop = alreadyTopScrolled - scrolled;

      velocity = homePage.current.scrollTop - prevScrollTop;
    }

    const mouseUpFunction = () => {
      holding = false;
      startTransition();
    }
    const mouseLeaveFunction = () => {
      holding = false;
    }

    function startTransition(){
      stopTransition();
      rafID = requestAnimationFrame(decreasingTransition);
    }
    function stopTransition(){
      cancelAnimationFrame(rafID);
    }
    function decreasingTransition(){
      homePage.current.scrollTop += velocity;
      velocity *= 0.95;
      if(Math.abs(velocity) > 0.5){
        rafID = requestAnimationFrame(decreasingTransition);
      }
    }

    const touchStartFunction = e => {
      holding = true;
      firstClickY = e.targetTouches[0].pageY;
      alreadyTopScrolled = homePage.current.scrollTop;
      stopTransition();
    }
    const touchEndFunction = e => {
      holding = false;
      startTransition();
    }
    const touchMoveFunction = e => {
      if(!holding) return;

      const y = e.targetTouches[0].pageY;
      const scrolled = (y - firstClickY);
      const prevScrollTop = homePage.current.scrollTop;
      homePage.current.scrollTop = alreadyTopScrolled - scrolled;

      velocity = homePage.current.scrollTop - prevScrollTop;
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
          bdDetails.bdImages = undefined;
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

      setTimeout(() => {
        const bdGroup2 = Array.from(document.querySelectorAll('.bd-item.second-group'));
        bdGroup2.forEach(item => {item.style.display = "block"});

      }, 2000);
    }, [])


  return (
    <div className='main-content'>
      
        <div className="main-content-container">

        {(displays.stage === "bdStart" || displays.stage === "bdMid") && 
        <div className="bd-du-jour">
            <p><span>Disponible gratuitement :</span><span>La bd du jour</span></p>
        </div>}

        {displays.stage === "home" && <BoyProfil className="boy-profil" />}

        {displays.stage === "home" && <div 
            className="home-page" 
            ref={homePage}
            // Desktop
            onWheel={e => wheelFunction(e)}
            onMouseDown={e => mouseDownFunction(e)}
            onMouseMove={e => mouseMoveFunction(e)}
            onMouseUp={mouseUpFunction}
            onMouseLeave={mouseLeaveFunction}
            // Mobile and Tablet
            onTouchStart={e => touchStartFunction(e)}
            onTouchEnd={e => touchEndFunction(e)}
            onTouchMove={e => touchMoveFunction(e)}

            >
              {dataBd.map(item => (
                <div key={item.keyReact} onClick={() => bdReading(item.bdKey)} className={item.bdKey <= 12 ? "bd-item" : "bd-item second-group"}>
                  <img src={'https://d2hkgoif6etp77.cloudfront.net/' + item.imageHomepage} alt={item.name} />
                  <h3>
                    <span>{`${item.publicationDate.dayName} ${item.publicationDate.dayNumber} - `} </span>{item.name.charAt(0) + item.name.toLowerCase().slice(1)}
                  </h3>
                </div>
              ))}
            </div>}
          
        </div>
    </div>
  )
}