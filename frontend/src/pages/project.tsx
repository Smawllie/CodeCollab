/* import React from "react"; */
import { withRouter } from "react-router-dom";
import Navbar from "../components/Navbar"

function ProjectsPage() {
    return (
        <div className="bg-blue-50">
            <Navbar/>
            <h1>Test Header</h1>
        </div>
    );
}

export default withRouter(ProjectsPage);
