import React, { Component } from 'react';
import { StyleSheet, Platform, StatusBar, Image, View, Text, AppState, Linking, DeviceEventEmitter} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import { isIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import Colors from '../theme/Colors';
import { Send } from '../../utils/Http';
import { UPDATE_USER } from '../../redux/ActionTypes';
import { Toast } from '../common';
import MineScreen from './mine/MineScreen';
import ClassfiyScreen from './shop/ClassfiyScreen';
import Home from './main/Home';
import SameCityScreen from './sameCity/SameCityScreen';
import InfoScreen from './info/InfoScreen';
import MyScreen from './my/MyScreen';
import FarmScreen from './farm/FarmScreen';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';

const TabBarComponent = props => <BottomTabBar {...props} />;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home",
            badgeValue: "···",
            appState: AppState.currentState,
        };
    }

    componentDidMount() {
        this.updateUserInfo(-1);
        AppState.addEventListener("change", this._handleAppStateChange);
    }
    
    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        if ( this.state.appState.match(/inactive|background/) && nextAppState === "active" ) {
            Linking.getInitialURL()
            .then((url) => {
                if (url) {
                    Actions.push('EmpowerScreen');
                }
            }).catch(err => console.error('An error occurred', err));
        }
        this.setState({ appState: nextAppState });
    };

    /**
	 * 刷新用户信息
	 */
    updateUserInfo = (key) => {
        if (key !== -1) {
            if (["home", "city", "my"].indexOf(key) === -1) return;
        }
        if (!this.props.logged) return;
        Send("api/system/InitInfo", {}, 'GET').then(res => {
            if (res.code == 200) {
                this.props.updateUserInfo(res.data)
            } else {
                Toast.tipBottom(res.message)
            }
        });
    }
    /**
     * 切换Tab
     * @param {*} key 
     */
    switchTab(key) {
        // 修改状态栏样式
        if (key === 'farm') {
            Actions.push('FarmScreen');
            return ; 
        }
        if (key === 'city') {
            Toast.tip('暂未开放')
            return ; 
        }
        if (Platform.OS === 'android') this.changeStatusBar(key);
        this.updateUserInfo(key);
        this.setState({ selectedTab: key });
    }

    changeStatusBar(key) {
        if (key === 'home') {
            StatusBar.setTranslucent(false); 
            // StatusBar.setBackgroundColor(Colors.transparent1);
        }else{
            StatusBar.setTranslucent(false);
        }
    }

    /**
     * 渲染选项卡
     * @param {string} title 
     * @param {string} tabName 组件名字
     * @param {*} isBadge 
     */
    renderTabView(title, tabName, isBadge) {
        let unSelectIcon;
        let selectIcon;
        let tabPage;
        switch (tabName) {
            case 'home':
                unSelectIcon = require('../images/tab/zhuye0.png');
                selectIcon = require('../images/tab/zhuye1.png');
                tabPage = <Home />;
                break;
            case 'city':
                unSelectIcon = require('../images/tab/tongcheng0.png');
                selectIcon = require('../images/tab/tongcheng1.png');
                tabPage = <SameCityScreen />;
                break;
            case 'farm':
                unSelectIcon = require('../images/tab/nongchang0.png');
                selectIcon = require('../images/tab/nongchang1.png');
                tabPage = <FarmScreen />;
                break;
            case 'info':
                unSelectIcon = require('../images/tab/xiaoxi0.png');
                selectIcon = require('../images/tab/xiaoxi1.png');
                tabPage = <InfoScreen />;
                break;
            case 'my':
                    unSelectIcon = require('../images/tab/wode0.png');
                    selectIcon = require('../images/tab/wode1.png');
                    tabPage = <MyScreen />;
                    break;
        }

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tabName}
                title={title}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.tabTextSelected}
                renderIcon={() => <Image style={styles.imagestyle} source={unSelectIcon} />}
                renderSelectedIcon={() => <Image style={styles.imagestyle} source={selectIcon} />}
                onPress={() => this.switchTab(tabName)}
                renderBadge={() => isBadge ? <View style={styles.badgeView}><Text style={styles.badgeText}>{this.state.badgeValue}</Text></View> : null}
            >
                {tabPage}
            </TabNavigator.Item>
        );
    }
    //自定义tabBar simple seal for tabNavigatorItem
    renderTabBarView() {
        return (
            <TabNavigator
                tabBarStyle={styles.tab}>
                {this.renderTabView('首页', 'home', false)}
                {this.renderTabView('同城', 'city', false)}
                {this.renderTabView('农场', 'farm', false)}
                {this.renderTabView('消息', 'info', false)}
                {this.renderTabView('我的', 'my', false)}
            </TabNavigator>
        );
    }
    //自定义tabBar simple seal for tabNavigatorItem
    renderNavigatorTabBarView() {

        const TabScreens = createBottomTabNavigator(
            {
                Home: {
                    screen: Home,
                    navigationOptions: ({ navigation, screenProps }) => ({
                    // tabBarLabel: `${I18n.t('home.tab_home')}`,
                    // tabBarVisible: navigation.state.index === 0,
                    }),
                },
                SameCityScreen: {
                    screen: SameCityScreen,
                    navigationOptions: ({ navigation, screenProps }) => ({
                    // tabBarLabel: `${I18n.t('home.tab_home')}`,
                    // tabBarVisible: navigation.state.index === 0,
                    }),
                },
                FarmScreen: {
                    screen: FarmScreen,
                    navigationOptions: ({ navigation, screenProps }) => ({
                    // tabBarLabel: `${I18n.t('home.tab_home')}`,
                    // tabBarVisible: navigation.state.index === 0,
                    }),
                },
                InfoScreen: {
                    screen: InfoScreen,
                    navigationOptions: ({ navigation, screenProps }) => ({
                    // tabBarLabel: `${I18n.t('home.tab_home')}`,
                    // tabBarVisible: navigation.state.index === 0,
                    }),
                },
                MyScreen: {
                    screen: MyScreen,
                    navigationOptions: ({ navigation, screenProps }) => ({
                    // tabBarLabel: `${I18n.t('home.tab_home')}`,
                    // tabBarVisible: navigation.state.index === 0,
                    }),
                },
            },
            {
            tabBarComponent: props => (
                <TabBarComponent {...props} style={{ borderTopColor: '#fff' }} />
                ),
            }
        );

        return (
            <TabScreens/>
        );
    }

    render() {
        return (
            this.renderTabBarView()
            // this.renderNavigatorTabBarView()
        );
    }
}
const mapStateToProps = state => ({
    logged: state.user.logged
});

const mapDispatchToProps = dispatch => ({

    updateUserInfo: (userInfo) => dispatch({ type: UPDATE_USER, payload: { userInfo } })

});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
const styles = StyleSheet.create({
    imagestyle: {
        width: 22,
        height: 22
    },
    tabTextSelected: {
        color: Colors.main,
        fontSize: 12,
        paddingTop: 0,
        fontWeight: 'bold'
    },
    tabText: {
        color: Colors.C10,
        fontSize: 12,
        fontWeight: 'bold'
    },
    tab: {
        flex: 1,
        // borderTopWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50 + (isIphoneX() ? 15 : 0),
        paddingBottom: isIphoneX() ? 15 : 0,
    },
    badgeView: {
        width: 14,
        height: 14,
        backgroundColor: '#f85959',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 3,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 8,
    }
})

