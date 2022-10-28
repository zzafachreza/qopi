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
import RNDateTimePicker from '@react-native-community/datetimepicker';
export default function Cart({ navigation, route }) {

    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [pickup, setPickup] = useState({
        tanggal: new Date().toISOString().split('T')[0],
        jam: new Date().getHours() + ':' + new Date().getMinutes()
    });


    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [buka, setbuka] = useState(true);
    const [tipe, setTipe] = useState(false);
    const [jenis, setJenis] = useState('DI ANTAR KE BANK SAMPAH');
    const [alamat, setAlamat] = useState('');
    const [loading, setLoading] = useState(false);
    const [jumlah, setJumlah] = useState(1);
    const [itemz, setItem] = useState({});
    const [voucher, setVoucher] = useState({
        diskon: 0,
        diskon_persen: 0,
    });

    const Indonesia3Tgl = (x) => {
        var bulanIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        var dd = x.split("-");

        return dd[2] + ' ' + bulanIndo[dd[1]] + ' ' + dd[0];

    }

    const modalizeRef = useRef();
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);

    const updateCart = () => {
        console.log(itemz);

        axios.post(apiURL + '/cart_update.php', {
            id_cart: itemz.id,
            qty: itemz.qty,
            total: itemz.total
        }).then(x => {
            modalizeRef.current.close();
            getData('user').then(tkn => {
                __getDataBarang(tkn.id);
            });
            getData('cart').then(xx => {
                storeData('cart', xx - 1)
            });
        })

    }

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const isFocused = useIsFocused();
    //   useEffect(() => {

    //   }, []);
    const [member, setMember] = useState({});

    useEffect(() => {
        if (isFocused) {
            getData('user').then(rx => {
                setUser(rx);
                __getDataBarang(rx.id);
            });
            getData('member').then(m => {
                setMember(m);
                console.log('member', m)
            })
            getData('voucher').then(v => {
                setVoucher(v);
            })

        }

        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus("Keyboard Shown");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus("Keyboard Hidden");

        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, [isFocused]);
    const [total, setTotal] = useState(0);


    const __getDataBarang = (zz) => {
        axios.post(apiURL + '/v1_cart.php', {
            fid_user: zz
        }).then(x => {
            setData(x.data);
            console.log('data cart', x.data);
            let sub = 0;
            x.data.map((i, key) => {
                sub += parseFloat(i.total);

            });
            setTotal(sub);
        })

    }

    const hanldeHapus = (x) => {
        axios.post(apiURL + '/v1_cart_delete.php', {
            id_cart: x,
            api_token: urlToken
        }).then(xx => {

            console.log(xx.data);
            getData('user').then(tkn => {
                __getDataBarang(tkn.id);
                setLoading(false);
            });

        })
    };



    var total_bayar = (total - (total * member.diskon_member)) - ((total - (total * member.diskon_member)) * voucher.diskon);
    var diskon_voucher = (total - (total * member.diskon_member)) * voucher.diskon;
    var diskon_member = total * member.diskon_member;

    const __renderItem = ({ item, index }) => {

        let jumlah = item.qty;
        return (

            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{ padding: 10, }}>
                    <Image style={{
                        width: 60,
                        resizeMode: 'contain',
                        height: 50,
                    }} source={{
                        uri: item.image
                    }} />
                </View>
                <View style={{ padding: 10, flex: 1, borderBottomWidth: 1, borderBottomColor: colors.border_form }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: myDimensi / 2,
                            }}>
                            {item.nama_barang} x {item.qty}
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

                    <Text
                        style={{

                            fontFamily: fonts.primary[600],
                            color: colors.black,
                            fontSize: myDimensi / 2,
                        }}>
                        Rp. {new Intl.NumberFormat().format(item.total)}
                    </Text>
                </View>
                <View style={{ marginRight: 10, borderBottomWidth: 1, borderBottomColor: colors.border_form }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CartEdit', item)
                            console.warn(item)
                        }}
                        style={{
                            width: 25,
                            alignSelf: 'flex-end',
                            marginVertical: 5,


                        }}>
                        <Icon name="edit" color={colors.secondary_base} size={myDimensi / 1.4} solid />
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        paddingRight: 5,
                    }}>
                        <TouchableOpacity onPress={() => {

                            if (item.qty == 1) {
                                setLoading(true);
                                hanldeHapus(item.id);
                            } else {
                                setLoading(true);
                                console.warn('barang', item.id + item.qty)
                                axios.post(apiURL + 'v1_cart_update.php', {
                                    api_token: urlToken,
                                    id: item.id,
                                    qty: parseFloat(item.qty) - 1
                                }).then(res => {
                                    console.log(res.data);
                                    __getDataBarang(user.id);
                                    setLoading(false);
                                })
                            }

                        }} style={{
                            flex: 1,

                            backgroundColor: colors.primary,
                            // borderRadius: 5,
                            width: 25,
                            height: 25,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='minus' color={colors.white} />
                        </TouchableOpacity>
                        <View style={{
                            height: 25,
                            paddingHorizontal: 5,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderTopColor: colors.primary,
                            borderBottomColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TextInput onChangeText={x => {
                                let items = [...data];
                                let item = { ...items[index] };
                                item.qty = x;
                                items[index] = item;
                                console.log(items);
                                setData(items);

                                if (x > 0) {

                                    axios.post(apiURL + 'v1_cart_update.php', {
                                        api_token: urlToken,
                                        id: item.id,
                                        qty: parseFloat(item.qty)
                                    }).then(res => {
                                        console.log(res.data);
                                        __getDataBarang(user.id);
                                        setLoading(false);
                                    })


                                }



                            }} keyboardType='number-pad' value={item.qty} style={{
                                padding: 0,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600]
                            }} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            setLoading(true);
                            console.warn('barang', item.id + item.qty)
                            axios.post(apiURL + 'v1_cart_update.php', {
                                api_token: urlToken,
                                id: item.id,
                                qty: parseFloat(item.qty) + 1
                            }).then(res => {
                                console.log(res.data);
                                __getDataBarang(user.id);
                                setLoading(false);
                            })
                        }} style={{
                            flex: 1,
                            backgroundColor: colors.primary,
                            // borderRadius: 5,
                            width: 25,
                            height: 25,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='plus' color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        );
    };


    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

    const options = {
        includeBase64: true,
        quality: 0.3,
    };



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white
                // padding: 10,
            }}>

            <FlatList data={data} renderItem={__renderItem} />


            <Modalize
                withHandle={false}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                snapPoint={windowHeight / 3.4}
                HeaderComponent={
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: windowWidth / 35,
                                        color: colors.black,
                                    }}>
                                    {itemz.nama_barang}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 20,
                                        color: colors.black,
                                    }}>
                                    Rp. {new Intl.NumberFormat().format(itemz.harga * itemz.qty)}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                                <Icon type="ionicon" name="close-outline" size={35} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                ref={modalizeRef}>
                <View style={{ flex: 1, height: windowWidth / 2 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, padding: 10, }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black,
                                    }}>
                                    Jumlah
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    padding: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        itemz.qty == 1
                                            ?
                                            showMessage({
                                                type: 'danger',
                                                message: 'Minimal pembelian 1',
                                            })
                                            : setItem({
                                                ...itemz,
                                                qty: itemz.qty - 1,
                                                total: itemz.harga * (itemz.qty - 1)
                                            });
                                    }}
                                    style={{
                                        backgroundColor: colors.primary,
                                        width: 80,
                                        borderRadius: 10,
                                        height: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 10,
                                    }}>
                                    <Icon type="ionicon" name="remove" color={colors.white} />
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{ fontSize: 16, fontFamily: fonts.secondary[600] }}>
                                        {itemz.qty}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setItem({
                                            ...itemz,
                                            qty: parseInt(itemz.qty) + 1,
                                            total: itemz.harga * (parseInt(itemz.qty) + 1)
                                        });
                                    }}
                                    style={{
                                        backgroundColor: colors.primary,
                                        width: 80,
                                        borderRadius: 10,
                                        marginLeft: 10,
                                        height: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Icon type="ionicon" name="add" color={colors.white} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ marginTop: 10, }}>
                            <TouchableOpacity
                                onPress={updateCart}
                                style={{
                                    backgroundColor: colors.secondary,
                                    borderRadius: 0,
                                    padding: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                <Icon type='ionicon' name='create-outline' color={colors.primary} />
                                <Text
                                    style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 22,
                                        color: colors.primary,
                                    }}>
                                    SIMPAN
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modalize>


            <View
                style={{
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.white,
                        justifyContent: 'flex-start',

                        alignItems: 'center',
                        paddingHorizontal: 15,
                        flexDirection: 'row'
                    }}>

                    <Image source={require('../../assets/member.png')} style={{
                        width: 11,
                        height: 15
                    }} />
                    <Text
                        style={{
                            left: 10,
                            fontSize: myDimensi / 2,
                            fontFamily: fonts.secondary[600],
                            color: colors.grey_base,

                        }}>
                        {member.tipe}
                    </Text>

                </View>
                <View style={{

                    padding: 10,
                    backgroundColor: colors.white,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                    <View >
                        <Text style={{
                            textAlign: 'right',
                            fontSize: myDimensi / 2.3,
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                        }}> {new Intl.NumberFormat().format(member.persen_member)}%</Text>
                        <Text style={{
                            textAlign: 'right',
                            fontSize: myDimensi / 2.3,
                            fontFamily: fonts.secondary[400],
                            color: colors.black,
                        }}>   Rp. {new Intl.NumberFormat().format(diskon_member)}</Text>
                    </View>
                    <View style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon name='tag' size={myDimensi / 2} light color={colors.secondary} />
                    </View>

                </View>



            </View>


            <View
                style={{
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.white,
                        justifyContent: 'flex-start',

                        alignItems: 'center',
                        paddingHorizontal: 15,
                        flexDirection: 'row'
                    }}>

                    <Icon name='credit-card' color={colors.primary} />
                    <Text
                        style={{
                            left: 10,
                            fontSize: myDimensi / 2.3,
                            fontFamily: fonts.secondary[400],
                            color: colors.black,

                        }}>
                        Voucher
                    </Text>

                </View>
                {voucher.diskon == 0 && <TouchableOpacity onPress={() => navigation.navigate('Voucher')} style={{

                    padding: 10,
                    backgroundColor: colors.white,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',

                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                    <Text style={{
                        right: 10,
                        fontSize: myDimensi / 2.3,
                        fontFamily: fonts.secondary[400],
                        color: colors.border_label,
                    }}>Pilih Voucher</Text>
                    <Icon name='chevron-right' size={myDimensi / 2} light color={colors.border_label} />
                </TouchableOpacity>}

                {voucher.diskon != 0 && <View onPress={() => navigation.navigate('Voucher')} style={{

                    padding: 10,
                    backgroundColor: colors.white,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                    <View >
                        <Text style={{
                            textAlign: 'right',
                            fontSize: myDimensi / 2.3,
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                        }}> {new Intl.NumberFormat().format(voucher.diskon_persen)}%</Text>
                        <Text style={{
                            textAlign: 'right',
                            fontSize: myDimensi / 2.3,
                            fontFamily: fonts.secondary[400],
                            color: colors.black,
                        }}>   Rp. {new Intl.NumberFormat().format(diskon_voucher)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        storeData('voucher', {
                            diskon: 0,
                            diskon_persen: 0,
                        });
                        setVoucher({
                            diskon: 0,
                            diskon_persen: 0,
                        })
                    }} style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon name='trash-alt' size={myDimensi / 2} light color={colors.danger} />
                    </TouchableOpacity>
                </View>}



            </View>

            <View
                style={{
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.white,
                        justifyContent: 'flex-start',

                        alignItems: 'center',
                        paddingHorizontal: 15,
                        flexDirection: 'row'
                    }}>

                    <Icon name='calendar-alt' color={colors.primary} />
                    <Text
                        style={{
                            left: 10,
                            fontSize: myDimensi / 2.3,
                            fontFamily: fonts.secondary[400],
                            color: colors.black,

                        }}>
                        waktu Pengambilan
                    </Text>

                </View>


                <TouchableOpacity onPress={() => {
                    setOpenDate(true)
                }} style={{

                    padding: 10,
                    backgroundColor: colors.white,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',

                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                    <Text style={{
                        right: 10,
                        fontSize: myDimensi / 2.3,
                        fontFamily: fonts.secondary[400],
                        color: colors.border_label,
                    }}>{Indonesia3Tgl(pickup.tanggal)} {pickup.jam}</Text>
                    <Icon name='chevron-right' size={myDimensi / 2} light color={colors.border_label} />
                </TouchableOpacity>

                {openDate && <RNDateTimePicker onChange={(event, date) => {

                    const datetimeSQL = new Date(date).toISOString().split('T')[0];

                    console.log('date', datetimeSQL);
                    setPickup({
                        ...pickup,
                        tanggal: datetimeSQL
                    })
                    setOpenDate(false);
                    setOpenTime(true);
                }} mode="date" value={new Date()} />}


                {openTime && <RNDateTimePicker mode="time" onChange={(event, date) => {

                    const jam = new Date(date).getHours() + ':' + new Date(date).getMinutes();

                    console.log('time', jam);
                    setPickup({
                        ...pickup,
                        jam: jam
                    })
                    setOpenTime(false);
                }} value={new Date()} />}



            </View>


            {!loading &&
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            padding: 10,
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>

                        <Text
                            style={{
                                fontSize: myDimensi / 2.3,
                                fontFamily: fonts.secondary[400],
                                color: colors.border_label,
                                left: 10,
                            }}>
                            Total

                        </Text>
                        <Text
                            style={{
                                fontSize: myDimensi / 2,
                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                left: 10,
                            }}>
                            Rp. {new Intl.NumberFormat().format(total_bayar)}

                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        backgroundColor: colors.white
                    }}>
                        <MyButton warna={colors.primary} title="Pilih Pembayaran" onPress={() => {

                            getData('user').then(res => {
                                setLoading(true);
                                console.log('data_user', res)

                                if (res.nama_outlet == "Silahkan pilih") {
                                    Alert.alert('Qopi untuk semua ', 'Silahkan pilih lokasi untuk bisa melakukan pembayaran');
                                    setLoading(false);
                                    navigation.navigate('Outlet')
                                } else {
                                    const dd = {
                                        fid_user: res.id,
                                        fid_outlet: res.fid_outlet,
                                        harga_total: total_bayar,
                                        diskon_voucher: diskon_voucher,
                                        persen_voucher: voucher.diskon_persen,
                                        diskon_member: diskon_member,
                                        persen_member: member.persen_member,
                                        tanggal_pickup: pickup.tanggal,
                                        jam_pickup: pickup.jam

                                    }
                                    console.warn(dd)

                                    setTimeout(() => {
                                        setLoading(false);
                                        navigation.navigate('Payment', dd)
                                    }, 1200)
                                }






                            });

                        }} />
                    </View>



                </View>}


            {loading && <View style={{
                padding: 10,
                flex: 1,
                width: windowWidth,
                height: windowHeight,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                opacity: 0.5,
                backgroundColor: colors.primary,
            }}><ActivityIndicator size="large" color={colors.primary} /></View>}

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
