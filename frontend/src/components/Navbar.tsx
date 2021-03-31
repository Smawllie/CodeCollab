import {useLazyQuery} from '@apollo/client';
import { useHistory } from "react-router-dom";
import AuthOperations from '../graphql/operations/authOperations';
import LogoutButton from './logout';

export default function Navbar(){

    let history = useHistory();
    function handleLogout(){
        history.push('/');
    };

   return (
        <header className="justify-between px-3">
            <a href="/" className="text-6xl text-blue-500 px-3">
                CodeCollab
            </a>
            <nav className="float-right px-5 py-2">
            <button
				className="outline-none p-1 flex flex-no-wrap items-between hover:ring-3 hover:bg-blue-100 font-bold py-2 px-4 rounded"
				onClick={()=>{return handleLogout}}
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