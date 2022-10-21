<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
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
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView"
			:style="{height: `calc(100vh - ${submitHeight*2}rpx - 88rpx)`}">
			<view class="chat-main">
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id="'msg' + index">
					<view class="chat-time">{{item.time | formatData}}</view>
					<view class="msg-m msg-left" v-if="item.id === 'a'">
						<image class="user-img" :src="item.imgurl"></image>
						<view class="message" v-if="item.types === 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types === 1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="previewImg(item.message)">
							</image>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id === 'b'">
						<image class="user-img" :src="item.imgurl"></image>
						<view class="message" v-if="item.types === 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types === 1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="previewImg(item.message)">
							</image>
						</view>
					</view>
				</view>
				<!-- 					<view class="chat-ls">
						<view class="chat-time">12:32</view>
						<view class="msg-m msg-right">
							<image class="user-img" src="../../static/images/img/four.png"></image>
							<view class="message">
								<view class="msg-text">你好呀xxxx</view>
							</view>
						</view>
					</view> -->
			</view>
		</scroll-view>
		<Submit @inputs='inputs' @heights='heights' @focus='focus'></Submit>
	</view>
</template>

<script>
	import datas from '../../commons/datas.js'
	import Submit from '../../components/submit/submit.vue'
	export default {
		data() {
			return {
				msgs: [],
				imgMsg: [],
				scrollToView: '',
				oldTime: new Date(),
				submitHeight: 57
			}
		},
		components: {
			Submit,
		},
		filters: {
			formatData(time) {
				if (!time) { //当时间是null或者无效格式时返回空
					return ' '
				} else {
					const timeLen = time.length; //传入的时候时间戳类型应为字符串，因为要根据length判断是10/13的时间戳
					const oneDate = new Date(parseInt(time) * 1000); // 10位时间戳
					const twoDate = new Date(parseInt(time)); // 13位时间戳
					const date = timeLen == 10 ? oneDate : twoDate;
					const dateNumFun = (num) => num < 10 ? `0${num}` : num
					// console.log(time)
					const [Y, M, D, h, m, s] = [
						date.getFullYear(),
						dateNumFun(date.getMonth() + 1),
						dateNumFun(date.getDate()),
						dateNumFun(date.getHours()),
						dateNumFun(date.getMinutes()),
					]
					return `${Y}-${M}-${D}-${h}:${m}`
				}
			}
		},
		onLoad() {
			this.getMsg()
		},
		methods: {
			getMsg() {
				let msg = datas.message();
				for (var i = 0; i < msg.length; i++) {
					msg[i].imgurl = '../../static/images/img/' + msg[i].imgurl;
					// 处理时间间隔
					// let t = this.spaceTime(this.oldTime,msg[i].time);
					// console.log(t);
					// if(t){
					// 	this.oldTime = t;
					// };
					// msg[i].time = t;
					// 处理图片
					if (msg[i].types == 1) {
						msg[i].message = '../../static/images/img/' + msg[i].message;
						this.imgMsg.unshift((msg[i].message));
					}
					this.msgs.unshift(msg[i]);
				}
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.msgs.length-1);
				})
			},
			previewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			spaceTime(old, now) {
				old = new Date(old);
				now = new Date(now);
				var told = old.getTime();
				var tnow = now.getTime();
				if (told > (tnow * 1000 * 60 * 5)) {
					return now;
				} else {
					return '';
				}
			},
			inputs(e) {
				let len = this.msgs.length
				let data = {
					id: 'b',
					imgurl: '../../static/images/img/one.png',
					message: e.message,
					types: e.types,
					time: new Date(),
					tip: len,
				};
				this.msgs.push(data);
				this.$nextTick(function() {
					this.scrollToView = 'msg' + len;
				})
				if(e.types == 1){
					this.imgMsg.push(e.message);
				}
			},
			heights(e) {
				// console.log('height', e)
				this.submitHeight = e;
				let len = this.msgs.length-1;
				console.log('pre',this.scrollToView)
				// setTimeout(()=>{
				// 	this.scrollToView = 'msg' + len;
				// },50)
				this.$nextTick(function() {
					this.scrollToView = 'msg' + len;
				})
				console.log('next',this.scrollToView)
			},
			focus(e){
				console.log(e)
				let len = this.msgs.length;
				this.$nextTick(function() {
					// let len = this.msgs.length-1;
					this.scrollToView = 'msg' + len;
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: var(--static-bar-height);
		background-color: $uni-bg-color-grey;
	}

	.top-bar {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 88rpx;
		box-sizing: border-box;
		background-color: $uni-bg-color;
		// box-shadow: 0px 1px 0px 0px;
		padding-top: var(--static-bar-height);

		.top-bar-left {
			float: left;
			padding-left: 32rpx;

			image {
				margin-top: 21rpx;
				width: 26rpx;
				height: 46rpx;
				// border-radius: 16rpx;
			}
		}

		.top-bar-center {
			position: absolute;
			text-align: center;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			// border: 1px solid red;

		}

		.top-bar-right {
			float: right;

			image {
				width: 52px;
				height: 52px;
			}
		}
	}

	.chat {
		height: calc(100vh - 0rpx - 88rpx);

		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 20rpx;
			padding-bottom: var(--static-bar-height);
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: $uni-font-size-sm;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}

				.message {
					flex: none;
					max-width: 480rpx;
				}

				.msg-text {
					font-size: $uni-font-size-lg;
					font-weight: 400;
					color: rgba(39, 40, 50, 1);
					// line-height: 44px;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: 20rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0 20rpx 20rrpx 20px;
				}

				.msg-img {
					margin-left: 16rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: #fff268;
					border-radius: 20rpx 0 20rpx 20rpx;
				}

				.msg-img {
					margin-right: 16rpx;
				}
			}
		}
	}
</style>
