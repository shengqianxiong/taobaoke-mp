<script>
	import Vue from 'vue';

	export default {
		methods: {

			async getClipboardData() {
				let that = this;
				uni.getClipboardData({
					success: function(res) {
						if (res.data && res.data.length == 10) {
							that.$queue.setData('relation', res.data);
						}
						if (
							res.data &&
							res.data.length != 6 &&
							res.data.length != 10 &&
							res.data.indexOf('给你说个京东、淘宝') == -1 &&
							res.data.indexOf('椱ァ製这段文字') == -1 &&
							res.data.indexOf('/pages/member/publisher') == -1 &&
							res.data.indexOf('椱ァ製此信息') == -1
						) {
							that.$Request.getT('/jd/doTpwdCoverts?tpwd=' + res.data).then(ress => {
								if (ress) {
									uni.setClipboardData({
										data: '',
										success: r => {
											uni.showToast({
												icon: 'loading',
												title: '正在搜索...',
												duration: 1000
											});
										}
									});
									uni.navigateTo({
										url: '/pages/detail/goodsinfo?itemid=' + ress
									});
								} else {
									let id = '';
									if (res.data.indexOf('&id=') != -1) {
										id = res.data.split('&id=')[1].split('&')[0];
									}
									if (res.data.indexOf('?id=') != -1) {
										id = res.data.split('?id=')[1].split('&')[0];
									}
									if (id) {
										uni.navigateTo({
											url: '/pages/detail/goodsinfo?itemid=' + id
										});
										uni.setClipboardData({
											data: '',
											success: r => {
												uni.showToast({
													icon: 'loading',
													title: '正在搜索...',
													duration: 1000
												});
											}
										});
									} else {
										uni.showModal({
											showCancel: true,
											cancelText: '取消',
											confirmText: '搜索',
											title: '是否搜索以下商品？',
											content: res.data,
											success: ress => {
												if (ress.confirm) {
													uni.navigateTo({
														url: '/pages/search/search?keywords=' + res.data
													});
													uni.setClipboardData({
														data: '',
														success: r => {
															uni.showToast({
																icon: 'loading',
																title: '正在搜索...',
																duration: 1000
															});
														}
													});
												} else {
													uni.setClipboardData({
														data: '',
														success: r => {
															uni.showToast({
																icon: 'none',
																title: '已取消',
																duration: 500
															});
														}
													});
												}
											}
										});
									}
								}
							});
						}
					},
					fail: function(res) {}
				});
			}
		},
		onShow() {
			//#ifdef MP-WEIXIN
			this.getClipboardData();
			let token = this.$queue.getData('token')
			if (!token) {
				uni.navigateTo({
					url:'/pages/member/register'
				})

			}
			//#endif
		},
		onLaunch: function() {
			let that = this;
			// this.login();
			//#ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate);
			});

			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
			//#endif
			//获取全局是否开启佣金功能
			that.$Request.getT('/common/type/3').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('isEnable', res.data.value);
					}
				}
			});
			//获取全局邀请码
			that.$Request.getT('/common/type/4').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('publicRelation', res.data.value);
					}
				}
			});
			//获取微信APPID
			that.$Request.getT('/common/type/5').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('weixinAppid', res.data.value);
					}
				}
			});
			//获取淘宝APPID
			that.$Request.getT('/common/type/6').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('taobaoAppid', res.data.value);
					}
				}
			});
			//获取淘宝秘钥
			that.$Request.getT('/common/type/7').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('taobaoSecret', res.data.value);
					}
				}
			});
			//获取淘宝授权地址
			that.$Request.getT('/common/type/8').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('taobaoUrl', res.data.value);
					}
				}
			});
			//获取淘宝pid
			that.$Request.getT('/common/type/9').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('taobaoPid', res.data.value);
					}
				}
			});
			//获取好单库key
			that.$Request.getT('/common/type/10').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('haodankuKey', res.data.value);
					}
				}
			});
			//获取淘宝名字
			that.$Request.getT('/common/type/11').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('taobaoName', res.data.value);
					}
				}
			});
			//获取拼多多商城地址
			that.$Request.getT('/common/type/22').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('pinduoduo', res.data.value);
					}
				}
			});
			//获取APP下载地址
			that.$Request.getT('/common/type/25').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('appurl', res.data.value);
					}
				}
			});
			//获取拼多多默认pid
			that.$Request.getT('/common/type/26').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('pinduoduopid', res.data.value);
					}
				}
			});
			//获取京东默认pid
			that.$Request.getT('/common/type/27').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('jingdongpid', res.data.value);
					}
				}
			});
			//最高佣金 41
			that.$Request.getT('/common/type/41').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('maxMoney', res.data.value);
					}
				}
			});

			//最低佣金
			that.$Request.getT('/common/type/40').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('minMoney', res.data.value);
					}
				}
			});

			//邀请多少人到达10级
			that.$Request.getT('/common/type/42').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('invitaionNum', res.data.value);
					}
				}
			});

			//团队佣金
			that.$Request.getT('/common/type/43').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('teamMoney', res.data.value);
					}
				}
			});
			that.$Request.getT('/common/type/66').then(res => {
				if (res.status == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('taobaoKey', res.data.value);
					}
				}
			});
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'colorui/main.css';
	@import './static/css/common.css';
	@import './static/css/simplepro.css';

	/*
            全局公共样式和字体图标
        */
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.yticon {
		font-family: 'yticon' !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.nav-li text {
		position: absolute;
		right: 30 upx;
		top: 30 upx;
		font-size: 52 upx;
		width: 60 upx;
		height: 60 upx;
		text-align: center;
		line-height: 60 upx;
	}

	uni-tabbar .uni-tabbar__icon {
		width: 20px;
		height: 20px;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40 upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40 upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	.icon-yiguoqi1:before {
		content: '\e700';
	}

	.icon-iconfontshanchu1:before {
		content: '\e619';
	}

	.icon-iconfontweixin:before {
		content: '\e611';
	}

	.icon-alipay:before {
		content: '\e636';
	}

	.icon-shang:before {
		content: '\e624';
	}

	.icon-shanchu4:before {
		content: '\e622';
	}

	.icon-xiaoxi:before {
		content: '\e618';
	}

	.icon-jiantour-copy:before {
		content: '\e600';
	}

	.icon-fenxiang2:before {
		content: '\e61e';
	}

	.icon-pingjia:before {
		content: '\e67b';
	}

	.icon-daifukuan:before {
		content: '\e68f';
	}

	.icon-pinglun-copy:before {
		content: '\e612';
	}

	.icon-dianhua-copy:before {
		content: '\e621';
	}

	/*.icon-shoucang:before {*/
	/*    content: "\e645";*/
	/*}*/

	.icon-xuanzhong2:before {
		content: '\e62f';
	}

	.icon-gouwuche_:before {
		content: '\e630';
	}

	.icon-icon-test:before {
		content: '\e60c';
	}

	.icon-icon-test1:before {
		content: '\e632';
	}

	.icon-bianji:before {
		content: '\e646';
	}

	.icon-jiazailoading-A:before {
		content: '\e8fc';
	}

	.icon-zuoshang:before {
		content: '\e613';
	}

	.icon-jia2:before {
		content: '\e60a';
	}

	.icon-huifu:before {
		content: '\e68b';
	}

	.icon-arrow-fine-up:before {
		content: '\e601';
	}

	.icon-hot:before {
		content: '\e60e';
	}

	.icon-lishijilu:before {
		content: '\e6b9';
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: '\e616';
	}

	.icon-naozhong:before {
		content: '\e64a';
	}

	.icon-xiatubiao--copy:before {
		content: '\e608';
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: '\e6a9';
	}

	.icon-jia1:before {
		content: '\e61c';
	}

	.icon-bangzhu1:before {
		content: '\e63d';
	}

	.icon-arrow-left-bottom:before {
		content: '\e602';
	}

	.icon-arrow-right-bottom:before {
		content: '\e603';
	}

	.icon-arrow-left-top:before {
		content: '\e604';
	}

	.icon-icon--:before {
		content: '\e744';
	}

	.icon-zuojiantou-up:before {
		content: '\e605';
	}

	.icon-xia:before {
		content: '\e62d';
	}

	.icon--jianhao:before {
		content: '\e60b';
	}

	.icon-weixinzhifu:before {
		content: '\e61a';
	}

	.icon-comment:before {
		content: '\e64f';
	}

	.icon-weixin:before {
		content: '\e61f';
	}

	.icon-fenlei1:before {
		content: '\e620';
	}

	.icon-erjiye-yucunkuan:before {
		content: '\e623';
	}

	.icon-Group-:before {
		content: '\e688';
	}

	.icon-you:before {
		content: '\e606';
	}

	.icon-forward:before {
		content: '\e607';
	}

	.icon-tuijian:before {
		content: '\e610';
	}

	.icon-bangzhu:before {
		content: '\e679';
	}

	.icon-share:before {
		content: '\e656';
	}

	.icon-yiguoqi:before {
		content: '\e997';
	}

	.icon-shezhi1:before {
		content: '\e61d';
	}

	.icon-fork:before {
		content: '\e61b';
	}

	.icon-kafei:before {
		content: '\e66a';
	}

	.icon-iLinkapp-:before {
		content: '\e654';
	}

	.icon-saomiao:before {
		content: '\e60d';
	}

	.icon-shezhi:before {
		content: '\e60f';
	}

	.icon-shouhoutuikuan:before {
		content: '\e631';
	}

	.icon-gouwuche:before {
		content: '\e609';
	}

	.icon-dizhi:before {
		content: '\e614';
	}

	.icon-fenlei:before {
		content: '\e706';
	}

	.icon-xingxing:before {
		content: '\e70b';
	}

	.icon-tuandui:before {
		content: '\e633';
	}

	.icon-zuanshi:before {
		content: '\e615';
	}

	.icon-zuo:before {
		content: '\e63c';
	}

	.icon-shoucang2:before {
		content: '\e62e';
	}

	.icon-shouhuodizhi:before {
		content: '\e712';
	}

	.icon-yishouhuo:before {
		content: '\e71a';
	}

	.icon-dianzan-ash:before {
		content: '\e617';
	}
</style>
