import React, { useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import { windowWidth } from '../../utils/fonts';

export default function Splash({ navigation }) {
  const scaleLogo = new Animated.Value(0.1);
  const scaleText = new Animated.Value(100);

  Animated.timing(scaleLogo, {
    toValue: 1,
    duration: 1000,
  }).start();


  useEffect(() => {

    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 1500)
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Animated.Image
        source={require('../../assets/logo.png')}
        style={{
          resizeMode: 'contain',
          height: windowWidth / 1.2,
          aspectRatio: scaleLogo,
        }}
      />
      <ActivityIndicator size="large" color={colors.primary} />
    </SafeAreaView>
  );
}
