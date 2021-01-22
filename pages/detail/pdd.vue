<template>
	<view class="s-page-wrapper">
		<view class="index-goods" v-if="loadGoods">
			<view class="swiper">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" :indicator-dots="true"
				 indicator-active-color="#e10a07" indicator-color="#cccccc">
					<block v-for="(item, index) in goods.goodsGalleryUrls" :key="item">
						<swiper-item class="swiper-wrapper">
							<image :src="item" mode="widthFix" class="is-response" lazy-load="true" :data-index="index" @tap="previewPhoto"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<view style="background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: bold"
			 v-if="goods && !relation_id && isEnable != '否'" @tap="goPublisher">
				<image src="../../static/detail/2x.png" style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"
				 mode=""></image>
				<view style="color: #FCDFB8;width: 98%;line-height: 60upx">成为会员最高可返现金￥{{ shengji }}元</view>
				<view style="width: 35%;text-align: center;font-size: 28upx;margin-top:4upx;position: relative;top:0upx" class="b-btn">
					立即加入
					<view class="cuIcon cuIcon-right" style=" position: absolute;top:14upx;left:160upx; background-color: #FFE9C6;width: 30upx;height: 26upx;padding-top:2upx; display: block; border-radius: 50%;color:#000000;">
						<image src="../../static/my/you.png" style="width: 24upx;height: 24upx;margin-left: 4upx; display: block ;line-height: 40upx;"></image>
					</view>
				</view>
			</view>
			<view style="background: #333333;padding: 8px;display: flex;font-size: 14px;font-weight: bold"
			 v-if="goods && relation_id && grade !== '0.7' && isEnable != '否'" @tap="shengJiMethod">
				<image src="../../static/detail/2x.png" style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"
				 mode=""></image>
				<view style="color: #FCDFB8;width: 98%;line-height: 60upx;font-size: 28upx">预估返￥{{ money }}元,升级最高返￥{{ shengji }}元</view>
				<view style="width: 35%;text-align: center;font-size: 28upx;margin-top:4upx;position: relative;top:0upx" class="b-btn">
					立即升级
					<view class="cuIcon cuIcon-right" style=" position: absolute;top:14upx;left:160upx; background-color: #FFE9C6;width: 30upx;height: 26upx;padding-top:2upx; display: block; border-radius: 50%;color:#000000;">
						<image src="../../static/my/you.png" style="width: 24upx;height: 24upx;margin-left: 4upx; display: block ;line-height: 40upx;"></image>
					</view>
				</view>
			</view>
			<view style="background: #333333;padding: 16upx;display: flex;font-size: 28upx;font-weight: bold"
			 v-if="goods && grade === '0.7' && isEnable != '否'">
				<image src="../../static/detail/2x.png" style="width: 40upx;height: 35upx;display: block;margin-top: 10upx;margin-right: 17upx;"
				 mode=""></image>
				<view style="color: #FCDFB8;width: 75%">已成为高级会员,预估返现￥ {{ money }}元</view>
			</view>
			<view class="goods_info" style="padding-top: 6px;padding-bottom: 16upx">
				<view class="coupon-price s-row">
					<view class="price" style="width: 70%">
						<text style="font-size: 24upx;margin-left: 4upx;">券后价</text>
						<text style="font-size: 34upx">￥</text>
						<text style="font-weight: 700;">{{ ((goods.minGroupPrice - goods.couponDiscount) * 0.01).toFixed(2) }}</text>
						<text style="font-size: 24upx;color: grey;text-decoration:line-through;margin-left: 8px">￥{{ (goods.minGroupPrice * 0.01).toFixed(2) }}</text>
					</view>
				
				</view>
				<view style="padding: 16upx 32upx 16upx 16upx;display: flex;">
					<view>
						<text style="color: #FFFFFF;background: #E10A07;font-size: 24upx;padding-left: 12upx;padding-right: 12upx;border-radius: 16upx;margin-right: 8upx;padding-top: 4upx;padding-bottom: 4upx;"><text>拼多多</text></text>
						<text style="font-weight: bold">
							<text @longpress="copyTitle">{{ goods.goodsName }}</text>
						</text>
					</view>
					<button open-type="share" @click="showModal()" style="width: 160upx;height:48upx; text-align: center;line-height: 48upx; background-color: #ebebeb;border-radius:24upx 0upx 0upx 24upx;">
						<text>
							<text class="cuIcon cuIcon-share"></text>
							<text>分享</text>
						</text>
					</button>
				</view>
				<view style="width:100%;height: 98upx;background-color:#F2F2F2;">
					<view v-if="goods.mallName" style="float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;margin-top: 16upx;margin-bottom:16upx;display:  flex;">
						<view style="margin-right:60upx ;margin-left: 20upx;">店铺</view>
						<image style="height: 40upx;width:40upx;margin-top: 6px;margin-right: 4upx;" src="../../static/img/dianpu.png"></image>
						<view style="font-weight: bold;">{{ goods.mallName }}</view>
					</view>
				</view>
				<view style="width:100%;height: 84upx;background-color:#F2F2F2;" >
					<view @click="bijiage()" style="padding: 0upx 32upx 16upx 32upx;float: right;height: 68upx;width:100%;background-color:#FFFFFF;float: right; line-height: 68upx;display:  flex;">
						<image style="height: 40upx;width:40upx;margin-top: 6px;margin-right: 14upx;" src="../../static/my/bijia.png"></image>
						<view style="color:#333333;width:22%; font-size: 30upx;" >
							我要比价
						</view>
						<view class="fr-jutext" style="width: 86%;text-align: right;color: #999999;">查看更多 ></view>
					</view>
				</view>
				<view class="coupon-price s-row"></view>
				<view style="width: 100%;padding:30upx 30upx 50upx">
					<view class="goods-info-title" style="color:#333333;width: 20%;text-align: center;float:left;">必买理由</view>
					<view class="volume" style="font-size: 14px;float: right;color:#333333;"><text style="color:#E20C0A;font-weight: bold;">{{ goods.salesTip }}人付款</text></view>
					<view class="coupon-price s-row"></view>
					
					<view class="goods_reco" style="display: flex;margin-top: 20upx;background-color: #F2F2F2;width: 96%;margin:20upx auto 30upx;position: relative;border-radius: 8upx;">
						<image src="../../static/detail/559.png" style="width:14upx;height:12upx;display: block;position: absolute;top:-12upx;left:34upx"></image>
						<view class="goods_desc" style="padding-bottom: 16upx;padding-top:20upx;" @click="TklmaskShow" >
							<text>{{ goods.goodsDesc }}</text>
						</view>
					</view> 
					<view style="width: 25%;float: right;margin-right: 36upx; text-align:center;border-radius: 16px;border: 1px solid #e10a07;color: #e10a07;padding: 1px 6px 1px 6px;"
					      @click="shareFriend()" >
					    文案分享
					</view>
				</view>
				
			</view>
			
			<view class="goods_quan s-row" style="padding-top: 8upx;padding-bottom: 8upx;background-color: #F2F2F2;">
				<view class="row getGoodsLink" @click="shopCartShare('quan')">
					<view class="is-col-16 money"  style="color: #DE2E2D;" >
						<view style="font-weight: bold" v-if="goods.couponDiscount != 0">
							<text>{{ goods.couponDiscount * 0.01 }}</text>
							元优惠券
						</view>
						<view style="font-weight: bold;margin-top: 18upx;color: #DE2E2D;" v-else>优惠券已被抢光</view>
						<view class="date-coupon" style="color: #DE2E2D;" v-if="goods.couponStartTime">使用期限: {{ goods.couponStartTime }} - {{ goods.couponEndTime }}</view>
					</view>
				
				</view>
					<image lazy-load src="../../static/detail/21.png" mode="widthFix" class="is-response"></image>
			</view>
			
			<view class="goods_reco" style="margin-top: -100rpx" v-if="goods.goodsGalleryUrls">
				<view class="goods-info-title">宝贝详情</view>
				<view class="imglist">
					<block v-for="(item, index) in goods.goodsGalleryUrls">
						<image lazy-load :src="item" mode="widthFix" class="is-response" @longpress="toSave(item)"></image>
					</block>
				</view>
			</view>
			<!-- 购买按钮 -->
			<view class="goods_shop_cart">
				<view class="cent" style="display: flex">
					<view style="text-align: center;width: 25%;margin-top: 4px;margin-bottom: 4px;display: flex">
						<view style="width: 50%;text-align: center">
							<view class="iconfont icon-shouye" @tap="goBackUp()"></view>
							<view style="font-size: 12px">首页</view>
						</view>
						<view style="width: 50%;text-align: center">
							<view class="iconfont icon-shoucang" :style="collect.isCollect" @tap="clickCollect()"></view>
							<view style="font-size: 12px" :style="collect.isCollect">{{ collect.name }}</view>
						</view>
					</view>
					<view style="width: 75%;display: flex;color: white">
						<view style="border-radius: 32upx;width: 50%;background: #e43939;text-align: center;padding-top:8px;margin: 4px" @tap="shopCartShare('fanxian')">{{ buyDes }}</view>
						<view class="getTbk" style="border-radius: 32upx;width: 50%;background:#E41F19; text-align: center;padding-top: 8px;margin: 4px" @tap="shopCartShare('quan')">{{ getQun }}</view>
					</view>
				</view>
			</view>
			<view class="navBarButtonBox">
				<!-- 顶部右侧菜单 -->
				<view v-if="navBarButton" class="goods_shop_cart_bg navBarButton" @tap="showShopCartBg('nav')"
				 @touchmove.stop.prevent="moveHandleStop"></view>
				<view class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">
					<view class="em">
						<view style="font-size: 14px" @tap="navBarButtontO('home')">
							<text class="iconfont icon-shouye"></text>
							返回首页
						</view>
						<view style="font-size: 14px" @tap="navBarButtontO('search')">
							<text class="iconfont icon-sousuo"></text>
							超级搜索
						</view>
						<view style="font-size: 14px" @tap="navBarButtontO('footer')">
							<text class="iconfont icon-zuji"></text>
							我的足迹
						</view>
						<view style="font-size: 14px" @tap="navBarButtontO('like')">
							<text class="iconfont icon-shoucang"></text>
							个人中心
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 淘口令分享 -->
		<simpleModal ref="simpleModalTkl" @maskClose="TklmaskClose">
			<view class="buy-box-title" style="color: #E10A07;font-weight: 600;">复制分享文案</view>
			<view class="buy-box-center">
				<view class="code-cent">
					<div class="cente-text">
						<div>
							<view class="textarea">
								{{ goods.goodsName }}
								<br />
								【在售价】{{ (goods.couponDiscount * 0.01).toFixed(2) }}元
								<br />
								【券后价】{{ ((goods.minGroupPrice - goods.couponDiscount) * 0.01).toFixed(2) }}元
								<br />
								【下单链接】{{ erweima }}
								<br />
								【必买理由】{{ goods.goodsDesc }}
								<br />
							</view>
						</div>
					</div>
				</view>
				<view class="buy-btn-copy" v-bind:class="[copyTklStatus ? 'active' : '', '']" @tap="copyTklWenAns">{{ copyTklStatus ? '已复制到剪切板' : '一键复制' }}</view>
			</view>
		</simpleModal>
		<!-- 淘口令分享 -->
		<view class="" v-if="!loadGoods">
			<view class="s-page">
				<view class="is-100vh is-flex is-column is-justify-center is-align-center ">
					<image src="../../static/img/load.gif" style="width:75px;height: 75px;" class="is-response" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- <view class="scroll_top active " @click="TklmaskShow()" style="bottom: 120upx;width:200upx;right: -24upx;padding-right: 20upx">
			<text>
				<text class="cuIcon cuIcon-share"></text>
				文案分享
			</text>
		</view>
		<view class="scroll_top active " @click="showModal()" style="bottom: 200upx;width: 200upx;right: -24upx;padding-right: 20upx">
			<text>
				<text class="cuIcon cuIcon-calendar"></text>
				生成海报
			</text>
		</view>
		<view class="scroll_top active " @click="bijiage()" style="bottom: 280upx;width: 200upx;right: -24upx;padding-right: 20upx">
			<text>
				<text class="cuIcon cuIcon-recharge"></text>
				我要比价
			</text>
		</view> -->
		<tki-qrcode ref="qrcode" :val="erweima" :size="200" background="#fff" foreground="#000" pdground="#000" :onval="true"
		 :loadMake="true" @result="qrR" :show="false"></tki-qrcode>
		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" v-if="goods && erweimapath && haibaoShow" @tap="hideModal">
				<view class="bg-img">
					<wm-poster @success="posterSuccess" :imgSrc="goods.goodsImageUrl" :QrSrc="erweimapath" :Title="goods.goodsName"
					 :PriceTxt="goods.itemendprice" :OriginalTxt="goods.itemprice" :LineType="false"></wm-poster>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import simpleModal from '../../components/simple-pro/customModal.vue';
	import wmPoster from '@/components/wm-poster/wm-poster.vue';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "原价" + this.goods.itemprice + "券后价" + this.goods.itemendprice+this.goods.goodsName,
				imageUrl: this.goods.goodsImageUrl,
				path: '/pages/detail/pdd?itemid=' + this.itemid + '&relation_id=' + this.relation_id
			}
		},

		data() {
			return {
				erweima: '',
				erweimapath: '',
				itemid: '',
				modalName: '',
				logo: '../../static/img/mao.png',
				taobao: '../../static/img/taobao.png',
				buyDes: '口令购买',
				collect: {
					name: '收藏',
					isCollect: ''
				},
				show_share: false,
				shengji: '',
				getQun: '立即领券',
				follow: false,
				loadGoods: true,
				goods: '',
				taoBaoBuy: true,
				shopCartBg: false,
				scrollTop: false,
				couponlist: [],
				navBarButton: false,
				copyTklStatus: false,
				save: false,
				tkl: '',
				relation_id: null,
				money: 0,
				grade: '',
				isInvitation: 0,
				showFollow: false,
				isWeiXin: false,
				footprintKey: 'orange-sqx-footprint-pdd',
				collectKey: 'orange-sqx-collect-pdd',
				poster: {},
				coupon_click_url: '',
				qrShow: false,
				haibaoImg: null,
				haibaoShow: false,
				isEnable: '否',
				canvasId: 'default_PosterCanvasId'
			};
		},
		components: {
			simpleModal,
			tkiQrcode,
			wmPoster
		},
		onShow: function() {
			this.copyTklStatus = false;
		},
		onLoad: function(e) {
			if(e.relation_id){
				this.$queue.setData('relation', e.relation_id);
			}
			let a = this.$queue.getData('isEnable');
			if (a) {
				this.isEnable = a;
			}
			if (e.itemid) {
				this.itemid = e.itemid;
				this.relation_id = e.relation_id
				let userId = this.$queue.getData('userId');
				if (userId) {
					this.$Request.getT('/user/' + userId).then(res => {
						if (res.status === 0) {
							if (res.data.isInvitation) {
								this.isInvitation = res.data.isInvitation;
								this.$queue.setData('isInvitation', res.data.isInvitation);
							}
							this.$queue.setData('relation', res.data.invitation);
							this.$queue.setData('grade', res.data.grade);
							this.$queue.setData('pddpid', res.data.pdd);
							this.$queue.setData('jdpid', res.data.jd);
							if (res.data.image_url) {
								this.$queue.setData('image_url', res.data.image_url);
							}
							this.$queue.setData('mobile', res.data.phone);

							this.$queue.setData('nickName', res.data.nickName);
							this.$queue.setData('relation_id', res.data.relationId);
							this.$queue.setData('gender', parseInt(res.data.gender));
						}
					});
				}
				this.loadGoodsInfo();
			} else {
				uni.navigateBack();
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onNavigationBarButtonTap: function() {
			this.navBarButton = !this.navBarButton;
		},
		methods: {
			shareFriend() {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false
				});
			},
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			showModal() {
			  //#ifdef MP-WEIXIN
			  if (!this.haibaoImg) {
			  	this.haibaoShow = true;
			  	this.$queue.showLoading('海报生成中...');
			  } else {
			  	this.modalName = 'Image';
			  }
			  //#endif
			},
			hideModal() {
				this.modalName = null;
			},
			bijiage() {
				uni.navigateTo({
					url: "../search/search?keywords=" + this.goods.goodsName
				})
				
			},
			TklmaskClose: function(e) {
				this.$refs.simpleModalTkl.hide();
				this.copyTklStatus = false;
			},
			TklmaskShow: function(e) {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false
				});
			},
			shengJiMethod() {
				uni.navigateTo({
					url: '/pages/member/yao'
				});
			},
			qrR(path) {
				this.erweimapath = path;
			},
			/* 预览照片 */
			previewPhoto(e) {
				let index = e.currentTarget.dataset.index;
				let list = this.goods.goodsGalleryUrls.map((item, index) => {
					return item;
				});
				uni.previewImage({
					current: list[index],
					urls: list,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(res) {
							uni.getImageInfo({
								src: list[res.index],
								success: function(image) {
									console.log('图片信息：', JSON.stringify(image));
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											uni.showToast({
												title: '图片保存成功',
												icon: 'none',
												duration: 3000
											});
										}
									});
								}
							});
						}
					}
				});
			},
			//初始化加载详情数据
			loadGoodsInfo: function() {
				let that = this;
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request.getT('/pdd/details/' + this.itemid).then(res => {
					if (res.goodsDetailResponse) {
						let item = res.goodsDetailResponse.goodsDetails[0];
						if (item.couponStartTime && item.couponEndTime) {
							item.couponStartTime = this.formatDate(new Date(item.couponStartTime * 1000));
							item.couponEndTime = this.formatDate(new Date(item.couponEndTime * 1000));
						}

						item.goodsImageUrl = 'https://' + item.goodsImageUrl.split('://')[1];
						that.goods = item;
						//获取拼多多优惠券地址
						this.getPddUrl();
						that.loadGoods = true;
						let grade = this.$queue.getData('grade');
						if (grade) {
							that.money = ((item.minGroupPrice - item.couponDiscount) * 0.01 * (item.promotionRate * 0.001) * parseFloat(
								grade)).toFixed(2);
						} else {
							that.money = ((item.minGroupPrice - item.couponDiscount) * 0.01 * (item.promotionRate * 0.001) * 0.3).toFixed(
								2);
						}
						that.shengji = ((item.minGroupPrice - item.couponDiscount) * 0.01 * (item.promotionRate * 0.001) * 0.7).toFixed(
							2);
						that.grade = grade;
						try {
							let isExist = this.$queue.isExistPdd(this.collectKey, this.itemid);
							if (isExist === true) {
								this.collect.name = '已收藏';
								this.collect.isCollect = 'color: #e10a07';
							} else {
								this.collect.name = '收藏';
								this.collect.isCollect = false;
							}
							let isExists = this.$queue.isExistPdd(this.footprintKey, this.itemid);
							if (isExists === false) {
								this.$queue.insert({
									key: this.footprintKey,
									value: item
								});
							}
							this.goods.itemprice = (item.minGroupPrice * 0.01).toFixed(2);
							this.goods.itemendprice = ((item.minGroupPrice - item.couponDiscount) * 0.01).toFixed(2);
							let grade = this.$queue.getData('grade');
							if (this.isEnable != '否') {
								if (grade) {
									if (grade === '0.7') {
										this.buyDes = '分享赚 ￥' + that.money;
									} else {
										this.buyDes = '升级赚 ￥' + that.shengji;
									}
								} else {
									this.buyDes = '分享赚 ￥' + that.shengji;
								}
							} else {
								this.buyDes = '分享给好友';
							}
							if (item.couponDiscount == 0) {
								this.getQun = '自购省￥' + (item.minGroupPrice * 0.01).toFixed(2) + '元';
							} else {
								this.getQun = '领￥' + item.couponDiscount * 0.01 + ' 券购买';
							}
						} catch (e) {
							console.log(e);
						}
					} else {
						uni.navigateBack();
					}
					uni.hideLoading();
				});
			},

			shopCartShare: function(type) {
				let relation_id = this.$queue.getData('relation_id');
				if (type == 'fanxian') {
					if (!relation_id) {
						this.$queue.setData('href', '/pages/detail/goodsinfo?itemid=' + this.itemid);
						let token = this.$queue.getData('token');
						let userId = this.$queue.getData('userId');
						if (token) {
							uni.navigateTo({
								url: '/pages/member/publisher?uid=' + userId + '&token=' + token
							});
						} else {
							this.loginS();
						}
						return;
					}
				}
				if (type == 'fanxian') {
					if (relation_id) {
						let grade = this.$queue.getData('grade');
						if (grade == '0.7') {
							this.TklmaskShow();
						} else {
							this.shengJiMethod();
						}
					} else {
						this.getPddUrl(0);
					}
				} else {
					this.getPddUrl(0);
				}
			},
			copyTklWenAns: function() {
				uni.setClipboardData({
					data: "【拼多多】"+this.goods.goodsName +
						'\n【在售价】' +
						(this.goods.minGroupPrice * 0.01).toFixed(2) +
						'元\n【券后价】' +
						(this.goods.couponDiscount * 0.01).toFixed(2) +
						'元\n【必买理由】\n' +
						this.goods.goodsDesc +
						'+\n下单链接：' +
						this.erweima +
						'\n',
					success: r => {
						this.copyTklStatus = true;
					}
				});
			},
			getPddUrl(type) {
				let pddpid = this.$queue.getData('pddpid');
				if (!pddpid) {
					this.$Request.getT('/pdd/promotion?pid=' + this.$queue.getPingDuoDuoPid() + '&webApp=true&goodId=' + this.itemid).then(
						res => {
							if (res.goodsPromotionUrlGenerateResponse) {
								let item = res.goodsPromotionUrlGenerateResponse.goodsPromotionUrlList[0];
								this.erweima = item.weAppWebViewShortUrl;
								let url = item.url;
								let weAppInfo = item.weAppInfo
								console.error(weAppInfo.pagePath)
								if (type == 0) {
									uni.navigateToMiniProgram({
										appId: weAppInfo.appId,
										path: weAppInfo.pagePath,
										fail(res) {
										   console.error(res)
										}
									})
								}
							} else {
								this.$queue.showToast('领券失败');
							}
						});
				} else {
					this.$Request.getT('/pdd/promotion?pid=' + pddpid + '&webApp=true&goodId=' + this.itemid).then(res => {
						if (res.goodsPromotionUrlGenerateResponse) {
							let item = res.goodsPromotionUrlGenerateResponse.goodsPromotionUrlList[0];
							this.erweima = item.weAppWebViewShortUrl;
							if (res.goodsPromotionUrlGenerateResponse) {
								let item = res.goodsPromotionUrlGenerateResponse.goodsPromotionUrlList[0];
								this.erweima = item.weAppWebViewShortUrl;
								let url = item.url;
								let weAppInfo = item.weAppInfo
								console.error(weAppInfo.pagePath)
								if (type == 0) {
									// #ifdef H5
									window.location.href = url;
									//#endif
									// #ifndef H5
									uni.navigateToMiniProgram({
										appId: weAppInfo.appId,
										path: weAppInfo.pagePath,
										envVersion: 'release',
										fail(res) {
										   console.error(res)
										}
									})
									//#endif
									
	
								}
							} else {
								this.$queue.showToast('领券失败');
							}
						}
					});
				}
			},
			goPublisher() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url: '/pages/member/publisher?uid=' + userId + '&token=' + token
					});
				} else {
					this.loginS();
				}
			},

			/**
			 * 保存图片
			 * @param url
			 */
			toSave(url) {
				//#ifndef H5
				uni.getImageInfo({
					src: url,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 3000
								});
							}
						});
					}
				});

				//#endif
			},
			/**
			 * 返回
			 */
			goBackUp() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			clickCollect() {
				//收藏
				let isExist = this.$queue.isExistPdd(this.collectKey, this.itemid);
				if (isExist) {
					let items = [];
					items.push(this.itemid);
					this.$queue.removeItem(this.collectKey, items);
					this.collect.name = '收藏';
					this.collect.isCollect = '';
				} else {
					this.$queue.insert({
						key: this.collectKey,
						value: this.goods
					});
					this.collect.name = '已收藏';
					this.collect.isCollect = 'color: #e10a07';
				}
			},

			formatDate: function(now) {
				const year = now.getFullYear();
				const month = now.getMonth() + 1;
				const date = now.getDate();
				return year + '-' + month + '-' + date;
			},

			haibao: function() {
				uni.navigateTo({
					url: '/pages/detail/share'
				});
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			navBarButtontO: function(type) {
				if (type === 'search') {
					uni.switchTab({
						url: '/pages/homeSearch/index'
					});
				} else if (type === 'like') {
					uni.switchTab({
						url: '/pages/member/user'
					});
				} else if (type === 'footer') {
					uni.navigateTo({
						url: '/pages/footer/index'
					});
				} else if (type === 'home') {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			},

			loginS() {
				uni.showModal({
					title: '登录提醒',
					showCancel: false,
					content: '当前账号未登录\n请登录后操作',
					success: confirmRes => {
						if (confirmRes.confirm) {
							this.$queue.setData('href', '/pages/detail/pdd?itemid=' + this.itemid);
							uni.navigateTo({
								url: '/pages/member/register'
							});
						}
					}
				});
			},
			copyTitle: function() {
				uni.setClipboardData({
					data: this.goods.title,
					success: r => {
						this.$queue.showToast('复制成功');
					}
				});
			}
		}
	};
