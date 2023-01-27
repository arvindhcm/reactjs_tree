import React, { useState,useEffect ,useContext} from 'react';
import Node from './Node';
import  { DataContext } from "./index";



const Branch = ({ item, level,removeObject }) => {

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

    const filterById = (array, id) => {
		let result = [];
		array.forEach(item => {
		  if (item.id.includes(id)) {
			if (item.children) {
			  result.push({ ...item });
			} else {
			  result.push({ id: item.id, label: item.label });
			}
		  }
		  if (item.children) {
			const children = filterById(item.children, id);
			if (children.length) {
			  result.push({ ...item, children });
			}
		  }
		});
		return result;
	  }
   
    const handleSelectBox = (e) => {

        const { id, checked } = e.target;
       
        setRootData(prevData=> {
            let tempData = [...prevData]
           
            let recursiveSelectAllChild = (tempData) => {
                tempData.children.map((itm)=> {
                    itm.isChecked = checked
                    if(itm.children){
                        recursiveSelectAllChild(itm)
                    }
                    return
                })
            }

            let selectParenthelper = ((node) =>{
                node.isChecked = true
                node.children.map((innerElem) => {
                    
                    if(!innerElem.isChecked){
                        node.isChecked = false //setting branch ischecked false if one of the child nodes is not selected.
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
                            recursiveSelectAllChild(elem);  //check all child nodes
                        }
                    }
                    else if(elem.children){
                        selectAllChild(elem.children);
                    }
                 }) 
            }


            selectParent(tempData); //select parent if all child nodes selected;
              
            selectAllChild(tempData);


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
                                   
                                 <Branch key={idx+child.id} item={child} level={level}  removeObject={removeObject} />
                                 
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
                        removeObject={removeObject}
                      
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
                removeObject={removeObject}
			/>

			    {renderBranches()}
           
		</>
	);
};

export default Branch;