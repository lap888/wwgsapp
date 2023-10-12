import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SimpleItemsDialog } from 'react-native-pickers';

import { Header } from '../../../components/Index';
import { Colors, Metrics } from '../../../theme/Index';
import Icon from 'react-native-vector-icons/Ionicons';
import { Toast } from '../../../common';
import { AssessApi } from '../../../../api';
const HeaderList1 = [
    {key: 1, name: '夏装', image: require('../../../images/home/assess/xia.png')},
    {key: 2, name: '春秋冬装', image: require('../../../images/home/assess/qiudong.png')},
    {key: 3, name: '闲置物', image: require('../../../images/home/assess/quanxin.png')},
]
const HeaderList2 = [
    {key: 1, name: '品牌', image: require('../../../images/home/assess/pinpai.png')},
    {key: 2, name: '通货', image: require('../../../images/home/assess/tonghuo.png')},
]


const num1 = 3;
const num2 = 3;
export default class OldClothesAssess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeId: 0,
            type: 0,
            grade: 0,
            count: '',
            brand: '',
            condition: '',
            unitPrice: '',
            shipping: 1,
        };
        this.items = [
            { key: 10, name: '全新' },
            { key: 9, name: '9成新' },
            { key: 8, name: '8成新' },
            { key: 7, name: '7成新及以下' },
        ];
        this.priceItemsGrade1 = [
            { key: 500, name: '500左右' },
            { key: 700, name: '700左右' },
            { key: 900, name: '900左右' },
            { key: 1000, name: '1000左右' },
            { key: 1200, name: '1200左右及以上' },
        ];
        this.priceItemsGrade2 = [
            { key: 30, name: '30左右' },
            { key: 60, name: '60左右' },
            { key: 100, name: '100左右' },
            { key: 300, name: '300左右' },
            { key: 500, name: '500左右' },
            { key: 700, name: '700左右' },
        ];
    }

    onChangeNum = (value) => {
        this.setState({count: value})
    }
    onChangePaizi = (value) => {
        this.setState({brand: value})
    }
    onChangeChengse = (value) => {
        this.setState({condition: value})
    }
    onChangeJiage = (value) => {
        this.setState({unitPrice: value})
    }
    onChangePeisong = (value) => {
        this.setState({shipping: value})
    }

    pingu = () => {
        const { type, grade, count, brand, condition, unitPrice, shipping } = this.state;
        if (type == 0) {
            Toast.tip('请选择服装类型');
            return ;
        }
        if (grade == 0) {
            Toast.tip('请选择品牌');
            return ;
        }
        if (count == 0 || count == '') {
            Toast.tip('请输入数量');
            return ;
        }
        if (condition == '') {
            Toast.tip('请选成色');
            return ;
        }
        if (unitPrice == 0) {
            Toast.tip('请选择价格');
            return ;
        }
        let chengse = '';
        let jiage = '';
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
            if (element.name == condition ) {
                chengse = element;
            }
        }
        // if (grade == 1) {
        //     for (let i = 0; i < this.priceItemsGrade1.length; i++) {
        //         const element = this.priceItemsGrade1[i];
        //         if (element.name == unitPrice ) {
        //             jiage = element;
        //             console.warn("jiage===", parseInt(jiage.name));
        //         }
        //     }
        // }
        // if (grade == 2) {
        //     for (let i = 0; i < this.priceItemsGrade2.length; i++) {
        //         const element = this.priceItemsGrade2[i];
        //         if (element.name == unitPrice ) {
            //             jiage = element;
            //         }
            //     }
            // }
        let data = {
            type: type,
            grade: grade,
            count: count,
            brand: brand,
            condition: chengse.key,
            unitPrice: parseInt(unitPrice),
            shipping: shipping,
        }
        AssessApi.assess(data)
        .then((data) => {
            Actions.push('AssessResults', {data: data})
        }).catch((err) => console.log('err', err))
    }

    render() {
        const { type, grade } = this.state;
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'旧衣评估'} rightText={'订单'} onRightPress={() => Actions.push('AssessOrderList')}/>
                <ScrollView style={{flex: 1}}> 
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        <Text style={{fontSize: 15, color: Colors.fontColor}}>筛选我的闲置</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 25}}>
                        {HeaderList1.map((item, index)=>{
                            return (
                                <TouchableOpacity key={index} style={styles.headerImgView1} onPress={() => this.setState({type: item.key})}>
                                    <View>
                                        <Image style={{width: 50, height: 50, borderRadius: 25}} source={item.image} />
                                        {type === item.key && <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.3)'}}>
                                            <Icon name={'checkmark'} size={20} color={Colors.main}/>
                                        </View>}
                                    </View>
                                    <Text style={{fontSize: 13, marginTop: 3}}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 25}}>
                        {HeaderList2.map((item, index)=>{
                            return (
                                <TouchableOpacity key={index} style={styles.headerImgView2} onPress={() => this.setState({grade: item.key})}>
                                    <View>
                                        <Image style={{width: 50, height: 50, borderRadius: 25}} source={item.image} />
                                        {grade === item.key && <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.3)'}}>
                                            <Icon name={'checkmark'} size={20} color={Colors.main}/>
                                        </View>}
                                    </View>
                                    <Text style={{fontSize: 13, marginTop: 3}}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={styles.inputView} >
                        <View style={styles.inputItem}>
                            <Text style={styles.inputTitle}>物品件数</Text>
                            <TextInput
                                textAlign={'right'}
                                placeholder={'请输入件数'}
                                value={this.state.count}
                                keyboardType='number-pad'
                                onChangeText={this.onChangeNum}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Text style={styles.inputTitle}>物品品牌</Text>
                            <TextInput
                                textAlign={'right'}
                                placeholder={'请输入品牌 (选填)'}
                                value={this.state.brand}
                                onChangeText={this.onChangePaizi}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Text style={styles.inputTitle}>物品成色</Text>
                            <Text style={{flex: 1, textAlign: 'right', color: this.state.condition == '' ? '#AAAAAA' : Colors.fontColor}} onPress={() => this.selectChengse.show()} >{this.state.condition == '' ? '请选择' : this.state.condition}</Text>
                        </View>
                        <View style={styles.inputItem}>
                            <Text style={styles.inputTitle}>购买价格</Text>
                            <Text 
                                style={{flex: 1, textAlign: 'right', color: this.state.unitPrice == '' ? '#AAAAAA' : Colors.fontColor}} 
                                onPress={() => {
                                    if (grade === 0) {
                                        Toast.tip('请先选择品牌')
                                    }else{
                                        this.selectJiage.show()
                                    }
                                }} 
                            >{this.state.unitPrice == '' ? '请选择' : this.state.unitPrice}</Text>
                        </View>
                        <View style={styles.inputItem}>
                            <Text style={styles.inputTitle}>送达方式</Text>
                            <TextInput
                                editable={false}
                                textAlign={'right'}
                                placeholder={'配送方式'}
                                value={this.state.shipping == 1 ? '个人寄送' : '包邮'}
                                onChangeText={this.onChangePeisong}
                            />
                        </View>
                    </View>
                    <View style={{height: 200, alignItems: 'center', backgroundColor: Colors.White,}}>
                        <TouchableOpacity style={styles.submitBtn} onPress={this.pingu}>
                            <Text style={{fontSize: 14, color: Colors.White}} >确认评估</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <SimpleItemsDialog 
                    items={this.items}
                    itemKey={'name'}
                    cance={false}
                    onPress={(value) => {
                        this.setState({condition: this.items[value].name})
                    }}
                    ref={ref => this.selectChengse = ref}/>
                <SimpleItemsDialog 
                    items={grade == 1 ? this.priceItemsGrade1 : this.priceItemsGrade2}
                    itemKey={'name'}
                    cance={false}
                    onPress={(value) => {
                        this.setState({unitPrice: grade == 1 ? this.priceItemsGrade1[value].name : this.priceItemsGrade2[value].name })
                    }}
                    ref={ref => this.selectJiage = ref}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerImgView1: {width: Metrics.screenWidth/num1, alignItems: 'center', justifyContent: 'center', marginBottom: 15},
    headerImgView2: {width: Metrics.screenWidth/num2, alignItems: 'center', justifyContent: 'center', marginBottom: 15},
    inputView: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 15,
        backgroundColor: Colors.White,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    inputItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.backgroundColor
    },
    inputTitle: {
        flex: 1,
        fontSize: 14,
        color: Colors.fontColor
    },
    submitBtn: {
        height: 45,
        width: 150,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
        backgroundColor: Colors.main
    },
})
