import type {NextPage} from 'next'
import LeftNavBar from "../../components/LeftNavBar";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Slider from "react-slick"
import {LazyLoadImage} from 'react-lazy-load-image-component';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as ReactDOM from 'react-dom';
interface props {
    data: any,
    mainHeight: number,
}

const BDkey: NextPage<props> = ({data, mainHeight}) => {
    const [height, setHeight] = useState(0);
    const mainContent = useRef<any>(null);
    const [imageSources, setImageSources] = useState<{ id: number; source: string; }[]>([]);
    const {query} = useRouter();
    const sliderSettings = {
        dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1,
        appendDots: (dots: any) => (
            <div
                style={{overflow: "visible", bottom: "0"}}
            >
                <ul style={{margin: "10px"}}> {dots} </ul>
            </div>
        ),
    }

    function getHeight() {
        return height;
    }

    async function findSlides() {
        //console.log('let\'s find slides')
        let startsWithOne = (Number(query.BD?.slice(0, -4).toString().slice(-1).toString()) === 1)
        let partialFetchRequest: string
        if (startsWithOne) {
            partialFetchRequest = 'https://d2hkgoif6etp77.cloudfront.net/' + query.BD?.slice(0, -5).toString()
        } else {
            partialFetchRequest = 'https://d2hkgoif6etp77.cloudfront.net/' + query.BD?.slice(0, -4).toString() + '_0'
        }
        let BDSlideNumber = 1
        let thereIsMore = true
        while (thereIsMore && ++BDSlideNumber < 100) {/*So that it does not crash*/
            await fetch(partialFetchRequest + (BDSlideNumber) + '.jpg', {method: "HEAD"})
                .then((res) => {
                    if (res.ok) {
                        console.log(imageSources.length + "- id:" + BDSlideNumber)
                        setImageSources(imageSources => {
                            return [...imageSources, {
                                id: BDSlideNumber, source: partialFetchRequest + (BDSlideNumber) + '.jpg',
                            }]
                        })
                        console.log('#METOO :::' + imageSources.length + "- id:" + BDSlideNumber)

                    } else thereIsMore = false
                })
                .catch(err => {
                    console.log('❌❌❌' + err)
                });
        }
    }

    useEffect(() => {
        updateHeight() //The first time the page loads
        window.addEventListener("resize", updateHeight);

        if (query.BD && 0 == imageSources.length/*To avoid an infinite loop*/) {
            setImageSources(imageSources => {
                return [...imageSources, {id: 1, source: 'https://d2hkgoif6etp77.cloudfront.net/' + query.BD}];
            })
            findSlides().then(() => {
                return () => {
                    window.removeEventListener("resize", updateHeight);
                }
            })
        }

        return () => {
            window.removeEventListener("resize", updateHeight);
        }
    }, [query.BD, findSlides, imageSources.length]);

    function updateHeight() {
        setHeight(mainContent.current?.clientHeight)
    }

    function getImageSources() {
        return imageSources
    }

    function iAmFocusable(id: number) {
        console.log(id)
        return undefined;
    }
    //console.log(imageSources)
    return (
        <div className="bg-black w-screen h-screen flex  overflow-hidden items-center content-center justify-center">
            <div
                className={'flex flex-col max-h-full max-w-full aspect-16/9 h-full bg-black overflow-hidden items-center content-center justify-center'}>
                <div
                    id={'mainContent'}
                    ref={mainContent}
                    className={'flex flex-row py-[0.8%] max-h-full max-w-full aspect-16/9 w-full bg-black overflow-hidden items-stretch font-normal font-primary'}>
                    <LeftNavBar reading={true} mainHeight={getHeight()}/>
                    <div
                        className={'relative w-7/9 m-0 p-0 rounded-[1.3%] bg-gradient-to-b from-[rgb(47,47,47)] to-[rgb(4,4,4)] bg-fixed overflow-auto'}>

                        <div className={"absolute top-0 right-0 flex flex-row px-[2%] py-[0.1%] bg-[#51aabc]"}
                             style={{borderBottomLeftRadius: "0.6vw"}}
                        >
                                <span className={'whitespace-nowrap grid items-center'} style={{
                                    fontSize: '1.33vw',
                                    lineHeight: '1.33vw',
                                }}>
                                   Disponible gratuitement :
                                </span>
                            <span className={'block font-black'}
                                  style={{
                                      paddingTop: "0.4vw",
                                      paddingBottom: "0.4vw",
                                      paddingLeft: "1.6vw",
                                      paddingRight: "1.6vw",
                                      fontSize: '1.33vw',
                                      lineHeight: '1.33vw',
                                  }}>
                                LA BD DU JOUR
                               </span>
                        </div>
                        <div
                            className={'flex relative justify-center items-center flex-center mt-[5%] w-full overflow-auto'}>
                            <div className={' w-[60%] h-full text-center items-center flex'}>
                                <div className={' w-full h-full text-white overflow:visible'}>
                                    <Slider {...sliderSettings}>
                                        {imageSources.map((imageSource: any) => {
                                            return (
                                                <Image key={imageSource.id}
                                                       id={"slide"+imageSource.id.toString()}
                                                       onFocus={iAmFocusable(imageSource.id)}
                                                       src={imageSource.source}
                                                       alt={""}
                                                       height={"500px"}
                                                       width={"500px"}/>
                                            )
                                        })}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default BDkey
