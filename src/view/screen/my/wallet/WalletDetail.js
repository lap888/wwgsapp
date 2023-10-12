import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { HistoryApi, UserApi } from '../../../../api';
import { MathFloat } from '../../../../utils/Index';
import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class WalletDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            dataList: [],
            pageIndex: 1,
            pageSize: 20,
            refreshState: ''
        };
    }

    componentDidMount() {
        this.getDtail();
        this.getList();
    }

    getDtail = () => {
        UserApi.getWallet()
        .then((data) => {
            this.setState({ data: data})
        }).catch((err) => console.log('err', err))
    }

    getList = () => {
        HistoryApi.WalletRecord({ pageIndex: this.state.pageIndex, pageSize: this.state.pageSize })
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
            this.getList();
        });
    }

    onFooterRefresh = () => {	
        this.setState({ refreshState: RefreshState.FooterRefreshing, pageIndex: this.state.pageIndex + 1 }, () => {
            this.getList();
        });
    }

    render() {
        const { data } = this.state;
        return (
            <View style={styles.containr}>
                <Header title="钱包" rightStyle={{fontSize: 12}} onRightPress={() => Actions.push('GameDividendIncomeList')}/>
                <View>
                    <ImageBackground style={{height: 150}} source={require('../../../images/my/qianbaoBG.png')}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{marginTop: 20, fontSize:12, color: Colors.White}}>账户余额(元)</Text>
                            <Text style={styles.balanceText}>{MathFloat.floor(data.balance, 2)}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ fontSize:12, color: Colors.White}}>可用金额</Text>
                                <Text style={{ fontSize:12, color: Colors.White, marginTop: 5}}>{MathFloat.floor(data.balance - data.frozen, 2)}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ fontSize:12, color: Colors.White}}>冻结金额</Text>
                                <Text style={{ fontSize:12, color: Colors.White, marginTop: 5}}>{MathFloat.floor(data.frozen, 2)}</Text>
                            </View>  
                        </View>
                    </ImageBackground>
                </View>
                <View style={{flex: 1}}>
                    <RefreshListView
                        data={this.state.dataList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => <RecordsListItem data={item} />}
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
    containr: { flex: 1, backgroundColor: Colors.backgroundColor },
    balanceText: { fontSize: 20, color: Colors.White, marginTop: 10 },
    rule: { fontSize: 15, color: Colors.grayFont, marginTop: 20 },
});