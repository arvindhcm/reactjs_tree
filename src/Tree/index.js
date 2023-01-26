import React from 'react';
import { useState,createContext } from 'react';

import Branch from './Branch';
export const DataContext = createContext();


const Tree = ({ data }) => {
	
	let [searchTerm,setSearchTerm] = useState(null);
	let [rootData,setRootData] = useState(data);

	// console.log("root tree rendering ")

	// updateRootData = (data) =>{
	// 	setRootData((prevData) => {
	// 		return data
	// 	})
	// }
	const filter = (array, name) => {
		let result = [];
		array.forEach(item => {
		  if (item.label.toLowerCase().includes(name)) {
			 // result.push({ ...item,children:[] });
			 result.push({ ...item });
		  }
		  if (item.children) {
			const children = filter(item.children, name);
			if (children.length) {
			  result.push({ ...item, children });
			}
		  }
		});
		return result;
	  }
	const onChange = (e) => {

		let newSearchTerm = (e.target.value);
		if(!newSearchTerm){
			setRootData(data)
			return 
		}
		if(newSearchTerm.length < 3){
			return
		}


		setSearchTerm(newSearchTerm);
		console.log("newSearchterm",newSearchTerm);
		
		setRootData((prevData) =>{
			
			let temp = [...prevData];

			console.log("init temp for search filter",temp)

			
			let newtemp = filter(temp,newSearchTerm) 
			console.log("searchtemp",newtemp)
			
			
			//.filter(item => (item.label.toLowerCase().includes(newSearchTerm.toLowerCase()) || item.children.length > 0))
			 if(!newtemp.length){
				return data
			 }
			return newtemp
		})

	}

	return (
		<DataContext.Provider value={{ rootData,setRootData }}>
			<div>

				<input className='searchField' onChange={onChange} type="text" placeholder="Search (Min 3 characters)" />
				{rootData.map((item,idx) => <Branch key={idx} item={item} level={0} />)}
			</div>
		</DataContext.Provider>
	);
}

export default Tree;