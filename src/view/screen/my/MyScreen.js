import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { UPDATE_USER } from '../../../redux/ActionTypes';
import { Toast } from '../../common';
import { Header } from '../../components/Index';
import { Colors, Metrics } from '../../theme/Index';
const MyOptions = [
    { key: 0, name: "积分兑换", route: 'IntegralExchange', image: require('../../images/my/jifenduihuan.png')},
    { key: 1, name: "我的团队", route: 'Team', image: require('../../images/my/tuandui.png')},
    { key: 2, name: "我的钱包", route: 'WalletDetail', image: require('../../images/my/qianbao.png')},
    { key: 3, name: "实名认证", route: 'PayPage', image: require('../../images/my/shimingRZ.png')},
]
const ItemList = [
    { key: 0, name: "邀请好友", route: 'NULL', image: require('../../images/my/yaoqinghaoyou.png')},
    { key: 1, name: "我的订单", route: 'OrderList', image: require('../../images/my/dingdan.png')},
    { key: 4, name: "我的社区", route: 'MyCommunity', image: require('../../images/my/wodeshequ.png')},
    { key: 2, name: "客服", route: 'CustomerService', image: require('../../images/my/kefu.png')},
    { key: 3, name: "设置", route: 'SettingUp', image: require('../../images/my/shezhi.png')},
]

class MyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onOptionPress = (route) => {
        switch (route) {
            case 'NULL': {
                Toast.tip('暂未开放')
                return;
            }
            case 'SettingUp': {
                Actions.push(route);
                return;
            }
            default:{
                if (!this.props.logged) {
                    Actions.push("Login");
                    return;
                }
                Actions.push(route);
                break;
            }
        }
    }

    headerImgOnPress = () => {
        if (!this.props.logged) {
            Actions.push("Login");
            return;
        }
    }

    /**
     * 头部组件
     */
    renderHeader = () => {
        return (
            <ImageBackground source={require('../../images/my/toubuBG.png')} style={{height: 150, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    {this.props.logged ? <View style={{ flex: 1}}>
                        <Text style={{fontSize: 20, color: Colors.White}}>{this.props.nickname}</Text>
                        <Text style={{fontSize: 13, color: Colors.White}}>邀请码：{this.props.rcode}</Text>
                    </View> : 
                    <TouchableOpacity style={{ flex: 1, marginTop: 5}} onPress={this.headerImgOnPress} >
                        <Text style={{fontSize: 20, color: Colors.White}}>请登录</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={this.headerImgOnPress}>
                        <Image style={{height: 42, width: 42, borderRadius: 21, backgroundColor: Colors.White}} source={{uri: this.props.avatar}} />
                    </TouchableOpacity>
                </View>
                {this.props.logged && <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 14, color: Colors.White}}>个性签名</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex:1, fontSize: 12, color: Colors.White, marginTop: 5 }} numberOfLines={1}>...</Text>
                        {/* <Icon style={{marginTop: 5}} name={'edit'} color={Colors.White} size={16} />
                        <Text style={{fontSize: 14, color: Colors.White, marginTop: 5}}> 编辑</Text> */}
                    </View>
                </View>}
            </ImageBackground>
        )
    }
    /**
     * 计数界面
     */
    renderNumber = () => {
        const { interalSub, cotton } = this.props;
        return (
            <View style={{backgroundColor: Colors.White}}>
                <ImageBackground source={require('../../images/my/jifenBG.png')} resizeMode='stretch' style={{flexDirection: 'row', borderRadius: 8, height: 70, marginHorizontal: 10, marginTop: 5 }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => Actions.push('IntegralRecord')}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 20, color: Colors.fontColor}}>{interalSub ? interalSub : 0}</Text>
                            <Text style={{fontSize: 12,lineHeight: 20, color: Colors.fontColor}}> 积分</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width: 1, height: 50, marginTop: 10, backgroundColor: Colors.White}} />
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => Actions.push('CottonRecord')}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 20, color: Colors.fontColor}}>{cotton ? cotton : 0}</Text>
                            <Text style={{fontSize: 12, lineHeight: 20,color: Colors.fontColor}}> 棉宝</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }

	/**
	 * 渲染功能组件区
	 */
	renderOptions = () => {
		return (
			<View style={styles.options}>
				{MyOptions.map(item => {
					let { key, name, route, image } = item;
					return (
						<TouchableOpacity key={key} style={styles.optionTouch} onPress={() => this.onOptionPress(route)}>
							<Image source={image}/>
							<Text style={styles.optionTitle}>{name}</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		)
    }
    /**
     * 快速导航
     */
    renderItem = () => {
        return (
			<View style={{}}>
				{ItemList.map(item => {
                    let { key, name, route, image } = item;
                    if (!this.props.isStore && route === 'MyCommunity') {
                        return null;
                    }
					return (
                        <TouchableOpacity 
                            key={key}
                            style={styles.ListBtn}
                            onPress={() => this.onOptionPress(route)}>
							<Image source={image}/>
							<Text style={{fontSize: 14, color: Colors.fontColor, marginLeft: 10}}>{name}</Text>
						</TouchableOpacity>
					)
				})}
			</View>
        )
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header title={'个人中心'} isTabBar={true} />
                    {this.renderHeader()}
                    {this.renderNumber()}
                    {this.renderOptions()}
                    {this.renderItem()}
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = state => ({
	isPay: state.user.isPay,
	alipayUid: state.user.alipayUid,
	logged: state.user.logged,
	userId: state.user.id,
	level: state.user.level,
	rcode: state.user.rcode,
	golds: state.user.golds,
	mobile: state.user.mobile,
	nickname: state.user.name,
	avatar: state.user.avatarUrl,
    balance: state.dividend.userBalance,
    isStore: state.user.isStore,
    cotton: state.user.cotton,
    interalSub: state.user.interalSub,
	userBalanceNormal: state.dividend.userBalanceNormal,
	userBalanceLock: state.dividend.userBalanceLock
});
const mapDispatchToProps = dispatch => ({
	updateUserInfo: (userInfo) => dispatch({ type: UPDATE_USER, payload: { userInfo } })
});
export default connect(mapStateToProps, mapDispatchToProps)(MyScreen);

const styles = StyleSheet.create({
	options: {
		flexDirection: 'row',
		paddingTop: 10, 
		paddingHorizontal: 10,
		paddingBottom: 10,
        flexWrap: 'wrap',
        backgroundColor: Colors.White
	},
	optionTouch: {
		justifyContent: 'center',
		alignItems: 'center', 
		width: (Metrics.screenWidth - 20)/4,
	},
    optionTitle: {
        marginTop: 4,
        fontSize: 14
    },
    ListBtn: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.White,
        borderTopWidth: 1,
        borderTopColor: Colors.backgroundColor
    }
})
