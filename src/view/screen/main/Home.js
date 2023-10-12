import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, BackHandler, ToastAndroid, Platform, Modal, StatusBar, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions, Router } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux';
import { upgrade } from 'rn-app-upgrade';
import Cookie from 'cross-cookie';
import { init, Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";
import { UPDATE_NOTICE_INFO, UPDATE_USER, UPDATE_NOTICE_STATUS, UPDATE_USER_LOCATION } from '../../../redux/ActionTypes';
import { Version } from '../../../config/Index';
import { Header, ReadMore } from '../../components/Index';
import { Colors, Metrics } from '../../theme/Index';
import MathFloat from '../../../utils/MathFloat';
import { HOME_OPTIONS, PROFILE_BAR } from '../../../config/Constants';
import { Send } from '../../../utils/Http';
import { Toast } from '../../common';
import { onPressSwiper } from '../../../utils/CommonFunction';
import GoodsListItem from './exchange/GoodsListItem';
import { HomeApi, ShopApi, SystemApi } from '../../../api';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			progress: 0,
			msgData: [],
			bannerList: [],
			profileProgressList: [],
			doTaskUrl: '',
			doTaskImage: '/Banner/e55187aa-69ce-411a-afe8-d50752f2b453.png',
			city: '加载中...',
			noticeModalVisible: true,
			propagandaList: [],
			YokaAndChongzhiList: [],
			goodsList: [],
			pageIndex: 1,
			pageSize: 20,
		};
	}


	componentWillUnmount() {
		if (Platform.OS == "android") {
			BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}

	onBackAndroid = () => {
		if (Actions.currentScene != "Index") {
			Actions.pop();
			return true;
		} else {
			let time = new Date();
			this.lastBackPressed = this.thisBackPressed;
			this.thisBackPressed = time.getTime();
			if (this.lastBackPressed && this.lastBackPressed + 2000 >= this.thisBackPressed) {
				BackHandler.exitApp();
				return false;
			}
			ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
			return true;
		}
	};

	async componentDidMount() {
		if (Platform.OS === "android") {
			await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
			await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
		}
		
		if (Platform.OS == "android") {
			BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
		}
		this.fetchBanner(0);
		this.getGoodsList(1);
		// this.reloadMessage();
		// this.initData();

		// Geolocation.getCurrentPosition(
		// 	position => {
		// 		let latitude = position.location.latitude.toFixed(6);
		// 		let longitude = position.location.longitude.toFixed(6);
		// 		let lUrl = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${longitude},${latitude}&key=a4012f914b81a86e10f859e75f5e59aa&radius=1000&extensions=base`;
		// 		// 逆向地理位置信息获取
		// 		fetch(lUrl)
		// 			.then(renderReverseText => {
		// 				return renderReverseText.json();
		// 			})
		// 			.then(renderReverse => {
		// 				if (renderReverse && renderReverse['status'] == 1) {
		// 					let addressComponent = renderReverse['regeocode']['addressComponent'];
		// 					let province = addressComponent['province'];
		// 					let city = addressComponent['city'];
		// 					let district = addressComponent['district']
		// 					let cityCode = addressComponent['citycode'];
		// 					let adCode = addressComponent['adcode'];
		// 					let nextLocation = { latitude, longitude, province, city, cityCode, district, adCode };
		// 					this.props.updateUserLocatin(nextLocation);
		// 					this.setState({ city: nextLocation.city + nextLocation.district });
		// 				}
		// 			})
		// 			.catch(error => console.log(error));
		// 	},
		// 	error => {
		// 		console.log('error', error)
		// 	}
		// );
	}
	/**
	 * 获取哟过户数据
	 */
	initData = () => {
		var that = this;
		Send("api/system/InitInfo", {}, 'GET').then(res => {
			if (res.code == 200) {
				that.props.updateUserInfo(res.data)
			} else {
				Toast.tipBottom(res.message);
			}
		});
	}
	/**
	 * 获取系统Banner列表
	 * @param {*} source 
	 */
	fetchBanner = (source) => {
		SystemApi.getBanner(source)
		.then((data) => {
			this.setState({ bannerList: data });
		}).catch((err) => console.log('err', err))
	}
	fetchTodayTask(source) {
		var that = this;
		Send("api/system/TodayTask?source=" + source, {}, 'GET').then(res => {
			if (res.code == 200) {
				that.setState({ doTaskImage: res.data.imageUrl, doTaskUrl: res.data });
			} else {
				Toast.tipBottom(res.message);
			}
		})
	}

	getGoodsList = () => {
		ShopApi.getHomeShops({pageIndex: this.state.pageIndex, pageSize: this.state.pageSize})
		.then((data) => {
			this.setState({goodsList: data});
			this.setState({
                goodsList: this.state.pageIndex === 1 ? data : this.state.data.concat(data),
                refreshState: data.length < this.state.pageSize ? RefreshState.EmptyData : RefreshState.Idle
            })
		}).catch((err) => {
            this.setState({ goodsList: [], refreshState: RefreshState.EmptyData })
        })
	}
    
    onHeaderRefresh = () => {
        this.setState({ RefreshState: RefreshState.HeaderRefreshing, pageIndex: 1 }, () => {
            this.getGoodsList();
        });
    }

    onFooterRefresh = () => {	
        this.setState({ refreshState: RefreshState.FooterRefreshing, pageIndex: this.state.pageIndex + 1 }, () => {
            this.getGoodsList();
        });
	}
	
	/**
	 * 加载系统消息
	 */
	reloadMessage() {
		let that = this;
		let params = {
			pageIndex: 1,
			type: 0,
		};
		Send("api/system/notices", params).then(res => {
			if (res.code == 200) {
				that.setState({
					msgData: res.data,
				})
			} else {
				that.setState({
					msgData: [],
				})
			}
		});
	}
	/**
	 * Options跳转事件
	 * @param {*} route 
	 */
	onOptionPress(route) {
		if (!this.props.logged) {
			Actions.push("Login");
			return;
		}
		if (route == 'NULL') {
			Toast.tip('暂未开放');
			return;
		} else {
			Actions.push(route);
		}
	}

	/**
	 * 显示系统消息
	 */
	renderBroadcast() {
		return (
			<TouchableOpacity style={[Styles.bordercast, {marginHorizontal: 10}]} onPress={() => Actions.Message({ idx: 0 })}>
				<Text style={{color: Colors.main}}>新闻</Text>
				<Icon name="ios-volume-medium" color={Colors.main} size={20} />
				<Swiper
					style={{ marginLeft: 10 }}
					key={this.state.msgData.length}
					height={20}
					loop={true}
					removeClippedSubviews={false}
					horizontal={true}
					autoplay={true}
					autoplayTimeout={20}
					showsPagination={false}
					showsButtons={false}
				>
					{this.state.msgData.map((item, key) =>
						<Text key={key} style={{ fontSize: 14, lineHeight: 21, color: Colors.grayFont }}>{item.title}</Text>
					)}
				</Swiper>
			</TouchableOpacity>
		)
	}

	/**
	 * 渲染轮播图
	 */
	renderSwiper() {
		return (
			<View style={Styles.wiper}>
				<Swiper
					key={this.state.bannerList.length}
					horizontal={true}
					loop={true}
					autoplay={true}
					autoplayTimeout={16}
					removeClippedSubviews={false}
					paginationStyle={{ bottom: 10 }}
					showsButtons={false}
					activeDotStyle={{ width: 15, height: 3, backgroundColor: Colors.White, borderRadius: 1 }}
					dotStyle={{ width: 15, height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 1 }}
				>
					{ this.state.bannerList.map((item, index)=>
						<TouchableOpacity key={index} onPress={() => onPressSwiper(item, this.props.mobile, this.props.userId)}>
							<Image style={Styles.banner} source={{ uri: item['imageUrl'] }} />
						</TouchableOpacity>
					)}
				</Swiper>
			</View >
		)
	}
	/**
	 * 渲染功能组件区
	 */
	renderOptions() {
		return (
			<View style={Styles.options}>
				{HOME_OPTIONS.map(item => {
					let { key, name, route, icon, image } = item;
					return (
						<TouchableOpacity key={key} style={Styles.optionTouch} onPress={() => this.onOptionPress(route)}>
							<Image source={image} style={{ width: 35, height: 35 }} />
							<Text style={Styles.optionTitle}>{name}</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		)
	}
	/**
	 * 获取系统公告
	 */
	fetchMessage() {
		let that = this;
		Send("api/system/OneNotice", {}, 'get').then(res => {
			if (res.code == 200) {
				that.props.updateNoticeInfo(res.data);
			}
		});
	}
	/**
	 * 渲染系统公告Modal
	 */
	renderNoticeModal() {
		return (
			<Modal animationType='slide' transparent visible={!this.props.isReaded && this.state.noticeModalVisible} onRequestClose={() => { }}>
				<View style={{ flex: 1, backgroundColor: "black", opacity: 0.3 }} />
				<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ width: 280, height: 350, borderRadius: 10, backgroundColor: '#FFFFFF' }}>
						<View style={{ marginTop: -35, width: 70, height: 70, borderRadius: 35, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
							<Image source={require('../../images/logo118.png')} style={{ width: 60, height: 60, borderRadius: 30 }} />
						</View>
						<ScrollView contentContainerStyle={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}>
							<Text style={{ textAlign: 'center', fontSize: 16, color: Colors.C6, fontWeight: 'bold' }}>{this.props.title}</Text>
							<Text style={{ fontSize: 16, marginTop: 6, }}>{this.props.content}</Text>
						</ScrollView>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
							<TouchableOpacity onPress={() => this.setState({ noticeModalVisible: false })}>
								<View style={{ marginTop: 6, height: 30, width: 100, marginRight: 5, borderRadius: 10, backgroundColor: Colors.C6, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ fontSize: 14, color: Colors.C8 }}>关闭</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)
	}

	renderShop() {
		return (
			<View style={{paddingHorizontal: 10, marginTop: 10}}>
				<View style={Styles.bordercast1} onPress={() => this.descShop()}>
					<Image source={require('../../images/home/duihuanbiaoti.png')} />
				</View>
			</View>
			
		)
	}

	render() {
		return (
			<View style={Styles.container}>
				<StatusBar translucent={false} backgroundColor={Colors.transparent1} barStyle={'dark-content'} />
				<RefreshListView
					// onScroll={({nativeEvent}) => {
					// 	if (nativeEvent.contentOffset && nativeEvent.contentOffset.y > 160) {
					// 		StatusBar.setBarStyle('dark-content' ,false);
					// 		// StatusBar.setTranslucent(false);
					// 	}else {
					// 		StatusBar.setBackgroundColor(Colors.transparent ,false)
					// 		StatusBar.setBarStyle('dark-content' ,false)
					// 		StatusBar.setTranslucent(true);
					// 	}
					// }}
					ListHeaderComponent={()=>  
						<View style={{ flex: 1 }}>
							{this.renderSwiper()}
							{this.renderOptions()}
							{this.renderShop()}
						</View>
					}
					
					data={this.state.goodsList}
					keyExtractor={(item, index) => index + '1'}
					renderItem={({item, index}) => <GoodsListItem data={item} index={index} />}
					numColumns={2}
					refreshState={this.state.refreshState}
					onHeaderRefresh={this.onHeaderRefresh}
					onFooterRefresh={this.onFooterRefresh}
					// 可选
					footerRefreshingText='正在玩命加载中...'
					footerFailureText='我擦嘞，居然失败了...'
					footerNoMoreDataText='我是有底线的...'
					footerEmptyDataText='我是有底线的...'
				/>
				{/* {this.renderNoticeModal()} */}
			</View>
		);
	}
}
const mapStateToProps = state => ({
	logged: state.user.logged,
	userId: state.user.id,
	mobile: state.user.mobile,
	level: state.user.level,
	candyH: state.user.candyH || 0,
	candyP: state.user.candyP,
	candyNum: state.user.candyNum,
	location: state.user.location,
	warnVersion: state.router.warnVersion,
	isReaded: state.notice.isReaded,
	id: state.notice.id,
	uuid: state.user.uuid,
	isDoTask: state.user.isDoTask,
	dayNum: state.user.dayNum,
	title: state.notice.title,
	content: state.notice.content,
	userBalanceNormal: state.user.userBalanceNormal,
	userBalanceLock: state.user.userBalanceLock
});

const mapDispatchToProps = dispatch => ({
	updateNoticeInfo: ({ id, title, content }) => dispatch({ type: UPDATE_NOTICE_INFO, payload: { id, title, content } }),
	updateNoticeStatus: () => dispatch({ type: UPDATE_NOTICE_STATUS }),
	updateUserLocatin: (location) => dispatch({ type: UPDATE_USER_LOCATION, payload: { location } }),
	updateUserInfo: (userInfo) => dispatch({ type: UPDATE_USER, payload: { userInfo } })

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.backgroundColor },
	wiper: { height: 160, overflow: "hidden" },
	banner: { height: 160, width: '100%' },
	bordercast: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		overflow: "hidden"
	},
	bordercast1: {
		flex: 1,
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: 'center',
	},
	options: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		marginHorizontal: 10,
		paddingBottom: 10,
		flexWrap: 'wrap',
	},
	optionTouch: {
		justifyContent: 'center',
		alignItems: 'center', 
		width: (Metrics.screenWidth - 20)/4,
		marginTop: 10
	},
	optionTitle: { marginTop: 4, fontSize: 14 },
	task: {
		marginHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	taskGif: {
		width: 210,
		height: 74,
		borderRadius: 5
	},
	yieldText: { fontSize: 12, color: Colors.grayFont, marginTop: 5 },
	profileText: {
		fontSize: 14,
		color: Colors.main,
		includeFontPadding: false,
		textAlignVertical: 'center',
		maxWidth: 100
	},
	profileTitle: {
		marginTop: 2,
		fontSize: 12,
		color: Colors.fontColor,
	},
	itemView: {
		width: (Metrics.screenWidth - 25) / 2,
		borderRadius: 2,
		marginBottom: 5,
		backgroundColor: Colors.White,
	},


	yield: { marginRight: 40, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
	yieldInfo: { padding: 6, borderRadius: 6 },
	cdtPrompt: {
		height: 25,
		width: 40,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: Colors.C6,
		justifyContent: "center",
		marginLeft: 5,
		marginTop: 5,
		zIndex: 2,
	},
	yieldInfoText: { fontSize: 14, color: '#6b5a2e' },
	profile: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 5,
		marginTop: 10
	},
	profileItem: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
});
