import React from 'react';
import { Link,withRouter } from 'react-router-dom';
function Page404() {
	return (
        <div className="bg-gray-600 h-screen w-screen">
            <h1 className="absolute top-1/3 text-white text-center text-9xl font-serif">404 Page Not Found</h1>
            <p><Link to='/' className="no-underline absolute top-2/3 text-white text-center text-5xl font-serif"> Go to Home </Link></p>
        </div>
	);
}

export default withRouter(Page404);
