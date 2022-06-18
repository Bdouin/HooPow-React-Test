import React, {useState, useContext, useEffect} from 'react';
import { ContextApp } from '../../context/context';
import './MainContent.css';

export default function MainContent() {

    const {displays, updateDisplays} = useContext(ContextApp);


  return (
    <div className='main-content'>
        MainContent
    </div>
  )
}