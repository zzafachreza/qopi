import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Account({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {

        getData('user').then(res => {
            if (!res) {
                navigation.replace('Login');
            } else {
                setOpen(true);
                setUser(res);
            }
            console.error(res);
        });


    }, []);

    const btnKeluar = () => {
        Alert.alert('Qopi untuk semua', 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.replace('Login');
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.primary,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}

            {open && <>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={{
                        uri: user.foto_user == '' ? 'https://zavalabs.com/nogambar.jpg' : urlAvatar + user.foto_user,

                    }} style={{
                        width: windowWidth / 2.5,
                        height: windowWidth / 2.5,
                        borderRadius: (windowWidth / 2.5) / 2
                    }} />
                </View>
                {/* data detail */}
                <View style={{ padding: 10, flex: 1 }}>
                    <MyList label="Nama Lengkap" value={user.nama_lengkap} />
                    <MyList label="Email" value={user.email} />
                    <MyList label="Telepon / Whatsapp" value={user.telepon} />
                    <MyList label="Alamat" value={user.alamat} />
                </View>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{
                        flex: 1,
                        margin: 5
                    }}>
                        <MyButton
                            onPress={() => navigation.navigate('AccountEdit', user)}
                            title="Edit Profil"
                            colorText={colors.white}
                            iconColor={colors.white}
                            warna={colors.primary}
                            Icons="create-outline"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        margin: 5
                    }}>
                        <MyButton
                            onPress={btnKeluar}
                            title="Keluar"
                            colorText={colors.white}
                            iconColor={colors.white}
                            warna={colors.black}
                            Icons="log-out-outline"
                        />
                    </View>

                </View>
            </>}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
