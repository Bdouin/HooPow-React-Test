import type {NextPage} from 'next'
import LeftNavBar from "../components/LeftNavBar";
import Home from "../components/Home";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

const Index: NextPage = () => {
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
        console.log(mainContent.current?.clientHeight)
        console.log(mainContent.current?.offsetHeight)
    }

    return (
        <div className="bg-black w-screen h-screen flex  overflow-hidden items-center content-center justify-center">
            <div
                className={'flex flex-col max-h-full max-w-full aspect-16/9 h-full bg-black overflow-hidden items-center content-center justify-center'}>
                {/* As you can see I've used 2 divs here the outer has a fixed height and a width varying depending on the aspect ratio*/}
                <div
                    id={'mainContent'}/*Not in use for now*/
                    ref={mainContent}
                    className={'flex flex-row max-h-full max-w-full aspect-16/9 w-full bg-blue-700 overflow-hidden items-stretch font-normal font-primary'}>
                    {/* Whereas the inner has a fixed width and a varying height depending on the same aspect ratio*/}
                    <LeftNavBar mainHeight={getHeight()}/>
                    <Home/>
                </div>
            </div>
        </div>)
}

export default Index
