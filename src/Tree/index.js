import React from 'react';
import { useState,useEffect } from 'react';

import Branch from './Branch';


const Tree = ({ data }) => {
	
	let [searchTerm,setSearchTerm] = useState(null);
	let [rootData,setRootData] = useState(data);

	console.log("root tree rendering ")

	const onChange = (e) => {

		let newSearchTerm = e.target.value
		setSearchTerm(newSearchTerm);
		console.log(newSearchTerm);

		setRootData((prevData) =>{
			let temp = [...prevData];

			if(!newSearchTerm){
				return data
			}

			// temp.map((item)=> {	
			// 	 if(!item.label.includes(newSearchTerm)){
			// 		item.hidden = true
			// 	 }
			// })
			 let d = temp.map(item => {
				
				let x = {
					...item,
					children: item.children.filter(child => {
						return child.label.toLowerCase().includes(newSearchTerm.toLowerCase())
					})
			  	}

				return x
			}).filter(item => item.children.length > 0)

			  return d
		})

	}

	return (
		<div>
			<input className='searchField' onChange={onChange} type="text" placeholder="search" />
			{rootData.map((item,idx) => <Branch key={item.id} item={item} level={0} />)}
		</div>
	);
}

export default Tree;