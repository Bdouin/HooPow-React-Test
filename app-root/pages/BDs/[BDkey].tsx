import type {NextPage} from 'next'
import LeftNavBar from "../../components/LeftNavBar";
import Home from "../../components/Home";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {GetServerSideProps} from "next";

interface props {
    data: any
}

const BDkey: NextPage<props> = ({data}) => {
    const [height, setHeight] = useState(0);
    const mainContent = useRef<any>(null);
    // I used <any> to avoid TS2339: Property 'clientHeight' does not exist on type 'never'.
    // More here: https://stackoverflow.com/questions/64630528/ts2531-object-possibly-null

    function getHeight() {
        return height;
    }

    useEffect(() => {
        updateHeight() //The first time the page loads
        window.addEventListener("resize", updateHeight);
        return () => {
            window.removeEventListener("resize", updateHeight);
        }
    });

    function updateHeight() {
        setHeight(mainContent.current?.clientHeight)
    }

    return (
        <div className="bg-black w-screen h-screen flex  overflow-hidden items-center content-center justify-center">
            <div
                className={'flex flex-col max-h-full max-w-full aspect-16/9 h-full bg-black overflow-hidden items-center content-center justify-center'}>
                {/* As you can see I've used 2 divs here the outer has a fixed height and a width varying depending on the aspect ratio*/}
                <div
                    id={'mainContent'}
                    ref={mainContent}
                    className={'flex flex-row py-[0.8%] max-h-full max-w-full aspect-16/9 w-full bg-black overflow-hidden items-stretch font-normal font-primary'}>
                    {/* Whereas the inner has a fixed width and a varying height depending on the same aspect ratio*/}
                    <LeftNavBar mainHeight={getHeight()}/>

                    <div
                        className={'w-7/9 m-0 p-0 rounded-[1.3%] bg-gradient-to-b from-[rgb(47,47,47)] to-[rgb(4,4,4)] bg-fixed overflow-hidden'}>
                        <div
                            className={'flex relative flex-row h-full flex-wrap px-[8.3%] py-[3%] w-full overflow-auto'}>
                            <Image width={'500px'} height={'500px'}
                                   src={"https://d2hkgoif6etp77.cloudfront.net/" }
                                   alt={''}
                                   className={'rounded-[2%]'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BDkey
