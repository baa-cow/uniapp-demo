<template>
	<view class="goods">
		<goodlist :goods="goodList" @detail="navigator"></goodlist>
	</view>
</template>

<script>
	import goodlist from "../../components/goodlist/goodlist.vue"
	export default {
		components:{
			goodlist
		},
		data(){
			return{
				goodList:[],
				last:0,
			}
		},
		methods:{
			async getGoods(){
				const res = await this.$myRequest({
					url:"/index/hot"
				})
				this.goodList=[...this.goodList,...res]
			},
			// throttle(){
			// 	return function(){
			// 		const now = new Date().getTime();
			// 		if(now - this.last >= 1000){
			// 			this.getGoods();
			// 			this.last = now
			// 		}
			// 	}
			// },
			navigator(data){
				uni.navigateTo({
					url:"../detail/detail",
					success(res){
						res.eventChannel.emit("acceptData",data)
					}
				})
			}
		},
		onLoad(){
			this.getGoods();
		},
		onReachBottom(){
			this.$throttle(this.getGoods)
		},
		onPullDownRefresh(){
			this.goodList = [];
			this.getGoods();
		}
	}
</script>

<style lang="less">
	.goods{
		background-color: #eee;
	}
</style>
