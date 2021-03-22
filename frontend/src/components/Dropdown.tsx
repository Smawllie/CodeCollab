import React from 'react';
import DropBoxOptions from '../@types/dropBoxOptions';

interface DropdownProps<T> {
	title: string;
	setSelected: any;
	list: DropBoxOptions[];
};


function Dropdown<T>({ title, list, setSelected }: DropdownProps<T>) {
	const [ open, setOpen ] = React.useState(false);
	return (
		<div id="dd-wrapper" className="py-4">
			<div id="dd-header">
                <button onClick={()=>{setOpen(!open)}}>
                <span id="dd-header-title">{title}</span>
                </button>
			</div>
			{open && (
				<div id="dd-list" className="border-black p-3">
                       {list.map((item:DropBoxOptions)=>{ return( <div className="">
                                <button className="border-gray-400" onClick={()=>{setSelected(item)}}>
                                   <span className="text-red-400">{item.option}</span>
                               </button>
                           </div>);
                       })}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