</script>

<style scoped>
	@import '../../static/css/index.css';

	page {
		background: #f8f8f8;
	}

	.swiper-container {
		min-height: 100vw;
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999 upx;
		left: -99999 upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500 upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}

	.shareInfos {
		color: #e10a07;
	}

	.shareInfo::after {
		border: none;
	}

	button {
		font-size: 14px;
	}

	#shareit {
		-webkit-user-select: none;
		position: fixed;
		width: 100%;
		height: 2000px;
		background: rgba(0, 0, 0, 0.85);
		text-align: center;
		top: 0;
		left: 0;
		z-index: 999;
	}

	#shareit img {
		max-width: 100%;
	}

	.arrow {
		width: 100px;
		height: 150px;
		position: absolute;
		right: 5%;
		top: 1%;
	}

	.b-btn {
		right: 10px;
		top: 16px;
		width: 80px;
		text-align: center;
		font-size: 14px;
		padding: 4px 1px 4px 6px;
		color: #FCDFB8;
		z-index: 1;
	}

	#follow {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
		color: white;
		float: left;
		margin-top: 160px;
	}

	#follow1 {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
		color: white;
		float: left;
		margin-top: 170px;
	}

	button::after {
		border: none;
	}

	.swiper-wrapper {
		width: 100%;
	}
</style>
