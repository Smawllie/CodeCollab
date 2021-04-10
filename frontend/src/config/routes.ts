import Routes from "../@types/route";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Page404 from "../pages/404";
import ProjectsPage from "../pages/project";
import ProjectPage from "../pages/projectEdit";

const routes: Routes[] = [
    {
        path: "/",
        name: "Login Page",
        exact: true,
        component: Login,
        protected: false,
    },
    {
        path: "/signup",
        name: "Sign Up Page",
        exact: true,
        component: SignUp,
        protected: false,
    },
    {
        path: "/projects",
        exact: true,
        name: "Projects page",
        component: ProjectsPage,
        protected: true,
    },
    {
        path: "/project/:projectId/",
        exact: true,
        name: "Project Page",
        component: ProjectPage,
        protected: true,
    },
    {
        path: "/*",
        name: "Not found",
        component: Page404,
        protected: true,
        exact: true,
    },
];

export default routes;
