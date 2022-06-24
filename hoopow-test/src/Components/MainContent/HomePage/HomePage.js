import React, {useRef, useContext, useEffect} from 'react';
import { ContextApp } from '../../../context/context';
import './HomePage.css';

export default function HomePage(props) {
    
    const homePage = useRef();
    const {displays, dataBd, handleDisplays} = useContext(ContextApp);

    useEffect(() => {
        if(displays.stage === "home"){
          setTimeout(() => {
            const bdGroup2 = Array.from(document.querySelectorAll('.bd-item.second-group'));
            bdGroup2.forEach(item => {item.style.display = "block"});
          }, 1200);
        }
      }, [displays])

    // scrolling features

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

     const wheelFunction = e => {
        // homePage.current.scrollTop += e.deltaY;
        velocity = 2*e.deltaY / 10;
        startTransition();
      }

    return (
        <>
            {props.stage === 'home' ? <div 
            className="home-page" 
            ref={homePage}
            // Desktop
            onWheel={e => wheelFunction(e)}
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
            </div> : <div ref={homePage}></div>}
        </>
    )
}


