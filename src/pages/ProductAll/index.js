import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function ProductAll({ navigation }) {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getProduk();
    }, [])

    const getProduk = () => {
        setLoading(true)
        axios.post(apiURL + 'v1_produk.php', {
            api_token: urlToken,
        }).then(res => {
            console.log(res.data);
            setProduk(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', item)} style={{
                flex: 1,
                marginVertical: 10,
                position: 'relative'
            }}>
                {item.diskon > 0 &&

                    <View style={{
                        position: 'absolute',
                        right: 20,
                        backgroundColor: colors.secondary,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,

                    }}>
                        <Text
                            style={{
                                fontSize: myDimensi / 3,
                                color: colors.white,

                                fontFamily: fonts.primary[600],
                            }}>
                            {item.diskon}%
                        </Text>
                    </View>}
                <Image style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'contain'
                }} source={{
                    uri: item.image
                }} />
                <View>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: myDimensi / 2,
                        marginBottom: 5,
                        color: colors.black
                    }}>{item.nama_barang}</Text>

                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: myDimensi / 2.5,
                        marginBottom: 5,
                        color: colors.border_label
                    }}>{item.keterangan_barang}</Text>
                </View>


                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                    }}>

                        {item.diskon > 0 &&

                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: myDimensi / 3,
                                    color: colors.black,
                                    marginRight: 10,
                                    marginBottom: 5,
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                    fontFamily: fonts.primary.normal,
                                }}>
                                Rp. {new Intl.NumberFormat().format(item.harga_dasar)}
                            </Text>

                        }

                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 2,
                            marginBottom: 5,
                            color: colors.black
                        }}>Rp. {new Intl.NumberFormat().format(item.harga_barang)}</Text>
                    </View>
                    <View style={{
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon type='ionicon' name='arrow-forward-outline' color={colors.primary} size={myDimensi / 2} />
                    </View>
                </View>
            </TouchableOpacity >
        )
    }


    return (
        <SafeAreaView style={{
            padding: 10,
            flex: 1,
        }}>
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}
            {!loading && <FlatList showsVerticalScrollIndicator={false} data={produk} renderItem={__renderItem} numColumns={2} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})