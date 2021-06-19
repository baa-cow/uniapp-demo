<template>
	<view >
		<view class="news-item" v-for="item in news" :key="item.id" @click="newsDetail(item)">
			<image :src="item.image" ></image>
			<view class="info">
				<text class="tit">{{item.title}}</text>
				<view class="time">
					<text>发表时间：{{item.time | formatData}}</text>
					<text>浏览：{{item.watch}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["news"],
		filters:{
			formatData(data){			
				const time = data.split(" ")[0]
				return time
			}
		},
		methods:{
			newsDetail(item){
				this.$emit("newGo",item)
			}
		},
		onLoad(){
		}
	}
</script>

<style lang="less">
	.news-item{
		display: flex;
		padding: 14rpx 20rpx;
		border-bottom: 1px solid rgba(99,00,73,.2);
		image{
			width: 200rpx;
			height: 150rpx;
		}
		.info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 5px;
			flex: 1;
			
			.tit{
				display: block;
			}
			.time{
				font-size: 26rpx;
				text:nth-of-type(1){
					margin-right: 20rpx;	
				}
			}
		}
	}
</style>
