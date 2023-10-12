import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import TeamApi from '../../../../api/user/TeamApi';
import { Header } from '../../../components/Index';
import { Colors, Metrics } from '../../../theme/Index';
const jdWidth = Metrics.screenWidth - 50 - 130 
export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myTeamInfo: '',
            teamInfoList: [],
            PageIndex: 1,
            PageSize: 20,
            type: 0,
            order: 'desc'
        };
    }

    componentDidMount() {
        this.getTeamInfo()
    }

    getTeamInfo = () => {
        const { PageIndex,PageSize, type, order } = this.state;
        const params = {
            PageIndex,
            PageSize,
            type,
            order
        };
        TeamApi.getTeamInfo(params)
        .then((data) => {
            this.setState({
                myTeamInfo: data.myTeamInfo,
                teamInfoList: data.teamInfoList,
            })
        }).catch((err) => console.log('err', err))
    }

    render() {
        const { myTeamInfo, teamInfoList } = this.state;
        let yaoqingJD = 0;
        let tuanduiJD = 0;
        let lianmenJD = 0;
        if (myTeamInfo != '' ) {
            yaoqingJD = myTeamInfo.needAuthCount == 0 ? jdWidth : jdWidth * Number(myTeamInfo.authCount)/Number(myTeamInfo.needAuthCount);
            tuanduiJD = myTeamInfo.needTeamCandyH == 0 ? jdWidth : jdWidth * Number(myTeamInfo.teamCandyH)/Number(myTeamInfo.needTeamCandyH);
            lianmenJD = myTeamInfo.needLittleCandyH == 0 ? jdWidth : jdWidth * Number(myTeamInfo.littleCandyH)/Number(myTeamInfo.needLittleCandyH);
        }
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'我的团队'} />
                <ImageBackground style={styles.headerBG} source={require('../../../images/my/team/tuanduiBG.png')}>
                    <View style={styles.headerImg}>
                        <Image style={styles.userImg} source={{uri: myTeamInfo.avatarUrl}} />
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.userName}>用户名称</Text>
                            <Text style={styles.userLV}>等级</Text>
                        </View>
                    </View>
                    <View style={styles.jinduView}>
                        <Text style={styles.jinduTxt1}>我的邀请</Text>
                        <View style={[styles.jinduBG1, { width: jdWidth,}]}>
                            <View style={[styles.jinduBG2, {width: yaoqingJD}]}/>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={styles.jinduTxt2}>{myTeamInfo.authCount}</Text>
                            <View style={{height: 1, width: 40,  backgroundColor: Colors.White}} />
                            <Text style={styles.jinduTxt2}>{myTeamInfo.needAuthCount}</Text>
                        </View>
                    </View>
                    <View style={styles.jinduView}>
                        <Text style={styles.jinduTxt1}>团队活跃</Text>
                        <View style={[styles.jinduBG1, { width: jdWidth,}]}>
                            <View style={[styles.jinduBG2, {width: tuanduiJD}]}/>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={styles.jinduTxt2}>{myTeamInfo.teamCandyH}</Text>
                            <View style={{height: 1, width: 40,  backgroundColor: Colors.White}} />
                            <Text style={styles.jinduTxt2}>{myTeamInfo.needTeamCandyH}</Text>
                        </View>
                    </View>
                    <View style={styles.jinduView}>
                        <Text style={styles.jinduTxt1}>联盟活跃</Text>
                        <View style={[styles.jinduBG1, { width: jdWidth,}]}>
                            <View style={[styles.jinduBG2, {width: lianmenJD}]}/>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={styles.jinduTxt2}>{myTeamInfo.littleCandyH}</Text>
                            <View style={{height: 1, width: 40,  backgroundColor: Colors.White}} />
                            <Text style={styles.jinduTxt2}>{myTeamInfo.needLittleCandyH}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{flex: 1, marginTop: 30}}>
                    <RefreshListView
                        data={this.state.teamInfoList}
                        keyExtractor={(item ,index) => index + ''}
                        renderItem={({ item, index }) =>
                            <View style={{flexDirection: 'row',marginHorizontal: 15, padding: 15, marginBottom: 5, backgroundColor: Colors.White, borderRadius: 5}}>
                                <Image style={{width: 35, height: 35, borderRadius: 17.5, backgroundColor: Colors.grayFont}} source={{uri: item.avatarUrl}}/>
                                <View style={{flex: 1, marginLeft: 5}}>
                                    <Text style={{fontSize: 14, color: Colors.fontColor}}>{item.mobile}<Text style={{lineHeight: 16, fontSize: 12 }}>        {item.teamStart == 0 ? '' : item.teamStart}</Text></Text>
                                    <Text style={{fontSize: 12, color: Colors.fontColor, marginTop: 5}}>注册时间：{item.ctime}</Text>
                                </View>
                                {item.auditState == 1 ? <View style={styles.itemTag1} >
                                    <Text style={{fontSize: 12, color: '#40AC68'}} >已认证</Text>
                                </View> : 
                                <View style={styles.itemTag0} >
                                    <Text style={{fontSize: 12, color: '#ccc'}} >未认证</Text>
                                </View>}
                            </View>
                        }
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
    headerBG: {
        width: Metrics.screenWidth,
        height: Metrics.screenWidth * 210 / 375,
        paddingBottom: 30
    },
    headerImg: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 15
    },
    userImg: {
        height: 45,
        width: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.main
    },
    userName: {
        fontSize: 16,
        color: Colors.White
    },
    userLV: {
        fontSize: 14,
        color: Colors.White,
        marginTop: 5
    },
    jinduView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,

    },
    jinduTxt1: {
        fontSize: 14,
        color: Colors.White,
        marginRight: 10
    },
    jinduTxt2: {
        fontSize: 14,
        color: Colors.White,
        lineHeight: 15
        // marginLeft: 10
    },
    jinduBG1: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#94DEBA',

    },
    jinduBG2: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',

    },
    itemTag0: {
        height: 20,
        width: 46,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(204,204,204,0.2)'
    },
    itemTag1: {
        height: 20,
        width: 46,
        borderWidth: 1,
        borderColor: '#40AC68',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(122,213,169,0.2)'
    },
})
