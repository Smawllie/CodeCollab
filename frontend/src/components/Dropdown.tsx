import React from 'react';
import DropBoxOptions from '../@types/dropBoxOptions';

interface DropdownProps {
	title: string;
	setSelected: any;
	list: DropBoxOptions[];
};


function Dropdown({ title, list, setSelected }: DropdownProps) {
	const [ open, setOpen ] = React.useState(false);
	return (
		<div id="dd-wrapper" className="py-4">
			<div id="dd-header">
                <button onClick={()=>{setOpen(!open)}}>
                <span id="dd-header-title">{title}</span>
                </button>
			</div>
			{open && (
				<div id="dd-list" className="border-black border-solid p-3">
                       {list.map((item:DropBoxOptions,index)=>{ return( 
					   <div key={index} className="border-bottm">
                                <button className="hover:ring-4 hover:ring-pink-300 hover:ring-inset" onClick={()=>{setSelected(item)}}>
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
