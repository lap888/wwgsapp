import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    TextInput, Keyboard
} from 'react-native';
// import { Toast } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Header, CountDownButton } from '../../../components/Index';
import moment from 'moment';
import { connect } from 'react-redux';
import { LOGOUT } from '../../../../redux/ActionTypes';
import { Colors, Metrics } from '../../../theme/Index';
import { Send } from '../../../../utils/Http';
import { Toast } from '../../../common';

const mobileRegex = /^1[3456789]\d{9}$/;
const verifyCount = /^[0-9]*$/ // 验证码和交易密码非数字校验

class BusinessPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: "",
            vcode: "",
            newPwd: "",
            confirmPwd: "",
            msgId: "",
            int: null,
        };
    }

    changebgColor = () => {
        let tel = "";
        this.state.tel.length > 0 ? tel = this.state.tel : tel = this.props.mobile
        return tel > 10;
    }
    sendVcode = (shouldStartCountting) => {
        Keyboard.dismiss();
        let tel = this.state.tel || this.props.mobile;
        this.state.tel.length > 0 ? tel = this.state.tel : tel = this.props.mobile
        /* 校验手机号格式 */
        if (!tel.match(mobileRegex)) {
            Toast.show({
                text: "手机号格式不正确",
                position: "top",
                textStyle: { textAlign: "center" },
            })
        }
        let params = {
            mobile: tel,
            Type: 'resetPassword'

        }
        Send("api/sendVcode", params).then(res => {
            if (res.code == 200) {
                this.setState({
                    msgId: res.data.msgId,
                })
            } else {
                Toast.show({
                    text: res.message,
                    position: "top",
                    textStyle: { textAlign: "center" },
                })
            }
            setTimeout(() => { shouldStartCountting && shouldStartCountting(true) }, 10);
        });
    }

    /**
     * 重置交易密码
     */
    resetTradePed = () => {
        Keyboard.dismiss();
        let tel = this.state.tel || this.props.mobile;
        let vcode = this.state.vcode;
        let newPwd = this.state.newPwd;
        let confirmPwd = this.state.confirmPwd;
        let pwd = "";
        /* 为空验证 */
        if (tel.length === 0 || vcode.length === 0 || newPwd.length === 0 || confirmPwd.length === 0) {
            Toast.tip('所有项都为必填项')
            return;
        }
        /* 验证码非数字验证 */
        if (!vcode.match(verifyCount)) {
            return (
                Toast.tip('验证码必须是数字')
            )
        }
        /* 验证码位数验证(必须为6位数字) */
        if (vcode.length !== 6) {
            return (
                Toast.tip('验证码必须为六位')
            )
        }
        /* 校验手机号格式 */
        if (!tel.match(mobileRegex)) {
            return (
                Toast.tip('手机号格式不正确')
            )
        }
        /* 密码必须为6-16位 */
        if ((newPwd.length < 6 || confirmPwd.length < 6) || (newPwd.length > 16 || confirmPwd.length > 16)) {
            return (
                Toast.tip('交易密码为6-16位')
            )
        }
        /* 密码和确认密码非数字验证 */
        if (!newPwd.match(verifyCount) || !confirmPwd.match(verifyCount)) {
            Toast.tip('密码必须是数字')
            return;
        }
        /* 确认两次输入的密码是否一样 */
        if (newPwd != confirmPwd) {
            Toast.tip('两次输入密码不一样')
            return;
        } else {
            pwd = newPwd
        }
        let params = {
            mobile: tel,
            vcode: vcode,
            msgId: this.state.msgId,
            newTradePwd: pwd,
        }
        Send("api/User/ForgetLoginPwd", params).then(res => {
            if (res.code == 200) {
                Toast.tip('修改交易密码成功')
                setTimeout(() => Actions.pop(), 1000)
            } else {
                Toast.tip(res.message)
            }
        });

    }
    render() {
        return (
            <View style={styles.businessPwdPageView}>
                <Header title="修改交易密码" />
                <View style={styles.pwdViewStyle}>
                    <View style={{ paddingVertical: 5, marginLeft: 5, backgroundColor: "#ffffff" }}>
                        <Text style={styles.promptTxt}>小贴士: 新注册用户初始交易密码为  66668888</Text>
                    </View>
                    <TextInput style={styles.inputViewStyle}
                        placeholder="请输入手机号码"
                        defaultValue={this.props.mobile}
                        editable={false}
                        onChangeText={(text) => {
                            this.setState({
                                tel: text
                            })
                        }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }} >
                        <TextInput style={[styles.inputViewStyle, { width: Metrics.screenWidth * 0.6 }]}
                            placeholder="请输入验证码"
                            autoCapitalize="none"
                            clearButtonMode="always"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                this.setState({
                                    vcode: text
                                })
                            }}
                        />
                        <CountDownButton
                            textStyle={{ color: Colors.main, fontSize: 14 }}
                            style={styles.countDownButtonStyle}
                            buttonStyle={{}}
                            timerCount={60}
                            timerTitle={'获取验证码'}
                            enable={true}
                            onClick={
                                (shouldStartCountting) => {
                                    this.sendVcode(shouldStartCountting)
                                }}
                            timerEnd={() => { this.setState({ state: '倒计时结束' }) }}
                        />
                    </View>
                    <TextInput style={styles.inputViewStyle}
                        placeholder="请输入新密码"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        clearButtonMode="always"
                        onChangeText={(text) => {
                            this.setState({
                                newPwd: text
                            })
                        }}
                        keyboardType="numeric"
                    />
                    <TextInput style={styles.inputViewStyle}
                        placeholder="请确认新密码"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        clearButtonMode="always"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({
                                confirmPwd: text
                            })
                        }}
                        returnKeyType="done"
                        onSubmitEditing={() => this.resetTradePed()}
                    />
                    <View style={styles.submitView}>
                        <TouchableOpacity style={styles.submitBtn} onPress={this.resetTradePed}>
                            <Text style={{fontSize: 16, color: "#ffffff" }}> 确认 </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    userId: state.user.id,
    mobile: state.user.mobile
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPwd);
// 样式
const styles = StyleSheet.create({
    businessPwdPageView: {
        backgroundColor: "#ffffff",
        height: Metrics.screenHeight * 1,
    },
    pwdViewStyle: {
        padding: 10,
    },
    promptTxt: {
        fontSize: 12,
        color: Colors.main,
    },
    inputViewStyle: {
        height: 48,
        paddingLeft: 10,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: Colors.backgroundColor,
    },
    countDownButtonStyle: {
        height: 48,
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        width: Metrics.screenWidth * 0.3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.backgroundColor
    },
    submitView: {
        height: Metrics.screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: "center",
    },
    submitBtn: {
        height: 50,
        backgroundColor: Colors.main,
        width: Metrics.screenWidth * 0.6,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5,
    },
});