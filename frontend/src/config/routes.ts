import Routes from "../@types/route";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Page404 from "../pages/404";
import ProjectsPage from "../pages/project";
import ProjectEditPage from "../pages/projectEdit";
import ProjectViewPage from "../pages/projectView";

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
        path: "/project/:projectId/edit",
        exact: true,
        name: "Project Editing Page",
        component: ProjectEditPage,
        protected: true,
    },
    // {
    //     path: "/project/:projectId/view",
    //     exact: true,
    //     name: "Project Viewing Page",
    //     component: ProjectViewPage,
    //     protected: true,
    // },
    {
        path: "/*",
        name: "Not found",
        component: Page404,
        protected: true,
        exact: true,
    },
];

export default routes;
