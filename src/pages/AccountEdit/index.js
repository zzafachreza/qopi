import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { apiURL, getData, storeData, urlAPI, urlAvatar } from '../../utils/localStorage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-date-picker';
import { Icon } from 'react-native-elements';

export default function AccountEdit({ navigation, route }) {
    navigation.setOptions({
        title: 'Edit Profile',
    });

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [kota, setKota] = useState([]);
    const [data, setData] = useState({

    });
    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

    const options = {
        includeBase64: true,
        maxWidth: 300,
        quality: 0.3,
    };

    const getCamera = xyz => {
        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                let source = { uri: response.uri };
                switch (xyz) {
                    case 1:
                        setData({
                            ...data,
                            foto_user: `data:${response.type};base64, ${response.base64}`,

                        });
                        break;
                }
            }
        });
    };

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            console.log('All Response = ', response);

            console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 200000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setData({
                                ...data,
                                new_foto: 1,
                                foto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };



    useEffect(() => {
        getData('user').then(res => {
            setData(res);
            console.error('data user', res);
        });
        console.log('test edit');
    }, []);

    const simpan = () => {
        setLoading(true);
        console.log('kirim edit', data);
        axios.post(apiURL + '/v1_profile_update.php', data).then(res => {
            console.log(res.data);
            let userUpdate = res.data;
            userUpdate['fid_outlet'] = data.fid_outlet;
            userUpdate['nama_outlet'] = data.nama_outlet;
            userUpdate['tipe_harga'] = data.tipe_harga;
            storeData('user', userUpdate);
            setLoading(false);
            showMessage({
                type: 'success',
                message: 'Data bershasil diupdate..',
            });

            navigation.replace('MainApp');


        });
    };
    return (
        <SafeAreaView style={styles.page}>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View
                        style={{
                            borderWidth: 2,
                            borderColor: colors.primary,
                            width: 120,
                            height: 120,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 60,
                            overflow: 'hidden',
                        }}>
                        <Image
                            source={{
                                uri: data.new_foto === 1 ? data.foto_user : data.foto_user != '' ? urlAvatar + data.foto_user : 'https://zavalabs.com/nogambar.jpg'

                            }}
                            style={{ width: 120, height: 120 }}
                        />
                    </View>
                    <MyGap jarak={5} />
                    <MyButton
                        title="Ganti Foto"
                        Icons="cloud-upload-outline"
                        iconColor={colors.black}
                        colorText={colors.black}
                        // warna={colors.secondary}
                        onPress={() => getGallery(1)}
                    />
                </View>


                <MyGap jarak={10} />
                <MyInput
                    label="Nama Pribadi"
                    iconname="person-outline"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />



                <MyGap jarak={10} />
                <MyInput
                    label="E - mail"
                    iconname="mail-outline"
                    value={data.email}
                    onChangeText={value =>
                        setData({
                            ...data,
                            email: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput
                    label="Telepon"
                    iconname="call-outline"
                    keyboardType="number-pad"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />
                <MyGap jarak={10} />

                <MyInput
                    label="Alamat"
                    pal
                    iconname="map-outline"
                    multiline={true}
                    value={data.alamat}
                    onChangeText={value =>
                        setData({
                            ...data,
                            alamat: value,
                        })
                    }
                />






                <MyGap jarak={10} />
                <MyInput
                    label="Password"
                    placeholder="Kosongkan jika tidak diubah"
                    iconname="key-outline"
                    secureTextEntry
                    value={data.newpassword}
                    onChangeText={value =>
                        setData({
                            ...data,
                            newpassword: value,
                        })
                    }
                />

                <MyGap jarak={20} />

                <MyButton
                    warna={colors.primary}
                    title="Simpan Perubahan"
                    Icons="log-in"
                    onPress={simpan}
                />
                <MyGap jarak={20} />
            </ScrollView>


            {loading && (
                <LottieView
                    source={require('../../assets/animation.json')}
                    autoPlay
                    loop
                    style={{
                        flex: 1,
                        backgroundColor: colors.primary,
                    }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
