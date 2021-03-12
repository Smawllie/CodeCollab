import React from 'react';
import Error from '../@types/error';
const ErrorBox = ({ message }: Error) => {
	return (
		<div className="fixed z-1 left-0 top-0 w-full h-2/5 overflow-auto bg-red-200 position">
			<div className="bg-white my-15/100 mx-auto p-5 border-red-700 w-4/5">
			<span className="text-black float-right text-lg text-bold cursor-pointer">&times;</span>
			<p>{message}</p>
			</div>
		</div>
	);
};
export default ErrorBox;
