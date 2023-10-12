import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Cookie from 'cross-cookie';

import { Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';
import Advert from '../../advert/Advert';
import { LOGOUT } from '../../../../redux/ActionTypes';


class SettingUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    /**
	 * 退出登录
	 */
    loginOut = () => {
        Cookie.remove('token')
        this.props.logout();
        Advert.setUserId()
        Actions.pop();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor,}}>
                <Header title={'设置中心'}/>
                {/* <TouchableOpacity style={styles.item} onPress={() => Actions.push('UserInfo')}>
                    <Text style={styles.txt}>个人信息</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.item} onPress={() => Actions.push('UserInfo')}>
                    <Text style={styles.txt}>账号管理</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => Actions.push('Address')} >
                    <Text style={styles.txt}>地址管理</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => Actions.push('AccountInfo')}>
                    <Text style={styles.txt}>隐私设置</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.txt}>用户协议</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.txt}>检查更新</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={this.loginOut}>
                    <Text style={styles.txt}>退出登录</Text>
                    <Icon name={'md-chevron-forward'} size={16} color={Colors.fontColor} /> 
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    logged: state.user.logged,
    userId: state.user.id,
    mobile: state.user.mobile,
    name: state.user.name,
    avatarUrl: state.user.avatarUrl,
    inviterMobile: state.user.inviterMobile,
    reWeChatNo: state.user.reWeChatNo,
    reContactTel: state.user.reContactTel,
    myWeChatNo: state.user.myWeChatNo,
    myContactTel: state.user.myContactTel,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingUp);


const styles = StyleSheet.create({
    item: {
        height: 50, 
        backgroundColor: Colors.White,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.backgroundColor
    },
    txt: {
        fontSize: 14,
        color: Colors.fontColor
    },
})