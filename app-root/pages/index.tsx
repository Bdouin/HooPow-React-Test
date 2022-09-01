import type {NextPage} from 'next'
import LeftNavBar from "../components/LeftNavBar";
import Home from "../components/Home";

const Index: NextPage = () => {
    return (
        <div className={'m-0 p-0 flex w-screen h-max bg-red-900'}>
            <LeftNavBar/>
            <Home/>
        </div>
    )
}

export default Index
