import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity,Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
// import BigButton from '../../component/BigButton';
import Icon from 'react-native-vector-icons/AntDesign';
import { Toast } from '../../common';
import RegExp from '../../common/RegExp';
import { Colors } from '../../theme/Index';
// import GoodsApi from '../../api/goods/GoodsApi';

export default class GoodsDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            data: this.props.data,
            num: 1,
            setPay: 'TG' // TG/YB/USDT
        };
    }
        
    componentWillUnmount() {
        this.setState({
            modalVisible: false,
            data: '',
            num: 1,
            setPay: 'TG' // TG/YB/USDT
        })
    }

    closeModal = () => {
        this.props.close();
    }

    setnum = async (type, value) => {
        let  n = Number(this.state.num)
        if (type == 'jian') {
            if (n <= 1) {
                Toast.tipTop('再减就没有了哦')
                return ;
            }
            this.setState({num: n - 1 })
        }
        if (type == 'jia') {
            if (n >= 99) {
                Toast.tipTop(`最多购买${99}个哦`)
                return ;
            }
            this.setState({num: n + 1 })
        }
        if (type == 'init') {
            if (value === '') {
                this.setState({num: value })
            }
            if (RegExp.integer.test(value)) {
                if (Number(value) <= 0) {
                    Toast.tipTop('有病吧买负数？你倒给我吗？');
                    return ;
                }
                if (Number(value) >= 99) {
                    Toast.tipTop('不好意思 目前最多支持买99件呀');
                    return ;
                }
                this.setState({num: value })
            }
        }
    }

    enterOrder = () => {
        // this.setModalVisible(false);
        const { data, num, setPay } = this.state; 
        this.props.close();
        const d = {
            ...data,
            num: num,
            type: setPay === 'TG' ? 0 : (setPay === 'YB' ? 1 : (setPay === 'USDT' ? 2 : -1))
        }
        Actions.push('ConfirmOrder', {data: d});
    }

    render() {
        const { data, modalVisible, num, setPay } = this.state;
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
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.setState({modalVisible: false})} />
                    <View style={{backgroundColor: Colors.White, height: 350, paddingHorizontal: 15, paddingTop: 15}}>
                        <View>
                            {/* <Image style={{width: 70, height: 70 }}  source={require('../../images/chongbang.png')}/> */}
                            <Image style={{width: 70, height: 70 }}  source={{uri: data.shopPic1}}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30}}>
                            <Text style={{fontSize: 14, color: Colors.fontColor}} >选择数量: </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20}} onPress={() => this.setnum('jian')}>—  </Text>
                                <TextInput
                                    style={{height: 20, width: 40, padding: 0, textAlign: 'center', backgroundColor: Colors.backgroundColor, borderRadius: 3}}
                                    value={String(this.state.num)}
                                    keyboardType={'number-pad'}
                                    onChangeText={(value) => this.setnum('init', value)}
                                />
                                <Text style={{fontSize: 20}} onPress={() => this.setnum('jia')}>  +</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30, flex: 1}}>
                            <Text style={{fontSize: 14, color: Colors.fontColor}} >选择付款方式</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                                <Text 
                                    style={[styles.selectPay, {backgroundColor: setPay === 'TG' ? 'rgb(255,219,205)' : Colors.backgroundColor}]} 
                                    onPress={() => this.setState({setPay: 'TG'})}>{data.candyPrice} 糖果 + {data.candyPrice * data.px}果皮</Text>
                                <Text 
                                    style={[styles.selectPay, {backgroundColor: setPay === 'YB' ? 'rgb(255,219,205)' : Colors.backgroundColor}]} 
                                    onPress={() => this.setState({setPay: 'YB'})}>{data.ybPrice} YB + {data.ybPrice * data.px}能量</Text>
                                <Text 
                                    style={[styles.selectPay, {backgroundColor: setPay === 'USDT' ? 'rgb(255,219,205)' : Colors.backgroundColor}]} 
                                    onPress={() => this.setState({setPay: 'USDT'})}>{`${data.usdtPrice} USDT${data.rewaardYB == 0 ? '' : ' 送'+data.rewaardYB+'YB'}`}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
                            <TouchableOpacity style={styles.closeBtn} onPress={this.closeModal}>
                                <Text style={{fontSize: 16, color: Colors.main}}>关闭选项</Text>
                            </TouchableOpacity>
                            <View style={{width: 10}}/>
                            <TouchableOpacity style={{flex: 1, height: 40, borderRadius: 20 }} onPress={this.enterOrder}>
                                <LinearGradient colors={['#FFC887', '#FF7028']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, color: Colors.White}}>立即购买</Text>
                                </LinearGradient>
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
        justifyContent: 'flex-end', 
    },
    selectPay: { 
        marginTop: 10,
        fontSize: 14,
        color: '#E70243',
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 2,
        marginRight: 20,
        backgroundColor: 'rgb(255,219,205)'
    },
    closeBtn:{flex: 1, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.backgroundColor },
})