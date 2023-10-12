import {StyleSheet, Text, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../../components/Layout';

const Splash = () => {
  const navigation = useNavigation();
  const getUserId = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('id...', user_id);
    // const user_id = '';
    setTimeout(() => {
      if (user_id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
              state: {
                routes: [
                  {
                    name: 'AppStack',
                  },
                ],
              },
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'AuthStack',
            },
          ],
        });
      }
    }, 1500);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <Layout>
      <Image
        source={require('../../assets/logo_splash.png')}
        style={{width: 125}}
        resizeMode="center"
      />
    </Layout>
  );
};

export default Splash;

const styles = StyleSheet.create({});

// import React from 'react';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// const GooglePlacesInput = () => {
//   return (
//     <GooglePlacesAutocomplete
//       placeholder="Search"
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
//       query={{
//         key: 'AIzaSyCZLtofoePX_DcD3LIoSYvBg4sKVU-JZR4',
//         language: 'en',
//       }}
//     />
//   );
// };

// export default GooglePlacesInput;
