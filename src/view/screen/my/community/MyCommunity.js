import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, DeviceEventEmitter } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { Actions } from 'react-native-router-flux';
import { AssessApi } from '../../../../api';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class MyCommunity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshState: '',
            pageIndex: 1,
            pageSize: 20,
        };
    }

    componentDidMount() {
        this.getList()
        DeviceEventEmitter.addListener('sxCommunityOrder', () => {
            this.onHeaderRefresh();
        }) 
    }
    
    getList = () => {
        AssessApi.getCommuniyOrder({ pageIndex: this.state.pageIndex, pageSize: this.state.pageSize })
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
                <Header title={'社区订单'} />
                <View style={{height: 150, backgroundColor: '#7AD5A9' }} >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 12, color: Colors.White}}>当日营业额</Text>
                        <Text style={{fontSize: 20, color: Colors.White, marginTop: 10}}>3566.35</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{fontSize: 12, color: Colors.White}}>当月营业额</Text>
                            <Text style={{fontSize: 14, color: Colors.White, marginTop: 5}}>3566.35</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{fontSize: 12, color: Colors.White}}>上月营业额</Text>
                            <Text style={{fontSize: 14, color: Colors.White, marginTop: 3}}>3566.35</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, marginTop: 15}}>
                    <RefreshListView
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            const typeText = item.repoType == 1 ? '夏装' : item.repoType == 2 ? '春秋冬装' : '闲置物';
                            const status = item.state == 2 ? '已寄送' : item.state == 3 ? '已收货' : '已完成';
                            return (
                                <TouchableOpacity style={styles.item} onPress={() => Actions.push('AssessOrderDetail', { data: item })}>
                                    <Image style={styles.itemImg} source={{uri: item.storePic}}/>
                                    <View style={{flex: 1, marginLeft: 15}}>
                                        <Text style={{fontSize: 16, marginTop: 5}} >{item.itemBrand}</Text>
                                        <Text style={{fontSize: 14, marginTop: 5, color: Colors.grayFont}} >{typeText}  {item.itemCunt * item.unitPrice}左右  {10 == 10 ? '全新' : `${item.condition}成新`}</Text>
                                        <Text style={{fontSize: 14, marginTop: 5, color: Colors.grayFont}} >预计获得积分  {item.assessIntegral}</Text>
                                    </View>
                                    <Text>{status}</Text>
                                </TouchableOpacity>
                            )
                        }}
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
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.backgroundColor,
        padding: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: Colors.White
    },
    itemImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.backgroundColor
    },
})
