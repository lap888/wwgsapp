import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
import { ShopApi } from '../../../../api';
import { Header, PicturePreview } from '../../../components/Index';
import { Colors, Metrics } from '../../../theme/Index';
import GoodsDetailModal from './GoodsDetailModal';

export default class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            bannerList: [1],
            detailList: [],
            webViewHeight: 200,
            specModle: false,
            morePay: false,
            picturePreviewList: [], 		// 预览图片
            picturePreviewModalVisible: false,	// 预览弹框
        };
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
    
    webViewLoadedEnd = () => {
        this.webview.injectJavaScript(`
                const height = document.body.clientHeight;
                window.ReactNativeWebView.postMessage(JSON.stringify({height: height}));
            `);
    }

    onMessage = (e) => {
        const data = JSON.parse(e.nativeEvent.data);
        if (data.height) {
            this.setState({
                webViewHeight: data.height
            });
        }
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
                            {data.images.map((item, index)=>
                                <View key={index} style={styles.banner} >
                                    <Image resizeMode='contain' style={styles.banner} source={{ uri: item }} />
                                </View>
                            )}
                        </Swiper>
                    </View>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 22, color: Colors.redTxt}}>{data.pointsPrice}</Text>
                            <Text style={{fontSize: 14, color: Colors.redTxt, lineHeight: 23}}> 积分</Text>  
                            <Text style={{fontSize: 14, color: Colors.grayFont, lineHeight: 23}}> + {data.servicePrice} 服务费</Text>  
                        </View>
                        <Text style={{fontSize: 16, marginTop: 5}} >{data.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>快递    </Text>
                            <Text style={{fontSize: 14, color: Colors.main }}>{'包邮'}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.card}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>选择    </Text>
                            <Text style={{fontSize: 14, color: Colors.fontColor }}>{'颜色分类'}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>发货    </Text>
                            <Text style={{fontSize: 14, color: Colors.fontColor }}>{'data.adress'}    |    </Text>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>快递    </Text>
                            <Text style={{fontSize: 14, color: Colors.main }}>{'包邮'}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: Colors.grayFont }}>配送    </Text>
                            <Text style={{fontSize: 14, color: Colors.fontColor }}>{'浙江杭州/添加收货地址>'}</Text>
                        </View>
                    </View> */}
                    <View style={{height: 30, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{ fontSize: 16, color: Colors.fontColor }}>商品详情</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={{height: this.state.webViewHeight}}>
                            <WebView
                                ref={(ref) => this.webview = ref}
                                style={{ flex: 1, height: this.state.webViewHeight }}
                                source={{html: data.description}}
                                originWhitelist={["*"]}
                                onMessage={this.onMessage}
                                onLoadEnd={this.webViewLoadedEnd}
                                javaScriptEnabled={true}
                            />
                        </View>
                        <View style={{height: 65}} /> 
                        {/* 增加按钮高度防止按钮遮挡商品详情 */}
                    </View>
                </ScrollView>
                <TouchableOpacity 
                    style={styles.bigBtn} 
                    onPress={() => Actions.push('ConfirmOrder', { data: this.state.data })}>
                        <Text style={{fontSize: 16, color: Colors.White}}>立即购买</Text>
                </TouchableOpacity>
				{this.state.specModle && <GoodsDetailModal close={() => this.setModle(false)} data={this.state.data} />}
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
    bigBtn: {
        width: Metrics.screenWidth - 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.main,
        height: 50,
        marginLeft: 15,
        borderRadius: 25,
        position: 'absolute',
        bottom: 15
    },
})