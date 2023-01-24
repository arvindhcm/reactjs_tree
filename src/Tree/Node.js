import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleDown,faGrip } from '@fortawesome/free-solid-svg-icons'

const Node = ({ item, hasChildren, level, onToggle }) => {
	return (
		<div className={`node level${level}`} style={{ paddingLeft: `${level * 16}px`}}>

            {hasChildren && <FontAwesomeIcon icon={faAngleDown} onClick={onToggle} />}
           
            <FontAwesomeIcon icon={faGrip}  />
            
            <input type='checkbox' value={item.label}/>            
            {item.label}

		</div>
	);
};

export default Node;