import React from 'react';
import { useState,useEffect,createContext } from 'react';

import Branch from './Branch';
export const DataContext = createContext();


const Tree = ({ data }) => {
	
	let [searchTerm,setSearchTerm] = useState(null);
	let [rootData,setRootData] = useState(data);

	console.log("root tree rendering ")

	// updateRootData = (data) =>{
	// 	setRootData((prevData) => {
	// 		return data
	// 	})
	// }

	const onChange = (e) => {

		let newSearchTerm = e.target.value
		setSearchTerm(newSearchTerm);
		console.log(newSearchTerm);

		setRootData((prevData) =>{
			let temp = [...prevData];

			if(!newSearchTerm){
				return data
			}

			let filterChild = (tempData) => { 

				return tempData.filter(child => {
							if(child.children){
								filterChild(child.children)
							}
							return (child.label.toLowerCase().includes(newSearchTerm.toLowerCase() || child.children))
						})
                              
             }
			 let recursive = (temp) => {

				temp.map(item => {
					
					if(item.children){
						filterChild(item.children)	
					}
					
				  })
			 }
		
				recursive(temp);
				 
			
			
			//.filter(item => (item.label.toLowerCase().includes(newSearchTerm.toLowerCase()) || item.children.length > 0))
			 
			return temp
		})

	}

	return (
		<DataContext.Provider value={{ rootData,setRootData }}>
			<div>

				<input className='searchField' onChange={onChange} type="text" placeholder="search" />
				{rootData.map((item,idx) => <Branch key={item.id} item={item} level={0} />)}
			</div>
		</DataContext.Provider>
	);
}

export default Tree;