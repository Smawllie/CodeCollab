import { useAuthDispatch, useAuthState,DeleteSession } from "../context";


export default function Navbar(props:any){
    const dispatch = useAuthDispatch();
	const userDetails = useAuthState();
    function handleLogout(){

        // DeleteSession(dispatch);
		// props.history.push('/login');
    };

    return(
        <header>
            <a href="/" className="text-6xl text-blue-500">
                CodeCollab
            </a>
            <nav>
                {/* <ul className="flex space-x-4 justify-space-between">
                    <li>About</li>
                    <li>Contact</li> 
                    <li><a href="/login">Sign In</a></li> 
                    <li><a href="/signup">Sign Up</a></li> 
                </ul> */}
                <button className="outline-none " onClick={handleLogout} >Logout</button>
            </nav>
        </header>
        );
}