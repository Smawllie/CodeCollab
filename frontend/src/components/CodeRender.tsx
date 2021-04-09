function CodeRender(props:any) {
    const {srcDoc} = props;
    return (
        <div className="w-full h-full bg-white">
            <div className="bg-gray-700 w-full flex justify-between py-2 px-3 text-white">Preview</div>
            <iframe srcDoc={srcDoc} className="align-bottom w-full h-full" sandbox=''/>
        </div>
    )
}

export default CodeRender
