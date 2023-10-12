import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, DeviceEventEmitter } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import RefreshListView , {RefreshState} from 'react-native-refresh-list-view'
import AddressApi from '../../../../api/user/AddressApi';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';
import { Toast } from '../../../common';

export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: []
        };
    }


    componentDidMount() {
        this.onHeaderRefresh();
        this.listener = DeviceEventEmitter.addListener('refranshAddress', () => {
            this.onHeaderRefresh();
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }
    onPressAdd = () => {
        Actions.push('AddAddress', { ty: 'add', adress: '' });
    }

    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing, pageIndex: 1 }, () => {
            AddressApi.getAddressList()
            .then(data => {
                    this.setState({
                        addressList: data,
                        refreshState: data.length < 100000 ? RefreshState.EmptyData : RefreshState.Idle
                    })
            }).catch(() => {
                this.setState({
                    addressList: [],
                    totalPage: 0,
                    refreshState: RefreshState.EmptyData
                })
            });
        })
    }

    setDefault = (id) => {
        AddressApi.setDefault(id)
        .then(res => {
            this.onHeaderRefresh();
        });
    }

    setModify = (item) => {
        Actions.push('AddAddress', { ty: 'modify', adress: item });
    }

    setDel = (item) => {
        Alert.alert(
            "提醒",
            `您确定要删除当前地址?`,
            [
                { text: "确定", onPress: () => {
                    AddressApi.delAddress(item.id)
                        .then(res => {
                            Toast.tip('删除成功');
                            this.onHeaderRefresh();
                        });
                }},
                { text: "取消", onPress: () => { } },
            ],
            { onDismiss: () => { } }
        )
        
    }

    setAddress = (data) => {
        if (this.props.type === 'order') {
            DeviceEventEmitter.emit('setAddress', data)
            Actions.pop();
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor }}>
                <Header title={'地址管理'} />
                <TouchableOpacity style={styles.addBtn} onPress={() => Actions.push('AddAddress', { ty: 'add', adress: '' }) }>
                    <Text style={{color: Colors.White, fontSize: 14}} >添加收货地址</Text>
                </TouchableOpacity>
                <RefreshListView style={{marginTop: 5}}
                    data={this.state.addressList}
                    keyExtractor={(item, index) => index + '' }
                    renderItem={({item, index}) => {
                        return (
                            <View style={styles.item}>
                                <TouchableOpacity style={{width: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.setDefault(item.id)}>
                                    {item.isDefault === 1 && <Icon name={'checkcircle'} size={14} color={Colors.main} />}
                                    {item.isDefault === 0 && <Icon name={'checkcircleo'} size={14} color={Colors.grayFont} />}
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => this.setAddress(item)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPhone}>{item.phone}</Text>
                                        <Text style={styles.btn} onPress={() => this.setModify(item)} ><Icon name={'edit'}/>  编辑</Text>
                                        <Text style={styles.btn} onPress={() => this.setDel(item)}><Icon name={'delete'}/>  删除 </Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.itemAddress}>{`收货地址：${item.province} ${item.city} ${item.area} ${item.address}`}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    // 可选
                    footerRefreshingText='正在玩命加载中...'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='我是有底线的 =.=!'
                    footerEmptyDataText='我是有底线的 =.=!'
                />
            </View>
        );
    }
}


// {[123,123,123].map((item, index) => {
//     return (
//         <View key={index} style={styles.item}>
//             <View style={{flexDirection: 'row', alignItems: 'center', }}>
//                 <Text style={styles.itemName}>收货先生</Text>
//                 <Text style={styles.itemPhone}>13643347310</Text>
//                 <Text style={styles.btn} onPress={() => this.setModify(item)} ><Icon name={'edit'}/>  编辑</Text>
//                 <Text style={styles.btn} onPress={() => this.setDel(item)}><Icon name={'delete'}/>  删除 </Text>
//             </View>
//             <View style={{marginTop: 5}}>
//                 <Text style={styles.itemAddress}>收货地址：收货地址收货地址收货地址收货地址收货地址收货地址</Text>
//             </View>
//         </View>
//     )
// })}

{/* <TouchableOpacity onPress={() => this.setDefault(item)} style={Styles.itemBtnBottom}>
                                    <Text style={{ fontSize: 12 }}>设为默认</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setModify(item)} style={Styles.itemBtnBottom}>
                                    <Text style={{ fontSize: 12 }}>修改</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setDel(item)} style={Styles.itemBtnBottom}>
                                    <Text style={{ fontSize: 12 }}>删除</Text>
                                </TouchableOpacity> */}

const styles = StyleSheet.create({
    addBtn: {
        marginTop: 5, 
        height: 50,
        backgroundColor: Colors.main, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    item: {
        backgroundColor: Colors.White,
        padding: 15,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.backgroundColor,
        flexDirection: 'row'
    },
    itemName: {
        fontSize: 14,
        color: Colors.fontColor
    },
    itemPhone: {
        fontSize: 13,
        color: '#999',
        marginLeft: 10,
        flex: 1
    },
    btn: {
        fontSize: 13,
        color: '#999',
        marginLeft: 10
    },
    itemAddress: {
        fontSize: 13,
        color: Colors.fontColor
    },
})