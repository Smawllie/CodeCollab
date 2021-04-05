import React from "react";

interface ErrorProps {
    message:string;
	setVisible:Function;
}

function Error({ message,setVisible}:ErrorProps) {
	
		return (
		
			<div className="flex justify-between items-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
				<div>
					<span className="font-semibold text-red-700">{message}</span>
				</div>
				<div>
					<button type="button" className=" text-red-700" onClick={()=>{
						return setVisible(false);}}>
						<span className="text-2xl">&times;</span>
					</button>
				</div>
			</div>
		);
	}

export default Error;
