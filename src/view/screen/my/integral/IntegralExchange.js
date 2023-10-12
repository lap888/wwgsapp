import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { UserApi } from '../../../../api';
import { UPDATE_USER } from '../../../../redux/ActionTypes';
import { RegExp, Toast } from '../../../common';
import { BigButton, Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

class IntegralExchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: ''
        };
    }

    setNum = (value) => {
        if (RegExp.integer1.test(value) || value === '') {
            this.setState({num: value})
        }
    }

    exchange = () => {
        UserApi.exchange({num: Number(this.state.num)})
        .then((res) => {
            return UserApi.getUserInfo()
        })
        .then((data) => {
            this.props.updateUserInfo(data);
            this.setState({num: ''})
            Toast.tip('兑换成功');
        }).catch((err) => console.log('err', err))
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'积分兑换'} />
                <View style={{height: 100, flexDirection: 'row', backgroundColor: Colors.White}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{fontSize: 14, color: Colors.grayFont}}>棉宝数量</Text>
                        <Text style={{fontSize: 18, color: Colors.main, marginTop: 10}}>{this.props.cotton}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{fontSize: 14, color: Colors.grayFont}}>积分数量</Text>
                        <Text style={{fontSize: 18, color: Colors.main, marginTop: 10}}>{this.props.interalSub}</Text>
                    </View>
                </View>
                <View style={styles.jifen}>
                    <TextInput
                        style={{flex: 1}}
                        keyboardType='number-pad'
                        placeholder={'需要兑换积分 (棉宝 : 积分=1 : 100)'}
                        value={this.state.num}
                        onChangeText={this.setNum}
                    />
                </View>
                <View style={{height: 45, justifyContent: 'center', alignItems: 'center', marginTop: 60}} >
                    <BigButton style={{width: 200, height: 45, borderRadius: 22.5}} name={'兑换积分'} onPress={this.exchange} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cotton: state.user.cotton,
    interalSub: state.user.interalSub,
});

const mapDispatchToProps = dispatch => ({
    updateUserInfo: (userInfo) => dispatch({ type: UPDATE_USER, payload: { userInfo } })
});

export default connect(mapStateToProps, mapDispatchToProps)(IntegralExchange);

const styles = StyleSheet.create({
    jifen: {
        height: 45,
        marginHorizontal: 25,
        marginTop: 30,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: Colors.White,
    }
})
