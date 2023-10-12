import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, DeviceEventEmitter} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AddressApi } from '../../../../api';
import { BigButton, Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';

export default class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            userId: 0,
            name: '',
            phone: '',
            province: '',
            city: '',
            area: '',
            address: '',
            postCode: '000000',
            isDefault: 0
        };
    }

    componentDidMount() {
        if (this.props.ty == 'modify') {
            this.setState(this.props.adress)
        }
    }

    onPressSave = () => {
        AddressApi.editAddress(this.state)
        .then(res => {
            if (res.code == 200) {
                DeviceEventEmitter.emit('refranshAddress');
                Actions.pop();
            }
            Toast.tipTop(res.message);
        });
        // Send('api/UserAddress/Edit', this.state)
    }


    onChangeName = (value) => {
        this.setState({name: value})
    }
    onChangePhone = (value) => {
        this.setState({phone: value})
    }
    onChangeProvince = (value) => {
        this.setState({province: value})
    }
    onChangeCity = (value) => {
        this.setState({city: value})
    }
    onChangeArea = (value) => {
        this.setState({area: value})
    }
    onChangeAddress = (value) => {
        this.setState({address: value})
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'地址管理'} />
                <View style={{paddingBottom: 30, backgroundColor: Colors.White}}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>收货人</Text>
                        <TextInput
                            style={{flex: 1, marginLeft: 10}}
                            placeholder={'请填写收货人姓名'}
                            value={this.state.name}
                            onChangeText={this.onChangeName}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>手机号</Text>
                        <TextInput
                            style={{flex: 1, marginLeft: 10}}
                            placeholder={'请填写收货人手机号'}
                            value={this.state.phone}
                            keyboardType='number-pad'
                            onChangeText={this.onChangePhone}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>省份</Text>
                        <TextInput
                            style={{flex: 1, marginLeft: 10}}
                            placeholder={'请填写所在省'}
                            value={this.state.province}
                            onChangeText={this.onChangeProvince}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>城市</Text>
                        <TextInput
                            style={{flex: 1, marginLeft: 10}}
                            placeholder={'请填写所在城市'}
                            value={this.state.city}
                            onChangeText={this.onChangeCity}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>区县</Text>
                        <TextInput
                            style={{flex: 1, marginLeft: 10}}
                            placeholder={'请输入所在区县'}
                            value={this.state.area}
                            onChangeText={this.onChangeArea}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>详细地址</Text>
                        <TextInput
                            style={{flex: 1, marginLeft: 10}}
                            placeholder={'街道、街牌号等'}
                            value={this.state.address}
                            onChangeText={this.onChangeAddress}
                        />
                    </View>
                </View>
                <View style={{marginTop: 80}}>
                    <BigButton style={{height: 50, borderRadius: 25, marginBottom: 60, marginHorizontal: 80, }} onPress={this.onPressSave} name={'保存'} />
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    inputItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.backgroundColor,
    },
    inputTitle: {
        fontSize: 14,
        color: Colors.fontColor
    },  
})