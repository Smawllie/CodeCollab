export default function Signup() {
	return (
		<div className="bg-white h-screen">
			<div className="w-100 flex flex-col">
				<header className="flex justify-center pt-12">
					<a href="#" className="bg-black text-white font-bold text-xl p-4">
						CodeCollab
					</a>
				</header>
				<div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:px-24 lg:px-32">
					<p className="text-center text-3xl">Sign Up</p>
					<form className="flex flex-col pt-3 md:pt-8">
						<div className="flex flex-col pt-4">
							<label className="text-lg text-light text-gray-700">First name</label>
							<input className="shadow appearance-none borded rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow:outline" />
						</div>
						<div className="flex flex-col pt-4">
							<label className="text-lg text-light text-gray-700">Last Name</label>
							<input className="shadow appearance-none borded rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow:outline" />
						</div>
						<div className="flex flex-col pt-4">
							<label className="text-lg text-light text-gray-700">Username</label>
							<input className="shadow appearance-none borded rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow:outline" />
						</div>
						<div className="flex flex-col pt-4">
							<label className="text-lg text-light text-gray-700">Password</label>
							<input
								type="password"
								className="shadow appearance-none borded rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow:outline"
							/>
						</div>
						<input
							type="submit"
							value="Sign Up"
							className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
						/>
					</form>
				<div className="py-5"/>
				</div>
			</div>
		</div>
	);
}
