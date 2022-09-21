import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyInput } from '../../components'
import axios from 'axios';
import { apiURL, colors, fonts, getData, myDimensi, storeData, urlToken, windowHeight } from '../../utils';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
export default function OutletDetail({ navigation, route }) {
    const i = route.params;


    console.log(i);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <View style={{
                height: windowHeight / 3.4,
            }}>
                {/* <WebView source={{ uri: i.link }} /> */}
                <WebView source={{ html: decodeURIComponent(i.embed.toString()).replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace("+", " ").replace('width="600"', 'width="100%"').replace('height="450"', 'height="100%"') }} />
            </View>
            <View style={{
                padding: 10,
                flex: 1,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: myDimensi / 1.5,
                    color: colors.black,
                }}>{i.nama_outlet}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: myDimensi / 2.5,
                    color: colors.border_label,
                }}>{i.alamat_outlet}</Text>
            </View>
            <View style={{
                padding: 10,
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        marginRight: 5
                    }}>
                        <MyButton title="Telepon" onPress={() => Linking.openURL('tel:' + i.telepon_outlet)} warna={colors.secondary} Icons='call-outline' />
                    </View>
                    <View style={{
                        flex: 1,
                        marginLeft: 5
                    }}>
                        <MyButton onPress={() => Linking.openURL(i.link)} title="Lokasi" warna={colors.primary} Icons='navigate-outline' />
                    </View>
                </View>
            </View>
            <View style={{
                padding: 10
            }}>
                <MyButton onPress={() => {
                    getData('user').then(u => {
                        u.fid_outlet = i.id,
                            u.nama_outlet = i.nama_outlet,
                            u.alamat_outlet = i.alamat_outlet,

                            console.log(u);
                        storeData('user', u);
                        navigation.replace('MainApp')
                    })
                }} title="PILIH LOKASI INI" warna={colors.black} Icons='checkmark-circle-outline' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})