import React, {useState, useContext, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import { ContextApp } from '../../context/context';
import './Sidebar.css';
import {ReactComponent as Envelope} from '../../assets/sidebar-assets/envelope.svg';
import {ReactComponent as Telegram} from '../../assets/sidebar-assets/telegram.svg';
import {ReactComponent as Linkedin} from '../../assets/sidebar-assets/linkedin.svg';
import {ReactComponent as Muslimshow} from '../../assets/sidebar-assets/muslimshow.svg';
import {ReactComponent as Boy} from '../../assets/sidebar-assets/boy-subscribe.svg';
import {ReactComponent as Share} from '../../assets/sidebar-assets/share.svg';
import {ReactComponent as Home} from '../../assets/sidebar-assets/home-icon.svg';
import {ReactComponent as FullScreen} from '../../assets/sidebar-assets/full-screen.svg';
import Logo from '../../assets/sidebar-assets/logo-hoopow.png';

export default function Sidebar() {

    const {displays, dataBd, handleDisplays} = useContext(ContextApp);
    const productionImages = ["AWLAD", "FOULANE", "MSHOW", "QUIZZBDOUIN", "GUIDES", "MECCA", "INTRUS", "ASTEROID", "FOULANE2"];

  return (
    <div className='sidebar' style={{display:displays.fullScreen && 'none'}}>
        <div className="menu-logo-container">
            <div className="menu">
                <input type="checkbox" className="navigationCheckbox" id="navi" />
                <label htmlFor="navi" className="navigationBtn">
                    <span className="navigationIcon"></span>
                </label>

                <nav className="nav">
                    <div className="links-bloc">
                        <a className="active" href="#">Myyagis</a>
                        <a href="#">Mon espace membre</a>
                        <a href="#">Offrir un abonnement</a>
                    </div>
                    <hr />
                    <div className="contact-bloc">
                        <a href="#" className="contact">
                            <Envelope className="envelope" />
                            <span>Nous<br/> contacter</span>
                        </a>
                        <a href="#" className="contact">
                            <Telegram className="telegram" />
                            <span>Nous suivre<br/> sur Telegram</span>
                        </a>
                        <a href="#" className="contact">
                            <Linkedin className="linkedin" />
                            <span>Nous suivre<br/> sur LinkedIn</span>
                        </a>
                    </div>
                    <hr />
                    <div className="links-bloc">
                        <a href="#">Conditions d'utilisation</a>
                        <a href="#">Se déconnecter</a>
                    </div>
                </nav>
            </div>
            <div className="logo">
                <img src={Logo} alt="Logo de HooPow" />
            </div>
        </div>
        
        {displays.stage === "home" && <Muslimshow className="muslimshow" />}

        {displays.stage === "home" && <div className="subscription-container-home">
            <p>Soutenez la production en vous abonnant !</p>
            <div className="production-container">
                {productionImages.map(item => (
                    <a key={uuidv4()} href="#">
                        <img src={process.env.PUBLIC_URL + `/images/${item}.png`} alt={item} />
                    </a>
                ))}
            </div>
        </div>}

        {(dataBd.length !== 0 && displays.stage !== "home" && !displays.fullScreen) && <div className='current-bd'>
            <img src={'https://d2hkgoif6etp77.cloudfront.net/' + dataBd[displays.activeKey - 1].imageHomepage} alt={dataBd[displays.activeKey - 1].name} />
            <h3>{dataBd[displays.activeKey - 1].name.charAt(0) + dataBd[displays.activeKey - 1].name.toLowerCase().slice(1)}</h3>
        </div>}

        {displays.stage === "bdStart" && <div className="subscription-container-bdstart">
            <p>Soutenez la production en vous abonnant !</p>
            <a href="#">S'abonner</a>
            <p>Déjà abonné ?<br/>Connectez-Vous</p>
            <Boy className="boy-subscribe" />
        </div>}

        {((displays.stage === "bdMid" || displays.stage === "bdEnd") && !displays.fullScreen) && <div className="btns-container">
            <button className='btn-share'>
                <Share className='share' />
                <span>Partager</span>
            </button>
            <button className='btn-home-fs' onClick={() => handleDisplays('full-screen', 'active')}>
                <FullScreen className='full-screen' />
                <span>Plein écran</span>
            </button>
            <button className='btn-home-fs' onClick={() => handleDisplays('home')}>
                <Home className='home-btn' />
                <span>Accueil</span>
            </button>
        </div>}
        
    </div>
  )
}