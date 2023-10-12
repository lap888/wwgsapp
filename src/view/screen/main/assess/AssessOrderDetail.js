import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, DeviceEventEmitter } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AssessApi } from '../../../../api';
import { Toast } from '../../../common';
import { BigButton, Header } from '../../../components/Index';
import { Colors } from '../../../theme/Index';
import DetailModal from './DetailModal';

class AssessOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            isModal: false,
        };
    }

    setNum = (num) => {
        this.state.data.assessIntegral = num;
        this.setState({
            data: this.state.data
        })
    }

    pushOrder = () => {
        AssessApi.pushOrder(this.state.data)
        .then((data) => {
            Toast.tip('评估成功');
            Actions.pop();
            DeviceEventEmitter.emit('sxCommunityOrder')
        }).catch((err) => console.log('err', err))
    }

    render() {
        let { data, isModal } = this.state;
        let status = data.state == 2 ? '已寄送' : data.state == 3 ? '已收货' : '已完成';
        let typeText = data.repoType == 1 ? '夏装' : data.repoType == 2 ? '春秋冬装' : '闲置物'; 
        let gradeTxt = data.itemGrade == 1 ? '品牌' : '通货';
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor }}>
                <Header title={'商家详情'}  />
                <ScrollView style={{flex: 1}}>
                    <View style={{ paddingLeft: 20, paddingTop: 25 }}>
                        <Text style={{ fontSize: 16 }}>商家信息</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Image style={styles.itemImg} source={{uri: data.storePic}}/>
                            <View style={{ flex: 1, marginHorizontal: 15 }}>
                                <Text style={{ fontSize: 14 }} >{data.storeName}</Text>
                                <Text style={{ fontSize: 14, marginTop: 5, color: Colors.grayFont }} >{data.storeAddress}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, marginTop: 30 }}>订单信息</Text>
                        <Text style={{ fontSize: 14, marginTop: 15, color: Colors.grayFont }}>订单状态:  <Text style={styles.grayTxt}>{status}</Text></Text>
                        <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>订单编号:  <Text style={styles.grayTxt}>{data.id}</Text></Text>
                        <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>获得积分:  <Text style={styles.grayTxt}>预计获得 {data.assessIntegral}</Text></Text>
                        <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>下单时间:  <Text style={styles.grayTxt}>{data.createTime}</Text></Text>
                        <Text style={{ fontSize: 16, marginTop: 30 }}>订单信息</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: Colors.grayFont }}>档次:  <Text style={styles.grayTxt}>{gradeTxt}</Text></Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>季节:  <Text style={styles.grayTxt}>{typeText}</Text></Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>品牌:  <Text style={styles.grayTxt}>{data.itemBrand === '' ? '暂无' : data.itemBrand}</Text></Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>购买价格:  <Text style={styles.grayTxt}>{data.unitPrice}元左右</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: Colors.grayFont }}>件数: <Text style={styles.grayTxt}>10</Text></Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>成色:  <Text style={styles.grayTxt}>{data.condition == 10 ? '全新' : `${data.condition}成新`}</Text></Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: Colors.grayFont }}>方式:  <Text style={styles.grayTxt}>个人寄送</Text></Text>
                            </View>
                        </View>
                    </View>
                    {this.props.isStore && data.state == 2 &&  <View style={{marginVertical: 50, justifyContent: 'center', flexDirection: 'row'}}>
                        <BigButton style={{height: 40, width: 150, borderRadius: 20, marginHorizontal: 0 }} name={'修改积分'} onPress={() => this.setState({isModal: true})} />
                        <BigButton style={{height: 40, width: 150, borderRadius: 20, marginHorizontal: 0, marginLeft: 20 }} name={'完成评估'} onPress={this.pushOrder} />
                    </View>}
                </ScrollView>
                {isModal && <DetailModal num={data.assessIntegral} setNum={this.setNum} close={() => this.setState({isModal: false})}/>}
            </View>
        );
    }
}


const mapStateToProps = state => ({
    isStore: state.user.isStore,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessOrderDetail);


const styles = StyleSheet.create({
    itemImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#D8D8D8'
    },
    grayTxt: { color: Colors.fontColor },
})