import React, { Children } from 'react';

import Branch from './Branch';

const Tree = ({ data }) => {
	return (
		<div>
			{data.map((item,idx) => <Branch key={item.id} item={item} level={0} />)}
		</div>
	);
}

export default Tree;