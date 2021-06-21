<template>
	<view class="news-detail">
		<h3>{{nDetail.title}}</h3>
		<view class="timeD">
			<text>发表时间：{{nDetail.time | formatData}}</text>
			<text>浏览：{{nDetail.watch}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="nDetail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nDetail:[]
			}
		},
		filters:{
			formatData(data){		
				if(!data){return}
				// if(this.nDetail.length==0){return}
				const time = data.split(" ")[0]
				return time
			}
		},
		onLoad(){
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on("acceptNewData",(data)=>{
				this.nDetail = data;
			})
		}
	}
</script>

<style lang="less">
	.news-detail{
		padding: 10rpx 10rpx 0;
		h3{
			font-size: 30rpx;
			text-align: center;
			line-height: 50rpx;
		}
		.timeD{
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
		}
		
	}
</style>
