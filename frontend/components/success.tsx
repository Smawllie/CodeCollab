export default function Success() {
	return (
		<div className="bg-green-300 border border-green-500 text-green-600 rounded">
			<strong className="font-bold">Error</strong>
			<span className="px-4">An error has occured please try again</span>
			<span className="px-8 py-3">
				<span>&times;</span>
			</span>
		</div>
	);
}