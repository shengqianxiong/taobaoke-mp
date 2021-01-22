<template style="background: white">
	<view>
		<view style="background: white;z-index: 999">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" style="position: fixed;z-index: 100;border-bottom:1px solid ghostwhite">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in category" @tap="tabSelect"
				 :data-id="index">
					<text :style="index==TabCur?'background: #e10a07;color: white;padding: 2px 10px 2px 10px;border-radius: 16px;margin-right: -10px':'background: #ffffff;color: #333333;margin-right: -10px'">
						{{item}}
					</text>
				</view>
			</scroll-view>
		</view>
		<view style="height: 1px;background: grey;width: 100%"></view>
		<view class="index-content" style="padding-top: 90upx;">
			<view class="index-coupon has-bg-white has-pd-10 top_30">
				<view class="goods-list" v-if="couponlist.length > 0">
					<orange-goods-card-home v-for="(item,index) in couponlist" :index='index' :tkmoney='item.tkmoney' :tkmoneys='item.tkmoneys'
					 :itemid="item.skuId" :logo="jdlogo" :isEnable='isEnable' :is-invitation="isInvitation" :itempic="item.itempic"
					 :itemtitle="item.skuName" :itemprice='"¥"+item.itemprice' :itemsale='item.itemsale' :itemendprice='""+item.itemendprice'
					 :couponmoney="item.couponmoney" @success="clickItem"></orange-goods-card-home>
				</view>
			</view>
			<!-- 悬浮上拉 -->
			<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']" style="bottom: 56px;">
				<text class="iconfont icon-shangla"></text>
			</view>
			
			<!-- 加载更多提示 -->
			<view class="s-col is-col-24" v-if="couponlist.length > 0">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
			<!-- 加载更多提示 -->
			<empty v-if="couponlist.length === 0" des="暂无数据" show="false"></empty>
		</view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			}
		},

		data() {
			return {
				logo: "../../static/img/mao.png",
				taobao: "../../static/img/taobao.png",
				isEnable: '否',
				jdlogo: "../../static/img/jd.png",
				category: [
					'休闲零食',
					'饮品',
					'蔬菜',
					'厨房',
					'纸巾',
					'洗衣液',
					'洗浴',
					'母婴',
					'湿巾',
					'车载',
				],
				TabCur: 0,
				TabCurs: 0,
				scrollLeft: 0,
				scrollLefts: 0,
				couponlist: [],
				page: 1,
				min_id: 1,
				cid: '休闲零食',
				type: 1,
				isInvitation: 0,
				sort: 4,
				genderKey: "gender",
				loadingType: 0,
				scrollTop: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad: function(e) {
			let a = this.$queue.getData("isEnable")
			if (a) {
				this.isEnable = a;
			}
			uni.showLoading({
				title: '加载中...'
			});
			this.loadCouponList();
			let userId = this.$queue.getData("userId");
			if (userId) {
				this.$Request.getT("/user/" + userId).then(res => {
					if (res.status === 0) {
						this.$queue.setData("image_url", res.data.image_url);
						this.$queue.setData("mobile", res.data.phone);
						this.isInvitation = res.data.isInvitation;
						this.$queue.setData("isInvitation", res.data.isInvitation);
						this.$queue.setData("relation", res.data.invitation);
						this.$queue.setData("grade", res.data.grade);
						this.$queue.setData("nickName", res.data.nickName);
						this.$queue.setData("relation_id", res.data.relationId);
						this.$queue.setData("gender", parseInt(res.data.gender));
					}
				});
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		methods: {

			searchSelect(e) {
				this.TabCurs = e.currentTarget.dataset.id;
				this.sort = this.tab[e.currentTarget.dataset.id].jd;

				this.scrollLefts = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.min_id = 1;
				uni.showLoading({
					title: '加载中...'
				});
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
				this.loadCouponList("Refresh");
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.cid = this.category[e.currentTarget.dataset.id];
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.min_id = 1;
				uni.showLoading({
					title: '加载中...'
				});
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				//#endif
				this.loadCouponList("Refresh");
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			clickItem(index) {
				this.$queue.setData("jd_list", JSON.stringify(this.couponlist[index]))
				uni.navigateTo({
					url: '/pages/detail/jd'
				});
			},
			loadCouponList: function(type) {
				this.loadingType = 1;
				this.$Request.getT('/jd/goods/list/' + this.page + "?sortName=" + this.sort + "&keywords=" + this.cid).then(
					res => {
						this.loadingType = 0;
						if (res.code === 200) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.data.list.forEach(d => {
								let grade = this.$queue.getData("grade");
								if (d.imageInfo.imageList.length > 0) {
									d.itempic = d.imageInfo.imageList[0].url
								}
								d.itemprice = d.priceInfo.price
								d.couponmoney = d.couponInfo.couponList[0].discount
								d.itemendprice = Math.round(d.priceInfo.price - d.couponInfo.couponList[0].discount);
								d.tkmoneys = (d.commissionInfo.commission * 0.7).toFixed(2);
								if (grade) {
									d.tkmoney = (d.commissionInfo.commission * parseFloat(grade)).toFixed(2);
								} else {
									d.tkmoney = (d.commissionInfo.commission * 0.3).toFixed(2);
								}
								d.itemsale = d.inOrderCount30Days > 10000 ? "已售 " + (d.inOrderCount30Days / 10000).toFixed(1) + "万" : "已售 " +
									d.inOrderCount30Days;
								this.couponlist.push(d);
							})
						} else {
							this.loadingType = 2;
						}
						uni.hideLoading();

						if (type === "Refresh") {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					})
			},
			toGoodsInfo: function(itemid) {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + itemid,
					})
				}
			},
		},

		onReady: function() {
			this.loadCouponList();
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.loadCouponList();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.min_id = 1;
			this.loadCouponList("Refresh");
		}
	}
</script>

<style>
	@import "../../static/css/index.css";
</style>
