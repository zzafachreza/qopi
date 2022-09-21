import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyInput } from '../../components'
import axios from 'axios';
import { apiURL, colors, fonts, myDimensi, urlToken } from '../../utils';
import { Icon } from 'react-native-elements';

export default function ({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTransaction();
    }, [])
    const getTransaction = () => {
        setLoading(true)
        axios.post(apiURL + 'v1_outlet.php', {
            api_token: urlToken,
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
    }

    const getTransactionKey = (x) => {
        setLoading(true)
        axios.post(apiURL + 'v1_outlet.php', {
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
            <View style={{
                padding: 10,
            }}>
                <MyInput onSubmitEditing={
                    (x) => {
                        console.warn(x.nativeEvent.text);
                        getTransactionKey(x.nativeEvent.text);
                    }
                } nolabel placeholder="Cari lokasi" iconname='search' />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    !loading &&
                    data.map((i, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('OutletDetail', i)
                            }} style={{
                                marginHorizontal: 10,
                                marginVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border_form,
                                padding: 10,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: myDimensi / 2,
                                        color: colors.black,
                                    }}>{i.nama_outlet}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: myDimensi / 2.5,
                                        color: colors.border_label,
                                    }}>{i.alamat_outlet}</Text>
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