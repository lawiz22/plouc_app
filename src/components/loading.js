import React from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import { ActivityIndicator as ActPaper, Colors } from 'react-native-paper';
import { COLOR } from "../config/styles";

import Proptypes from "prop-types";

const CustomLoading = props => {
    if (props.loading) {
        return (
            <View
                style={{
                    position: "absolute",
                    backgroundColor: "#000000aa",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            >
                <Modal
                    animationType="slide"
                    transparent
                    visible
                    onRequestClose={() => { }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                width: 128,
                                height: 128,
                                borderRadius: 16,
                                shadowColor: "#000000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                },
                                shadowRadius: 5,
                                shadowOpacity: 1.0,
                                elevation: 5
                            }}
                        >
                            
                            <ActPaper animating={true} color={props.color || COLOR.SONG} />
                            <Text style={{ marginTop: 8 }}>{props.text || "Authenticating..."}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    } else {
        return null;
    }
};

CustomLoading.propTypes = {
    text: Proptypes.string,
    loading: Proptypes.bool,
    color: Proptypes.string,
};

export default CustomLoading;
