import React, { useState,useEffect,useRef,createContext } from 'react';

import Node from './Node';

export const DataContext = createContext();

const Branch = ({ item, level }) => {

	const [selected, setSelected] = useState(true);
	const [showChildren, setShowChildren] = useState(true);

    const [data, setData] = useState(item);
  
    useEffect(() => {
            console.log(data);
             setData(item);
      },[]);

	const hasChildren = item.children && item.children.length;

    const dragItem = React.useRef(null)
	const dragOverItem = React.useRef(null)

	const handleReorder = () => {

		let tempChildren = data.children;

        let srcIndex = tempChildren.findIndex(x => x.id == dragItem.current);
        let destIndex = tempChildren.findIndex(x => x.id == dragOverItem.current);

		const draggedItemContent = tempChildren.splice(srcIndex, 1)[0]

		tempChildren.splice(destIndex, 0, draggedItemContent)

		dragItem.current = null
		dragOverItem.current = null

		setData(data=> {
            
            let tempData = {...data};
            tempData.children = tempChildren
            return tempData
            
        })
	}
   
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
            console.log("renderBranches")
			return <div className={`collapsibleChild ${showChildren ? '' : 'hide'}`}>
                    {item.children.map((child,idx) => {
                        return <Node
                            key = {child.id}
                            item={child}
                            hasChildren={false}
                            level={newLevel}
                            onToggle={toggleSelected}
                            handleSelectBox={handleSelectBox}
                         
                            onDragStart={(e) => {
                                console.log("ondragenter",e.target.id); 
                                dragItem.current = child.id
                            }}
                            onDragEnter={(e) => {
                                console.log("ondragenter",e.target.id); 
                                dragOverItem.current = child.id
                            }}

                            onDragEnd={handleReorder}
                            onDragOver={(e) => e.preventDefault()}
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
    console.log("branch data" + JSON.stringify(data));  
    console.log("branch item props" + JSON.stringify(item));

	return (
        
		<>
            <DataContext.Provider value={{ data, setData }}>

			<Node
				item={data}
                key = {data.id}
				hasChildren={hasChildren}
				level={level}
				onToggle={toggleSelected}
                handleSelectBox={handleSelectBox}
			/>

			{renderBranches()}
            </DataContext.Provider>
		</>
	);
};

export default Branch;