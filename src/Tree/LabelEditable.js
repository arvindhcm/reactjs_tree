import React, { useState, useEffect, useRef,useContext } from 'react';
import  { useCallback } from 'react';
import  { DataContext } from "./Branch";


function LabelEditable(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const { data, setData } = useContext(DataContext);

  const inputRef = useRef(null);


  const onDelete = (e) => {
   
    
     setIsInputActive(false);

      let id  = props.itemid; 

      setData(data=> {
          
          let tempData = {...data}

          if(tempData.id==id){       
                tempData = {}
          }
          else{
              tempData.children.map((itm)=> {
                  if(itm.id == id){
                       tempData.children = tempData.children.filter((item) => item.id !== itm.id);
                  }
              })
           }

          return tempData
          
      } );

};

  const onSave = (e) => {
   
    
      setIsInputActive(false);

        let id  = props.itemid; 
        let newLabel = inputValue;
        setInputValue(newLabel);

        setData(data=> {
            
            let tempData = {...data}

            if(tempData.id==id){  //select all children here if parent selected      
                tempData.label = newLabel;
            }
            else{
                tempData.children.map((itm)=> {
                    if(itm.id == id){
                        itm.label = newLabel;
                    }
                })
              
                // tempData.isChecked =  ! tempData.children.some((dat) => dat?.isChecked !== true)
            }

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