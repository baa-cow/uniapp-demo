<template>
	<view class="pics">
		<scroll-view class="left" scroll-y >
			<view :class="active===i?'active':''"
			 v-for="(item,i) in navList" 
			 :key="item.id"
			 @click="navClick(item,i)">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y :scroll-top="scrollTop" @scroll="scroll">
			<view v-for="(item,i) in show" :key="i" class="right-item">
				<image :src="item.pic" @click="preview(item)"></image>
				<text class="text">
					{{item.p}}
				</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navList:[],
				active:0,
				show:null,
				imgList:[],
				scrollTop: 0,
				old: {
				    scrollTop: 0
				}
			}	
		},
		methods:{
			async getNav(){
				const res =await this.$myRequest({
					url:"/pics/nav",
				})
				this.navList = res
				this.navClick(this.navList[0],0)
				
			},
			navClick(item,i){
				this.active = i;
				this.show = item.img;
				this.goTop()
			},
			preview(item){
				this.imgList = this.show.map((i)=>{
					return i.pic
				})
				uni.previewImage({
					current:item.pic,
					urls:this.imgList,
				})
			},
			scroll: function(e) {
			    this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
			    this.scrollTop = this.old.scrollTop
			    this.$nextTick(function() {
			        this.scrollTop = 0
			    });
			}
		},
		onLoad(){
			this.getNav()
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
	}
	.pics{
		height: 100%;
		padding-top: 2px;
		display: flex;
		.left{
			width: 200rpx;
			text-align: center;
			font-size: 30rpx;
				border-right: 1px solid #eee;
			view{
				height: 60px;
				line-height: 60px;
			}
			.active{
				background-color: #f40;
			}
		}
		.right{
			width: 550rpx;
			height: 100%;
			font-size: 28rpx;
			.right-item{
				width: 100%;
				margin-top: 10px;
				image{
					width: 500rpx;
					height: 500rpx;
					display: block;
					margin: 0 auto;
				}
				text{
					padding-left: 20rpx;
				}
			}
		}
	}
</style>
