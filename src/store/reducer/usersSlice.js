import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import ApiRequest from '../../Services/ApiRequest';

// First, define the reducer and action creators via `createSlice`
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    users: {},
    user_id: '',
    user_type: '',
    business_type: '',
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = true;
    },
    usersLoadingEnd(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = false;
    },

    usersReceived(state, action) {
      state.loading = false;
      state.users = action.payload;
    },

    userLogin(state, action) {
      state.user_id = action.payload.user_id;
      state.user_type = action.payload.user_type;
    },
    userType(state, action) {
      state.user_type = action.payload.user_type;
    },
    userId(state, action) {
      state.user_id = action.payload.user_id;
    },

    userLogout(state) {
      state.business_type = '';
      state.loading = false;
      state.users = {};
      state.user_id = '';
      state.user_type = '';
    },
  },
});

// // Action creators are generated for each case reducer function
// Destructure and export the plain action creators
export const {
  usersLoading,
  usersReceived,
  userLogin,
  userLogout,
  usersLoadingEnd,
  userType,
  userId,
} = usersSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchUsers = () => async dispatch => {
  const user_id = await AsyncStorage.getItem('user_id');
  if (user_id) {
    try {
      dispatch(usersLoading());
      const response = await ApiRequest({type: 'profile', user_id: user_id});
      dispatch(usersReceived(response.data.profile));
    } catch (error) {}
  }
};
