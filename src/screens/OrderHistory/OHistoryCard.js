import {StyleSheet, Image, top, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';

const OHistoryCard = ({success, date, orderId, image, title}) => {
  return (
    <View
      style={{
        width: '99%',
        marginVertical: 6,
        elevation: 4,
        shadowColor: colors.elev,
        backgroundColor: colors.white,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //   elevation: 4,

          // width: '100%',  elevation: 4,
          // backgroundColor: 'red',
        }}>
        {/* <Text>sdsdsds</Text> */}
        <Image
          style={{
            height: 100,
            width: 100,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            elevation: 4,
          }}
          source={image}
        />
        <View
          style={{
            justifyContent: 'space-between',
            height: 100,
            padding: 10,
            width: '70%',
            backgroundColor: colors.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            // elevation: 4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={[style.font14Re, {fontFamily: fonts.medium}]}>
              {title}
            </Text>
            <Text
              style={[
                style.font12Re,
                {
                  color: colors.textGray,
                  fontFamily: fonts.medium,
                  color: '#8C8994',
                },
              ]}>
              {orderId}
            </Text>
          </View>
          <Text
            style={[
              style.font12Re,
              {
                color: colors.textGray,
                top: -10,
                fontFamily: fonts.medium,
                color: '#8C8994',
              },
            ]}>
            {date}
          </Text>
          <Text
            style={[
              style.font14Re,
              {
                alignSelf: 'flex-end',
                color: success === 'Success' ? '#14A307' : '#EC0000',
                fontFamily: fonts.medium,
                right: 5,
              },
            ]}>
            {success}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OHistoryCard;

const styles = StyleSheet.create({});
