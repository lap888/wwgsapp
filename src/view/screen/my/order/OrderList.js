import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { OrderApi } from '../../../../api';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            refreshState: '',
            pageIndex: 1,
            pageSize: 20,
        };
    }

    componentDidMount() {
        this.getOrderList()
    }

    getOrderList = () => {
        OrderApi.getOrderList({ pageIndex: this.state.pageIndex, pageSize: this.state.pageSize })
        .then((data) => {
            this.setState({
                dataList: this.state.pageIndex === 1 ? data : this.state.data.concat(data),
                refreshState: data.length < this.state.pageSize ? RefreshState.EmptyData : RefreshState.Idle
            })
        }).catch((err) => {
            this.setState({ dataList: [], refreshState: RefreshState.EmptyData })
        })
    }
    onHeaderRefresh = () => {
        this.setState({ RefreshState: RefreshState.HeaderRefreshing, pageIndex: 1 }, () => {
            this.getOrderList();
        });
    }

    onFooterRefresh = () => {	
        this.setState({ refreshState: RefreshState.FooterRefreshing, pageIndex: this.state.pageIndex + 1 }, () => {
            this.getOrderList();
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'我的订单'} />
                <View style={{flex: 1}}>
					<RefreshListView
						data={this.state.dataList}
						keyExtractor={(item, index) =>  index + '1'}
						renderItem={({ item, index }) => {
                            // 0 未支付 1 取消 2 支付成功 3 已发货 4 确认收货 5 申请退款 6 订单完成
                            // let status = '';
                            // switch (item.status) {
                            //     case 0: status = '未支付'; break;
                            //     case 1: status = '已取消'; break;
                            //     case 2: status = '待发货'; break;
                            //     case 3: status = '已发货'; break;
                            //     case 4: status = '已收货'; break;
                            //     case 5: status = '退款'; break;
                            //     case 6: status = '已完成'; break;
                            //     default: break;
                            // }
							return (
                                <View style={styles.card}>
                                    <Text style={{fontSize: 13}}>订单编号：{item.id}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} >
                                        <Image style={{height: 60, width: 60, backgroundColor: Colors.main, borderRadius: 2}} source={{uri: item.itemPic}} />
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <Text style={{fontSize: 14, color: Colors.fontColor}} numberOfLines={2}>{item.itemName}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 5}}>
                                                <Text style={{fontSize: 18, color: '#E70243'}}> {item.payIntegral}</Text>
                                                <Text style={{fontSize: 12, lineHeight: 19}}> 积分</Text>
                                                <Text style={{fontSize: 12, lineHeight: 19, flex: 1,}}> +{item.servicePrice}服务费</Text>
                                                <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 5}}>x{1}件</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text style={{fontSize: 13, color: Colors.grayFont}}>实付款:  </Text>
                                        <Text style={{fontSize: 13, color: '#E70243', }}>￥{item.servicePrice}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop:15}}>
                                        <TouchableOpacity style={styles.delBtn} onPress={this.subOrder}>
                                            <Text style={{fontSize: 12, color: '#CCCCCC'}}>删除订单</Text>
                                        </TouchableOpacity>
                                        {item.state == 2 && <TouchableOpacity style={styles.shouhuoBtn} onPress={this.subOrder}>
                                            <Text style={{fontSize: 12, color: Colors.main}}>确认收货</Text>
                                        </TouchableOpacity>}
                                        {item.state == 0 && <TouchableOpacity style={styles.shouhuoBtn} onPress={this.subOrder}>
                                            <Text style={{fontSize: 12, color: Colors.main}}>去支付</Text>
                                        </TouchableOpacity>}
                                    </View>
                                </View>
                            )
						}}
						refreshState={this.state.refreshState}
						onHeaderRefresh={this.onHeaderRefresh}
						onFooterRefresh={this.onFooterRefresh}
						// 可选
						footerRefreshingText='正在玩命加载中...'
						footerFailureText='我擦嘞，居然失败了 =.=!'
						footerNoMoreDataText='我是有底线的 =.=!'
						footerEmptyDataText='我是有底线的 =.=!'
					/>
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
    shouhuoBtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.main,
        marginLeft: 10
    },
    wuliuBtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginLeft: 10
    },
    delBtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 15,
        // borderWidth: 1,
        // borderColor: '#CCCCCC',
        marginLeft: 10
    },
})
