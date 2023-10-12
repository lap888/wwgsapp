import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { Actions } from 'react-native-router-flux';
import { ShopApi } from '../../../../api';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class ExchangeShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageIndex: 1,
            pageSize: 20,
            refreshState: '',
        };
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        ShopApi.getHomeShops(this.state)
        .then((data) => {
            this.setState({
                data: this.state.pageIndex === 1 ? data : this.state.data.concat(data),
                refreshState: data.length < this.state.pageSize ? RefreshState.EmptyData : RefreshState.Idle
            })
        }).catch((err) => {
            this.setState({ data: [], refreshState: RefreshState.EmptyData })
        })
    }
    
    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing, pageIndex: 1 }, () => {
            this.getList();
        });
    }

    onFooterRefresh = () => {	
        this.setState({ refreshState: RefreshState.FooterRefreshing, pageIndex: this.state.pageIndex + 1 }, () => {
            this.getList();
        });
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'兑换商场'}/>
                <View style={{flex: 1}}>
                    <RefreshListView
                        data={this.state.data}
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity style={styles.item} onPress={() => Actions.push('GoodsDetail', {data: item})}>
                                <View>
                                    <Image style={styles.goodsImg} source={{uri: item.images[0]}}/>
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                    <Text style={styles.goodsName} numberOfLines={2}>{item.name}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 8}}>
                                        <Text style={{fontSize: 18, color: Colors.redTxt}}>{item.pointsPrice}</Text>
                                        <Text style={{fontSize: 13, color: Colors.redTxt}}> 积分</Text>
                                        <Text style={{fontSize: 13, color: Colors.grayFont}}> +{item.servicePrice}服务费</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        refreshState={this.state.refreshState}
                        onHeaderRefresh={this.onHeaderRefresh}
                        onFooterRefresh={this.onFooterRefresh}
                        // 可选
                        footerRefreshingText='正在玩命加载中...'
                        footerFailureText='我擦嘞，居然失败了...'
                        footerNoMoreDataText='我是有底线的...'
                        footerEmptyDataText='我是有底线的...'
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: Colors.White,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 3,
        paddingVertical: 5,
        paddingLeft: 5
    },
    goodsImg: {
        width: 75,
        height: 90,
        borderRadius: 2,
        backgroundColor: 'pink'
    },
    goodsName: {
        fontSize: 16,
        color: Colors.fontColor,
        marginTop: 8
    },
})