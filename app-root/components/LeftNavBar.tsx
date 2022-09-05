import type {NextPage} from 'next'
import Image from "next/image";
import imgMuslimShow from "../public/assets/img/MUSLIM SHOW.svg"
import imgHOOPOW from "../public/assets/img/LOGO HOOPOW.svg"
import imgKid from "../public/assets/img/Image-Kid-227.png"
import imgBurgerBG from "../public/assets/img/Burger-BG.svg"
import imgBurger from "../public/assets/img/Burger.svg"
import imgHorizontalLine from "../public/assets/img/Horizontal-line.svg"
import {useState} from "react";

interface Props {
    mainHeight: number;
}

const LeftNavBar: NextPage<Props> = ({mainHeight}) => {
    const [sideMenuVisibility, setSideMenuVisibility] = useState(false);

    function getSideMenuVisibility() {
        return sideMenuVisibility ? 'visible' : 'hidden'
    }

    function getOppositeSideMenuVisibility() {
        return !sideMenuVisibility ? 'visible' : 'hidden'
    }

    return (
        <div className={'w-2/9 m-0 font-primary bg-dark px-[1.15%] flex flex-col text-center bg-cover'}>
            <div className={'w-full flex justify-center items-center align-center items-center flex-center mb-[2.5%]'}>
                <div className={"w-[20%] mr-[5%] text-black flex justify-center items-center flex-center"}>

                    <Image src={imgBurger} className={getOppositeSideMenuVisibility()}
                           onClick={() => setSideMenuVisibility(!sideMenuVisibility)}/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" id={'id'}>
                        <g data-name="Group 6323">
                            <path
                                d="M15 0h37a15 15 0 0 1 15 15v39a15 15 0 0 1-15 15H15A15 15 0 0 1 0 54V15A15 15 0 0 1 15 0z"
                                fill="#fff" fillRule="evenodd" data-name="Rectangle 1434"/>
                            <g data-name="Icon ionic-ios-menu">
                                <path
                                    d="M50.085 25.206H16.958c-.828 0-1.506-.821-1.506-1.825 0-1.003.678-1.824 1.506-1.824h33.127c.828 0 1.505.82 1.505 1.824s-.677 1.825-1.505 1.825Z"
                                    fill="#51aabc" fillRule="evenodd" data-name="Path 10145"/>
                                <path
                                    d="M50.085 36.154H16.958c-.828 0-1.506-.821-1.506-1.825s.678-1.825 1.506-1.825h33.127c.828 0 1.505.821 1.505 1.825s-.677 1.825-1.505 1.825Z"
                                    fill="#51aabc" fillRule="evenodd" data-name="Path 10146"/>
                                <path
                                    d="M50.085 47.101H16.958c-.828 0-1.506-.82-1.506-1.824s.678-1.825 1.506-1.825h33.127c.828 0 1.505.821 1.505 1.825 0 1.003-.677 1.824-1.505 1.824Z"
                                    fill="#51aabc" fillRule="evenodd" data-name="Path 10147"/>
                            </g>
                        </g>
                    </svg>*/}
                </div>
                <div className={'w-[64%] font-BD grid center'}>
                    <Image alt={'HOO POW'} src={imgHOOPOW}/>
                </div>
            </div>
            <div className={'w-full relative flex-grow block flex flex-col justify-between content-center'}>
                <div className={(sideMenuVisibility?' absolute':'hidden')+' h-[98%] rounded-[5%] bg-gray-600 ease-in-out transition-all z-50 top-[0] left-0 w-full flex-grow overflow:hidden'}>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                    MENU<br/>
                </div>
                <div className={"w-full block px-[2.8%] bg-[#51aabc] rounded-[5%]"}
                     style={{
                         paddingTop: (mainHeight * 0.02).toString() + 'px',
                         paddingBottom: (mainHeight * 0.036).toString() + 'px',
                     }}>
                <span className={'block whitespace-nowrap'} style={{
                    fontSize: (mainHeight * 0.02).toString() + 'px',
                    lineHeight: (mainHeight * 0.03).toString() + 'px'
                }}>
                    Disponible gratuitement :
                </span>
                    <span className={'block font-black'}
                          style={{
                              fontSize: (mainHeight * 0.027).toString() + 'px',
                              lineHeight: (mainHeight * 0.03).toString() + 'px',
                          }}>
                    LA BD DU JOUR
                </span>
                </div>

                <div className={'w-full'}>
                    <Image alt={'MUSLIM SHOW'} src={imgMuslimShow}/>
                </div>
                <div className={"flex flex-col h-[52%] rounded-[7%] justify-between  content-between items-center" +
                    " bg-[#51aabc] bg-[length:54%_60%] bg-[right_bottom_-6px] bg-no-repeat bg-[url('../public/assets/img/Image-Kid-227.png')]"}>
                    <div
                        className={'flex flex-col pt-[3%]'}
                        style={{
                            fontSize: (mainHeight * 0.035).toString() + 'px',
                            lineHeight: (mainHeight * 0.035).toString() + 'px'
                        }}>
                        SOUTENEZ<br/>LA PRODUCTION EN VOUS ABONNANT !

                        <div
                            className={'text-black mt-[6%]'}
                            style={{
                                fontSize: (mainHeight * 0.03).toString() + 'px',
                                lineHeight: (mainHeight * 0.03).toString() + 'px'
                            }}>
                            <a href={'#subscribe'}
                               className={'px-[4%] py-[2.4%] rounded-[8%] bg-[#ffc600]'}>S’ABONNER</a>
                        </div></div>
                    <div
                        className={'flex items-start flex-row w-full pb-[36%] '}
                        style={{
                            fontSize: (mainHeight * 0.018).toString() + 'px',
                            lineHeight: (mainHeight * 0.017).toString() + 'px'
                        }}>
                        <div className={'flex w-[55%] items-center justify-center content-center flex-col'}>
                            <span>DÉJÀ ABONNÉ ?</span>
                            <a href={'#log-in'} className={'underline'}>CONNECTEZ-VOUS</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftNavBar
