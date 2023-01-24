import React from 'react';
import  { useState,useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleDown,faGrip } from '@fortawesome/free-solid-svg-icons'

const Node = ({ item, hasChildren, level, onToggle , handleSelectBox}) => {

    useEffect(() => {
        console.log("node render");
  
      }, []);

      const [selected, setSelected] = useState(true);


	return (
		<div className={`node level${level} `} style={{ paddingLeft: `${level * 16}px`}}>

            {hasChildren && <FontAwesomeIcon icon={faAngleDown} onClick={onToggle} />}
           
            <FontAwesomeIcon icon={faGrip}  />

            <input   id={item.id} type='checkbox' value={item.label}  checked={item.isChecked}  onChange={handleSelectBox} />            
            {item.label}

		</div>
	);
};

export default Node;