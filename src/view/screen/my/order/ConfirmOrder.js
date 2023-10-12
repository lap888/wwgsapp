import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { AddressApi, OrderApi, UserApi } from '../../../../api';
import { Toast } from '../../../common';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            address: '',
            store: '',
        };
    }
    componentDidMount() {
        this.seAddListener = DeviceEventEmitter.addListener('setAddress', (data) => {
            this.setState({ address: data })
        })
        this.seAddListener2 = DeviceEventEmitter.addListener('setOrderStore', (data) => {
            this.setState({ store: data })
        })
        this.getaddress();
    }

    componentWillUnmount() {
        this.seAddListener.remove()
        this.seAddListener2.remove()
    }

    getaddress = () => {
        AddressApi.getAddressList()
            .then((data) => {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        if (element.isDefault == 1) {
                            this.setState({ address: element })
                        }
                    }
                }
            }).catch((err) => console.log('err', err))
    }

    subOrder = () => {
        const { data, address, store } = this.state;
        const params = {
            itemId: data.id,
            storeId: store.id,
            addressId: address.id
        }
        OrderApi.subOrder(params)
            .then((res) => {
                console.warn('data: ', res);
                const p = {
                    orderNo: res.orderNo,
                    payType: 1
                }
                return OrderApi.subPay(p)
            })
            .then((result) => {
                Toast.tip('支付成功请到订单中查看')
                Actions.pop()
            })
            .catch((err) => {
                console.log('err', err)
            })
    }

    render() {
        let { data, address, store } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
                <Header title={'确认订单'} />
                <View style={{ flex: 1 }}>
                    <View style={styles.card}>
                        {address == '' ? <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center' }} onPress={() => Actions.push('Address', { type: 'order' })}>
                            <Icon name={'location'} size={20} />
                            <Text style={{ fontSize: 16, flex: 1 }}>  添加收货地址</Text>
                            <Icon name={'chevron-forward-sharp'} size={20} color={Colors.grayFont} />
                        </TouchableOpacity> :
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => Actions.push('Address', { type: 'order' })}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, color: Colors.fontColor }}><Icon name={'location'} size={14} /> {`${address.province}  ${address.city}  ${address.area}`}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>{address.address}</Text>
                                    <Text style={{ fontSize: 14, color: Colors.fontColor, marginTop: 5 }}>{`${address.name}  ${address.phone}`}</Text>
                                </View>
                                <Icon name={'chevron-forward-sharp'} size={20} color={Colors.grayFont} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.card}>
                        {store == '' ? <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center' }} onPress={() => Actions.push('AssessCenter', { ty: 'order' })}>
                            <Icon name={'ios-home'} size={20} />
                            <Text style={{ fontSize: 16, flex: 1 }}>  添加商铺</Text>
                            <Icon name={'chevron-forward-sharp'} size={20} color={Colors.grayFont} />
                        </TouchableOpacity> :
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => Actions.push('AssessCenter', { type: 'order' })}>
                                <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                                    <Image style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} source={{ uri: store.doorhead }} />
                                    <View style={{ justifyContent: 'center', marginHorizontal: 10, flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>{`${store.nick}`}</Text>
                                        <Text style={{ fontSize: 14, color: Colors.grayFont }}>{`${store.address}`}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image style={{ height: 60, width: 60 }} resizeMode='contain' source={{ uri: data.images[0] }} />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontSize: 14, color: Colors.fontColor }}>{data.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5 }}>
                                    <Text style={{ fontSize: 18, color: '#E70243' }}> {data.pointsPrice}</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 19 }}> 积分</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 19, flex: 1, }}> +{data.servicePrice}服务费</Text>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>x{1}件</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: Colors.grayFont }}>需付款:  </Text>
                            <Text style={{ fontSize: 13, color: '#E70243', }}>￥{data.servicePrice}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginTop: 15 }}>
                            <TouchableOpacity style={{ width: 80, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 1, borderColor: Colors.main }} onPress={this.subOrder}>
                                <Text style={{ fontSize: 12, color: Colors.main }}>提交订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10
    },
})
