function CodeRender(props:any) {
    const {srcDoc} = props;
    return (
        <div className="bg-blue-50 w-full h-full">
            <div className="bg-gray-700 w-full flex justify-between py-2 px-3 text-white">Preview</div>
            <div className="w-full h-full">
            <iframe srcDoc={srcDoc} className="w-full border-none absolute" sandbox=''/>
            </div>
            
        </div>
    )
}

export default CodeRender
