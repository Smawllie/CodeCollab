import React from 'react';
import { RouteComponentProps, withRouter, Link, useHistory } from 'react-router-dom';
import { UserForm } from '../@types/user';
import { useMutation } from '@apollo/client';
import AuthOperations from '../graphql/operations/authOperations';
import ErrorBox from '../components/Error';

const Login: React.FunctionComponent<any & RouteComponentProps<any>> = (props) => {
	const [ userInfo, setUserInfo ] = React.useState<UserForm>({ email: '', password: '' }); //userinfo for form submission

	// authentication status

	const [ loginUser ] = useMutation(AuthOperations.SignIn);
	const [ error, setError ] = React.useState<any>(null);
	const [ visible, setVisible ] = React.useState(false);
	let history = useHistory();
	const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		loginUser({ variables: userInfo })
			.then(async (response) => {
				if (response.data) {
					history.push('/editor');
				}
			})
			.catch((e) => {
				console.log(error);
				setError(<ErrorBox message={e.message} setVisible={setVisible} />);
				setVisible(true);
			});
	};

	return (
		<div className="bg-blue-100 h-screen">
			<div className="flex flex-col">
				<header className="flex justify-center pt-12">
					<Link to="/" className="bg-blue-700 text-white font-bold text-xl p-4">
						CodeCollab
					</Link>
				</header>
				{visible && error}
				<div className="flex flex-col items-center md:justify-start my-auto w-full h-full pt-8 md:px-24 lg:px-32">
					<p className="text-4xl text-blue-700 w-full text-center">Login</p>
					<div className="bg-white shadow-lg flex w-3/5 h-full m-4">
						<div
							className="bg-fixed bg-cover w-2/5"
							style={{ backgroundImage: `url(/media/form_bg.jpg)` }}
						/>
						<form className="flex flex-col pt-3 w-3/5 h-full md:pt-8 p-10" onSubmit={submitForm}>
							<div className="flex flex-col pt-4">
								<label className="text-lg text-light text-gray-500"> Email </label>
								<input
									name="email"
									onChange={(e) => {
										setUserInfo({ ...userInfo, email: e.target.value });
									}}
									type="email"
									className="shadow-sm appearance-none rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:ring-4 focus:outline-none focus:ring-blue-600 focus:ring-opacity-50"
								/>
							</div>
							<div className="flex flex-col pt-4">
								<label className="text-lg text-light text-gray-500">Password</label>
								<input
									name="password"
									onChange={(e) => {
										setUserInfo({ ...userInfo, password: e.target.value });
									}}
									type="password"
									className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:ring-4 focus:outline-none focus:ring-blue-600 focus:ring-opacity-50"
								/>
							</div>
							<input
								type="submit"
								value="Login"
								className="bg-blue-700 text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
							/>
						</form>
					</div>
					<div className="text-center pt-12 pb-12">
						<p>
							Don't have an account?
							<Link to="/signup" className="px-3 underline font-semibold">
								Register here.
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default withRouter(Login);
