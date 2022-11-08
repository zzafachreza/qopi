import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, storeData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { ImageBackground } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useIsFocused } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { TouchableNativeFeedback } from 'react-native';

export default function AccountMember({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [member, setMember] = useState({
        tipe: 'Raden',
        point: 0,
        diskon_member: 0.05,
        persen_member: 5
    });

    useEffect(() => {
        getTransaction();
        getData('user').then(u => {
            if (!u) {
                setUser({
                    nama_lengkap: 'Qopi untuk semua',
                    nama_outlet: 'Silahkan pilih',
                    alamat_outlet: '',
                })
            } else {
                setUser(u);


                getMember(u.id);

            }
        });

    }, [])

    const [data, setData] = useState([]);
    const getMember = (id) => {
        axios.post(apiURL + 'v1_member.php', {
            api_token: urlToken,
            fid_user: id
        }).then(zz => {
            console.log('member kamu', zz.data);
            setMember(zz.data);
            storeData('member', zz.data)
        })
    }

    const getTransaction = () => {
        setLoading(true)
        axios.post(apiURL + 'v1_voucher.php', {
            api_token: urlToken,
            member: 1
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <ScrollView>
                <ImageBackground style={{
                    height: 200,
                    flex: 1,
                    paddingTop: 5,
                }} source={require('../../assets/banner_kosong.png')} >
                    <View>
                        <View style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[400],
                                fontSize: myDimensi / 3.5,
                                marginBottom: 5,
                                color: colors.white
                            }}>Membersip</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/member.png')} style={{
                                    width: 20,
                                    height: 25
                                }} />
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: myDimensi / 2,
                                    color: colors.white,
                                    left: 5,
                                }}>{member.tipe}</Text>
                            </View>
                        </View>
                        <View style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[400],
                                fontSize: myDimensi / 3.5,
                                marginBottom: 5,
                                color: colors.white
                            }}>Total</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/coin.png')} style={{
                                    width: 20,
                                    height: 35,
                                    resizeMode: 'contain'
                                }} />
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: myDimensi / 2,
                                    color: colors.white,
                                    left: 5,
                                }}>{member.point} poin</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <Text style={{
                    marginTop: -30,
                    textAlign: 'center',
                    fontFamily: fonts.primary[400],
                    fontSize: myDimensi / 2,
                    color: colors.black,
                    marginBottom: 20,
                }}>
                    Yuk Lakukan Transaksi Sekarang! 1 transaksi sama dengan 1 poin! Kumpulkan poinmu dan jadilah Sultan
                </Text>

                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.primary[400],
                    fontSize: myDimensi / 2,
                    color: colors.black,
                    marginBottom: 20,
                }}>Segera tukarkan poin kamu</Text>


                <View style={{
                    paddingHorizontal: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 30,
                            borderRadius: 50,
                            borderWidth: 5,
                            borderColor: colors.border_label,
                            height: 30,
                            backgroundColor: colors.primary,
                        }} />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: 0,
                            width: '100%',
                            height: 10,
                            backgroundColor: member.tipe == 'Adipati' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: -5,
                            borderWidth: 5,
                            borderColor: colors.border_label,
                            width: 30,
                            borderRadius: 50,
                            height: 30,
                            backgroundColor: member.tipe == 'Adipati' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: -5,
                            width: '100%',
                            height: 10,
                            backgroundColor: member.tipe == 'Pengeran' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: -5,
                            borderWidth: 5,
                            borderColor: colors.border_label,
                            width: 30,
                            borderRadius: 50,
                            height: 30,
                            backgroundColor: member.tipe == 'Pengeran' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: -5,
                            width: '100%',
                            height: 10,
                            backgroundColor: member.tipe == 'Permaisuri' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: -5,
                            width: 30,
                            borderRadius: 50,
                            borderWidth: 5,
                            borderColor: colors.border_label,
                            height: 30,
                            backgroundColor: member.tipe == 'Permaisuri' ? colors.primary : colors.border_label
                        }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        <View style={{
                            left: -5,
                            width: '100%',
                            height: 10,
                            backgroundColor: member.tipe == 'Sultan' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            left: -7,
                            width: 30,
                            borderRadius: 50,
                            height: 30,
                            borderWidth: 5,
                            borderColor: colors.border_label,
                            backgroundColor: member.tipe == 'Sultan' ? colors.primary : colors.border_label,
                        }} />
                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-around'
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>Raden</Text>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>10 Poin</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>Adipati</Text>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>20 Poin</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>Pangeran</Text>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>30 Poin</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>Permaisuri</Text>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>40 Poin</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>Sultan</Text>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: myDimensi / 3,
                            color: colors.black,
                        }}>50 Poin</Text>
                    </View>
                </View>
                {/* voucher */}

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

                                        console.log(i.id + user.id + i.point);

                                        axios.post(apiURL + 'v1_voucher_get.php', {
                                            fid_voucher: i.id,
                                            api_token: urlToken,
                                            point: i.point,
                                            fid_user: user.id
                                        }).then(res => {
                                            console.log(res.data)
                                        })

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
                                        }}>Tukar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })

                }

                {loading && <ActivityIndicator color={colors.primary} size="large" />}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})