import React from 'react';
import './CurrentBd.css';

export default function CurrentBd(props) {
  return (
    <div className='current-bd'>
        <img src={'https://d2hkgoif6etp77.cloudfront.net/' + props.activeBd.imageHomepage} alt={props.activeBd.name} />
        <h3>{props.activeBd.name.charAt(0) + props.activeBd.name.toLowerCase().slice(1)}</h3>
    </div>
  )
}
