import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import OrderCardCC from '../HomeStore/OrderCardCC';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {BaseButton} from '../../components/BaseButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import style from '../../assets/css/style';
import {colors} from '../../constraints';
import {useTransition} from 'react';
import {useTranslation} from 'react-i18next';
const Catalog = () => {
  const dataCompleted = [
    {
      id: '1',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },

    {
      id: '2',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '3',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '4',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '5',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '6',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
  ];
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [catalogData, setCatalogData] = useState();

  const handleGetCatData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      // setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const store_id = await AsyncStorage.getItem('store_id');
      console.log(store_id, 'store_idstore_id');
      if (store_id || store_id != undefined || store_id != null) {
        const res = await ApiRequest({
          type: 'get_data',
          table_name: 'stores_gallery',
          // user_id: user_id,
          store_id: JSON.parse(store_id),
          // own: 1,
          // last_id:""
        });
        const resp = res.data.data;

        setRefreshing(false);
        setCatalogData(resp);
      }
      // setShowLoadingModal(false);
    } catch (err) {
    } finally {
      // setShowLoadingModal(false);
      setRefreshing(false);
      setLoading(false);
    }
  };

  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };
  const handleGetCatDataMore = async () => {
    try {
      setBottomLoader(true);
      // setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      // console.log(user_id);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        user_id: user_id,
        last_id: catalogData[catalogData.length - 1]?.id,
      });
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setCatalogData([...catalogData, ...resp]);
      }
      // console.log(resp, 'resp///');
      // setCatalogData(resp);
      // setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setBottomLoader(false);
      // setShowLoadingModal(false);
      // setLoading(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleGetCatData();
  }, [isFocused]);
  const navigation = useNavigation();
  const onRefresh = () => {
    setRefreshing(true);
    handleGetCatData();
  };
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader title={t('Catalog')} />
      <BaseButton
        defaultStyle={{
          height: 30,
          width: 120,
          alignSelf: 'flex-start',
          marginBottom: 20,
        }}
        textStyle={[style.font12Re, {color: colors.white}]}
        title={t('Add More Gallery')}
        onPress={() => navigation.navigate('AddFlowers')}
      />
      <View style={{}}>
        <FlatList
          data={catalogData}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '100%',
                alignSelf: 'center',
              }}>
              <OrderNotFound
                title={t('Not Found data')}
                subtitle={t("You don't have any data at this time")}
              />
              <BaseButton
                title={t('Add Gallery')}
                onPress={() => navigation.navigate('AddFlowers')}
              />
            </View>
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 4,
          }}
          numColumns={2}
          onScroll={handleScroll}
          onEndReached={scrolled ? handleGetCatDataMore : null}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            bottomLoader && (
              <ActivityIndicator size="large" color={colors.gray} />
            )
          }
          ListFooterComponentStyle={{
            width: '100%',
            marginTop: 5,
          }}
          renderItem={({item}) => (
            <OrderCardCC item={item} images={item.images} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </Layout>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  d: {},
});
