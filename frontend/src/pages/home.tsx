import Navbar from "../components/Navbar";

export default function Home(){
    return (<div className="w-screen h-7">
        <Navbar/>
        <div className="py-3">
           <h4>Welcome to code collab</h4> 
            <h5 className="py-2">Only place to get work done with your collegues in 2021</h5>
        </div>
    </div>);
}