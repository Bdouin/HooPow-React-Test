import type {NextPage} from 'next'
import {useEffect} from "react";
import {any} from "prop-types";
import Image from "next/image";

const Home: NextPage = () => {

    return (
        <div className={'w-7/9 relative m-0 p-0 bg-gray-800'}>
            Home
<Image width="100px" height={"100px"} src={'https://d2hkgoif6etp77.cloudfront.net/images/MSHOW_01_ADDITION_01.jpg'}/>        </div>
    )
}

export default Home
