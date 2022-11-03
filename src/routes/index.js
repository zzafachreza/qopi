import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Login,
  Register,
  Home,
  Product,
  GetStarted,
  Otp,
  RegisterSuccess,
  Wish,
  History,
  Account,
  AccountEdit,
  Cart,
  Outlet,
  OutletDetail,
  CartEdit,
  Payment,
  Transaction,
  TransactionDetail,
  PaymentSuccess,
  Notification,
  ProductAll,
  ProductCategory,
  Voucher,
  AccountMember
} from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';
import { colors } from '../utils/colors';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Wish" component={Wish} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};



export default function Router() {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>


      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />







      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profil',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />

      <Stack.Screen
        name="AccountMember"
        component={AccountMember}
        options={{
          headerShown: true,
          headerTitle: 'Informasi Membership',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />


      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          headerTitle: 'Keranjang',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />

      <Stack.Screen
        name="CartEdit"
        component={CartEdit}
        options={{
          headerShown: true,
          headerTitle: 'Ubah Keranjang',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />

      <Stack.Screen
        name="Outlet"
        component={Outlet}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Outlet',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />

      <Stack.Screen
        name="OutletDetail"
        component={OutletDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Outlet',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />


      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
          headerTitle: 'Pembayaran',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />


      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerShown: false,
          headerTitle: 'Pembayaran',
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }}
      />



      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: true,
          headerTitle: 'Pemberitahuan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white

        }}
      />

      <Stack.Screen
        name="ProductAll"
        component={ProductAll}
        options={{
          headerShown: false,
          headerTitle: 'Pemberitahuan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white

        }}
      />


      <Stack.Screen
        name="ProductCategory"
        component={ProductCategory}
        options={{
          headerShown: false,
          headerTitle: 'Pemberitahuan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white

        }}
      />


      <Stack.Screen
        name="Voucher"
        component={Voucher}
        options={{
          headerShown: true,
          headerTitle: 'Voucher',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white

        }}
      />






    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
