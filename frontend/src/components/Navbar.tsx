import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import AuthOperations from "../graphql/operations/authOperations";
import ProjectOperations from "../graphql/operations/projectOperations";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LoadingScreen from "./LoadingScreen";

export default function Navbar() {
    let history = useHistory();
    const [logout] = useMutation(AuthOperations.logout);
    const { data, loading } = useQuery(ProjectOperations.getCurrentUser);

    // Logout
    function handleLogout() {
        logout()
            .then(({ data }) => {
                if (data.signOut) history.push("/");
                else throw new Error("Cannot log out");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Profile icon
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (loading) return <LoadingScreen />;

   return (

        <header className="justify-between px-3 py-3">
            <Link to="/" className="text-6xl text-blue-500 px-3">
                CodeCollab
            </Link>
            <nav className="flex flex-row-reverse float-right px-5 py-2">
                <button
                    className="outline-none p-1 flex flex-no-wrap items-between hover:ring-3 hover:bg-blue-100 font-bold py-2 px-4 rounded ml-5"
                    onClick={handleLogout}
                >
                    <span className="text-blue-500 py-3">Logout</span>
                    <img
                        className="w-full h-full py-1/2"
                        src="/media/logout.svg"
                        style={{ height: "40px", width: "55px" }}
                    />
                </button>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={"primary-search-account-menu"}
                    aria-haspopup="true"
                    onClick={handleOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        Signed in as: {data.getCurrentUser.email}
                    </MenuItem>
                </Menu>
            </nav>
        </header>
    );
}
