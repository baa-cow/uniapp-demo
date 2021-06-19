import mock from "./better-mock/dist/mock.mp.js";
let cart = []
//轮播图api
mock.mock("/index/swiper",{
	'data|4':[{
		"id|+1":1,
		"image":"@image(200x100, #eee, @color, png, swiper)"
	}]
})
//推荐商品
mock.mock("/index/hot",{
	'data|10':[{
		"id|+1":1,
		"image":"@image(200x100, #eee, @color, png, goods)",
		"title":"@ctitle(9,23)",
		"add_time":"@datetime()",
		"sell_price|10-2000":1,
		"market_price|10-2000":1,
		"num|":"21478973758923",
		"stock":200,
		"buy":0,
		"detail":`<div>
        <p><span><span style="color: #999999;"><strong>名称：竹编托盘</strong></span></span>
        </p>
        <p><span><span style="color: #999999;"><strong>规格：<strong style="color: #999999;">特小号 &nbsp;<strong>15x15cm</strong>&nbsp; &nbsp;内部净含尺寸11x11cm</strong></strong></span></span>
        </p>
        <p><span><span style="color: #999999;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 小号 &nbsp;<strong style="color: #999999;">23x18cm</strong>&nbsp; &nbsp; &nbsp; &nbsp;内部净含尺寸19x13cm</strong></span></span>
        </p>
        <p><span><span style="color: #999999;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 中号 &nbsp;29cmx24cm &nbsp;内部净含尺寸25.5x18.5cm</strong></span></span>
        </p>
        <p><span><span style="color: #999999;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 大号 &nbsp;34cmx28cm &nbsp;内部净含尺寸&nbsp;30cmx22cm</strong></span></span>
        </p>
        <p>
			<span style="width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;">
				<img  src="https://img.alicdn.com/imgextra/i2/489752881/TB2kUOvaVXXXXanXXXXXXXXXXXX_!!489752881.jpg" class="img">
			</span>
            <span style="width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;">
				<img  src="https://img.alicdn.com/imgextra/i1/489752881/TB2veivaVXXXXaNXXXXXXXXXXXX_!!489752881.jpg" class="img">
             </span>
			 <span style="width: 750.0rpx;height: 421.r0px;margin: 0;display: block;">
				<img  src="https://img.alicdn.com/imgextra/i1/489752881/TB2s5isaVXXXXcnXXXXXXXXXXXX_!!489752881.jpg" class="img">
			</span>
            <span style="width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;">
                <img  src="https://img.alicdn.com/imgextra/i3/489752881/TB2iIqtaVXXXXccXXXXXXXXXXXX_!!489752881.jpg" class="img" >
            </span>
            <span style="width: 750.0px;height: 421.0px;margin: 0;display: block;">
                <img  src="https://img.alicdn.com/imgextra/i3/489752881/TB2JzOsaVXXXXcsXXXXXXXXXXXX_!!489752881.jpg" class="img" >
            </span>
            <span style="width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;">
                    <img  src="https://img.alicdn.com/imgextra/i4/489752881/TB27sOxaVXXXXXBXXXXXXXXXXXX_!!489752881.jpg" class="img" >
            </span>
            <span style="width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;">
                <img  src="https://img.alicdn.com/imgextra/i1/489752881/TB2iWqsaVXXXXciXXXXXXXXXXXX_!!489752881.jpg" class="img">
            </span>
            <span style="width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;">
                <img  src="https://img.alicdn.com/imgextra/i1/489752881/TB2GrusaVXXXXcWXXXXXXXXXXXX_!!489752881.jpg" class="img" >
            </span>
        </p>
    </div>`
	}]
})
//社区图片
mock.mock("/pics/nav",function(option){
	
	return mock.mock( {
		'data|14':[{
			"id|+1":1,
			"title":"@ctitle(4)",
			'img|3':[{"pic":"@image(200x100, #eee,@color, png, pic)",
						"p":"@ctitle(3,17)"
					}]
		}]
	})
})
//资讯
mock.mock("/news/new",{
	'data|14':[{
		"id|+1":1,
		"title":"@ctitle(9,23)",
		"image":"@image(200x150, #eee, @color, png, swiper)",
		"time":"@datetime()",
		"watch|0-9999":1,
		"content":`<div>
        <div>
            <p class="first"><span>【环球时报特约记者 吕克】被称为“史上最拥挤端午档”并没有迎来预期中的票房佳绩，与清明档、五一档的火爆相比，今年端午节三天小长假里的国内电影市场显得波澜不惊。截至14日22时，今年端午档总票房仅4.6亿元人民币，远不如2019年的7.85亿。究其原因，还是因为缺乏“头部大片”和“口碑爆款”带动大盘，此外电影宣传不够积极，对观众缺乏明确吸引力，降低假期观影意愿。</span></p>
        </div>
        <div>
            <p><span>据统计，目前端午档新片票房暂时领先的是体育题材影片《超越》（8742万元），讲述郑恺饰演的前“百米飞人”郝超越经历人生转折后陷入低谷，与昔日挚友再聚唤醒了他的热血回忆，最终实现自我超越的故事。与北美同步上映的好莱坞新片《彼得兔2：逃跑计划》紧随其后，7645万元的首周末票房也预示着其最终收入和三年前的第一部平齐。</span></p>
        </div>
        <div>
            <p><span >此外，《你好世界》《阳光姐妹淘》《当男人恋爱时》和《热带往事》的票房都在5000万元左右，排片率不分伯仲，没一部能像之前《悬崖之上》等片那样脱颖而出，导致整体市场被均分。而前几年端午档恰逢好莱坞暑期档开市，《X战警：天启》《侏罗纪世界2》《哥斯拉2：怪物之王》等进口片对观众的强势吸引，足以把整体大盘推高到七八亿的高度。</span></p>
        </div>
        <div >
            <p><span>今年端午档陷入低迷的另一个原因，是各部影片的口碑差距没有完全拉开，失去对观众的引领作用。豆瓣评分最高的《彼得兔2：逃跑计划》为7.3分，最低的《阳光姐妹淘》为5.0分，都没能引发社会话题效应，成为《我的姐姐》《你好，李焕英》那样吸引更多观众的爆款。</span></p>
        </div>
        <div >
            <p><span >鉴于整个电影市场五六月一直处于淡季，在好莱坞大片匮乏、国产新片定档犹豫的心态下，暑期能否迎来复苏还很难预测。</span></p>
        </div>
        <div>
            <span >本文来源：环球时报</span>
        </div>
        <div><span>举报/反馈</span></div>
    </div>`
	}]
})
//添加购物车
mock.mock("/addcart",function(option){	
	let currentGood=""
	if(cart.length>0){
		cart.forEach((item,i)=>{
			if(item.id==option.body.id){
				if(option.body.c){
					item.buy = option.body.c;
				}
				// cart[i] = option.body
				currentGood = item
			}
		})
		if(currentGood ==''){			
			cart.push(option.body);
			currentGood = option.body
		}
	}else{
		cart.push(option.body);	
		currentGood = option.body
	}
	return {
		data:currentGood
	}
})
//购物车选项	
mock.mock("/cart",function(o){
	return{
		data:cart
	}
})
export function myRequest(option){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:option.url,
			method:option.method || "GET",
			data:option.data || {},
			success(res){
				if(res.statusCode== 200){
					resolve(res.data.data)
				}
			},
			fail(err){
				reject(err)
			}
		})
	})
}