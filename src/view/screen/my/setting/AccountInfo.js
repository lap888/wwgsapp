import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../../components/Index';
import { Colors, Metrics } from '../../../theme/Index';

export default class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title="隐私设置" />
                {/* <View style={styles.labelContainer}>
                    <Text style={styles.lableTxt}>修改联系方式</Text>
                    <TouchableOpacity style={styles.btnRight} onPress={() => Actions.push('SetContact',{ myContactTel, myWeChatNo })}>
                        <Text style={[styles.lableTxt, { color: Colors.C10 }]}></Text>
                        <Icon name="arrow-forward" style={{ color: Colors.C6, fontSize: 20, marginLeft: 10 }} />
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity style={styles.labelContainer} onPress={() => Actions.BusinessPwd()}>
                    <Text style={styles.lableTxt}>修改交易密码</Text>
                    <View style={styles.btnRight}>
                        <Icon name="chevron-forward" style={{ color: Colors.main, fontSize: 20, marginLeft: 10 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.labelContainer} onPress={() => Actions.EditSignInPwd()}>
                    <Text style={styles.lableTxt}>修改登录密码</Text>
                    <View style={styles.btnRight}>
                        <Icon name="chevron-forward" style={{ color: Colors.main, fontSize: 20, marginLeft: 10 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.labelContainer} >
                    <Text style={styles.lableTxt}>银行卡绑定</Text>
                    <View style={styles.btnRight}>
                        <Icon name="chevron-forward" style={{ color: Colors.main, fontSize: 20, marginLeft: 10 }} />
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    button: { margin: 100, backgroundColor: 'orange' },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52,
        marginLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.C7
    },
    labelContainerflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.C7
    },
    lableTxt: { fontSize: 16, color: Colors.C11 },
    nickname: { textAlign: "right", paddingRight: 10, color: Colors.C10 },
    signOutView: { justifyContent: 'center', alignItems: "center", marginBottom: 40 },
    signOutBtn: { marginTop: 50, width: Metrics.screenWidth * 0.6, backgroundColor: Colors.C6, alignItems: "center", borderRadius: 8 },
    btnRight: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center" },
})