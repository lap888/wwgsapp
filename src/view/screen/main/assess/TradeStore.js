import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class TradeStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {
        const { data } = this.props;
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'商家详情'} />
                <ScrollView style={{flex: 1}}>
                    <ImageBackground style={{height: 126, flexDirection: 'row', paddingHorizontal: 15, paddingTop: 30 }} source={require('../../../images/home/zhihuanzhongxin.png')} >
                        <Image style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#eee'}} source={{uri: data.doorhead}}/>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <Text style={{fontSize: 16, color: Colors.White}}>{data.company}</Text>
                            <Text style={{fontSize: 13, marginTop: 5, color: Colors.White}}>{data.address}</Text>
                        </View>
                    </ImageBackground>
                    <View style={{paddingLeft: 25}}>
                        <Text style={{fontSize: 16 , fontWeight: 'bold', marginTop: 20}}>联系方式</Text>
                        <Text style={{fontSize: 14 , marginTop: 15}}>企业名称：{data.company}</Text>
                        <Text style={{fontSize: 14 , marginTop: 15}}>微信：{data.weChat}</Text>
                        <Text style={{fontSize: 14 , marginTop: 15}}>QQ：{data.qq}</Text>
                        <Text style={{fontSize: 14 , marginTop: 15}}>网址：{data.website}</Text>
                        <Text style={{fontSize: 16 , fontWeight: 'bold', marginTop: 30}}>寄送地址</Text>
                        <Text style={{fontSize: 14 , marginTop: 15}}>寄送地址：{data.address}</Text>
                        <Text style={{fontSize: 16 , fontWeight: 'bold', marginTop: 30}}>图片展示</Text>
                        <View style>
                            {data.listImgs.length > 0 && data.listImgs.map((item, index) => {
                                <Image key={index} style={{width: 98, height: 78}}  source={{uri: item}}/>
                            })}
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}
