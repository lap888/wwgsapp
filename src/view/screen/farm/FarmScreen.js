import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Animated, StyleSheet, Pressable } from 'react-native';
import { MinerApi } from '../../../api';
import { Toast } from '../../common';
import { Header } from '../../components/Index';
import { Colors, Metrics } from '../../theme/Index';
const MH = [
    { mt: 50, ml: 30 },
    { mt: 30, ml: 100 },
    { mt: 90, ml: 160 },
    { mt: 20, ml: 200 },
    { mt: 100, ml: 270 },
];

export default class FarmScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        };
        this.marginTop = new Animated.Value(0);
    }

    componentDidMount() {
        this.startAnimated()
    }

    startAnimated = () => {
        const animationSlider = Animated.sequence([
            Animated.timing(this.marginTop, {
                toValue: 5,
                duration: 1500,
                // isInteraction: true,
                useNativeDriver: false
            }),
            Animated.timing(this.marginTop, {
                toValue: 0,
                duration: 1500,
                // isInteraction: true,
                useNativeDriver: false
            })
        ]);
        
        Animated.loop(animationSlider, { useNativeDriver: true}).start();
    }

    doTask = () => {
        MinerApi.doWork()
        .then((data) => {
            Toast.tip('成功')
        }).catch((err) => console.log('err', err))
    }
    

    render() {
        const marginTop = this.marginTop.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        return (
            <ImageBackground style={{flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight }}  source={require('../../images/farm/nonchang.png')}>
                <Header title={''} backgroundColor={Colors.transparent1} style={{position: 'absolute', }} />
                <View style={{flex: 1}}>
                    {MH.map((item, index) => {
                        return (
                            <Animated.View key={index} style={[styles.item, { top: marginTop, marginTop: item.mt, marginLeft: item.ml }]} >
                                <Pressable onPress={this.doTask}>
                                    <Image style={{width: 50, height: 50 }} source={require('../../images/farm/qipao.png')} />
                                </Pressable>
                            </Animated.View>
                        )
                    })}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.transparent1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})