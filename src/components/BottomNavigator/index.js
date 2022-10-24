import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { getData } from '../../utils/localStorage';

export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ backgroundColor: colors.white, flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;



        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        let labelName = 'Beranda';

        if (label === 'Home') {
          iconName = 'home-outline';
        } else if (label === 'Account') {
          iconName = 'person-outline';
          labelName = 'Akun'
        } else if (label === 'History') {
          iconName = 'receipt-outline';
          labelName = 'Transaksi';
        } else if (label === 'Wish') {
          iconName = 'heart-outline';
          labelName = 'Favorit';
        } else if (label === 'CartSewa') {
          iconName = 'file-tray-full-outline';
          labelName = 'Sewa';
        } else if (label === 'Pesanan') {
          iconName = 'cube-outline';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              getData('user').then(res => {
                if (!res) {
                  navigation.navigate('Login')
                } else {
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }
              })




            }}

            // label === 'Account' || label === 'History' | label === 'Wish'
            // ? () => {
            //   getData('user').then(res => {
            //     if (!res) {
            //       navigation.navigate('Login')
            //     } else {
            //       onPress
            //     }
            //   })
            // }

            // : onPress
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{
                color: isFocused ? colors.white : '#919095',
                paddingTop: 5,
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  width: 80,
                  bottom: 0,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={isFocused ? iconName.replace('-outline', '') : iconName}
                  type="ionicon"
                  size={windowWidth / 20}
                  color={isFocused ? colors.primary : colors.primary}
                />

                <Text
                  style={{
                    fontSize: windowWidth / 45,
                    color: isFocused ? colors.primary : colors.primary,
                  }}>
                  {labelName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
