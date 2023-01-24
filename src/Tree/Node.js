import React from 'react';
import  { useState,useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleDown,faGrip } from '@fortawesome/free-solid-svg-icons'

const Node = ({ item, hasChildren, level, onToggle , handleSelectBox,onDragStart,onDragEnter ,onDragEnd,onDragOver}) => {

    useEffect(() => {
        console.log("node render");
  
      }, []);



	return (
		<div  id={item.id} className={`node level${level} `} style={{ paddingLeft: `${level * 16}px`}} draggable onDragStart ={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={onDragOver}>

            {hasChildren && <FontAwesomeIcon icon={faAngleDown} onClick={onToggle} />}
           
            <FontAwesomeIcon icon={faGrip}  />

            <input   id={item.id} type='checkbox' value={item.label}  checked={item.isChecked}  onChange={handleSelectBox} />            
            {item.label}

		</div>
	);
};

export default Node;