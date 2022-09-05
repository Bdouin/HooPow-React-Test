import type {NextPage} from 'next'
import {useEffect} from "react";
import {any} from "prop-types";
import Image from "next/image";
import ImagesBD from "../pages/imagesBD";

interface props {
    BDs: any
}

const Home: NextPage<props> = ({BDs}) => {
    console.log(BDs)
    return (
        <div className={'w-7/9 relative m-0 p-0 bg-gray-800'}>
            <div>
                {BDs.record.map((BD) => {
                    return(<div>{BD.bdKey}</div>)
                })}
                <ImagesBD/>
            </div>
        </div>
    )
}

export default Home
