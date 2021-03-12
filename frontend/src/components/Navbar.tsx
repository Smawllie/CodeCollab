export default function Navbar(){
    return(
        <header>
            <a href="/" className="text-2xl text-blue-500">
                CodeCollab
            </a>
            <nav>
                <ul className="flex space-x-4 justify-space-between">
                    <li>About</li>
                    <li>Contact</li> 
                    <li><a href="/login">Sign In</a></li> 
                    <li><a href="/signup">Sign Up</a></li> 
                </ul>
            </nav>
        </header>
        );
}