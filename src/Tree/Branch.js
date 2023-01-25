import React, { useState,useEffect,useRef,createContext ,useContext} from 'react';
import Node from './Node';
import  { DataContext } from "./index";



const Branch = ({ item, level }) => {

	const [selected, setSelected] = useState(true);
	const [showChildren, setShowChildren] = useState(true);

    const { rootData,setRootData  } = useContext(DataContext);

    const [data, setData] = useState(item);
  
    useEffect(() => {
             setData(item);
      },[item]);

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
       
        setRootData(prevData=> {
            let tempData = [...prevData]
           
            let recursiveCheckAllHelper = (tempData) => {
                tempData.children.map((itm)=> {
                    itm.isChecked = checked
                    if(itm.children){
                        recursiveCheckAllHelper(itm)
                    }
                    return
                })
            }

            let selectParenthelper = ((node) =>{
                node.children.map((innerElem) => {
                    // if(innerElem.id == id){
                    //     innerElem.isChecked = checked;
                    // }
                    if(!innerElem.isChecked){
                        node.isChecked = false //setting branch label false if one of the child nodes is not selected.
                    }
                    if(innerElem.children){
                        selectParenthelper(innerElem);
                    }
                }) 
            })

            let selectParent = (tempData) => {

                tempData.map(elem => {
                    elem.isChecked = true; //assuming its true  will become false.. if one of the child not checked
                    if(elem.children){
                        selectParenthelper(elem);
                    }
                })

            }

            let selectAllChild = (selectAllData) => {
                selectAllData.map(elem => {
                    if(elem.id == id){  //select all children here if parent selected
                        elem.isChecked = checked;
                        if(elem.children){
                            recursiveCheckAllHelper(elem);  //check all child nodes
                        }
                    }
                    else if(elem.children){
                        selectAllChild(elem.children);
                    }
                 }) 
            }

            selectAllChild(tempData);



            selectParent(tempData); //select parent if all child nodes selected;
              
               
            
            // else{
            //     tempData.isChecked = true; //assuming its true  will become false if one of the child not checked
            //     tempData.children.map((itm)=> {

            //         if(itm.id == id){
            //             itm.isChecked = checked
            //             console.log(itm)
            //         }
            //         if(!itm.isChecked){
            //             tempData.isChecked = false
            //         }
            //     })
              

            //     // tempData.isChecked =  ! tempData.children.some((dat) => dat?.isChecked !== true)
            // }

                // tempData.isChecked =  ! tempData.children.some((dat) => dat?.isChecked !== true)
            

            return tempData
            
        } );
      
      };


	const renderBranches = () => {
		if (hasChildren) {
			const newLevel = level + 2;
            // console.log("renderBranches")
			return <div className={`collapsibleChild ${showChildren ? '' : 'hide'}`}>
                    {item.children.map((child,idx) => {
                        
                        // console.log(child.children)

                        let elem;

                        if (child.hasOwnProperty('children')) {
                          elem = <>
                                   
                                 <Branch key={idx+child.id} item={child} level={level} />
                                 
                             </>
                        
                    } 
                        
                        else {
                          elem = <Node
                          key = {idx+child.id}
                          item={child}
                          hasChildren={ false}
                          level={newLevel}
                          onToggle={toggleSelected}
                          handleSelectBox={handleSelectBox}
                      
                          onDragStart={(e) => {
                            //   console.log("ondragenter",e.target.id); 
                              dragItem.current = child.id
                          }}
                          onDragEnter={(e) => {
                              console.log("ondragenter",e.target.id); 
                              dragOverItem.current = child.id
                          }}

                          onDragEnd={handleReorder}
                          onDragOver={(e) => e.preventDefault()}
                  /> 
                        }

                            return(  <> {elem} </> )
                        // }
                        
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

    // console.log("branch render");
    // console.log("branch data" + JSON.stringify(data));  
    // console.log("branch item props" + JSON.stringify(item));

	return (
        
		<>

			<Node
				item={item}
                key = {item.id}
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