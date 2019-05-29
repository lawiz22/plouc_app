import React, { Component } from "react";
import { Header, Left, Icon as NativeIcon, Button, Body, Title, Right } from 'native-base';
import { View , Image} from "react-native";
import { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class DrawerHeader extends Component {
    render() {    
    return (
        <View>
            <Header transparent androidStatusBarColor={COLOR.DARK} style={{ backgroundColor: this.props.headerColor }}>
                <Left>
                    <Button transparent onPress={() => this.props.onPress()}>
                        <NativeIcon name={this.props.icon} />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.headerTitle}</Title>
                </Body>
                <Right>
                <Image
                        source={{ uri: `https://lespornstash.com${this.props.state.authSession.data.profile.image}` }}
                        style={{
                            marginTop: 5,
                            height: 40,
                            width: 40,
                            borderRadius: 60
                        }} />
                </Right>
            </Header>
        </View>
    )
}}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(DrawerHeader);