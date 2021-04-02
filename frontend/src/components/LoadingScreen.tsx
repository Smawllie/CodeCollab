import ReactLoading from 'react-loading';

function Loading() {
	return (
        <div className="h-screen flex items-center justify-center">
        <ReactLoading type="balls" color="#3b82f6" className="object-center" height={200} width={200} />
    </div>
	);
}

export default Loading;;