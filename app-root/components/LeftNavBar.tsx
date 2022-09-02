import type {NextPage} from 'next'

interface Props {
    mainHeight: number;
}

const LeftNavBar: NextPage<Props> = ({mainHeight}) => {
    return (
        <div className={'w-2/9 m-0 p-0 bg-gray-600 px-3 flex flex-col text-center'}>
            <div className={'w-full block py-3'}>
                <div className={'w-1/6 inline-block'}>|||</div>
                <div className={'inline-block'}>HOO POW</div>
            </div>
            <div className={"w-full block pt-7 pb-12 px-12"}>
                <span className={'block whitespace-nowrap'} style={{
                    fontSize: (mainHeight * 0.02).toString() + 'px',
                    lineHeight: (mainHeight * 0.03).toString() + 'px'
                }}>
                    Disponible gratuitement:
                </span>
                <span className={'block font-bold'}
                      style={{
                          fontSize: (mainHeight * 0.027).toString() + 'px',
                          lineHeight: (mainHeight * 0.03).toString() + 'px'
                      }}>
                    LA BD DU JOUR
                </span>
            </div>
            MUSLIM SHOW
        </div>
    )
}

export default LeftNavBar
