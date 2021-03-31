function CodeRender(props:any) {
    const {srcDoc} = props;
    return (
        <div>
        <div className="bg-blue-50 w-full h-full">
            <div className="bg-gray-700 w-full flex justify-between py-2 px-3 text-white">Preview</div>
            <iframe srcDoc={srcDoc} />
        </div>
    </div>
    )
}

export default CodeRender
