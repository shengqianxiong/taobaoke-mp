<template>

    <view class="coupon-page s-row"
          @tap="open(itemid)"
		  v-bind:key='itemid'
          style="border-bottom: 2upx solid ghostwhite;padding: 16upx;">
        <view class="image">
            <image :src="itempic"></image>
        </view>
        <view class="content">
            <view style="display: flex">
                <image v-if="logo!=null"
                       style="margin-left:8upx;height: 24upx;width: 5%;margin-top: 8upx;margin-right: 4upx"
                       :src="logo"></image>
                <view class="twolist-hidden"
                      style="height: 80upx;font-size: 28upx;margin-right: 4upx;margin-left: 4upx;width: 95%;max-lines:2;overflow: hidden">
                    {{ itemtitle }}
                </view>
            </view>
            <view class="num s-row" style="margin-left: 18upx;">
                <text class="quan" v-if="couponmoney!=null">
                   <text style="color: #E10A07;font-size: 32upx;font-weight: 800;margin-right: 16upx;">免单</text>
                </text>
                <text class="volume">{{itemsale}}人付款</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "orange-goods-list",
        props: [
            "itempic", "itemtitle", "itemprice", "itemsale", "itemendprice", "couponmoney", "itemid", "logo","tkmoney","isInvitation"
        ],
        methods: {
            open(itemid) {
               let relation_id = this.$queue.getData("relation_id");
                if (relation_id) {
                    uni.navigateTo({
                        url: "/pages/detail/goodsinfos?itemid=" + itemid + "&relation_id=" + relation_id,
                    })
                } else {
                    uni.navigateTo({
                        url: "/pages/detail/goodsinfos?itemid=" + itemid,
                    })
                }
            },
        }
    }
</script>

<style>
    @import "../../static/css/index.css";
</style>
