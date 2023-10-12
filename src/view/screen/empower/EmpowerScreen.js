import React, { Component } from 'react';
import { View, Text, BackHandler, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Toast } from '../../common';
import { BigButton } from '../../components/Index';

export default class EmpowerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    empower = () => {
        Toast.tip('点击授权');
        Cookie.get('token')
            .then(value => {
                let token = value == null || value == '' ? '' : value;
                if (token !== '') {
                    // let deepLinkURL = `wwgsapp://wwgsapp/EmpowerScreen?token=${token}`;
                    // Linking.openURL(deepLinkURL).catch(err => console.error('An error occurred', e
                }else{
                    Actions.push('Login',{ty: 'empower'})
                }
            })
        BackHandler.exitApp();
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Text> EmpowerScreen </Text>
                <BigButton style name={'授权'} onPress={this.empower}/>
            </View>
        );
    }
}
