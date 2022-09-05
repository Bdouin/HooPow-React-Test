import React, {useContext} from 'react';
import { ContextApp } from '../../../context/context';
import './BdBtnBloc.css';
import {ReactComponent as Share} from '../../../assets/sidebar-assets/share.svg';
import {ReactComponent as Home} from '../../../assets/sidebar-assets/home-icon.svg';
import {ReactComponent as FullScreen} from '../../../assets/sidebar-assets/full-screen.svg';

export default function BdBtnBloc() {

    const {handleDisplays} = useContext(ContextApp);
    
    return (
        <div className="btns-container">
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
        </div>
    )
}
