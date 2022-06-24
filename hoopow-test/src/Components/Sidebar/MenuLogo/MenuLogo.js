import React from 'react';
import './MenuLogo.css';
import {ReactComponent as Envelope} from '../../../assets/sidebar-assets/envelope.svg';
import {ReactComponent as Telegram} from '../../../assets/sidebar-assets/telegram.svg';
import {ReactComponent as Linkedin} from '../../../assets/sidebar-assets/linkedin.svg';
import Logo from '../../../assets/sidebar-assets/logo-hoopow.png';


export default function MenuLogo() {
  return (
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
  )
}
