import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useMemo, useRef, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, constants, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import {validateEmail, validatePassword} from '../../utils/Validations';
import {DatePicker} from '../../components/DateComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import Tick from '../../assets/Tick.svg';
import PhoneNumberInput from '../../components/PhoneInput/PhoneInput';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiRequest from '../../Services/ApiRequest';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ToastMessage} from '../../utils/Toast';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
const Signup = ({route}) => {
  const account_Type = route?.params?.account_Type;
  // console.log(account_Type);
  const navigation = useNavigation();
  const [isSecureText, setIsSecureText] = useState(true);
  const [isSecureTextConfirm, setIsSecureTextConfirm] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [markerData, setMarkerData] = useState({latitude: '', longitude: ''});
  const [country, setCountry] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    confirmPassword: '',
    phoneNumber: '',
    accountType: '',
    address: '',
    shopName: '',
    category: '',
    contactNumber: '',
    shopLocation: '',
    starting_date: undefined,
    starting_dateModal: undefined,
  });
  console.log(formData);

  const [data, setData] = useState({
    phoneNumber: '',
  });
  const validateForm = useMemo(() => {
    const valueValid = valid && data.phoneNumber;
    return valueValid;
  }, [data]);

  const [disable, setDisable] = useState(true);
  useMemo(() => {
    let isData = false;

    // if (account_Type === 'customer') {
    isData =
      validateEmail(formData.email) &&
      formData.email.trim() &&
      formData.name.trim() &&
      formData.confirmPassword.trim() &&
      formData.confirmPassword.trim().length > 5 &&
      formData.password.trim().length > 5 &&
      formData.password.trim() &&
      formData.password === formData.confirmPassword;
    setDisable(!isData);
  }, [account_Type, formData]);

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [valid, setValid] = useState(true);

  const ref = useRef(null);
  const openBottomSheet = () => {
    ref.current.open();
  };
  const handleSelect = async type => {
    try {
      setFormData({
        ...formData,
        company_id: '',
      });
      // await AsyncStorage.setItem('acc_type', type);
      setFormData({...formData, accountType: type});
      ref.current.close();
    } catch (e) {
      // saving error
      console.log('errrrr....in storage');
    }
  };

  ////handle check email
  const [isEmailValid, setIsEmailValid] = useState(true);
  const checkEmailCheck = async () => {
    try {
      const res = await ApiRequest({
        type: 'check_email',
        email: formData.email,
      });

      if (res.data.result === false && formData?.email?.length > 2) {
        setIsEmailValid(false);

        ToastMessage(res?.data?.message);
        return <Icon name="close" size={30} color="red" />;
      } else if (res.data.result === true && formData?.email?.length > 2) {
        setIsEmailValid(true);
        return <Icon name="checkmark" size={30} color="green" />;
      } else {
        // setIsEmailValid(true);
        console.log('error');
        // return <Icon name="checkmark" size={30} color="green" />;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [iconToShow, setIconToShow] = useState(null);
  const checkEmail = async () => {
    const icon = await checkEmailCheck();
    setIconToShow(icon);
  };
  useEffect(() => {
    if (formData.email.length === 0) {
      checkEmail();
    }
  }, [formData.email]);
  //////////////////////////
  const [loading, setLoading] = useState(false);
  const handleSignup = () => {
    setLoading(true);
    // console.log(formData, '123');
    if (formData) {
      // navigation.navigate(account_Type === 'store' ? 'AddNews' : 'Phone', {
      // navigation.navigate(account_Type === 'store' ? 'CreateStore' : 'Phone', {
      // navigation.navigate('Phone', {

      navigation.navigate('ShareAddress', {
        formData: formData,
        account_Type: account_Type ? account_Type : formData.accountType,
        phone: data.phoneNumber,
        city: city,
        state: state,
        country: country,
        area: area,
      });
      setLoading(false);
    }
    // setFormData('');
  };

  const {t, i18n} = useTranslation();

  return (
    <Layout>
      {/* <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
      /> */}
      <AuthHeader title={t('singup1')} subTitle={t('singup2')} />
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* {account_Type === 'funeral' || account_Type === 'customer' ? ( */}
        {/* <> */}
        {!route?.params?.account_Type ? (
          <>
            <Text
              style={[
                style.font16Re,
                {fontFamily: fonts.medium, marginVertical: 4},
              ]}>
              {t('Account Type')}
            </Text>
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                backgroundColor: '#F5F5F5',
                marginBottom: 10,
                justifyContent: 'space-between',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                ref.current.open();
              }}>
              <Text
                style={[
                  style.font16Re,
                  {color: !formData.accountType ? '#969696' : colors.gray},
                ]}>
                {formData.accountType
                  ? formData.accountType
                  : t('Account Type')}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        <AppTextInput
          titleText={t('Name')}
          placeholder={t('Name')}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />

        <View style={{justifyContent: 'center', flex: 1}}>
          <AppTextInput
            titleText={t('Email')}
            keyboardType="email-address"
            placeholder={t('Email')}
            onEndEditing={checkEmail}
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
          />

          <PhoneNumberInput
            title={'Phone Number'}
            valid={valid}
            value={data.phoneNumber}
            setValid={setValid}
            setValue={setData}
            formData={data}
          />
          <Pressable style={{position: 'absolute', right: 10, top: 30}}>
            {iconToShow ? iconToShow : null}
          </Pressable>
          {!validateEmail(formData.email) && formData.email.length >= 2 && (
            <Text style={{top: -8, color: colors.red}}>
              {' '}
              {t('Enter valid email (abc@gmail.com)')}
            </Text>
          )}
        </View>
        <AppTextInput
          titleText={t('Password')}
          placeholder={t('Password')}
          secureTextEntry={isSecureText}
          setIsSecureText={setIsSecureText}
          password
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        {!validatePassword(formData.password) &&
          formData.password.length >= 2 && (
            <Text style={{top: -8, color: colors.red}}>
              {t('Password must be 8 digits (Aa1234*/)')}
            </Text>
          )}
        <AppTextInput
          titleText={t('Confirm Password')}
          placeholder={t('Confirm Password')}
          secureTextEntry={isSecureTextConfirm}
          setIsSecureText={setIsSecureTextConfirm}
          password
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />
        {!validatePassword(formData.confirmPassword) &&
          formData.confirmPassword.length >= 2 && (
            <Text style={{top: -8, color: colors.red}}>
              {t('Password must be 8 digits (Aa1234*/)')}
            </Text>
          )}
        <Text
          style={[
            style.font16Re,
            {fontFamily: fonts.medium, marginTop: 0, marginBottom: 4},
          ]}>
          {t('singup3')}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text> {area ? area : t('singup4')}</Text>
        </TouchableOpacity>

        {/* <DatePicker
          title={t('singup5')}
          date={formData.starting_date}
          show={formData.starting_dateModal}
          // disable={route.params?.user === 'owner' ? false : true}
          showDatepicker={() => {
            setFormData(prevState => ({
              ...prevState,
              starting_dateModal: true,
            }));
          }}
          onChange={(event, selectedDate) => {
            onDateChange(
              event,
              selectedDate,
              'starting_date',
              'starting_dateModal',
            );
          }}
          maxDate={new Date()}
        /> */}

        <BaseButton
          title={
            loading ? <ActivityIndicator color={colors.white} /> : t('Continue')
          }
          defaultStyle={{marginVertical: 20}}
          disabled={disable || loading || !isEmailValid || !valid}
          onPress={handleSignup}
        />

        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={[
              style.font16Re,
              {
                textAlign: 'center',
                color: colors.gray,
                fontFamily: fonts.medium,
              },
            ]}>
            {t('welcome6')}
          </Text>
          <TouchableOpacity
            style={{marginTop: 3}}
            onPress={() => {
              // toggleLanguage();
              navigation.navigate('login');
            }}>
            <Text
              style={[
                style.font16Re,
                {
                  textAlign: 'center',
                  color: colors.primaryColor,
                  fontFamily: fonts.medium,
                  paddingLeft: 5,
                },
              ]}>
              {t('Signin')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <RBSheet
        ref={ref}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        openDuration={250}
        customStyles={{
          wrapper: {
            // backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          },
        }}>
        <View>
          <Text style={[style.font16Re, {marginVertical: 15}]}>
            {t('Account Type')}
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.gray5,
              marginBottom: 10,
              justifyContent: 'space-between',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              handleSelect('customer');
            }}>
            <Text style={style.font16Re}>{t('customer')}</Text>
            {formData.accountType === 'customer' ? <Tick /> : null}
            {/* <Tick /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.gray5,
              marginBottom: 10,
              justifyContent: 'space-between',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              handleSelect('store');
            }}>
            <Text style={style.font16Re}>{t('store')}</Text>
            {formData.accountType === 'store' ? <Tick /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.gray5,
              marginBottom: 10,
              justifyContent: 'space-between',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              handleSelect('funeral');
            }}>
            <Text style={style.font16Re}>{t('funeral')}</Text>
            {formData.accountType === 'funeral' ? <Tick /> : null}
          </TouchableOpacity>
        </View>
      </RBSheet>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        defaultStyle={{}}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          }}>
          <GooglePlacesAutocomplete
            placeholder={t('SearchD')}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            enablePoweredByContainer={false}
            styles={{
              container: {
                width: '100%',
                alignSelf: 'center',
              },
              textInput: {
                height: '110%',

                backgroundColor: 'white',

                color: 'black',
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              // console.log(data, details, '12345');
              //
              setCountry(data.terms[data.terms.length - 1].value);
              setCity(data?.terms[data.terms.length - 2]?.value);
              // 'details' is provided when fetchDetails = true
              setMarkerData({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea(data.description);
              setState(data.structured_formatting.secondary_text);
              // hideModal();
              setModalVisible(false);
            }}
            query={{
              key: constants.MAP_API_KEY,
              language: 'en',
            }}
          />
        </View>
      </Modal>
    </Layout>
  );
};

export default Signup;

const styles = StyleSheet.create({});
