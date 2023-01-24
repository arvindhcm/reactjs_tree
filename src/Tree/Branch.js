import React, { useState,useEffect } from 'react';

import Node from './Node';

const Branch = ({ item, level }) => {

	const [selected, setSelected] = useState(true);
	const [showChildren, setShowChildren] = useState(true);

    const [data, setData] = useState(item);

  
    useEffect(() => {
        
            setData(item);
            console.log(data);
      },[]);

	const hasChildren = item.children && item.children.length;
   
    const handleSelectBox = (e) => {

        const { id, checked } = e.target;
       
        setData(data=> {
            let tempData = {...data}
            
            if(tempData.id==id){  //select all children here if parent selected
                

                tempData.isChecked = checked;
                tempData.children.map((itm)=> {
                        itm.isChecked = checked
                })

            }
            else{
                tempData.isChecked = true; //assuming its true  will become false if one of the child not checked
                tempData.children.map((itm)=> {

                    if(itm.id == id){
                        itm.isChecked = checked
                        console.log(itm)
                    }
                    if(!itm.isChecked){
                        tempData.isChecked = false
                    }
                })
              

                // tempData.isChecked =  ! tempData.children.some((dat) => dat?.isChecked !== true)
            }

            return tempData
            
        } );
      
      };


	const renderBranches = () => {
		if (hasChildren) {
			const newLevel = level + 1;

			return <div className={`collapsibleChild ${showChildren ? '' : 'hide'}`}>
                    {data.children.map((child,idx) => {
                        return <Node
                            key = {child.id}
                            item={child}
                            hasChildren={false}
                            level={newLevel}
                            onToggle={toggleSelected}
                            handleSelectBox={handleSelectBox}
                    />
                        
                    })}
              </div>
		}

		return null;
	};

	const toggleSelected = () => {
		setShowChildren(prev => {
            return !prev
        });
	};

    console.log("branch render");

	return (
        
		<>
			<Node
				item={data}
                key = {data.id}
				hasChildren={hasChildren}
				level={level}
				onToggle={toggleSelected}
                handleSelectBox={handleSelectBox}
			/>

			{renderBranches()}
		</>
	);
};

export default Branch;