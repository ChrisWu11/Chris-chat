<template>
	<view class="emoji">
		<view class="emoji-line" v-for="(line,i) in emoji" :key="i">
			<view @tap="clickEmoji(item)" class="emoji-line-item" v-for="(item,index) in line" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emoji:[
						['😀','😃','😄','😁','😆','😅','🤣'],
						['🙂','🙃','😉','😉','😇','😍','🤩'],
						['😗','👴','😚','😙','😋','😛','😜'],
						['😝','🤑','🤗','🤭','🤫','🤔','🤐'],
						['😐','😑','😶','😏','😒','🙄','😬'],
						['😌','😔','😪','🤤','😴','😷','🤒'],
						['🤢','🤮','🤧','😵','🤯','🤠','🤠'],
						['🧐','😕','😟','🙁','💔','😮','😯'],
						['😳','😦','😧','😨','😰','😥','😢'],
						['😱','😖','😣','😞','😓','😩','😫'],
						['😡','😠','🤬','😈','👿','💀','☠',],
						['👹','👺','👻','👽','🙈','🙉','🙊'],
						['💌','💘','💝','💖','💗','💓','💞'],
						['💬','🤳','👃','👅','👄','👶','🧒'],
						['😂','😘','🤪','🤨','🤥','🤕','🤓'],
						['😲','😭','😤','🤡','💋','💕','👦']
					]					
			}
		},
		methods: {
			clickEmoji(e){
				this.$emit('emotion',e);
			}
		}
	}
</script>

<style lang="scss">
.emoji{
	width: 100%;
	height: 460rpx;
	padding: 16rpx 12rpx 120rpx 12rpx;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
	.emoji-line{
		display: flex;
		.emoji-line-item{
			flex: 1;
			text-align: center;
			font-size: 40rpx;
			line-height: 80rpx;
		}
	}
}
</style>
