import type {NextPage} from 'next'
import LeftNavBar from "../../components/LeftNavBar";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface props {
    data: any,
    mainHeight: number,
}

const BDkey: NextPage<props> = ({data, mainHeight}) => {
    const [height, setHeight] = useState(0);
    const mainContent = useRef<any>(null);
    const [imageSources, setImageSources] = useState<{ id: number; source: string; }[]>([]);
    const {query} = useRouter();
    const [afterChange, setAfterChange] = useState(0);


    function fctAfterChange(current: React.SetStateAction<number>) {
        setAfterChange(current)
    }

    const sliderSettings = {
        dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1,
        afterChange: (current: any) => fctAfterChange(current),
        appendDots: (dots: any) => (
            <div
                style={{overflow: "visible", display: "block"}}
            >
                <ul style={{margin: "1vmin"}}> {dots} </ul>
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

        let BDSlideNumber = 1
        let thereIsMore = true
        if (startsWithOne) {
            partialFetchRequest = 'https://d2hkgoif6etp77.cloudfront.net/' + query.BD?.slice(0, -5).toString()
            while (thereIsMore && BDSlideNumber < 20) {/*So that it does not crash*/
                await fetch((partialFetchRequest + (BDSlideNumber) + '.jpg'),
                    {method: "HEAD"})
                    .then((res) => {//@TODO we could use axios
                        if (res.ok) {
                            updateImageSources(res, BDSlideNumber, partialFetchRequest, startsWithOne)
                        } else thereIsMore = false
                    })
                    .catch(err => {
                        console.log('❌❌❌' + err)
                    });
                BDSlideNumber++
            }
        } else {
            partialFetchRequest = 'https://d2hkgoif6etp77.cloudfront.net/' + query.BD?.slice(0, -4).toString() + '_0'
            while (thereIsMore && BDSlideNumber < 20) {/*So that it does not crash*/
                await fetch((1 === BDSlideNumber) ? ('https://d2hkgoif6etp77.cloudfront.net/' + query.BD) : (partialFetchRequest + (BDSlideNumber) + '.jpg'),
                    {method: "HEAD"})
                    .then((res) => {//@TODO learn about axios
                        if (res.ok) {
                            updateImageSources(res, BDSlideNumber, partialFetchRequest, startsWithOne)
                        } else thereIsMore = false
                    })
                    .catch(err => {
                        console.log('❌❌❌' + err)
                    });
                BDSlideNumber++
            }
        }

    }

    function updateImageSources(res: Response, BDSlideNumber: string | number, partialFetchRequest: string, startsWithOne: boolean) {
        //console.log("BDSlideNumber:" + BDSlideNumber)
        setImageSources(/*@ts-ignore*/
            imageSources => {
                //console.log("For the " + BDSlideNumber + "th time: " + [...imageSources])
                if (imageSources.map(
                    (imgSrc) => {
                        return imgSrc.source
                    }).indexOf(((1 === BDSlideNumber && !startsWithOne) ? ('https://d2hkgoif6etp77.cloudfront.net/' + query.BD) : (partialFetchRequest + (BDSlideNumber) + '.jpg'))) < 0)
                    return [...imageSources, {
                        id: BDSlideNumber,
                        source: (1 === BDSlideNumber && !startsWithOne) ? ('https://d2hkgoif6etp77.cloudfront.net/' + query.BD) : (partialFetchRequest + (BDSlideNumber) + '.jpg'),
                    }]
                else return
            })
        //console.log({            id: BDSlideNumber, source: partialFetchRequest + (BDSlideNumber) + '.jpg',})
    }

    useEffect(() => {
        updateHeight() //The first time the page loads
        window.addEventListener("resize", updateHeight);

        console.log('i fire once ?');
        if (query.BD && 0 == imageSources.length/*To avoid an infinite loop*/) {
            /* setImageSources(imageSources => {
                 return [...imageSources, {id: 1, source: 'https://d2hkgoif6etp77.cloudfront.net/' + query.BD}];
             })*/
            findSlides().then(() => {
                return () => {
                    window.removeEventListener("resize", updateHeight);
                }
            })

        }
        return () => {
            window.removeEventListener("resize", updateHeight);
        }
        }, []);

    function updateHeight() {
        setHeight(mainContent.current?.clientHeight)
    }

    function getImageSources() {
        return imageSources
    }

    function iAmFocusable(id: number) {
        //console.log(id)
        return undefined;
    }

    console.log(imageSources)
    return (
        <div className="bg-black w-screen h-screen flex  overflow-hidden items-center content-center justify-center">
            <div
                className={'relative flex flex-col max-h-full max-w-full aspect-16/9 h-full bg-black overflow-hidden items-center content-center justify-center'}>
                <div
                    id={'mainContent'}
                    ref={mainContent}
                    className={'flex flex-row py-[0.8%] max-h-full max-w-full aspect-16/9 w-full bg-black overflow-hidden items-stretch font-normal font-primary'}>
                    <LeftNavBar currentSlide={afterChange} reading={true} mainHeight={getHeight()}/>
                    <div
                        className={'relative w-full m-0 p-0 rounded-[1.3%] bg-gradient-to-b from-[rgb(47,47,47)] to-[rgb(4,4,4)] bg-fixed overflow-auto'}>

                        <div
                            className={(afterChange !== 0) ? "hidden" : "absolute top-0 right-0 flex flex-row px-[2%] py-[0.1%] bg-[#51aabc]"}
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
                            className={'flex h-[95%] relative justify-center items-center flex-center pt-[5%] w-full overflow-auto'}>
                            <div className={' w-[50%] text-center  items-center flex'}>
                                <div className={' w-full text-white overflow:visible'}>
                                    <Slider {...sliderSettings}>
                                        {imageSources.map((imageSource: any) => {
                                            return (
                                                <Image key={imageSource.id}
                                                       src={imageSource.source}
                                                       alt={""}
                                                       height={"1500px"}
                                                       width={"1500px"}/>
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
