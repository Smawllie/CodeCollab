import React, { FormEvent } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import {  useMutation } from '@apollo/client';
import {loader} from 'graphql.macro';
import User from '../@types/user';
import Error from '../components/Error';

const Signup: React.FunctionComponent<any & RouteComponentProps<any>> = (props) => {
	const [userInfo,setUserInfo ] = React.useState<User>({
		email:'',
		password:''
	})

	const SignUpMutation = loader('../graphql/operations/signUp.gql');
	const [ signUpUser, { data, error } ] = useMutation(SignUpMutation);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		signUpUser({ variables: { ...userInfo } });
	}


	return (
		<div className="bg-blue-100 h-screen w-screen">
			{data ? <div>Logged In</div>:<></>}
			{error ? <Error message={error.message} /> :<></>}
			<div className="flex flex-col">
				<header className="flex justify-center pt-12">
					<Link to="/" className="bg-blue-700 text-white font-bold text-xl p-4">
						CodeCollab
					</Link>
				</header>
				<div className="flex flex-col items-center md:justify-start my-auto pt-8 md:px-24 lg:px-32">
					<p className="text-4xl text-blue-700 text-center w-full">Sign Up</p>
					<div className="bg-white shadow-lg flex w-full flex-1 mt-4">
						<div
							className="bg-fixed bg-cover flex-1"
							style={{ backgroundImage: `url(/media/form_bg.jpg)` }}
						/>
						<form className="flex flex-col flex-auto pt-3 md:pt-8 m-2 p-4" onSubmit={handleSubmit}>
							<div className="flex flex-col pt-4">
								<label className="text-lg text-light text-gray-500">Email</label>
								<input
									onChange={(e) => {
										setUserInfo({...userInfo,email:e.target.value});
									}}
									name="email"
									type="email"
									className="shadow-sm appearance-none rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:ring-4 focus:outline-none focus:ring-blue-600 focus:ring-opacity-50"
								/>
							</div>
							<div className="flex flex-col pt-4">
								<label className="text-lg text-light text-gray-500">Password</label>
								<input
									onChange={(e) => {
										setUserInfo({...userInfo,password:e.target.value});;
									}}
									name="password"
									type="password"
									className="shadow-sm appearance-none rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:ring-4 focus:outline-none focus:ring-blue-600 focus:ring-opacity-50"
								/>
							</div>
							<input
								type="submit"
								value="Sign Up"
								className="block text-center no-underline w-70 bg-blue-700 text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
							/>
						</form>
					</div>

					<div className="text-center pt-12 pb-12">
						<p>
							Already have an account?
							<Link to="/login" className="px-3 underline font-semibold">
								Sign In here.
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Signup);
