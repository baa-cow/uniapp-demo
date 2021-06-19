<template>
	<view class="goodlist" >
		<view class="goodlist-item" v-for="item in goods" :key="item.id" @click="clickGoods(item)">
			<image :src="item.image"></image>
			<view class="price">
				<text class="sell_price">￥{{item.sell_price}}</text>
				<text class="market_price">￥{{item.market_price}}</text>
			</view>
			<view class="good-title">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["goods"],
		methods:{
			clickGoods(item){
				this.$emit("detail",item)
			}
		}
	}
</script>

<style lang="less">
	.goodlist{
		display: flex;
		flex-wrap: wrap;
		padding: 0 15rpx;
		justify-content: space-between;
		font-size: 28rpx;
		.goodlist-item{
			background-color: white;
			margin:3px 0;
			padding: 7px;
			width: 355rpx;
			box-sizing: border-box;
			image{
				width: 80%;
				height: 300rpx;
				display: block;
				margin:0 auto;
			}
			.sell_price{
				padding-right: 10rpx;
					color: red;
			}
			.market_price{
				text-decoration: line-through;
				color: #eee;
			}
			.good-title{
				font-size: 30rpx
			}
		}
	}
</style>
