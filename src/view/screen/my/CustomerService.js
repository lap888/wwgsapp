import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

import { OtherApi, SystemApi } from '../../../api';
import { Toast } from '../../common';
import { BigButton, Header } from '../../components/Index';
import { Colors } from '../../theme/Index';

export default class CustomerService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            img: ''
        };
    }

    // {
    //     "Title": "string",
    //     "Images": "string",
    //     "Content": "string",
    //     "State": 0,
    //     "CreateTime": "2020-12-03T08:37:50.169Z",
    //     "Remark": "string"
    //   }
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
                this.setState({img: picBase})
            }
        });
    }

    submit = () => {
        OtherApi.uploadImage({url: this.state.img})
        .then((data) => {
            let p = {
                title: '问题反馈',
                images: data.url,
                content: this.state.data,
            }
            return SystemApi.Feedback(p)
        })
        .then((data) => {
            Toast.tip('感谢您的反馈');
            Actions.pop();
        })
        .catch((err) => console.log('err', err))
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
                <Header title={'客服反馈'} />
                <View style={styles.iptView}>
                    <View style={{flex: 1}}>
                        <TextInput 
                            placeholder={'请输入您宝贵的意见或者遇到的问题，加上图片会更清晰'}
                            value={this.state.data}
                            multiline={true}
                            onChangeText={(value) => this.setState({data: value})}
                        /> 
                    </View>
                    {this.state.img === '' ? <TouchableOpacity style={styles.imgView} onPress={this.pickImage}>
                        <Text style={{color: Colors.White, fontSize: 40, textAlign: 'center'}}> + </Text>
                    </TouchableOpacity> : 
                    <View style={styles.imgView} onPress={this.pickImage}>
                        <Image style={styles.img} source={{uri: this.state.img}} />
                    </View> 
                    }
                </View>
                <BigButton style={styles.bigBtn} name={'提交'}  onPress={this.submit}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    iptView: {
        minHeight: 178,
        flexDirection: 'row',
        margin: 15,
        paddingHorizontal: 10,
        backgroundColor: Colors.White,
        borderRadius: 5
    },
    imgView: {
        width: 60,
        height: 60,
        borderRadius: 3,
        marginRight: 5,
        marginLeft: 20,
        marginTop: 15,
        backgroundColor: Colors.grayFont
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 3,
    },
    bigBtn: {
        marginTop: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 80
    },
})