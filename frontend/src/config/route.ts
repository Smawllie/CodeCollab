import Routes from "../@types/route";
import Home from "../pages/home";
import Login from '../pages/login';
import SignUp from '../pages/signup';

const routes  : Routes[] = [
    {
        path:'/login',
        name:'Login Page',
        exact:true,
        component:Login
    },
    {
        path:'/signup',
        name:"Sign Up Page",
        exact:true,
        component:SignUp
    },
    {
        path:'/',
        exact:true,
        name:'Home Page',
        component:Home
    }
];

export default routes;