import { ActivityIndicator, ScrollView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyInput } from '../../components'
import axios from 'axios';
import { apiURL, colors, fonts, getData, myDimensi, storeData, urlToken } from '../../utils';
import { Icon } from 'react-native-elements';

export default function ({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTransaction();
    }, [])
    const getTransaction = () => {
        setLoading(true)
        getData('user').then(u => {
            axios.post(apiURL + 'v1_voucher.php', {
                api_token: urlToken,
                member: 0,
                fid_user: u.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
                setLoading(false);
            })
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

                            <View style={{
                                margin: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                padding: 20,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1,
                                    padding: 10,
                                }}>
                                    <Image source={require('../../assets/logo.png')} style={{
                                        width: '100%',
                                        height: 80,

                                    }} />
                                </View>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: myDimensi / 1.2,
                                        color: colors.black,
                                    }}>Diskon {i.diskon}%</Text>
                                    {i.maksimal > 0 && <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: myDimensi / 2,
                                        color: colors.black,
                                    }}>s/d Rp. {new Intl.NumberFormat().format(i.maksimal)}</Text>}

                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: myDimensi / 2.5,
                                        color: colors.border,
                                    }}>Berakhir pada {i.tanggal_berakhir}</Text>
                                    <TouchableOpacity onPress={() => {
                                        console.log()
                                        storeData('voucher', {
                                            diskon_persen: i.diskon,
                                            diskon: i.diskon / 100
                                        });
                                        navigation.goBack();

                                    }} style={{
                                        paddingHorizontal: 10,
                                        backgroundColor: colors.primary,
                                        width: 80,
                                        borderRadius: 10,
                                        marginTop: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400],
                                            fontSize: myDimensi / 2,
                                            color: colors.white,
                                            textAlign: 'center'
                                        }}>Claim</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )
                    })

                }

                {loading && <ActivityIndicator color={colors.primary} size="large" />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})