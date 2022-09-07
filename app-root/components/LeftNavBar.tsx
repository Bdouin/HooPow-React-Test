import type {NextPage} from 'next'
import Image from "next/image";
import imgMuslimShow from "../public/assets/img/MUSLIM SHOW.svg"
import imgHOOPOW from "../public/assets/img/LOGO HOOPOW.svg"
import {useState} from "react";
import Link from "next/link";
import imgTelegram from "../public/assets/img/Telegram.svg";
import imgMAIL from "../public/assets/img/MAIL.svg";
import imgLinkedIn from "../public/assets/img/LinkedIn.svg";
interface Props {
    mainHeight: number;
}

const LeftNavBar: NextPage<Props> = ({mainHeight}) => {
    const [sideMenuVisibility, setSideMenuVisibility] = useState(false);
    return (
        <div className={'w-2/9 m-0 relative font-primary bg-dark px-[1.15%] flex flex-col text-center bg-cover'}>
            <div className={'w-full flex justify-center items-center align-center items-center flex-center mb-[2.5%]'}>
                <div className={"w-[20%] mr-[5%] text-black flex justify-center items-center flex-center"}>
                    <div className={'bg-white relative flex flex-col rounded-[25%] justify-center items-center text-center'} style={{width: (mainHeight * 0.06).toString() + 'px', height:  (mainHeight * 0.06).toString() + 'px'}}
                         onClick={() => setSideMenuVisibility(!sideMenuVisibility)}>
                        <span className={(sideMenuVisibility&&'opacity-0 '||'opacity-100')+' ease-in-out duration-300 bg-[#51aabc]  rounded-[20%] my-[3%]'} style={{height: (mainHeight * 0.0045).toString() + 'px',width: (mainHeight * 0.04).toString() + 'px',}}></span>
                        <span className={(sideMenuVisibility&&'rotate-45 '||'rotate-0 opacity-100')+' ease-in-out duration-300 bg-[#51aabc]  rounded-[20%] my-[3%]'} style={{height: (mainHeight * 0.0045).toString() + 'px',width: (mainHeight * 0.04).toString() + 'px',}}></span>
                        <span className={(sideMenuVisibility&&'-rotate-45 '||'rotate-0 opacity-100')+' z-10 absolute ease-in-out duration-300 bg-[#51aabc]  rounded-[20%] my-[3%]'} style={{height: (mainHeight * 0.0045).toString() + 'px',width: (mainHeight * 0.04).toString() + 'px',}}></span>
                        <span className={(sideMenuVisibility&&'opacity-0 '||'opacity-100')+' ease-in-out duration-300 bg-[#51aabc]  rounded-[20%] my-[3%]'} style={{height: (mainHeight * 0.0045).toString() + 'px',width: (mainHeight * 0.04).toString() + 'px',}}></span>
                    </div>
                </div>
                <div className={'w-[64%] font-BD grid center'}>
                    <Link href={'/'}><Image alt={'HOO POW'} className={'cursor-pointer'} src={imgHOOPOW}/></Link>
                </div>
            </div>
            <div className={'w-full relative flex-grow block flex flex-col justify-between content-center '}>
                <div
                    className={(sideMenuVisibility ? '  h-[98%] z-50 ' : ' h-[1px] -z-50 ') + ' absolute flex flex-col text-gray-700 duration-700 rounded-[5%] bg-white ' +
                        ' px-[6%] py-[10%] ease-in-out  font-black top-0 left-0 w-full overflow:hidden'}
                    style={{fontSize:(mainHeight*0.019).toString()+"px",textShadow: (mainHeight * 0.0011).toString() + "px 0"}}>
                    <div className={"my-[4%] py-[1%] bg-gray-300 hover:bg-gray-700 hover:text-white"} style={{borderRadius:(mainHeight*0.2).toString()+"px"}}><a className={'w-full inline-block'} href={'/'}>MYYAGIS</a></div>
                    <div className={"my-[4%] py-[1%] bg-gray-300 hover:bg-gray-700 hover:text-white"} style={{borderRadius:(mainHeight*0.2).toString()+"px"}}><a className={'w-full inline-block'} href={'#my-space'}>MON ESPACE MEMBRE</a></div>
                    <div className={"my-[4%] py-[1%] bg-gray-300 hover:bg-gray-700 hover:text-white"} style={{borderRadius:(mainHeight*0.2).toString()+"px"}}><a className={'w-full inline-block'} href={'#gift-sub'}>OFFRIR UN ABONNEMENT</a></div>
                    <div className={"my-[4%] py-[1%] "}><hr/></div>
                    <div className={"my-[4%] py-[1%] text-left"} style={{textShadow: "none"}}><a href={""} className={'block w-full flex flex-row'}><div className={'w-[20%] mr-[5%] grid content-center'}><Image src={imgMAIL} width={"50"}  height={"50"} alt={''}/></div><div className={'grid content-center'} style={{lineHeight:(mainHeight*0.0012).toString()}}>NOUS<br/>CONTACTER</div></a></div>
                    <div className={"my-[4%] py-[1%] text-left"} style={{textShadow: "none"}}><a href={""} className={'block w-full flex flex-row'}><div className={'w-[20%] mr-[5%] grid content-center'}><Image src={imgTelegram} width={"50"}  height={"50"} alt={''}/></div><div className={'grid content-center'} style={{lineHeight:(mainHeight*0.0012).toString()}}>NOUS SUIVRE<br/>SUR TELEGRAM</div></a></div>
                    <div className={"my-[4%] py-[1%] text-left"} style={{textShadow: "none"}}><a href={""} className={'block w-full flex flex-row'}><div className={'w-[20%] mr-[5%] grid content-center'}><Image src={imgLinkedIn} width={"50"}  height={"50"} alt={''}/></div><div className={'grid content-center'} style={{lineHeight:(mainHeight*0.0012).toString()}}>NOUS SUIVRE<br/>SUR LINKEDIN</div></a></div>
                    <div className={"my-[4%] py-[1%] "}><hr/></div>
                    <div className={"my-[4%] py-[1%] bg-gray-300 hover:bg-gray-700 hover:text-white"} style={{borderRadius:(mainHeight*0.2).toString()+"px"}}><a className={'w-full inline-block'} href={'#agreement'}>CONDITIONS D&apos;UTILISATION</a></div>
                    <div className={"my-[4%] py-[1%] bg-gray-300 hover:bg-gray-700 hover:text-white"} style={{borderRadius:(mainHeight*0.2).toString()+"px"}}><a className={'w-full inline-block'} href={'#sign-out'}>SE DÉCONNECTER</a></div>
                </div>
                <div className={(sideMenuVisibility && "opacity-0")+" delay-300 w-full block px-[2.8%] bg-[#51aabc] rounded-[5%]"}
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
                <div
                    className={"flex flex-col h-[52%] rounded-[7%] justify-between  content-between items-center overflow-hidden" +
                        " bg-[#51aabc] bg-[length:54%_60%] bg-[right_bottom_-3%] bg-no-repeat bg-[url('../public/assets/img/Image-Kid-227.png')]"}>
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
