import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { RegExp, Toast } from '../../../common';
import { Colors, Metrics } from '../../../theme/Index';

export default class DetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            num: this.props.num
        };
    }


    onChangeText = (value) => {
        if (RegExp.integer1.test(value) || value == '') {
            this.setState({ num: value })
        }
    }

    enter = () => {
        if (this.state.num == '') {
            Toast.tip('请输入评估积分')
            return;
        } else {
            this.props.setNum(Number(this.state.num));
            this.props.close()
        }

    }

    render() {
        const { modalVisible } = this.state;
        return (
            <Modal
                style={{ justifyContent: 'center', alignItems:'center' }}
                animationType="slide"
                transparent={true}
                hardwareAccelerated={true}
                visible={modalVisible}
                presentationStyle={'overFullScreen'}
                onRequestClose={() => this.setModalVisible(false)} 
            >
                <View style={styles.tipsView}>
                    <View style={styles.card}>
                        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
                            <Text style={{fontSize: 16, color: Colors.fontColor}}>评估积分</Text>
                            <TextInput
                                style={{backgroundColor: '#EEEEEE', height: 42, marginTop: 15, borderRadius: 3 }}
                                value={`${this.state.num}`}
                                keyboardType='number-pad'
                                onChangeText={this.onChangeText}
                            />
                        </View>
                        <View style={{height: 50, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.quxiao} onPress={() => this.props.close()}>
                                <Text style={{fontSize: 16, color: Colors.White}}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.queren} onPress={this.enter}>
                                <Text style={{fontSize: 16, color: Colors.White}}>确认</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    tipsView: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        justifyContent: 'center',
        // alignItems: 'center',

    },
    card: {backgroundColor: Colors.White, width: Metrics.screenWidth - 60, marginLeft: 30, height: 190, borderRadius: 6, paddingTop: 15 },
    quxiao: {flex: 1, backgroundColor: '#CCCCCC', borderBottomLeftRadius: 6, justifyContent: 'center', alignItems: 'center',},
    queren: {flex: 1, backgroundColor: Colors.main, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center',}
})