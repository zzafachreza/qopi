import { ActivityIndicator, ScrollView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyInput } from '../../components'
import axios from 'axios';
import { apiURL, colors, fonts, myDimensi, storeData, urlToken } from '../../utils';
import { Icon } from 'react-native-elements';

export default function ({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTransaction();
    }, [])
    const getTransaction = () => {
        setLoading(true)
        axios.post(apiURL + 'v1_voucher.php', {
            api_token: urlToken,
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
    }

    const getTransactionKey = (x) => {
        setLoading(true)
        axios.post(apiURL + 'v1_voucher.php', {
            api_token: urlToken,
            key: x
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
    }
    return (
        <View style={{
            flex: 1,
        }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    !loading &&
                    data.map((i, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                console.log()
                                storeData('voucher', {
                                    diskon_persen: i.diskon,
                                    diskon: i.diskon / 100
                                });
                                navigation.goBack();

                            }} style={{
                                marginHorizontal: 10,
                                marginVertical: 5,
                                borderWidth: 1,
                                borderColor: colors.border_form,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 0.4,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: colors.border_form,
                                }}>
                                    <Image source={require('../../assets/logo.png')} style={{
                                        width: myDimensi / 0.1,
                                        height: myDimensi / 0.8,
                                        resizeMode: 'contain',
                                    }} />
                                </View>
                                <View style={{
                                    flex: 1,

                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: myDimensi / 1.7,
                                        color: colors.black,
                                    }}>{i.nama_voucher}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: myDimensi / 1.5,
                                        color: colors.secondary,
                                    }}>{i.diskon}%</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: myDimensi / 2.5,
                                        color: colors.border,
                                    }}>Berakhir pada {i.tanggal_berakhir} pukul {i.jam_berakhir}</Text>
                                </View>

                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} />
                                </View>
                            </TouchableOpacity>
                        )
                    })

                }

                {loading && <ActivityIndicator color={colors.primary} size="large" />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})