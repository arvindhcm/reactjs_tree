import React, { useState } from 'react';

import Node from './Node';

const Branch = ({ item, level }) => {
    
	const [selected, setSelected] = useState(true);
	const [showChildren, setShowChildren] = useState(true);

	const hasChildren = item.children && item.children.length !== 0;

	const renderBranches = () => {
		if (hasChildren) {
			const newLevel = level + 1;

			return <div className={`collapsibleChild ${showChildren ? '' : 'hide'}`}>
                    {item.children.map((child,idx) => {
                        return <Branch key={child.id} item={child} level={newLevel} />
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

	return (
		<>
			<Node
				item={item}
				selected={selected}
				hasChildren={hasChildren}
				level={level}
				onToggle={toggleSelected}
			/>

			{renderBranches()}
		</>
	);
};

export default Branch;