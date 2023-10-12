import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { AppState, Linking } from 'react-native';
class Loading extends Component {

    constructor(props) {
        super(props)
        this.state = {
            appState: AppState.currentState,
        }
    }

    componentDidMount() {
        Linking.getInitialURL()
            .then((url) => {
                if (url) {
                    SplashScreen.hide(); 
                    Actions.replace('EmpowerScreen');
                }else{
                    this.timer = setTimeout(() => {
                        SplashScreen.hide(); 
                        Actions.replace('Index');
                    }, 2000);
                }
            }).catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <>
            </>
        );
    }
}
const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Loading);

