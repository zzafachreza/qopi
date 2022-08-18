import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StatusBar } from 'react-native'
import React, { userState, useEffect, useState } from 'react'
import { fonts, myDimensi } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { Icon } from 'react-native-elements'
import { MyButton, MyGap } from '../../components'
import axios from 'axios'

export default function Register({ navigation }) {



  const [loading, setLoading] = useState(false);
  const [buka, setBuka] = useState(true);

  const [kirim, setKirim] = useState({
    email: '',
    password: '',
  });


  const __masuk_via_email = () => {
    navigation.navigate('Otp')
  }

  return (

    <SafeAreaView style={{
      flex: 1,
      padding: 10,
      backgroundColor: colors.white
    }}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />


      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flex: 0.8,
          justifyContent: 'center',
          padding: 10,
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name='chevron-back' size={myDimensi / 1.6} color={colors.black} />
            <Text style={{
              left: 10,
              fontFamily: fonts.primary[600],
              fontSize: myDimensi / 2
            }}>Buat Akun</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/logo.png')} style={{
            resizeMode: 'contain',
            height: myDimensi / 0.25,
            alignSelf: 'center'
          }} />

          <Text style={{
            fontFamily: fonts.primary.normal,
            fontSize: myDimensi / 1.8,
            color: colors.black_font,

          }}>Silahkan lengkapi data berikut :</Text>
        </View>

        <View style={{
          flex: 2,
          paddingHorizontal: 10,

        }}>

          <Text style={{
            fontFamily: fonts.primary.normal,
            fontSize: myDimensi / 2,
            color: colors.border_label,
            marginBottom: 5,
          }}>Nama Lengkap</Text>

          <View style={{
            position: 'relative'
          }}>
            <View style={{
              position: 'absolute',
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', padding: 10,
            }}>
              <Icon type='ionicon' name='person-outline' size={myDimensi / 1.6} color={colors.primary} />
            </View>
            <TextInput autoCapitalize='none' value={kirim.email} onChangeText={v => setKirim({
              ...kirim,
              email: v
            })}

              style={{
                borderWidth: 1,
                borderColor: colors.border_form,
                borderRadius: 10,
                fontSize: myDimensi / 2,
                paddingLeft: 35,
                paddingTop: 12,
                fontFamily: fonts.primary.normal
              }}
              placeholder="Masukan nama anda"
            />
          </View>
          <MyGap jarak={20} />

          <Text style={{
            fontFamily: fonts.primary.normal,
            fontSize: myDimensi / 2,
            color: colors.border_label,
            marginBottom: 5,
          }}>No. Telepon</Text>

          <View style={{
            position: 'relative'
          }}>
            <View style={{
              position: 'absolute',
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', padding: 10,
            }}>
              <Icon type='ionicon' name='call-outline' size={myDimensi / 1.6} color={colors.primary} />
            </View>
            <TextInput autoCapitalize='none' value={kirim.email} onChangeText={v => setKirim({
              ...kirim,
              email: v
            })}
              keyboardType='phone-pad'
              style={{
                borderWidth: 1,
                borderColor: colors.border_form,
                borderRadius: 10,
                fontSize: myDimensi / 2,
                paddingLeft: 35,
                paddingTop: 12,
                fontFamily: fonts.primary.normal
              }}
              placeholder="Masukan nomor aktif"
            />
          </View>
          <MyGap jarak={20} />
          <Text style={{
            fontFamily: fonts.primary.normal,
            fontSize: myDimensi / 2,
            color: colors.border_label,
            marginBottom: 5,
          }}>Email</Text>

          <View style={{
            position: 'relative'
          }}>
            <View style={{
              position: 'absolute',
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', padding: 10,
            }}>
              <Icon type='ionicon' name='mail-outline' size={myDimensi / 1.6} color={colors.primary} />
            </View>
            <TextInput autoCapitalize='none' value={kirim.email} onChangeText={v => setKirim({
              ...kirim,
              email: v
            })}
              keyboardType='email-address'
              style={{
                borderWidth: 1,
                borderColor: colors.border_form,
                borderRadius: 10,
                fontSize: myDimensi / 2,
                paddingLeft: 35,
                paddingTop: 12,
                fontFamily: fonts.primary.normal
              }}
              placeholder="Masukan email"
            />
          </View>

          <MyGap jarak={25} />
          <Text style={{
            fontFamily: fonts.primary.normal,
            fontSize: myDimensi / 2,
            color: colors.border_label,
            left: 2,
            marginBottom: 5,
          }}>Kata Sandi</Text>
          <View style={{
            position: "relative"
          }}>
            <View style={{
              position: 'absolute',
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', padding: 10,
            }}>
              <Icon type='ionicon' name='lock-closed-outline' size={myDimensi / 1.6} color={colors.primary} />
            </View>
            <TextInput autoCapitalize='none' value={kirim.password} onChangeText={v => setKirim({
              ...kirim,
              password: v
            })} secureTextEntry={buka} style={{
              borderWidth: 1,
              borderColor: colors.border_form,
              borderRadius: 10,
              fontSize: myDimensi / 2,
              paddingLeft: 35,
              paddingTop: 12,
              fontFamily: fonts.secondary[400]

            }} placeholder="Masukan kata sandi" />
            <TouchableOpacity onPress={() => {

              if (buka) {
                setBuka(false)
              } else {
                setBuka(true)
              }

            }} style={{
              position: 'absolute',
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', padding: 10,
            }}>
              <Icon type='ionicon' name={buka ? 'eye-outline' : 'eye-off-outline'} size={myDimensi / 1.5} color={colors.border_label} />
            </TouchableOpacity>

          </View>

          <MyGap jarak={20} />
          {!loading && <MyButton onPress={__masuk_via_email} title="Daftar" warna={colors.primary} Icons="create-outline" />}
          {loading && <ActivityIndicator color={colors.primary} size="large" />}
          <MyGap jarak={10} />
          <Text style={{
            fontFamily: fonts.primary.normal,
            fontSize: myDimensi / 2,
            color: colors.black_font,
            textAlign: 'center'
          }}>Dengan masuk, anda telah menyetujui</Text>
          <TouchableOpacity>
            <Text style={{
              fontFamily: fonts.primary.normal,
              fontSize: myDimensi / 2,
              color: colors.primary,
              textAlign: 'center'
            }}>Syarat & Ketentuan</Text>
          </TouchableOpacity>
          <MyGap jarak={20} />

        </View>
      </ScrollView>



    </SafeAreaView>




  )
}

const styles = StyleSheet.create({})