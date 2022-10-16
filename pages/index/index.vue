<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" >
				<image src="../../static/images/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					xxx
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
			</view>
		</view>
			<scroll-view class="chat" scroll-y="true" scroll-with-animation="true">
				<view class="chat-main">
					<view class="chat-ls" v-for="(item,index) in msgs" :key="index">
						<view class="chat-time">{{item.time}}</view>
						<view class="msg-m msg-left" v-if="item.id === 'a'">
							<image class="user-img" :src="item.imgurl"></image>
							<view class="message" v-if="item.types === 0">
								<view class="msg-text">{{item.message}}</view>
							</view>
							<view class="message" v-if="item.types === 1">
								<image :src="item.message" mode="widthFix" class="msg-img"></image>
							</view>
						</view>
						<view class="msg-m msg-right" v-if="item.id === 'b'">
							<image class="user-img" :src="item.imgurl"></image>
							<view class="message" v-if="item.types === 0">
								<view class="msg-text">{{item.message}}</view>
							</view>
							<view class="message" v-if="item.types === 1">
								<image :src="item.message" mode="widthFix" class="msg-img"></image>
							</view>
						</view>
					</view>
					<view class="chat-ls">
						<view class="chat-time">12:32</view>
						<view class="msg-m msg-right">
							<image class="user-img" src="../../static/images/img/four.png"></image>
							<view class="message">
								<view class="msg-text">你好呀xxxx</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
	</view>
</template>

<script>
	import datas from '../../commons/datas.js'
	export default {
		data() {
			return {
				msgs:[],
			}
		},
		onLoad() {
			this.getMsg()
		},
		methods: {
			getMsg(){
				let msg = datas.message();
				for(let i = 0;i < msg.length;i++){
					msg[i].imgurl = '../../static/images/img/' + msg[i].imgurl;
					if(msg[i].types == 1){
						msg[i].message = '../../static/images/img/' + msg[i].message;
					}
					this.msgs.unshift(msg[i]);
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: var(--static-bar-height);
		background-color: $uni-bg-color-grey;
	}
.top-bar{
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 88rpx;
	box-sizing: border-box;
	background-color: $uni-bg-color;
	// box-shadow: 0px 1px 0px 0px;
	padding-top: var(--static-bar-height);
	.top-bar-left{
		float: left;
		padding-left: 32rpx;
		image{
			margin-top: 21rpx;
			width: 26rpx;
			height: 46rpx;
			// border-radius: 16rpx;
		}
	}
	.top-bar-center{
		position: absolute;
		text-align: center;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		// border: 1px solid red;

	}
	.top-bar-right{
		float: right;
		image{
			width: 52px;
			height: 52px;
		}
	}
}
.chat{
	height: calc(100vh - 0px - 88rpx);
	.chat-main{
		padding-left: $uni-spacing-col-base;
		padding-right: $uni-spacing-col-base;
		padding-top: 20rpx;
		padding-bottom: 120rpx;
		display: flex;
		flex-direction: column;
	}
	.chat-ls{
		.chat-time{
			font-size: $uni-font-size-sm;
			color: rgba(39, 40, 50, 0.3);
			line-height: 34rpx;
			padding: 20rpx 0;
			text-align: center;
		}
		.msg-m{
			display: flex;
			padding: 20rpx 0;
			.user-img{
				flex: none;
				width: 80rpx;
				height: 80rpx;
				border-radius: $uni-border-radius-base;
			}
			.message{
				flex: none;
				max-width: 480rpx;
			}
			.msg-text{
				font-size: $uni-font-size-lg;
				font-weight: 400;
				color: rgba(39, 40, 50, 1);
				// line-height: 44px;
				padding: 18rpx 24rpx;
			}
			.msg-img{
				max-width: 400rpx;
				border-radius: 20rpx;
			}
		}
		.msg-left{
			flex-direction: row;
			.msg-text{
				margin-left: 16rpx;
				background-color: #fff;
				border-radius: 0 20rpx 20rrpx 20px;
			}
			.msg-img{
				margin-left: 16rpx;
			}
		}
		.msg-right{
			flex-direction: row-reverse;
			.msg-text{
				margin-right: 16rpx;
				background-color: #fff268;
				border-radius: 20rpx 0 20rpx 20rpx;
			}
			.msg-img{
				margin-right: 16rpx;
			}
		}
	}
}
	
</style>
