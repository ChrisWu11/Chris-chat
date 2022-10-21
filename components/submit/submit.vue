<template>
	<view class="submit">
		<view class="submit-chat">
			<view class="bt-img" @tap="records">
				<image :src="toc"></image>
			</view>
			<textarea :class="{displaynone:isrecord}" auto-height="true" class="chat-send btn" @input="inputs"
				v-model="msg" @focus="focus"></textarea>
			<view class="record btn" :class="{displaynone:!isrecord}">按住说话</view>
			<view class="bt-img" @tap="emoji">
				<image src="../../static/images/submit/bq.png"></image>
			</view>
			<view class="bt-img" @tap="more">
				<image src="../../static/images/submit/tj.png"></image>
			</view>
		</view>
		<view class="emoji" :class="{displaynone:!isemoji}">
			<view class="emoji-send">
				<view class="emoji-send-det" @tap="emojiBack">
					<image src="../../static/images/submit/back.png" mode=""></image>
				</view>
				<view class="emoji-send-bt" @tap="emojiSend">
					发送
				</view>
			</view>
			<Emoji @emotion='emotion'></Emoji>
		</view>
		<view class="more" :class="{displaynone:!isMore}">
			<view class="more-list" @tap="sendImg('album')">
				<image src="../../static/images/submit/pz.png" mode=""></image>
				<view class="more-list-title">图片</view>
			</view>
			<view class="more-list" @tap="sendImg('camera')">
				<image src="../../static/images/submit/pz.png" mode=""></image>
				<view class="more-list-title">拍照</view>
			</view>
			<view class="more-list">
				<image src="../../static/images/submit/pz.png" mode=""></image>
				<view class="more-list-title">定位</view>
			</view>
			<view class="more-list">
				<image src="../../static/images/submit/pz.png" mode=""></image>
				<view class="more-list-title">视频</view>
			</view>
			<view class="more-list">
				<image src="../../static/images/submit/pz.png" mode=""></image>
				<view class="more-list-title">文件</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Emoji from '@/components/submit/emoji/emoji.vue'
	export default {
		data() {
			return {
				isrecord: false,
				isemoji: false,
				isMore:false,
				toc: '../../static/images/submit/yy.png',
				msg: ''
			}
		},
		components: {
			Emoji
		},
		methods: {
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height);
				}).exec();
			},
			records() {
				if (this.isrecord) {
					this.isrecord = false;

					this.toc = '../../static/images/submit/yy.png'
				} else {
					this.isMore = false;
					this.isemoji = false;
					this.isrecord = true;
					this.toc = '../../static/images/submit/jp.png'
					setTimeout(() => {
						this.getElementHeight();
					}, 10)

				}
			},
			emoji() {
				this.isemoji = !this.isemoji;
				this.isMore = false;
				this.isrecord = false;
				setTimeout(() => {
					this.getElementHeight();
				}, 10)

			},
			emotion(e) {
				this.msg = this.msg + e;
			},
			inputs(e) {
				var chatm = e.detail.value;
				var pos = chatm.indexOf('\n');
				if (pos !== -1 && chatm.length > 1) {
					this.send(this.msg, 0);
				}
			},
			focus() {
				this.isemoji = false;
				this.$emit('focus', 111)
				setTimeout(() => {
					this.getElementHeight();
				}, 0)
			},
			emojiSend() {
				if (this.msg.length > 0) {
					this.send(this.msg, 0);
				}
			},
			emojiBack() {
				if (this.msg.length > 0) {
					this.msg = this.msg.substring(0, this.msg.length - 1);
				}
			},
			more(){
				this.isMore = !this.isMore;
				this.isemoji = false;
				this.isrecord = false;
				setTimeout(() => {
					this.getElementHeight();
				}, 10)
				
			},
			sendImg(e){
				let count = 9;
				e === 'album' ? count = 9 : 1;
				let _this = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [e], //从相册选择
					success: function (res) {
						const filePath = res.tempFilePaths;
						for(let i = 0;i < filePath.length;i++){
							_this.send(filePath[i],1);
						}
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			send(msg, type) {
				let data = {
					message: msg,
					types: type
				}
				this.$emit('inputs', data);
				setTimeout(() => {
					this.msg = '';
				}, 0)
			}
		}
	}
</script>

<style lang="scss">
	.submit {
		background-color: $uni-bg-color-grey;
		border-top: 1px solid $uni-border-color;
		width: 100%;
		// height: 100rpx;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: var(--status-bar-height);
		transition: all .2s linear;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.record {
			height: 44rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
		}

		.displaynone {
			display: none;
		}
	}

	.displaynone {
		display: none;
	}

	.emoji {
		width: 100%;
		height: 460rpx;
		background-color: rbga(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, 0.1);
		transition: all .2s linear;

		.emoji-send {
			width: 280rpx;
			height: 104rpx;
			padding-top: 20rpx;
			background-color: rbga(236, 237, 238, 0.9);
			position: fixed;
			bottom: 0;
			right: 0;
			display: flex;

			.emoji-send-bt {
				flex: 1;
				margin: 0 32rpx 0 20rpx;
				height: 80rpx;
				background: rgba(255, 228, 49, 1);
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 12rpx;
			}

			.emoji-send-det {
				flex: 1;
				margin-left: 24rpx;
				width: 120rpx;
				height: 76rpx;
				background: #fff;
				font-size: 32rpx;
				text-align: center;
				padding-top: 10rpx;
				padding-right: 2px;
				line-height: 76rpx;
				border-radius: 12rpx;

				image {
					width: 42rpx;
					height: 32rpx;
				}
			}
		}
	}
	.more{
		width: 100%;
		height: 436rpx;
		background-color: rgba(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, 0.1);
		transition: all .2s linear;
		padding: 20rpx;
		box-sizing: border-box;
		padding-top: 8rpx 20rpx;
		.more-list{
			width: 25%;
			text-align: center;
			float: left;
			padding-top: 32rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: #fff;
				border-radius: 24rpx;
			}
			.more-list-title{
				font-size: 24rpx;
				color: rbga(39,40,50,0.5);
				line-height: 34rpx;
			}
		}
	}
</style>
