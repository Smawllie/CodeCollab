import {useMutation} from '@apollo/client';
import { useHistory,Link } from "react-router-dom";
import AuthOperations from '../graphql/operations/authOperations';

export default function Navbar(){

    let history = useHistory();
    const [logout] = useMutation(AuthOperations.logout);

    function handleLogout(){
        logout().then(({data})=>{
            if(data.signOut) history.push('/');
            else throw new Error("Cannot log out");
        }).catch(error=>{
            console.log(error);
        });
  
    };

   return (
        <header className="justify-between px-3 py-3">
            <Link to="/" className="text-6xl text-blue-500 px-3">
                CodeCollab
            </Link>
            <nav className="float-right px-5 py-2">
            <button
				className="outline-none flex flex-no-wrap items-between hover:ring-3 hover:bg-blue-100 font-bold px-4 rounded"
				onClick={handleLogout}
			>
				<span className="text-blue-500 py-3">Logout</span>
				<img
					className="w-full h-full py-1/2"
					src="/media/logout.svg"
					style={{ height: '40px', width: '55px' }}
				/>
			</button>
            </nav>
        </header>
        );
}