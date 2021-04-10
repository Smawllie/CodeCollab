import React from 'react';
import DropBoxOptions from '../@types/dropBoxOptions';

interface DropdownProps {
	title: string;
	setSelected: any;
	list: DropBoxOptions[];
	className:string|undefined;
};


function Dropdown({ title, list, setSelected,className }: DropdownProps) {
	const [ open, setOpen ] = React.useState(false);
	return (
		<div id="dd-wrapper" className={className}>
			<div id="dd-header">
                <button onClick={()=>{setOpen(!open)}} className="bg-blue-500 text-white focus:outline-none p-4">
                <span id="dd-header-title" className="text-lg">{title}</span>
                </button>
			</div>
			{open && (
				<div id="dd-list" className="py-2.5 px-0 bg-blue-50">
                       {list.map((item:DropBoxOptions,index)=>{ return( 
					   <div key={index} className="shadow-xs px-0 py-3 bg-gray-700 border-b-2 border-white">
                                <button className="focus:outline-none w-full" onClick={()=>{setSelected(item)}}>
                                   <span className="text-white font-serif text-base text-center px-4 py-2">{item.option}</span>
                               </button>
                           </div>);
                       })}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
