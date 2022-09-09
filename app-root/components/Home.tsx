import type {NextPage} from 'next'
import {Key, useEffect} from "react";
import {any} from "prop-types";
import Image from "next/image";
import {format, getDay} from 'date-fns';
import Link from "next/link";


interface props {
    BDs: any;
    mainHeight: number;
}

const Home: NextPage<props> = ({mainHeight, BDs}) => {
    var weekName_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    return (
        <div
            className={'w-7/9 m-0 p-0 rounded-[1.3%] bg-gradient-to-b from-[rgb(47,47,47)] to-[rgb(4,4,4)] bg-fixed overflow-hidden'}>
            <div className={'flex relative flex-row h-full flex-wrap px-[8.3%] py-[3%] w-full overflow-auto'}>
                {BDs.record.map((BD: any) => {
                    let pubDate = new Date('' + BD.publicationDate)
                    return (
                        <div key={BD.bdKey}
                             className={'w-[25%] h-auto px-[1.7%] py-[0.43%]'}>
                            <Link
                                href={{
                                    pathname: '/BDs/' + BD.bdKey,
                                    query: {BD: BD.imageHomepage.toString(),name:BD.name,mainHeight:mainHeight},
                                }}>
                                <div
                                    className={'text-center flex flex-col  cursor-pointer'}>
                                    <Image width={'500px'} height={'500px'}
                                           src={"https://d2hkgoif6etp77.cloudfront.net/" + BD.imageHomepage}
                                           alt={'' + BD.bdKey}
                                           className={'rounded-[2%]'}
                                    />
                                    <div
                                        className={
                                            'pt-[2%] '
                                        }
                                        style={
                                            {fontSize: (mainHeight * 0.015).toString() + 'px'}
                                        }>
                                        <span
                                            className={'text-gray-500 opacity-90 font-BD-caption'}>{((getDay(pubDate) < 7) && weekName_FR[getDay(pubDate)]) + format(pubDate, ' dd - ')}
                                        </span>
                                        <span
                                            className={'font-black opacity-100'}
                                            style={{textShadow: (mainHeight * 0.0012).toString() + "px 0"}}>
                                            {BD.name.charAt(0).toUpperCase() + BD.name.slice(1).toLowerCase()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
