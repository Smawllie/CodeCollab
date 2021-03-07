export default function Login() {
	return (
		<div className="bg-white h-screen">
			<div className="w-100 flex flex-col">
				<header className="flex justify-center pt-12">
					<a href="#" className="bg-black text-white font-bold text-xl p-4">
						CodeCollab
					</a>
				</header>
				<div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:px-24 lg:px-32">
					<p className="text-center text-3xl">Login</p>
					<form className="flex flex-col pt-3 md:pt-8">
						<div className="flex flex-col pt-4">
							<label className="text-lg"> Username</label>
							<input className="shadow appearance-none borded rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow:outline" />
						</div>
						<div className="flex flex-col pt-4">
							<label className="text-lg">Password</label>
							<input
								type="password"
								className="shadow appearance-none borded rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow:outline"
							/>
						</div>
						<input
							type="submit"
							value="Login"
							className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
						/>
					</form>
					<div className="text-center pt-12 pb-12">
						<p>
							Don't have an account?
							<a href="#" className="px-3 underline font-semibold">
								Register here.
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
