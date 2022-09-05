/*
import type {
    InferGetStaticPropsType,
    NextPage
} from 'next'
import {GetStaticProps} from 'next'
import {
    Key,
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal
} from 'react'

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://api.jsonbin.io/v3/b/60d15d6c8ea8ec25bd12c083')
    const data = await res.json()

    return {
        props: {data}
    }
}
var record: {
    publicationDate: string;
    bdKey: number;
    lockedTimestamp: number;
    bdImage_toDelete: any;
    enableEditMode: boolean;
    imageHomepage: string;
    locked: boolean;
    lockedBy: string;
    mainId: string;
    id: string;
    name: string;
}

interface IndexPageProps {
    data: {
        record: typeof record
    }[];
}

const ImagesBD: NextPage<IndexPageProps> = ({data}) => {
    return (
        <div className={'w-7/9 relative m-0 p-0 bg-gray-800'}>
            <h1>DATA </h1>
            <div>
                <ul>

                </ul>
            </div>
        </div>
    )
}

export default ImagesBD
*/
import {GetServerSideProps, GetStaticProps} from "next";


export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('https://api.jsonbin.io/v3/b/60d15d6c8ea8ec25bd12c083')
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data
        }
    }
}
export default function ImagesBD({/*data*/}) {
    return (
        <>
            <h1>Data</h1>
            <p>
                API:
            </p>
            <ul>
                {/*
                    data.map((item, index) => {
                        <li key={{index}}>(item)</li>
                    })
                */}
            </ul>
        </>
    )
}