import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Colors, Metrics } from '../../../theme/Index';

export default class GoodsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { data, index } = this.props;
        return (
            <TouchableOpacity key={index} activeOpacity={0.8} style={[styles.itemView, {marginLeft: index%2==1 ? 10 : 10}]} onPress={() => Actions.push('GoodsDetail', {data: data})}>
				<Image style={styles.img} resizeMode={'contain'} source={{uri: data.images[0]}}/>
				<View style={{paddingHorizontal: 10, paddingBottom: 5}}>
					<Text style={{marginTop: 5}} numberOfLines={2}>{data.name}</Text>
					<View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 5, marginBottom: 3}}>
						<Text style={{fontSize: 14, color: Colors.main}}>{data.pointsPrice}<Text style={{fontSize: 12}}> 积分</Text>  </Text>
						{/* <Text style={{fontSize: 12, color: Colors.grayFont, lineHeight: 18, textDecorationLine: 'line-through'}} >原价 {data.oldPrice}</Text> */}
					</View>
					<Text style={{fontSize: 12, color: Colors.grayFont}}>{'点击查看商品详情 >'}</Text>
				</View>
			</TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
	itemView: {
		width: (Metrics.screenWidth - 30) / 2,
		borderRadius: 2,
		marginBottom: 10,
		backgroundColor: Colors.White,
    },
    img: {
		width: (Metrics.screenWidth-30)/2,
		height: (Metrics.screenWidth-30)/2,
		borderTopRightRadius: 2,
		borderTopLeftRadius: 2,
		backgroundColor: Colors.White
	},
})
