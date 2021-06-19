<template>
	<view class="news">
		<newsItem :news="news" @newGo="navigator"></newsItem>
	</view>
</template>

<script>
	import newsItem from "../../components/newsitem/newsitem.vue"
	export default{
		data(){
			return{
				news:[]
			}
		},
		methods:{
			async getNews(){
				const res = await this.$myRequest({
					url:"/news/new"
				})
				this.news=[...this.news,...res]
			},
			navigator(item){
				uni.navigateTo({
					url:"../newsDetail/newsDetail",
					success(res){
						res.eventChannel.emit("acceptNewData",item)
					}
				})
			}
		},
		components:{
			newsItem
		},
		onLoad(){
			this.getNews()
		}
	}
</script>

<style lang="less">
	.news{

	}
</style>
