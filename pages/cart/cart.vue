<template>
	<view class="cart">
		<view v-if="cart.length==0">
			暂无数据
		</view>
		<view class="cart-item" v-for="(item,i) in cart" :key="item.id">
			<image :src="item.image"></image>
			<view class="card-info">
				<text>{{item.title}}</text>
				<view class="price">
					<text>商品单价：￥{{item.sell_price}}</text>
					<text>商品总价：￥{{ item.sell_price * item.buy }}</text>
						</view>
					<view class="changeNo">
						<text id="des" @click="changeGood(item,i,$event)">-</text>
						<text>{{item.buy}}</text>
						<text id="add" @click="changeGood(item,i,$event)">+</text>
					</view>
			</view>
			
		</view>
		<view class="btn">
			<text>总计：{{total}}</text>
			<view class="button" @click="account">
				结算
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cart:[],
			}
		},
		methods:{
			async getCart(){
				const res = await this.$myRequest({
					url:"/cart"
				})
				this.cart=res
			},
			upDateCart(item,i,c){
				return async ()=>{
					let res =await this.$myRequest({
										url:"/addcart",
										data:{
											...item,
											c
										}
									})
					this.cart[i]=res
					
				}
			},
			async changeGood(item,i,e){
				let currentBuy = item.buy
				if(e.target.id=="des"){
					if(item.buy==1){
						uni.showToast({
							title: `宝贝不能再少哦`,
							icon: 'none'
						})
						return
					}
					// item.buy--;
					
					currentBuy--
				}else{
					// item.buy++;
					currentBuy++
				}
				this.$throttle(this.upDateCart(item,i,currentBuy))
			},
			account(){
				if(this.cart.length==0){
					return
				}
				uni.showToast({
					title: `进入结算`,
					icon: 'none'
				})
			}
		},
		computed:{
			total(){
				console.log(1)
				let res = 0;
				for(let i =0;i<this.cart.length;i++){
					res +=this.cart[i].sell_price*this.cart[i].buy
				}
				return res
			}
		},
		onShow(){
			this.getCart()
		}
	}
</script>

<style lang="less">
	page{
		background-color: #eee;
	}
	.cart{
		background-color: #eee;

		.cart-item{
			display: flex;
			padding: 20rpx;
			height: 260rpx;
			background-color: #fff;
			image{
				width: 300rpx;
				height: 100%;
			}
			.card-info{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 10rpx;
				text{
					display: block;
				}
				.changeNo{
					text{
						line-height: 40rpx;
						text-align: center;
						width: 45rpx;
						height: 45rpx;
						display: inline-block;
					}
					#des,#add{
						border-radius:20%;
						background-color: #eee;
					}
				}
			}
		}
		.btn{
			position: fixed;
			//#ifdef MP-WEIXIN
			bottom:0;
			//#endif
			
			//#ifdef H5
			bottom:100rpx;
			//#endif
			width: 750rpx;
			height: 90rpx;
			background-color: #fff;
			display: flex;
			justify-content:flex-end ;
			align-items: center;
			text{
				line-height: 90rpx;
				height: 100%;
			}
			.button{
				display: inline-block;
				text-align: center;
				width: 100rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 10%;
				background-color: #f40;
				margin: 0 20rpx;
				
			}
		}
	}
</style>
