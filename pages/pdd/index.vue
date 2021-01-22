<template>
	<view class="index-content">
		<view class="navbar">
			<view v-for="(item, index) in category" :key="index" class="nav-item" :class="{current: tabFromIndex === index+1}"
			 @click="tabClicks(index+1)">
				{{item.name}}
			</view>
		</view>
		<view class="index-coupon has-bg-white has-pd-10 top_30">
			<view class="goods-list" v-if="couponlist.length > 0">
				<orange-goods-card-home v-for="(item,index) in couponlist" :index="index%2" :logo="pddlogo" :tkmoney='item.tkmoney'
				 :tkmoneys='item.tkmoneys' :itemid="item.goodsId" :isEnable='isEnable' :is-invitation="isInvitation" :itempic="item.goodsThumbnailUrl"
				 :itemtitle="item.goodsName" :itemprice='"¥"+item.itemprice' :itemsale='"已售 "+item.salesTip'
				 :itemendprice='item.itemendprice' :couponmoney="item.couponDiscount*0.01">
				</orange-goods-card-home>
			</view>
		</view>

		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="couponlist.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多提示 -->
		<!-- 悬浮上拉 -->
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']" style="bottom: 56px;">
			<text class="iconfont icon-shangla"></text>
		</view>
		<empty v-if="couponlist.length === 0" des="暂无数据" show="false"></empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pddlogo: "../../static/img/pinduoduo.png",
				tabFromIndex: 1,
				category: [{
						name: '实时热销榜'
					},
					{
						name: '实时收益榜'
					}
				],
				genderKey: "gender",
				TabCur: 0,
				scrollLeft: 0,
				scrollTop: false,
				couponlist: [],
				page: 1,
				min_id: 0,
				isInvitation: 0,
				cid: 0,
				cat_id: 0,
				sort: 4,
				loadingType: 0,
				isEnable: '否',
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
		
			this.loadPddCouponList();
			this.getUserInfo();

		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		methods: {
			loadPddCouponList: function(type) {
				uni.showLoading({
					title: '加载中...'
				});
				this.loadingType = 1;
				this.$Request.getT('/pdd/query/sortType/' + this.tabFromIndex + '/page/' + this.page + '/pageSize/20')
					.then(res => {
						this.loadingType = 0;
						if (res.topGoodsListGetResponse) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							res.topGoodsListGetResponse.list.forEach(d => {
								let grade = this.$queue.getData("grade");
								d.tkmoneys = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d.promotionRate * 0.001)) * 0.7).toFixed(2);
								if (grade) {
									d.tkmoney = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d.promotionRate * 0.001)) * parseFloat(
										grade)).toFixed(2);
								} else {
									d.tkmoney = ((((d.minGroupPrice - d.couponDiscount) * 0.01) * (d.promotionRate * 0.001)) * 0.3).toFixed(2);
								}
								d.itemendprice = ((d.minGroupPrice - d.couponDiscount) * 0.01).toFixed(2);
								d.itemprice = ((d.minGroupPrice) * 0.01).toFixed(2);
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
			getUserInfo() {
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
			tabClicks(index) {
				this.tabFromIndex = index;
				this.loadPddCouponList();
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
		},

		onReady: function() {
			this.loadPddCouponList();
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.loadPddCouponList();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.loadPddCouponList("Refresh");
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 15px;
		background: #fff;
		margin-top: 8px;

		.i-top {
			display: flex;
			align-items: center;
			height: 40px;
			padding-right: 16px;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				font-weight: 400;
				color: $base-color;
			}

			.del-btn {
				padding: 6px 0 6px 18px;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 16px;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 10px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}


		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 10px 0;

			.goods-img {
				width: 60px;
				height: 60px;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 15px 0 12px;
				overflow: hidden;

				.title {
					height: 32px;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 5px 0px;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						font-size: $font-sm;
						margin: 0 1px 0 4px;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 10px 16px;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 4px;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 1px 0 4px;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 50px;
			position: relative;
			padding-right: 16px;
		}

		.action-btn {
			width: 80px;
			height: 30px;
			margin: 0;
			margin-left: 12px;
			padding: 0;
			text-align: center;
			line-height: 30px;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 40px;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 14px;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
