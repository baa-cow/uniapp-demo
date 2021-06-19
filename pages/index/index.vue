<template>
	<view class="home" >
		<swiper class="swiper" indicator-dots  autoplay="true" interval="3000" circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.image"></image>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="handleClick(item)">
				<view :class="item.icon"></view>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot-goods">
			<h1 class="title">推荐商品</h1>
			<goodlist ref="a" :goods="goodList" @detail="navigator"></goodlist>
		</view>
	</view>
</template>

<script>
	import goodlist from "../../components/goodlist/goodlist.vue"
	export default {
		data() {
			return {
				swipers:[],
				goodList:[],
				last:0,
				// pageInedex:1,
				navList:[
					{
						icon: 'iconfont icon-ziyuan icon',
						title: '超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen icon',
						title: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian icon',
						title: '社区图片',
						path: '/pages/pics/pics'
					}
				]
			}
		},
		onLoad() {
			this.getSwiper()
			this.getHotGoods()
		},
		components:{
			goodlist
		},
		methods: {
			async getSwiper(){
				const res = await this.$myRequest({
					url:"/index/swiper",
					method:"get",
					// data:this.pageInedex
				})
				this.swipers = res
			},
			async getHotGoods(){
				const res = await this.$myRequest({
					url:"/index/hot"
				})
				this.goodList=[...this.goodList,...res]
			},
			handleClick(item){
				uni.navigateTo({
					url:item.path
				})
			},
			navigator(item){
				uni.navigateTo({
					url:"../detail/detail",
					success(res){
						res.eventChannel.emit("acceptData",item)
					}
				})
			}
		},
		onReachBottom(){
			this.$throttle(this.getHotGoods)
		},
		onPullDownRefresh(){
			// this.pageInedex=0;
			setTimeout(()=>{
				this.goodList = []
				this.getHotGoods();
				uni.stopPullDownRefresh()
			},1000)
			
		},
		updated() {
		}
	}
</script>

<style lang="less">
	.home{
		width: 750rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.swiper{
			height: 380rpx;
		}
		.nav{
			display: flex;
			.nav-item{
				flex: 1;
				text-align: center;
				.icon{
					width: 120rpx;
					height: 120rpx;
					background-color: #f40;
					font-size: 50rpx;
					color: white;
					border-radius: 50%;
					text-align: center;
					line-height: 120rpx;
					margin: 10px auto;
				}
				.icon-tupian{
					font-size:45rpx;
				}
				.title{
					font-size: 30rpx;
				}
			}
		}
		.hot-goods{
			
			background-color: #eee;
			overflow: hidden;
			margin-top: 10px;
			.title{
				height: 50px;
				line-height: 50px;
				font-size: 40rpx;
				color: #b50e03;
				letter-spacing: 40rpx;
				background-color: #fff;
				margin: 3px auto;
				text-align: center;
			}
		}
	}
</style>
