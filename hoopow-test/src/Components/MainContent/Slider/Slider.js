import React, {useEffect, useState, useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import { ContextApp } from '../../../context/context';
import './Slider.css';
import {ReactComponent as BtnLeft} from '../../../assets/main-content-assets/chevron-left.svg';
import {ReactComponent as BtnRight} from '../../../assets/main-content-assets/chevron-right.svg';
import {ReactComponent as CloseFs} from '../../../assets/main-content-assets/close-full-screen.svg';

export default function Slider() {

    const {displays, dataBd, handleDisplays} = useContext(ContextApp);

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

    useEffect(() => {
        if(displays.stage === "home"){
          setSlideAnim({index:0, inProgress:false})
        }
      }, [displays])


    return (
        <div className={displays.fullScreen ? "slider-wrapper fullscreen" : "slider-wrapper"}>
            <div className="slider-container">
                <div className="slider" style={{transform:`translateX(-${slideAnim.index}00%)`}}>
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
            className={displays.fullScreen ? 'btn-slider btn-left fullscreen' : 'btn-slider btn-left'}
            style={{display:slideAnim.index === 0 && "none"}}
            onClick={() => moveSlide('left')}
            >
                <BtnLeft className="chevron" />
            </button>
            <button 
            className={displays.fullScreen ? 'btn-slider btn-right fullscreen' : 'btn-slider btn-right'}
            style={{display:slideAnim.index === dataBd[displays.activeKey - 1].bdImages.length - 1 && "none"}}
            onClick={() => moveSlide('right')}
            >
                <BtnRight className="chevron" />
            </button>

            <div className="dots-container" style={{display:displays.fullScreen && 'none'}} >
                {Array.from({length:dataBd[displays.activeKey - 1].bdImages.length}).map((item, index) => (
                <button key={uuidv4()} className={slideAnim.index === index ? "dot active" : "dot"} onClick={() => moveDot(index)}></button>
                ))}
            </div>

            {displays.fullScreen && <div className="close-fs" onClick={() => handleDisplays('full-screen','close-fs')}>
                <CloseFs />
            </div>}
        </div>
    )
}
