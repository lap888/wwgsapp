import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, DeviceEventEmitter, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AssessApi } from '../../../../api';
import { Toast } from '../../../common';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class AssessResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            shop: ''
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('setZhiHuanShop', (data) => {
            this.state.data.storeId = data.id
            this.setState({
                data: this.state.data,
                shop: data
            })
        })
    }

    submit = () => {
        const { data, shop } = this.state;
        if (shop === '') {
            Toast.tip('请选择置换商铺');
            return ;
        }
        AssessApi.sendPost(data)
        .then((data) => {
            Toast.tip('已提交置换');
            Alert.alert(
                "提醒",
                `已提交置换，请前往订单查看`,
                [
                    { text: "查看", onPress: () => Actions.replace('AssessOrderList') },
                    { text: "返回", onPress: () => Actions.pop() },
                ],
                { onDismiss: () => { } }
            )
            
        }).catch((err) => console.log('err', err))
    }
    render() {
        const { data, shop } = this.state;
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'评估结果'} />
                <View style={styles.card}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>商品信息</Text>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={styles.cardTxt}>物品件数：{data.count}件</Text>
                        <Text style={styles.cardTxt}>物品成色：{data.condition}成新</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={styles.cardTxt}>物品品牌：{data.brand == '' ? '暂无' : data.brand}</Text>
                        <Text style={styles.cardTxt}>购买价格：{data.unitPrice}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={styles.cardTxt}>送达方式：个人寄送</Text>
                        <Text style={styles.cardTxt}>赠送积分：{data.assessPrice}</Text>
                    </View>
                </View>
                {shop == '' ? null : <View style={styles.card}>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>已选合作商家</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 20 }} source={{uri: shop.doorhead}}/>
                        <View style={{ justifyContent: 'center', marginHorizontal: 10, flex: 1 }}>
                            <Text style={{ fontSize: 16 }}>{`${shop.nick}`}</Text>
                            <Text style={{ fontSize: 14, color: Colors.grayFont }}>{`${shop.address}`}</Text>
                        </View>
                    </View>
                </View>}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                    <TouchableOpacity style={styles.btn1} onPress={() => Actions.push('AssessCenter')}>
                        <Text style={{fontSize: 14, color: Colors.blue}}>筛选置换中心</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={this.submit}>
                        <Text style={{fontSize: 14, color: Colors.White}}>确认置换</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 13,
        backgroundColor: Colors.White
    },
    cardTxt: {
        flex: 1,
        marginLeft: 20
    },
    btn1: {
        height: 45,
        borderRadius: 22.5,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.blue
    },
    btn2: {
        height: 45,
        borderRadius: 22.5,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.main,
        marginLeft: 20
    },
    
})
