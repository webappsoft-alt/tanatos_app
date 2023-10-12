import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo, useReducer, useState} from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import PhoneNumberInput from '../../components/PhoneInput';
import ApiRequest from '../../Services/ApiRequest';

const Phone = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // const formDataUser = route?.params?.formDataUser;
  const {formData, account_Type, city, state, country, area} = route.params;
  // console.log(formData, '>>>>>>>>>>>>>>>'); // Check if it's defined and contains data

  const [data, setData] = useState({
    phoneNumber: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleOTP = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'send_otp',
        phone: data.phoneNumber,
        // hash: '',
      });
      const resp = res?.data;

      // if (res?.data?.user_exist === true) {

      if (formData && account_Type && data.phoneNumber) {
        navigation.navigate('OtpVerified', {
          OTP: res?.data?.code,
          formData: formData,
          account_Type: account_Type,
          phone: data.phoneNumber,
          city: city,
          state: state,
          country: country,
          area: area,
        });
      }
      setIsLoading(false);
      // } else {
      setIsLoading(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const [valid, setValid] = useState(true);

  useMemo(() => {
    const isFormFilled = data.phoneNumber && valid;
    setValid(!isFormFilled);
  }, [data.phoneNumber]);

  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
        // translucent={true}
      />
      <AuthHeader
        title={'Welcome Back!'}
        subTitle={'Enter Your Phone number to get start'}
      />
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* <AppTextInput titlext={'Name'} placeholder={'Name'} />
        <AppTextInput titleText={'Country'} placeholder={'Country'} />
        <AppTextInput titleText={'Phone Number'} placeholder={'Phone Number'} /> */}

        <PhoneNumberInput
          title={'Phone Number'}
          valid={valid}
          value={data.phoneNumber}
          setValid={setValid}
          setValue={setData}
          formData={data}
        />
        <BaseButton
          title={
            isLoading ? <ActivityIndicator color={colors.white} /> : 'Continue'
          }
          disabled={valid || isLoading}
          defaultStyle={{marginTop: 30}}
          onPress={handleOTP}
        />
      </ScrollView>
    </Layout>
  );
};

export default Phone;

const styles = StyleSheet.create({});
