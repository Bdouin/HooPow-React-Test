import React from 'react';
import {v4 as uuidv4} from 'uuid';
import './Subscription.css';
import {ReactComponent as Boy} from '../../../assets/sidebar-assets/boy-subscribe.svg';

export default function HomeSubscription(props) {

    const productionImages = ["AWLAD", "FOULANE", "MSHOW", "QUIZZBDOUIN", "GUIDES", "MECCA", "INTRUS", "ASTEROID", "FOULANE2"];
    
    return (
        <>
            {props.stage === "home" ? <div className="subscription-container-home">
                <p>Soutenez la production en vous abonnant !</p>
                <div className="production-container">
                    {productionImages.map(item => (
                        <a key={uuidv4()} href="#">
                            <img src={process.env.PUBLIC_URL + `/images/${item}.png`} alt={item} />
                        </a>
                    ))}
                </div>
            </div> : 
            props.stage === "bdStart" && <div className="subscription-container-bdstart">
                <p>Soutenez la production en vous abonnant !</p>
                <a href="#">S'abonner</a>
                <p>Déjà abonné ?<br/>Connectez-Vous</p>
                <Boy className="boy-subscribe" />
            </div>}
        </>
    )
}
