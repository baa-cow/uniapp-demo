<template>
	<view class="good-detail">
		<swiper indicator-dots class="swiper">
			<swiper-item v-for="item in good" class="swiper-item" :key="item.id">
				<image :src="item.image"></image>
			</swiper-item>
		</swiper>
		<view class="price">
			<text class="sell_price">￥{{good[0].sell_price}}</text>
			<text class="market_price">￥{{good[0].market_price}}</text>
			<text class="good-title">
				{{good[0].title}}
			</text>
		</view>
		<view class="good-number">
			<text>货号：{{good[0].num}}</text>
			<text>库存：{{good[0].stock}}</text>
		</view>
		<view class="detail">
			<view>
				<rich-text :nodes="good[0].detail"></rich-text>
			</view>
		</view>
		<view class="good-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default{
		data(){
			return{
				good:[],
				options: [{
				    icon: 'headphones',
				    text: '客服'
				}, {
				    icon: 'shop',
				    text: '店铺',
				    info: 0,
				    infoBackgroundColor:'#007aff',
				    infoColor:"red"
				}, {
				    icon: 'cart',
				    text: '购物车',
				    info:0
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]  ,
			}
		},
		methods:{
			async addCart(){
				const _this = this;
				this.good[0].buy++;
				const res =await this.$myRequest({
								url:"/addcart",
								data:_this.good[0]
							})
				this.good[0] = res;
			},
			onClick (e) {
				if(e.index==2){
					uni.switchTab({
						url:'../cart/cart'
					})
				}else{
					uni.showToast({
						title: `点击${e.content.text}`,
						icon: 'none'
					})
				}
				
			},
			buttonClick (e) {
				if(e.index==0){
				  this.addCart();
				  this.options[2].info=this.good[0].buy;
				}else{
					uni.showToast({
						title: `点击${e.content.text}`,
						icon: 'none'
					})
				}
			  
			}
		},
		onLoad(option){
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on("acceptData",(data)=>{
				this.good.push(data) 
			})
		},
		onShow(){	
			if(this.good.length==0){return}
			 this.options[2].info=this.good[0].buy;
		},
		components:{
			uniGoodsNav
		}
	}
</script>

<style lang="less">
	.good-detail{
		font-size: 32rpx;
		.swiper{
			padding: 0 30rpx;
		}
		.swiper-item{
			width: 750rpx;
			height: 380rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.price{
			padding: 10px 10px 0;
			border-bottom: 3px solid #eee;
			line-height: 70rpx;
			.sell_price{
				padding-right: 10rpx;
				color: red;
			}
			.market_price{
				text-decoration: line-through;
				color: #eee;
			}
			.good-title{
				display: block;
				font-size: 30rpx;
			}
		}
		.good-number{
			padding: 10rpx ;
			border-bottom: 3px solid #eee;
			text{
				display: block;
			}
		}
		.detail{
			width: 750rpx;
			.img{
				width: 100%;
			}
		}
		.good-nav{
			width: 750rpx;
			position: fixed;
			bottom: 0;
		}
	}
</style>
