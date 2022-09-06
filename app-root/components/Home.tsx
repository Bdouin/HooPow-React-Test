import type {NextPage} from 'next'
import {Key, useEffect} from "react";
import {any} from "prop-types";
import Image from "next/image";

interface props {
    BDs: any
}

const Home: NextPage<props> = ({BDs}) => {
    console.log(BDs)
    return (
        <div className={'w-7/9 m-0 p-0 rounded-[1.3%] bg-gradient-to-b from-[rgb(47,47,47)] to-[rgb(4,4,4)] bg-fixed '}>
            <div className={'flex relative flex-row h-full flex-wrap px-[8.3%] py-[3%] w-full overflow-auto'}>
                {BDs.record.map((BD: { bdKey: Key | null | undefined; imageHomepage: string; }) => {
                    return (
                        <div key={BD.bdKey} className={'w-[23%] text-center aspect-1 h-auto p-[2%] '}>
                            <Image width={'500px'} height={'500px'} src={"https://d2hkgoif6etp77.cloudfront.net/"+BD.imageHomepage} alt={''+BD.bdKey}/>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Home
