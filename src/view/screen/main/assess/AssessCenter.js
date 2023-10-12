import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, DeviceEventEmitter, Pressable } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AssessApi } from '../../../../api';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class AssessCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 100,
            dataList: [],
            ty: ''
        };
    }

    componentDidMount() {
        this.getList()
    }
    getList = () => {
        AssessApi.getShopList({pageIndex: 1, pageSize: 100})
        .then((data) => {
            this.setState({dataList: data})
        }).catch((err) => console.log('err', err))
    }

    setZhiHuanShop = (item) => {
        if (this.props.ty === 'order') {
            DeviceEventEmitter.emit('setOrderStore', item);
        }else{
            DeviceEventEmitter.emit('setZhiHuanShop', item);
        }
        Actions.pop();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'置换中心'} />
                <ScrollView>
                    {this.state.dataList.map((item, index)=> {
                        return (
                            <View key={index} style={{paddingHorizontal: 15, flexDirection: 'row', marginTop: 20}}>
                                <Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => Actions.push('TradeStore', {data: item})}>
                                    <Image style={{width: 40, height: 40, borderRadius: 5, backgroundColor: Colors.grayFont}} source={{uri: item.doorhead}}/>
                                    <View style={{flex: 1, marginLeft: 10, marginRight: 20}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontSize: 15, color: Colors.fontColor, flex: 1,  }} numberOfLines={1} >{item.company}</Text>
                                            <Text style={{fontSize: 15, color: Colors.fontColor }}>{item.mobile}</Text>
                                        </View>
                                        <Text style={{fontSize: 13, color: Colors.grayFont, marginTop: 3 }} numberOfLines={1}>{item.address}</Text>
                                    </View>
                                </Pressable>
                                <TouchableOpacity style={styles.btn1} onPress={() => this.setZhiHuanShop(item)}>
                                    <Text style={{fontSize: 14, color: Colors.main}}>选择</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn1: {
        height: 30,
        borderRadius: 15,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.main
    },

})
