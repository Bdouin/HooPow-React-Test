import React, {useState, useContext, useEffect, useRef} from 'react';
import {v4 as uuidv4} from 'uuid';
import { ContextApp } from '../../context/context';
import './MainContent.css';
import {ReactComponent as BoyProfil} from '../../assets/main-content-assets/boy-profil.svg';
import {ReactComponent as BtnLeft} from '../../assets/main-content-assets/chevron-left.svg';
import {ReactComponent as BtnRight} from '../../assets/main-content-assets/chevron-right.svg';



export default function MainContent() {

    const {displays, dataBd, updateDataBd, handleDisplays} = useContext(ContextApp);
    const homePage = useRef();
    const asideBd = useRef();

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
      if(displays.stage === "home"){
        rafID = requestAnimationFrame(decreasingTransition);
      }
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
    const touchEndFunction = () => {
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

    // Scrolling wheel

    const wheelFunction = (e, target) => {
      if(target === 'home-page'){
        // homePage.current.scrollTop += e.deltaY;
        velocity = 2*e.deltaY / 10;
        startTransition();
      }
      else if(target === 'aside'){
        // asideBd.current.scrollTop += e.deltaY;
        velocity = 2*e.deltaY / 10;
        asideStartTransition();
      }
    }

    // slider

    const [slideAnim, setSlideAnim] = useState({
      index:0,
      inProgress:false
    });

    const moveDot = index => {
      if(slideAnim.index !== index){
        handleDisplays('index-slider', index);
        setSlideAnim({index:index, inProgress:false});
      }
    }

    const moveSlide = direction => {

      if(direction === 'left' && slideAnim.index > 0 && !slideAnim.inProgress){
        handleDisplays('index-slider', slideAnim.index - 1);

        setSlideAnim({index:slideAnim.index - 1, inProgress:true})

        setTimeout(() => {
          setSlideAnim({index:slideAnim.index - 1, inProgress:false})
        }, 400);
      }
      else if(direction === 'right' && slideAnim.index < dataBd[displays.activeKey - 1].bdImages.length - 1 && !slideAnim.inProgress){

        handleDisplays('index-slider', slideAnim.index + 1);

        setSlideAnim({index:slideAnim.index + 1, inProgress:true})

        setTimeout(() => {
          setSlideAnim({index:slideAnim.index + 1, inProgress:false})
        }, 400);
      }
    }

    // aside bds

    const asideTouchStartFunction = e => {
      holding = true;
      firstClickY = e.targetTouches[0].pageY;
      alreadyTopScrolled = asideBd.current.scrollTop;
      asideStopTransition();
    }
    const asideTouchEndFunction = () => {
      holding = false;
      asideStartTransition();
    }
    const asideTouchMoveFunction = e => {
      if(!holding) return;

      const y = e.targetTouches[0].pageY;
      const scrolled = (y - firstClickY);
      const prevScrollTop = asideBd.current.scrollTop;
      asideBd.current.scrollTop = alreadyTopScrolled - scrolled;

      velocity = asideBd.current.scrollTop - prevScrollTop;
    }

    function asideStartTransition(){
      asideStopTransition();
      rafID = requestAnimationFrame(asideDecreasingTransition);
    }
    function asideStopTransition(){
      cancelAnimationFrame(rafID);
    }
    function asideDecreasingTransition(){
      asideBd.current.scrollTop += velocity;
      velocity *= 0.95;
      if(Math.abs(velocity) > 0.5){
        rafID = requestAnimationFrame(asideDecreasingTransition);
      }
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

    useEffect(() => {
      if(displays.stage === "home"){
        setTimeout(() => {
          const bdGroup2 = Array.from(document.querySelectorAll('.bd-item.second-group'));
          bdGroup2.forEach(item => {item.style.display = "block"});
        }, 2000);
      }
      if(displays.stage === "bdEnd" || displays.fullScreen){
        const asideBdGroup2 = Array.from(document.querySelectorAll('.aside-bd-item.second-group'));
        asideBdGroup2.forEach(item => {item.style.display = "block"});
      }
    }, [displays])

  return (
    <div className='main-content'>
      
        <div className="main-content-container">

        {(displays.stage === "bdStart" || displays.stage === "bdMid") && 
        <div className="bd-du-jour">
            <p><span>Disponible gratuitement :</span><span>La bd du jour</span></p>
        </div>}

        {displays.stage === "home" && <BoyProfil className="boy-profil" />}

        {displays.stage === "home" ? <div 
            className="home-page" 
            ref={homePage}
            // Desktop
            onWheel={e => wheelFunction(e,'home-page')}
            onMouseDown={e => mouseDownFunction(e)}
            onMouseMove={e => mouseMoveFunction(e)}
            onMouseUp={mouseUpFunction}
            onMouseLeave={mouseLeaveFunction}
            // Mobile and Tablet
            onTouchStart={(e) => touchStartFunction(e)}
            onTouchEnd={touchEndFunction}
            onTouchMove={e => touchMoveFunction(e)}
            >
              {dataBd.map(item => (
                <div key={item.keyReact} onClick={() => handleDisplays('key', item.bdKey)} className={item.bdKey <= 12 ? "bd-item" : "bd-item second-group"}>
                  <img src={'https://d2hkgoif6etp77.cloudfront.net/' + item.imageHomepage} alt={item.name} />
                  <h3>
                    <span>{`${item.publicationDate.dayName} ${item.publicationDate.dayNumber} - `} </span>{item.name.charAt(0) + item.name.toLowerCase().slice(1)}
                  </h3>
                </div>
              ))}
          </div> : displays.stage === "bdStart" && <div ref={homePage}></div>}
          
          {(dataBd.length !== 0 && displays.stage !== "home") && 
            <div className="slider-wrapper">
              <div className="slider-container">
                <div className="slider" style={{transform:`translate(-${slideAnim.index}00%)`}}>
                  {dataBd[displays.activeKey - 1].bdImages.map(item => (
                  <img 
                  key={uuidv4()}
                  className={!displays.fullScreen ? "bd-slide" : "bd-slide full-screen"} 
                  src={'https://d2hkgoif6etp77.cloudfront.net/' + item} 
                  alt="" 
                  />
                  ))}
                </div>
              </div>

              <button 
              className='btn-slider btn-left' 
              style={{display:slideAnim.index === 0 && "none"}}
              onClick={() => moveSlide('left')}
              >
                  <BtnLeft className="chevron" />
              </button>
              <button 
              className='btn-slider btn-right'
              style={{display:slideAnim.index === dataBd[displays.activeKey - 1].bdImages.length - 1 && "none"}}
              onClick={() => moveSlide('right')}
              >
                  <BtnRight className="chevron" />
              </button>

              <div className="dots-container">
                {Array.from({length:dataBd[displays.activeKey - 1].bdImages.length}).map((item, index) => (
                  <button key={uuidv4()} className={slideAnim.index === index ? "dot active" : "dot"} onClick={() => moveDot(index)}></button>
                ))}
              </div>
            </div>
          }

          {(displays.stage === "bdEnd" || displays.fullScreen) && <div
          className='aside-bd-container'
          ref={asideBd}
          onWheel={e => wheelFunction(e, 'aside')}
          onTouchStart={(e) => asideTouchStartFunction(e)}
          onTouchEnd={asideTouchEndFunction}
          onTouchMove={e => asideTouchMoveFunction(e)}
          >
            {dataBd.map(item => (
              <div key={item.keyReact} onClick={() => handleDisplays('key', item.bdKey)} className={item.bdKey <= 7 ? "aside-bd-item" : "aside-bd-item second-group"}>
                <div className="aside-img-container">
                <img src={'https://d2hkgoif6etp77.cloudfront.net/' + item.imageHomepage} alt={item.name} />
                </div>
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