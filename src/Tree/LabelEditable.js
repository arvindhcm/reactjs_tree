import React, { useState, useEffect, useRef,useContext,useCallback } from 'react';
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

          return props.removeObject(tempData,id)
          
      } );

};

  const onSave =(e) => {
   
    
      setIsInputActive(false);

        let id  = props.itemid; 
        let newLabel = inputValue;
        setInputValue(newLabel);

        setRootData(data=> {
            
            let tempData = [...data]

             const recursiveSetLabel = (array, id) => {
                for (let i = 0; i < array.length; i++) {
                  if (array[i].id === id) {
                    array[i].label = newLabel;
                    return array;
                  }
                  if (array[i].children) {
                    array[i].children = recursiveSetLabel(array[i].children, id);
                  }
                }
                return array;
              };
        
            return recursiveSetLabel(tempData,id);
            
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
    []
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