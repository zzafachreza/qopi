import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts, myDimensi } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  iconname,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  nolabel = false,
  autoFocus,
  multiline,
  onSubmitEditing,
  label2,
  styleLabel,
  colorIcon = colors.primary,
}) {
  return (
    <>
      {!nolabel && <Text style={{
        fontFamily: fonts.primary.normal,
        fontSize: myDimensi / 2,
        color: colors.border_label,
        marginBottom: 5,
      }}>{label}</Text>
      }
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
          <Icon type='ionicon' name={iconname} size={myDimensi / 1.6} color={colors.primary} />
        </View>
        <TextInput onSubmitEditing={onSubmitEditing} autoFocus={autoFocus} autoCapitalize='none' value={value} multiline={multiline} onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={{
            borderWidth: 1,
            borderColor: colors.border_form,
            borderRadius: 10,
            fontSize: myDimensi / 2,
            paddingLeft: 35,
            color: colors.black,
            paddingTop: 12,
            fontFamily: fonts.primary.normal
          }}
          placeholderTextColor={colors.border_form}
          placeholder={placeholder}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
