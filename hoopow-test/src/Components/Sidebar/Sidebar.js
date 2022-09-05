import React, {useContext} from 'react';
import { ContextApp } from '../../context/context';
import './Sidebar.css';

import {ReactComponent as Muslimshow} from '../../assets/sidebar-assets/muslimshow.svg';
import MenuLogo from './MenuLogo/MenuLogo';
import Subscription from './Subscription/Subscription';
import CurrentBd from './CurrentBd/CurrentBd';
import BdBtnBloc from './BdBtnBloc/BdBtnBloc';

export default function Sidebar() {

    const {displays, dataBd} = useContext(ContextApp);

    return (
        <div className='sidebar' style={{display:displays.fullScreen && 'none'}}>
            
            <MenuLogo />

            {displays.stage === "home" && <Muslimshow className="muslimshow" />}

            {(dataBd.length !== 0 && displays.stage !== "home" && !displays.fullScreen) && <CurrentBd activeBd = {dataBd[displays.activeKey - 1]} />}

            <Subscription stage={displays.stage} />

            {((displays.stage === "bdMid" || displays.stage === "bdEnd") && !displays.fullScreen) && 
            <BdBtnBloc />}
            
        </div>
    )
}