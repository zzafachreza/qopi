import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    Image,
    Linking,
    ActivityIndicator,
    Alert,
    Keyboard,
    TextInput,
} from 'react-native';

import { apiURL, getData, storeData, urlAPI, urlToken } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { showMessage } from 'react-native-flash-message';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from 'react-native-elements/dist/helpers';

export default function TransactionDetail({ navigation, route }) {
    const isFocused = useIsFocused();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (isFocused) {
            __getTransaction(route.params.inv);
            __getTransactionDetail(route.params.inv);
        }
    }, [isFocused]);


    const __getTransaction = (inv) => {
        axios.post(apiURL + 'v1_history_detail.php', {
            inv: inv,
            api_token: urlToken
        }).then(res => {
            console.log(res.data);
            setHeader(res.data)
        })
    }

    const __getTransactionDetail = (inv) => {
        axios.post(apiURL + 'v1_history_detail_produk.php', {
            inv: inv,
            api_token: urlToken
        }).then(res => {
            console.log(res.data);
            setDatail(res.data)
        })
    }



    const [detail, setDatail] = useState([]);
    const [header, setHeader] = useState([]);



    const __renderItem = ({ item, index }) => {

        let jumlah = item.qty;
        return (

            <View style={{
                flexDirection: 'row',
                marginVertical: 5,
            }}>

                <View style={{ flex: 1 }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: myDimensi / 2,
                            }}>
                            {item.nama_barang}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: myDimensi / 2.5,
                                color: colors.border_label
                            }}>
                            {item.ukuran}, {item.suhu} {item.data_topping == '' ? '' : ', ' + item.data_topping} {item.catatan !== '' ? ', ' + item.catatan : ''}
                        </Text>
                    </View>

                </View>
                <View style={{ marginRight: 10, justifyContent: 'center' }}>
                    <Text
                        style={{

                            fontFamily: fonts.primary[600],
                            color: colors.black,
                            fontSize: myDimensi / 2,
                        }}>
                        Rp. {new Intl.NumberFormat().format(item.total)}
                    </Text>
                </View>
            </View>


        );
    };
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.border_form,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border_form,
                        paddingBottom: 10,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: myDimensi / 2,

                            }}>Transaksi</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: myDimensi / 2.2,
                                color: colors.border_label
                            }}>{header.inv}</Text>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>Status Transaksi</Text>
                        <View>
                            <Text style={{
                                backgroundColor: colors.primary,
                                padding: 5,
                                borderRadius: 5,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                                fontSize: myDimensi / 2.5
                            }}>{header.status}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>Tanggal Transaksi</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>{header.tanggal_jam}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>Nama Outlet</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>{header.nama_outlet}</Text>
                    </View>

                    <View style={{

                        marginVertical: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>Alamat Outlet</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>{header.alamat_outlet}</Text>
                    </View>

                </View>

                {/* detail produk */}

                <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    marginVertical: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border_form,
                        paddingBottom: 10,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: myDimensi / 2,

                            }}>Detail Produk</Text>
                        </View>

                    </View>
                    {/* detail produk */}


                    <FlatList data={detail} renderItem={__renderItem} />
                </View>

                {/* Rincian Pembayaran */}

                <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    marginVertical: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border_form,
                        paddingBottom: 10,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: myDimensi / 2,

                            }}>Rincian Pembayaran</Text>
                        </View>

                    </View>
                    {/* detail produk */}

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>Metode Pembayaran</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>{header.pembayaran}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: myDimensi / 2.2
                        }}>Total Pembayaran</Text>
                        <Text
                            style={{

                                fontFamily: fonts.primary[600],
                                color: colors.black,
                                fontSize: myDimensi / 2,
                            }}>
                            Rp. {new Intl.NumberFormat().format(header.total_bayar)}
                        </Text>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})