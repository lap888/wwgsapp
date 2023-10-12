import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { HistoryApi } from '../../../api';
import { Header, RecordsListItem } from '../../components/Index';
import { Colors } from '../../theme/Index';

export default class CottonRecord extends Component {
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
    }
    
    getList = () => {
        HistoryApi.CottonRecord({ pageIndex: this.state.pageIndex, pageSize: this.state.pageSize })
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
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'棉宝记录'} />
                <View style={{ flex: 1 }}>
                    <RefreshListView
                        data={this.state.data}
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

