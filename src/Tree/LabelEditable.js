import React, { useState, useEffect, useRef,useContext } from 'react';
import  { useCallback } from 'react';
import  { DataContext } from "./index";


function LabelEditable(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const { rootData,setRootData  } = useContext(DataContext);

  const inputRef = useRef(null);


  const onDelete = (e) => {
    
     setIsInputActive(false);
      let id  = props.itemid; 
      
      setRootData(data=> {
          
          let tempData = [...data]

          let recursive = (tempData) => { 
                tempData.children.map((itm)=> {
                    
                    if(itm.id == id){
                        tempData.children = tempData.children.filter((item) => item.id !== itm.id);
                    }
                    else if(itm.children){
                        recursive(itm);
                    }
                })              
             }
        
            tempData =tempData.filter((item) => { return item.id !== id}); //if in root level 

            tempData.map(elem => {

                if(elem.children.length){
                recursive(elem)
                
                }
            })

          return tempData
          
      } );

};

  const onSave = (e) => {
   
    
      setIsInputActive(false);

        let id  = props.itemid; 
        let newLabel = inputValue;
        setInputValue(newLabel);

        setRootData(data=> {
            
            let tempData = [...data]

            let recursive = (tempData) => { 
                tempData.children.map((itm)=> {
                    if(itm.children){
                        recursive(itm);
                    }
                    if(itm.id == id){
                        itm.label = newLabel;
                    }
                })           
             }
        

            tempData.map(elem => {

                if(elem.id==id){  //select all children here if parent selected      
                    elem.label = newLabel;
                }
                else if(elem.children.length){
                
                    recursive(elem);
                    // tempData.isChecked =  ! tempData.children.some((dat) => dat?.isChecked !== true)
                }

            })
            return tempData
            
        } );

  };

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);


  const handleInputChange = useCallback(
    (event) => {
      setInputValue((event.target.value));
    },
    [setInputValue]
  );

  const handleLabelClick = useCallback(() => setIsInputActive(true), [setIsInputActive]);

  return (
    <span className="editableBlock">
      <label
        
        onClick={handleLabelClick}
        className={`${!isInputActive ? 'active' : 'hidden'}`}
      >
        {props.text}
      </label>
      <input
        ref={inputRef}

        style={{ minWidth: Math.ceil(inputValue.length) + 'ch' }}
        value={inputValue}
        onChange={handleInputChange}
        className={`${isInputActive ? 'active' : 'hidden'}`}
      />
        <button onClick={onSave} className={`btn-save ${isInputActive ? 'active' : 'hidden'}`}>Save</button>
        <button onClick={onDelete} className={`btn-delete ${isInputActive ? 'active' : 'hidden'}`}>Delete</button>


    </span>
  );
}

export default LabelEditable;