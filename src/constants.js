export const DATA = [
	{
		id: '1-1',
		label: 'Cars',
		children: [
			{
				id: '1-2',
				label: 'Mazda',
			},
			{
				id: '1-3',
				label: 'McLaren'
				
			},
			{
				id: '1-4',
				label: 'Ferrari'
			},
			{
				id: '1-5',
				label: 'Porsche',

					children:[
						{
							id: '1-2-1',
							label: '911 twin turbo'
						},
						{
							id: '1-2-2',
							label: 'Macan'
						},
						{
							id: '1-2-3',
							label: 'Panamera'
						}
					]
			}
		],
	},
	{
		id: '2-1',
		label: 'Bikes',
		children: [
			{
				id: '2-2',
				label: 'Kawasaki'
				
			},
			{
				id: '2-3',
				label: 'Ducati'
				
			},
			{
				id: '2-4',
				label: 'Harley'
				
			},
			{
				id: '2-5',
				label: 'KTM',
				children:[
					{
						id: '2-5-1',
						label: 'child1'
					},
					{
						id: '2-5-2',
						label: 'child2'
					},
					{
						id: '2-5-3',
						label: 'child3'
					}
				]
				
			}
			

		],
	},
];