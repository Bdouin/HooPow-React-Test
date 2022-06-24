import React, {useRef, useEffect, useContext} from 'react';
import './AsideBds.css';
import { ContextApp } from '../../../context/context';


export default function AsideBds() {

    const asideBd = useRef();
    const {displays, dataBd, handleDisplays} = useContext(ContextApp);

    useEffect(() => {
        if(displays.stage === "bdEnd"){
          setTimeout(() => {
            const asideBdGroup2 = Array.from(document.querySelectorAll('.aside-bd-item.second-group'));
            asideBdGroup2.forEach(item => {item.style.display = "block"});
          }, 1200);
        }
      }, [displays])

    // scrolling features

    let holding = false;
    let firstClickY;
    let alreadyTopScrolled;
    let velocity;
    let rafID;

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

    const wheelFunction = e => {
        // asideBd.current.scrollTop += e.deltaY;
        velocity = 2*e.deltaY / 10;
        asideStartTransition();
    }

    return (
        <div
        className='aside-bd-container'
        style={{display:displays.fullScreen && 'none'}}
        ref={asideBd}
        onWheel={e => wheelFunction(e)}
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
        </div>
    )
}
