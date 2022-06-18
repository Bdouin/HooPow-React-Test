import React, {useState, useContext, useEffect} from 'react';
import { ContextApp } from '../../context/context';
import './Sidebar.css';
import {ReactComponent as Envelope} from '../../assets/sidebar-assets/envelope.svg';
import {ReactComponent as Telegram} from '../../assets/sidebar-assets/telegram.svg';
import {ReactComponent as Linkedin} from '../../assets/sidebar-assets/linkedin.svg';
import {ReactComponent as Muslimshow} from '../../assets/sidebar-assets/muslimshow.svg';
import {ReactComponent as Boy} from '../../assets/sidebar-assets/boy-subscribe.svg';
import Logo from '../../assets/sidebar-assets/logo-hoopow.png';

export default function Sidebar() {

    const {displays, updateDisplays} = useContext(ContextApp);

  return (
    <div className='sidebar'>
        <div className="menu-logo-container">
            <div className="menu">
                <input type="checkbox" class="navigationCheckbox" id="navi" />
                <label htmlFor="navi" class="navigationBtn">
                    <span className="navigationIcon"></span>
                </label>

                <nav className="nav">
                    <div className="links-bloc">
                        <a class="active" href="#">Myyagis</a>
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

        <div className="bd-du-jour">
            <p>Disponible gratuitement :<br/><span>La bd du jour</span></p>
        </div>

        <Muslimshow className="muslimshow" />

        <div className="subscription-container">
            <p>Soutenez la production en vous abonnant !</p>
            <a href="#">S'abonner</a>
            <p>Déjà abonné ?<br/>Connectez-Vous</p>
            <Boy class="boy-subscribe" />
        </div>
    </div>
  )
}
