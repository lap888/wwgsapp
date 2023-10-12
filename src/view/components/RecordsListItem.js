import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MathFloat } from '../../utils/Index';
import { Colors } from '../theme/Index';

export default class RecordsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        const { incurred, postChange, modifyDesc, modifyTime } = this.props.data;
        return (
            <View style={styles.diamondCard}>
                <View style={[styles.labelView]}>
                    <Text style={styles.labelTxt}>{modifyDesc}</Text>
                    <Text style={styles.diamondTime}>{modifyTime}</Text>
                </View>
                <View style={[styles.diamondNumView]}>
                    <Text style={incurred > 0 ? styles.diamondNumTxt : styles.diamondNumTxt2}>{`${incurred > 0 ? '+' : ''}${MathFloat.floor(incurred, 2)}`}</Text>
                    <Text style={{fontSize: 12, color: Colors.grayFont1, marginRight: 10}}>余额：{`${MathFloat.floor(postChange, 2)}`}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    diamondCard: {
        height: 65,
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Colors.backgroundColor,
        marginHorizontal: 10,
        backgroundColor: Colors.White,
        borderRadius: 5,
    },
    labelView: {
        flex: 1,
        marginLeft: 12,
    },
    labelTxt: {
        fontSize: 14,
        color: Colors.C0,
    },
    diamondTime: {
        marginTop: 8,
        fontSize: 12,
        color: Colors.greyText
    },
    diamondNumView: {
        alignItems: "flex-end"
    },
    diamondNumTxt: {
        fontSize: 15,
        color: Colors.main,
        flexWrap: "wrap",
        marginRight: 10,
    },
    diamondNumTxt2: {
        fontSize: 15,
        color: Colors.main,
        flexWrap: "wrap",
        marginRight: 10
    },  
})
