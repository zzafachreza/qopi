import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Animated, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { ImageBackground } from 'react-native';
import { MyInput } from '../../components';
import LottieView from 'lottie-react-native'
import { showMessage } from 'react-native-flash-message';


export default function Product({ navigation, route }) {

    const item = route.params;
    const [loading, setLoading] = useState(false);

    const [barang, setBarang] = useState({
        fid_barang: route.params.id,
        harga_barang: route.params.harga_barang,
        harga_dasar: route.params.harga_dasar,
        diskon: route.params.diskon,
        qty: 1,
        total_topping: 0,
        suhu: 'Cold',
        ukuran: 'Regular',
        gula: 'Normal',
        es: 'Normal',
        topping: []
    })

    useEffect(() => {
        getTopping();
    }, [])
    const getTopping = () => {
        axios.post(apiURL + 'v1_topping.php', {
            api_token: urlToken,
        }).then(res => {
            console.log('topping', res.data);
            setTopping(res.data);
        })
    }
    const [suhu, setSuhu] = useState([
        {
            id: 0,
            name: 'Cold',
            pilih: 1,
        },
        {
            id: 1,
            name: 'Hot',
            pilih: 0,
        }
    ])


    const [ukuran, setUkuran] = useState([
        {
            id: 0,
            name: 'Regular',
            pilih: 1,
        },
        {
            id: 1,
            name: 'Medium',
            pilih: 0,
        },
        {
            id: 2,
            name: 'Large',
            pilih: 0,
        }
    ])

    const [gula, setGula] = useState([
        {
            id: 0,
            name: 'Normal',
            pilih: 1,
        },
        {
            id: 1,
            name: 'Less',
            pilih: 0,
        },
        {
            id: 2,
            name: 'No Sugar',
            pilih: 0,
        }
    ]);

    const [topping, setTopping] = useState([]);



    const [es, setEs] = useState([
        {
            id: 0,
            name: 'Normal',
            pilih: 1,
        },
        {
            id: 1,
            name: 'Less',
            pilih: 0,
        },
        {
            id: 2,
            name: 'No Ice',
            pilih: 0,
        }
    ])

    // Animated.timing(scaleLogo, {
    //     toValue: 200,
    //     duration: 800,
    // }).start();

    return (
        <>
            <ScrollView style={{
                flex: 1,
                backgroundColor: colors.white
            }}>
                <ImageBackground source={require('../../assets/banner_product.png')} style={{
                    width: windowWidth,
                    height: 200,
                    position: 'relative'
                }}>



                    <Image style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} source={{
                        uri: item.image
                    }} />

                </ImageBackground>
                <View style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border_card,
                    marginHorizontal: 10,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
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
                    <View>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 1.5,
                            marginBottom: 5,
                            color: colors.primary
                        }}>Rp. {new Intl.NumberFormat().format(item.harga_barang)}</Text>
                    </View>
                    <TouchableOpacity style={{
                        marginHorizontal: 5,
                        // position: 'absolute'
                    }} onPress={() => {

                        getData('user').then(user => {
                            if (!user) {
                                console.log('harus login');
                                navigation.replace('Login')
                            } else {

                                // console.log(barang);
                                // let kirim = item.id;
                                // kirim.fid_user = user.id;
                                // kirim.api_token = urlToken;



                                // console.log(kirim);

                                // setLoading(true);

                                setTimeout(() => {

                                    axios.post(apiURL + 'v1_favorit_add.php', {
                                        fid_user: user.id,
                                        api_token: urlToken,
                                        fid_barang: item.id
                                    }).then(res => {
                                        console.log(res.data);
                                        setLoading(false);

                                        if (res.data.status === 404) {
                                            showMessage({
                                                type: 'danger',
                                                message: res.data.message
                                            })
                                        } else if (res.data.status === 200) {

                                            showMessage({
                                                type: 'success',
                                                message: res.data.message
                                            })

                                        }
                                    })

                                }, 1200)



                            }
                        })
                    }}>

                        <Icon type='ionicon' name='heart' color={colors.danger} size={myDimensi * 1.2} />

                    </TouchableOpacity>
                </View>

                {/* JUmlah */}

                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 2.5,
                            color: colors.black
                        }}>Jumlah</Text>
                    </View>

                    <View style={{
                        marginHorizontal: 10,
                        backgroundColor: colors.border_card,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>

                        <TouchableOpacity onPress={() => {
                            if (barang.qty > 1) {
                                setBarang({
                                    ...barang,
                                    qty: barang.qty - 1
                                })
                            }
                        }} style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon size={35} type='ionicon' name='remove-circle-outline' color={colors.primary} />
                        </TouchableOpacity>

                        <Text style={{
                            width: 50,
                            textAlign: 'center',
                        }}>{barang.qty}</Text>
                        <TouchableOpacity onPress={() => {
                            setBarang({
                                ...barang,
                                qty: barang.qty + 1
                            })
                        }} style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon size={35} type='ionicon' name='add-circle-outline' color={colors.primary} />
                        </TouchableOpacity>


                    </View>
                </View>


                {/* suhu */}

                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 2.5,
                            color: colors.black
                        }}>Suhu</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        marginHorizontal: 10,
                        backgroundColor: colors.border_card,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        {
                            suhu.map((item, index) => {
                                return (

                                    <TouchableOpacity onPress={() => {
                                        let items = [...suhu];
                                        let item = { ...items[index] };
                                        item.pilih = 1;
                                        items[index] = item;
                                        let filter = items.filter((x, i) => i !== index);
                                        filter.map(i => {
                                            items[i.id].pilih = 0;
                                        })
                                        setSuhu(items);

                                        setBarang({
                                            ...barang,
                                            suhu: item.name
                                        })

                                    }} style={item.pilih ? styles.ok : styles.not}>
                                        <Text style={item.pilih ? styles.textOk : styles.textNot}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </View>


                {/* ukuran */}

                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 2.5,
                            color: colors.black
                        }}>Ukuran</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        marginHorizontal: 10,
                        backgroundColor: colors.border_card,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        {
                            ukuran.map((item, index) => {
                                return (

                                    <TouchableOpacity onPress={() => {
                                        let items = [...ukuran];
                                        let item = { ...items[index] };
                                        item.pilih = 1;
                                        items[index] = item;
                                        let filter = items.filter((x, i) => i !== index);
                                        filter.map(i => {
                                            items[i.id].pilih = 0;
                                        })
                                        setUkuran(items);
                                        setBarang({
                                            ...barang,
                                            ukuran: item.name
                                        })

                                    }} style={item.pilih ? styles.ok : styles.not}>
                                        <Text style={item.pilih ? styles.textOk : styles.textNot}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </View>


                {/* Gula */}

                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 2.5,
                            color: colors.black
                        }}>Gula</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        marginHorizontal: 10,
                        backgroundColor: colors.border_card,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        {
                            gula.map((item, index) => {
                                return (

                                    <TouchableOpacity onPress={() => {
                                        let items = [...gula];
                                        let item = { ...items[index] };
                                        item.pilih = 1;
                                        items[index] = item;
                                        let filter = items.filter((x, i) => i !== index);
                                        filter.map(i => {
                                            items[i.id].pilih = 0;
                                        })
                                        setGula(items);
                                        setBarang({
                                            ...barang,
                                            gula: item.name
                                        })

                                    }} style={item.pilih ? styles.ok : styles.not}>
                                        <Text style={item.pilih ? styles.textOk : styles.textNot}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </View>



                {/* Es */}

                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 2.5,
                            color: colors.black
                        }}>Es</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        marginHorizontal: 10,
                        backgroundColor: colors.border_card,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        {
                            es.map((item, index) => {
                                return (

                                    <TouchableOpacity onPress={() => {
                                        let items = [...es];
                                        let item = { ...items[index] };
                                        item.pilih = 1;
                                        items[index] = item;
                                        let filter = items.filter((x, i) => i !== index);
                                        filter.map(i => {
                                            items[i.id].pilih = 0;
                                        })
                                        setEs(items);
                                        setBarang({
                                            ...barang,
                                            es: item.name
                                        })

                                    }} style={item.pilih ? styles.ok : styles.not}>
                                        <Text style={item.pilih ? styles.textOk : styles.textNot}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </View>

                {/* topping */}
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: myDimensi / 2.5,
                        color: colors.black
                    }}>Ekstra Topping</Text>

                    {topping.map((x, index) => {
                        return (
                            <TouchableOpacity onPress={() => {

                                let items = [...topping];
                                let item = { ...items[index] };
                                item.pilih = item.pilih == 1 ? 0 : 1;
                                items[index] = item;
                                let filter = items.filter((x, i) => x.pilih === 1);

                                setTopping(items);
                                console.log(filter);
                                let total_topping = 0;
                                filter.map(z => {
                                    total_topping += parseFloat(z.harga_tambahan)
                                })
                                setBarang({
                                    ...barang,
                                    topping: filter,
                                    total_topping: total_topping,
                                })
                            }} style={{
                                marginVertical: 5,
                                padding: 10,
                                flexDirection: 'row'
                            }}>
                                <View>
                                    <Image style={{
                                        width: 50,
                                        height: 50,
                                    }} source={{
                                        uri: x.image
                                    }} />
                                </View>
                                <View style={{
                                    flex: 1,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[600],
                                        fontSize: myDimensi / 2.5,
                                        marginBottom: 5,
                                        color: colors.black
                                    }}>{x.nama_tambahan}</Text>
                                    <Text style={{
                                        fontFamily: fonts.primary[400],
                                        fontSize: myDimensi / 2.5,
                                        marginBottom: 5,
                                        color: colors.black
                                    }}>+ Rp. {new Intl.NumberFormat().format(x.harga_tambahan)}</Text>
                                </View>
                                <View>
                                    <Icon type='ionicon' name={x.pilih ? 'checkmark-circle' : 'checkmark-circle-outline'} color={x.pilih ? colors.primary : colors.black} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </View>

                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: myDimensi / 2.5,
                        color: colors.black,
                        marginVertical: 10,
                    }}>Catatan Tambahan</Text>
                    <MyInput value={barang.catatan} onChangeText={x => {
                        setBarang({
                            ...barang,
                            catatan: x
                        })
                    }} placeholder="Masukkan permintaan khusus" multiline nolabel iconname="create-outline" label="Catatan Tambahan" />


                </View>





            </ScrollView >
            <View style={{
                padding: 10,
                backgroundColor: colors.white
            }}>
                <Text style={{
                    fontFamily: fonts.primary[600],
                    fontSize: myDimensi / 2,
                    color: colors.black,
                    marginVertical: 10,
                }}>Masukan Keranjang</Text>

                <TouchableOpacity onPress={() => {

                    getData('user').then(user => {
                        if (!user) {
                            console.log('harus login');
                            navigation.replace('Login')
                        } else {

                            // console.log(barang);
                            let kirim = barang;
                            kirim.fid_user = user.id;
                            kirim.api_token = urlToken;
                            console.warn('send server', kirim);


                            console.log(kirim);

                            setLoading(true);

                            setTimeout(() => {

                                axios.post(apiURL + 'v1_cart_add.php', kirim).then(res => {
                                    console.log(res.data);
                                    setLoading(false);

                                    if (res.data.status === 404) {
                                        showMessage({
                                            type: 'danger',
                                            message: res.data.message
                                        })
                                    } else if (res.data.status === 200) {

                                        navigation.replace('MainApp');

                                    }
                                })

                            }, 1200)



                        }
                    })
                }} style={{
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: myDimensi / 2,
                            marginBottom: 5,
                            color: colors.white
                        }}>Total</Text>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 1.5,
                            marginBottom: 5,
                            color: colors.white
                        }}>Rp. {new Intl.NumberFormat().format((barang.harga_barang + barang.total_topping) * barang.qty)}</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon type='ionicon' name='arrow-forward-outline' color={colors.white} />
                    </View>
                </TouchableOpacity>


            </View>
            {
                loading && (
                    <LottieView
                        source={require('../../assets/animation.json')}
                        autoPlay
                        loop
                        style={{ backgroundColor: colors.primary }}
                    />
                )
            }
        </>
    )
}

const styles = StyleSheet.create({

    ok: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: colors.primary_light,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 2,
    }
    ,
    textOk: {

        fontFamily: fonts.primary[600],
        fontSize: myDimensi / 2.5,
        color: colors.primary

    },
    not: {
        borderWidth: 2,
        borderColor: colors.border_card,
        marginHorizontal: 2,
        borderRadius: 20,
        backgroundColor: colors.border_card,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textNot: {

        fontFamily: fonts.primary[600],
        fontSize: myDimensi / 2.5,
        color: colors.black

    },

})