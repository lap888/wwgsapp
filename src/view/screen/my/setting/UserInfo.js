import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import { Icon } from 'native-base';
import { LOGOUT, UPDATE_USER_AVATAR } from '../../../../redux/ActionTypes';
import ImagePicker from 'react-native-image-picker';
import { Header } from '../../../components/Index';
import { API_PATH } from '../../../../config/Index';
import Cookie from 'cross-cookie';
import { Colors, Metrics } from '../../../theme/Index';
import { Send } from '../../../../utils/Http';
import Advert from '../../advert/Advert';
import Icon from 'react-native-vector-icons/Ionicons';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.state.params.name || ''
        };
    }
    /**
     * 调用摄像头或手机相册
     */
    pickImage = () => {
        const options = {
            title: '上传图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: Platform.OS === 'ios' ? '拍照' : null,
            chooseFromLibraryButtonTitle: '图库',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 600,
            maxHeight: 600,
            aspectX: 2,
            aspectY: 1,
            quality: 1,
            angle: 0,
            allowsEditing: false,
            noData: false,
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('用户取消了选择图片');
            } else if (response.error) {
                console.log('ImagePicker 错误: ', response.error);
            } else {
                let picBase = 'data:image/jpeg;base64,' + response.data;
                Send('api/User/ModifyUserPic', { userPic: picBase }).then(res => {
                    if (res.code == 200) {
                        this.props.updateUserAvatar(res.data);
                    }
                })
            }
        });
    }

    render() {
        let { mobile, name, avatarUrl, inviterMobile, reContactTel, reWeChatNo, myContactTel, myWeChatNo } = this.props;
        return (
            <View style={styles.container}>
                <Header title='账号管理' />
                <ScrollView>
                    <View style={styles.labelContainer}>
                        <Text style={styles.lableTxt}>用户头像</Text>
                        <TouchableOpacity onPress={() => this.pickImage()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Image source={{ uri: avatarUrl }} style={{ width: 46, height: 46, borderRadius: 23 }} />
                                <Icon name="chevron-forward" style={{ color: Colors.main, fontSize: 20, marginLeft: 10 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.lableTxt}>昵称</Text>
                        <TouchableOpacity onPress={() => Actions.EditUserInfo()}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                                <Text style={[styles.lableTxt, styles.nickname]} numberOfLines={1}>{name}</Text>
                                <Icon name="chevron-forward" style={{ color: Colors.main, fontSize: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.lableTxt}>账号</Text>
                        <Text style={[styles.lableTxt, { color: Colors.C10 }]}>{mobile}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.lableTxt}>邀请人</Text>
                        <TouchableOpacity style={styles.btnRight}>
                            <Text style={[styles.lableTxt, { color: Colors.C10 }]}>{inviterMobile}</Text>
                            {/* <Icon name="chevron-forward" style={{ color: Colors.main, fontSize: 20, marginLeft: 10 }} /> */}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    logged: state.user.logged,
    userId: state.user.id,
    mobile: state.user.mobile,
    name: state.user.name,
    avatarUrl: state.user.avatarUrl,
    inviterMobile: state.user.inviterMobile,
    reWeChatNo: state.user.reWeChatNo,
    reContactTel: state.user.reContactTel,
    myWeChatNo: state.user.myWeChatNo,
    myContactTel: state.user.myContactTel,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: LOGOUT }),
    updateUserAvatar: avatar => dispatch({ type: UPDATE_USER_AVATAR, payload: { avatar } })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    button: { margin: 100, backgroundColor: 'orange' },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52,
        marginLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.C7
    },
    labelContainerflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.C7
    },
    lableTxt: { fontSize: 16, color: Colors.C11 },
    nickname: { textAlign: "right", paddingRight: 10, color: Colors.C10 },
    signOutView: { justifyContent: 'center', alignItems: "center", marginBottom: 40 },
    signOutBtn: { marginTop: 50, width: Metrics.screenWidth * 0.6, backgroundColor: Colors.main, alignItems: "center", borderRadius: 8 },
    btnRight: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center" },
})