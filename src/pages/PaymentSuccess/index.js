import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StatusBar } from 'react-native'
import React, { userState, useEffect, useState, useRef } from 'react'
import { fonts, myDimensi, windowHeight } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { Icon } from 'react-native-elements'
import { MyButton, MyGap, MyInput } from '../../components'
import axios from 'axios'
import OTPTextInput from 'react-native-otp-textinput';
import { Modalize } from 'react-native-modalize';

export default function PaymentSuccess({ navigation }) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',

            padding: 20,
        }}>
            <Image source={require('../../assets/payment_icon.png')} style={{
                resizeMode: 'contain',
                height: myDimensi / 0.15,
                alignSelf: 'center'
            }} />
            <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 1.5,
                color: colors.black_font,
                textAlign: 'center'
            }}>Silakan cek pesanan Anda di Menu Transaksi.</Text>
            <Text style={{
                marginTop: 10,
                marginBottom: 30,
                fontFamily: fonts.primary.normal,
                fontSize: myDimensi / 2,
                color: colors.black_font,
                textAlign: 'center'
            }}>Terimakasih telah bergabung dengan kami. Silahkan menikmati semua fitur yang kami sediakan.</Text>

            <MyButton onPress={() => navigation.navigate('History')} warna={colors.primary} title="Saya Mengerti" />
        </View>
    )
}

const styles = StyleSheet.create({})