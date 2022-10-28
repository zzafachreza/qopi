import { FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, storeData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyCarouser from '../../components/MyCarouser';
import { ImageBackground } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useIsFocused } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const [kategori, setKategori] = useState([]);
  const [produk, setProduk] = useState([]);
  const [best, setBest] = useState({});
  const [member, setMember] = useState({
    tipe: 'Raden',
    point: 0,
    diskon_member: 0.05,
    persen_member: 5
  })
  const [cart, setCart] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);
      console.log(obj);
      PushNotification.localNotification({
        channelId: 'qpcoffee', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });

      if (obj.notification.title == "Pembayaranmu sudah terverifikasi") {
        navigation.navigate('PaymentSuccess');
      }


    });




    getData('user').then(u => {
      if (!u) {
        setUser({
          nama_lengkap: 'Qopi untuk semua',
          nama_outlet: 'Silahkan pilih',
          alamat_outlet: '',
        })
      } else {
        setUser(u);
        UpdateToken(u.id);
        if (isFocused) {
          UpdateCart(u.id);
          getMember(u.id);
        }
      }
    });
    getProduk();
    getTerbaik();
    getKategori();

    return unsubscribe;



  }, [isFocused]);


  const UpdateCart = (id) => {
    axios.post(apiURL + 'v1_cart_total.php', {
      api_token: urlToken,
      fid_user: id
    }).then(zz => {
      // console.log('cart kamu', zz.data);
      setCart(zz.data);
    })
  }


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


  const UpdateToken = (id) => {

    getData('token').then(res => {
      // console.log('tokenSAYA', res.token);




      axios.post(apiURL + 'v1_token_update.php', {
        api_token: urlToken,
        id: id,
        token: res.token
      }).then(zvl => {
        console.log('UPDATE TOKEN', zvl.data)
      })
    })

  }


  const getKategori = () => {
    axios.post(apiURL + 'v1_kategori.php', {
      api_token: urlToken,
    }).then(res => {
      setKategori(res.data);
    })
  }



  const getProduk = () => {
    axios.post(apiURL + 'v1_produk.php', {
      api_token: urlToken,
    }).then(res => {
      // console.log(res.data);
      setProduk(res.data);
    })
  }


  const getTerbaik = () => {
    axios.post(apiURL + 'v1_terbaik.php', {
      api_token: urlToken,
    }).then(res => {
      // console.log('terbaik', res.data);
      setBest(res.data);
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
      flex: 1,
      backgroundColor: colors.white
    }}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {/* header */}
      <View style={{
        flexDirection: 'row',
        height: windowHeight / 15,
        padding: 10,
      }}>
        <View style={{
          flex: 1,
          padding: 5,
        }}>
          <Text style={{
            fontFamily: fonts.primary[400],
            fontSize: myDimensi / 2
          }}>Hi, <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 2
          }}>{user.nama_lengkap}</Text></Text>
        </View>
        <TouchableOpacity onPress={() => {
          getData('user').then(res => {
            if (!res) {
              navigation.navigate('Login')
            } else {
              navigation.navigate('Cart')
            }

          })
        }} style={{
          marginHorizontal: 10,
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <Image source={require('../../assets/cart.png')} style={{
            width: 24,
            height: 24,
          }} />

          {cart > 0 &&

            <View style={{
              position: 'absolute',
              backgroundColor: colors.secondary,
              width: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7.5,
              height: 15,
              top: 0,
              right: 0,
            }}><Text style={{

              fontSize: 12,
            }}>{cart}</Text></View>
          }

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={{
          marginHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/bell.png')} style={{
            width: 16,
            height: 20
          }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          marginHorizontal: 15,
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: myDimensi / 0.5,
            height: myDimensi / 1,
            borderRadius: 5,
          }} />
        </TouchableOpacity>

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* slider */}
        <MyCarouser />

        {/* Jenis Member */}
        <View style={{
          borderRadius: 15,
          backgroundColor: colors.member_card,
        }}>
          <View style={{
            flexDirection: 'row',

            paddingVertical: 5,
            marginVertical: 5,

            marginHorizontal: 10,
          }}>
            <View style={{
              flex: 1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                marginBottom: 5,
              }}>Membersip</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/member.png')} style={{
                  width: 11,
                  height: 15
                }} />
                <Text style={{
                  fontFamily: fonts.primary[600],
                  fontSize: myDimensi / 2,
                  color: colors.grey_base,
                  left: 5,
                }}>{member.tipe}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                marginBottom: 5,
              }}>Total</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/coin.png')} style={{
                  width: 15,
                  height: 20,
                  resizeMode: 'contain'
                }} />
                <Text style={{
                  fontFamily: fonts.primary[600],
                  fontSize: myDimensi / 2,
                  color: colors.grey_base,
                  left: 5,
                }}>{member.point} point</Text>
              </View>
            </View>
          </View>



          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 5,
            marginVertical: 5,

            marginHorizontal: 10,
          }}>
            <View style={{
              justifyContent: 'center', alignItems: 'center'
            }}>
              <View style={{
                width: 10,
                height: 10,
                backgroundColor: colors.primary,
                borderRadius: 5,
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                color: colors.black,
              }}>Raden</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                color: colors.black,
              }}>10 Point</Text>
            </View>
            <View style={{
              borderTopWidth: 2,
              marginTop: 5,
              borderTopColor: member.tipe == 'Adipati' ? colors.primary : colors.border_label,
              flex: 0.5,
            }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                width: 10,
                height: 10,
                backgroundColor: member.tipe == 'Adipati' ? colors.primary : colors.border_label,
                borderRadius: 5,
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Adipati' ? colors.primary : colors.border_label,
              }}>Adipati</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Adipati' ? colors.primary : colors.border_label,
              }}>20 Point</Text>
            </View>
            <View style={{
              borderTopWidth: 2,
              marginTop: 5,
              borderTopColor: member.tipe == 'Pangeran' ? colors.primary : colors.border_label,
              flex: 0.5,
            }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                width: 10,
                height: 10,
                backgroundColor: member.tipe == 'Pangeran' ? colors.primary : colors.border_label,
                borderRadius: 5,
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Pangeran' ? colors.black : colors.border_label,
              }}>Pangeran</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Pangeran' ? colors.black : colors.border_label,
              }}>30 Point</Text>
            </View>
            <View style={{
              borderTopWidth: 2,
              marginTop: 5,
              borderTopColor: member.tipe == 'Permaisuri' ? colors.primary : colors.border_label,
              flex: 0.5,
            }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                marginTop: 2,
                width: 10,
                height: 10,
                backgroundColor: member.tipe == 'Permaisuri' ? colors.primary : colors.border_label,
                borderRadius: 5,
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Permaisuri' ? colors.black : colors.border_label,
              }}>Permaisuri</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Permaisuri' ? colors.black : colors.border_label,
              }}>40 Point</Text>
            </View>
            <View style={{
              borderTopWidth: 2,
              marginTop: 5,
              borderTopColor: member.tipe == 'Sultan' ? colors.primary : colors.border_label,
              flex: 0.5,
            }} />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                width: 10,
                height: 10,
                backgroundColor: member.tipe == 'Sultan' ? colors.primary : colors.border_label,
                borderRadius: 5,
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Sultan' ? colors.black : colors.border_label,
              }}>Sultan</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                color: member.tipe == 'Sultan' ? colors.black : colors.border_label,
              }}>50 Point</Text>
            </View>


          </View>
        </View>

        {/* Lokasi Outlite */}
        <TouchableOpacity onPress={() => {
          if (user.id == null) {

            navigation.navigate('Login')

          } else {

            navigation.navigate('Outlet')
          }
        }} style={{
          flexDirection: 'row',
          borderRadius: 15,
          paddingVertical: 5,
          borderWidth: 1,
          borderColor: colors.border_card,
          backgroundColor: colors.white,
          marginHorizontal: 10,
          marginVertical: 5,
        }}>

          <View style={{
            flex: 0.2,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/pinloc.png')} style={{
              width: 20,
              height: 20
            }} />


          </View>

          <View style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: myDimensi / 2.5,
              marginBottom: 5,
            }}>Lokasi Outlet</Text>

            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: myDimensi / 2.3,
              color: colors.black,
            }}>{user.nama_outlet}</Text>
            {/* <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: myDimensi / 2.5,
              color: colors.black,
            }}>{user.alamat_outlet}</Text> */}

          </View>
          <View style={{

            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} />


          </View>
        </TouchableOpacity>

        {/* banner */}
        <TouchableOpacity onPress={() => navigation.navigate('Product', best)} activeOpacity={0.8} style={{
          padding: 10,
          position: 'relative'
        }}>
          <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 2.5,
            marginBottom: 5,
          }}>Terbaik Minggu ini</Text>
          <Image style={{

            width: '100%',
            borderRadius: 10,
            height: 140

          }} source={require('../../assets/banner.png')} />
          <View style={{
            left: 30,
            top: 50,
            position: 'absolute',
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2,
                marginBottom: 5,
                color: colors.white
              }}>{best.nama_barang}</Text>

              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                marginBottom: 5,
                color: colors.white
              }}>{best.keterangan_barang}</Text>
            </View>

            <View style={{
              flex: 1,
            }}>
              <Image style={{
                width: '100%',
                height: 100,
                resizeMode: 'contain'
              }} source={{
                uri: best.image
              }} />
            </View>
          </View>

        </TouchableOpacity>


        {/* Menu */}
        <View style={{
          // padding: 10,
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 2.5,
            marginBottom: 5,
            color: colors.black
          }}>Menu</Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10,
          }}>
            {kategori.map(i => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('ProductCategory', {
                  fid_kategori: i.id,
                  nama_kategori: i.nama_kategori
                })} style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <View style={{
                    borderWidth: 1,
                    borderColor: colors.border_form,
                    borderRadius: 15,
                    padding: 15
                  }}>
                    <Image style={{
                      width: myDimensi / 0.8,
                      height: myDimensi / 0.8,
                      resizeMode: 'contain'
                    }} source={{
                      uri: i.image
                    }} />
                  </View>

                  <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: myDimensi / 2.7,
                    marginTop: 10,
                  }}>{i.nama_kategori}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>


        {/* Produk */}
        <View style={{
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1
            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                marginBottom: 2,
                color: colors.black
              }}>Produk Populer</Text>

              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: myDimensi / 2.5,
                marginBottom: 5,
                color: colors.border_label
              }}>Best Seller</Text>

            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ProductAll')} style={{

            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                marginBottom: 5,
                color: colors.primary
              }}>Lihat semua</Text>



            </TouchableOpacity>
          </View>

          {/* list data */}

          <FlatList data={produk} renderItem={__renderItem} numColumns={2} />

        </View>



      </ScrollView>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})