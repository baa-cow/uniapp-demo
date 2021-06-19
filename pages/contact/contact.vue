<template>
	<view class="contact">
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" ></image>
		<view class="info">
			<view class="phone" @click="phone">
				联系电话：13333333333（点击拨打）
			</view>
			<view class="address">
				地址：惠州学院
			</view>
		</view>
	<map class="map" :longitude="longintude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				latitude:23.03733,
				longintude:114.41837,
				scale: 13,
				markers:[
					{
						id:1,
						latitude:23.03733,
						longitude:114.41837,
						width:30,
						height:30,
						iconPath:"../../static/position.jpg"
					}
				]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '400-618-9090'
				})
			}
		}
	}
</script>

<style lang="less">
	.contact{
		image{
			width: 750rpx;
			height: 320rpx;
		}
		.info{
			padding: 5px 10px;
			font-size: 15px;
		}
		.phone,.address{
			line-height: 40px;
			border-bottom: 1px solid #eee;
		}
		.map{
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
