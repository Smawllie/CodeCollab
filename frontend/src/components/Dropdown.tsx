import React from 'react'
import {Link} from 'react-router-dom';

interface DropdownProps{
    name:String;
    items : Item[];
}

interface Item {
    name:String;
}

function Dropdown({name,items}:DropdownProps) {
    const [visible,setVisibility] = React.useState<React.CSSProperties>({visibility:'hidden'});
    return (
        <div className="relative inline-block">
           <button className="bg-gray-500 text-white text-lg p-4 border-none cursor-pointer" onClick={()=>{(visible.visibility==="visible") ? setVisibility({visibility:'hidden'}) : setVisibility({visibility:'visible'})}}> {name} </button> 
           <div className="z-1 invisible absolute right-0 bg-gray-200 shadow-md" style={visible}> 
            {
                items.flatMap((item)=>(<Link className="text-black px-4 py-3 no-underline block hover:bg-gray-300" to={`/${item.name}`} >{item.name}</Link>)) 
            }
           </div>
        </div>
    )
}

export default Dropdown
