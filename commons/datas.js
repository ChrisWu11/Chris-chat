export default{
	message:function(){
		let msg = [
			{
				id:'a',
				imgurl:'two.png',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:10,
			},
			{
				id:'b',
				imgurl:'one.png',
				message:{
					voice:'b',
					time:20
				},
				types:2,
				time:new Date(),
				tip:11,
			},
			{
				id:'a',
				imgurl:'two.png',
				message:'长沙市测试测试测试测试测试测试测试测试',
				types:0,
				time:new Date()-1000,
				tip:0,
			},
			{
				id:'a',
				imgurl:'two.png',
				message:'行i偶的死哦改价哦i的设计风格iops的窘迫分给色破官方',
				types:0,
				time:new Date()-1000*16,
				tip:1,
			},
			{
				id:'b',
				imgurl:'one.png',
				message:'设计风格iops的迫分给色破官方',
				types:0,
				time:new Date()-1000*60,
				tip:2,
			},
			{
				id:'a',
				imgurl:'two.png',
				message:'one.png',
				types:1,
				time:new Date()-1000*60*36,
				tip:3,
			},
			{
				id:'a',
				imgurl:'two.png',
				message:'561651651651',
				types:0,
				time:new Date()-1000*60*40,
				tip:4,
			},
			{
				id:'b',
				imgurl:'one.png',
				message:'si.jpg',
				types:1,
				time:new Date()-1000*57,
				tip:5,
			},
			{
				id:'a',
				imgurl:'two.png',
				message:'yi.jpg',
				types:1,
				time:new Date()-1000*58,
				tip:6,
			},
		];
		return msg;
	}
}