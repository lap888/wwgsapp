import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { ShopApi } from '../../../api';
import { Header, PicturePreview } from '../../components/Index';
import { Colors, Metrics } from '../../theme/Index';
import GoodsDetailModal from './GoodsDetailModal';

export default class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            bannerList: [1],
            detailList: [],
            specModle: false,
            morePay: false,
            picturePreviewList: [], 		// 预览图片
            picturePreviewModalVisible: false,	// 预览弹框
        };
    }
    componentDidMount() {
        this.getGoodsDetail(this.state.data.id)
    }

    getGoodsDetail = (id) => {
        ShopApi.getShopDetail( id)
        .then((data) => {
            this.setState({
                bannerList: data.shopDetailBanner,
                detailList: data.shopDetailShow,
            })
        }).catch((err) => console.log('err', err))
    }

    setModle = (setModle) => {
        this.setState({specModle: setModle})
    }

    /**
	 * 调起图片预览组件
	 */
    handelPreviewImage(source) {
        this.setState({ picturePreviewList: [{ uri: source }] }, () => {
            if (!this.state.picturePreviewModalVisible) this.setState({ picturePreviewModalVisible: true });
        });
    }
    
    render() {
        const { data, bannerList, detailList, morePay } = this.state;
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'商品详情'} />
                <ScrollView style={{flex: 1}}>
                    <View style={styles.banner} >
                        <Swiper
                            key={bannerList.length}
                            horizontal={true}
                            loop={true}
                            autoplay={true}
                            autoplayTimeout={16}
                            removeClippedSubviews={false}
                            paginationStyle={{ bottom: 10 }}
                            showsButtons={false}
                            activeDotStyle={{ width: 15, height: 3, backgroundColor: Colors.White, borderRadius: 1 }}
                            dotStyle={{ width: 15, height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 1 }}
                        >
                            {bannerList.map((item, index)=>
                                <View key={index} style={styles.banner} >
                                    <Image style={styles.banner} source={{ uri: item.url }} />
                                </View>
                            )}
                        </Swiper>
                    </View>
                    <View style={styles.card}>
                        <View style={{}}>
                            <Text style={{fontSize: 22, color: '#E70243'}}>{data.candyPrice}<Text style={{fontSize: 14}}> 糖果 + {data.candyPrice * data.px}果皮</Text>  </Text>
                            <Text style={{fontSize: 14, color: Colors.grayFont, textDecorationLine: 'line-through'}}>原价:{data.candyPrice}</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{fontSize: 12, color: Colors.grayFont, lineHeight: 14, }} onPress={() => this.setState({morePay: !this.state.morePay})}>
                                其他支付方式 <Icon name={morePay ? 'ios-caret-down' : 'ios-caret-up'} size={12} />
                            </Text>
                            {morePay && <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                <Text style={styles.otherPayTxt}>{data.ybPrice}YB + {data.ybPrice * data.px}能量</Text>
                                <Text style={styles.otherPayTxt}>USDT {data.usdtPrice}{data.rewaardYB == 0 ? '' : ' 送' + data.rewaardYB + 'YB'}</Text>
                            </View>}
                        </View>
                        <Text style={{fontSize: 16, marginTop: 5}}>{data.name}</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>发货    </Text>
                            <Text style={{fontSize: 14, color: Colors.fontColor }}>{data.adress}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>快递    </Text>
                            <Text style={{fontSize: 14, color: Colors.main }}>{data.postPrice == 0 ? '包邮' : data.postPrice} USDT</Text>
                        </View>
                    </View>
                    <View style={{height: 30, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{ fontSize: 16, color: Colors.fontColor }}>商品详情</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={{marginBottom: 20}}>
                            <Text style={{fontSize: 14, lineHeight: 19}}>{`${data.remark}`}</Text>
                        </View>
                        {detailList.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => this.handelPreviewImage(item.url)} >
                                <Image 
                                    style={{width: Metrics.screenWidth - 40, height: (Metrics.screenWidth - 40)*item.height/item.width,}} 
                                    resizeMode={'contain'} 
                                    source={{uri: item.url}} />
                            </TouchableOpacity>
                        })}
                    </View>
                </ScrollView>
                <View style={{height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, backgroundColor: Colors.White}}>
                    <View style={{flex: 1, flexDirection: 'row', marginRight: 10 }}>
                        <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../images/shop/kefu.png')}/>
                            <Text style={{fontSize: 12}}>客 服</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} 
                            activeOpacity={0.8}
                            onPress={() => Actions.push('ShopDetail', {id: data.userId})}>
                            <Image source={require('../../images/shop/shopIcon.png')}/>
                            <Text style={{fontSize: 12}}>店 铺</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{width: 200, height: 40, borderRadius: 20 }} onPress={() => this.setModle(true)}>
                        <LinearGradient colors={['#FFC887', Colors.main]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: Colors.White}}>立即购买</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
				{this.state.specModle && <GoodsDetailModal ref={(modal) => this.tipsModal = modal} close={() => this.setModle(false)} data={this.state.data} />}
                <PicturePreview
                    data={this.state.picturePreviewList}
                    visible={this.state.picturePreviewModalVisible}
                    onClose={() => this.setState({ picturePreviewModalVisible: false })}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    banner: {
        width: Metrics.screenWidth,
        height: Metrics.screenWidth/1.33,
    },
    card: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10
    },
    otherPayTxt: {
        fontSize: 14,
        color: 'rgb(239,9,62)',
        lineHeight: 24,
        backgroundColor: 'rgb(255,219,205)',
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 2
    },
})
