import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyCarouser from '../../components/MyCarouser';
import { ImageBackground } from 'react-native';
export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const [kategori, setKategori] = useState([]);
  const [produk, setProduk] = useState([]);
  const [best, setBest] = useState({});

  useEffect(() => {
    getData('user').then(u => {
      if (!u) {
        setUser({
          nama_lengkap: 'Qopi untuk semua',
          nama_outlet: 'Silahkan pilih',
          alamat_outlet: '',
        })
      } else {
        setUser(u)
      }
    });
    getProduk();
    getTerbaik();
    getKategori();
  }, []);


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
      console.log(res.data);
      setProduk(res.data);
    })
  }


  const getTerbaik = () => {
    axios.post(apiURL + 'v1_terbaik.php', {
      api_token: urlToken,
    }).then(res => {
      console.log('terbaik', res.data);
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
        }}>
          <Text style={{
            fontFamily: fonts.primary[400],
            fontSize: myDimensi / 2
          }}>Hi, <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 2
          }}>{user.nama_lengkap}</Text></Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/cart.png')} style={{
            width: 24,
            height: 24,
          }} />
        </TouchableOpacity>

        <TouchableOpacity style={{
          marginHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/bell.png')} style={{
            width: 16,
            height: 20
          }} />
        </TouchableOpacity>

        <TouchableOpacity style={{
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
        {/* <View style={{
          flexDirection: 'row',
          borderRadius: 15,
          paddingVertical: 5,
          marginVertical: 5,
          backgroundColor: colors.member_card,
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
              }}>Permaisuri</Text>
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
              }}>150 point</Text>
            </View>
          </View>
        </View> */}

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
        <TouchableOpacity activeOpacity={0.8} style={{
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
                <TouchableOpacity style={{
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
            <View style={{

            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: myDimensi / 2.5,
                marginBottom: 5,
                color: colors.primary
              }}>Lihat semua</Text>



            </View>
          </View>

          {/* list data */}

          <FlatList data={produk} renderItem={__renderItem} numColumns={2} />

        </View>



      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})