import React from 'react';
import  { useState,useEffect } from 'react';

import LabelEditable from './LabelEditable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleDown,faGrip } from '@fortawesome/free-solid-svg-icons'

const Node = ({ item, hasChildren, level, onToggle , handleSelectBox,onDragStart,onDragEnter ,onDragEnd,onDragOver, removeObject}) => {

    useEffect(() => {
      //   console.log("node render");
  
      }, []);



	return (
		<div  id={item.id} className={`node level${level} `} style={{ paddingLeft: `${level * 16}px`}} draggable onDragStart ={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={onDragOver}>

            {hasChildren? <FontAwesomeIcon icon={faAngleDown} onClick={onToggle} /> : null}
           
            <FontAwesomeIcon icon={faGrip}  />

            <input   id={item.id} type='checkbox' value={item.label}  checked={item.isChecked}  onChange={handleSelectBox} />            
            
            <LabelEditable  itemid={item.id} text={item.label} removeObject={removeObject} />

		</div>
	);
};

export default Node;