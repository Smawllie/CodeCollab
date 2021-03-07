export default function Error() {
	return (
		<div className="bg-red-300 border border-red-500 text-red-600 rounded">
			<strong className="font-bold">Error</strong>
			<span className="block sm:inline px-2">An error has occured please try again</span>
			<span className="">
				<span>&times;</span>
			</span>
		</div>
	);
}
