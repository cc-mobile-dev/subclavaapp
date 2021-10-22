import React from 'react';
import { Image } from 'react-native';
import { compose } from 'recompose';
import { connectAuth } from '../../../../redux';
import {
    HomeScreen,
    // MapScreen,
    CreateChatroomScreen,
    ProfileScreen,
    Notifications,
    FavoriteChatroomsScreen,
    CreatedChatroomsScreen,
    SearchScreen,
    SettingsScreen,
    EditAccountScreen,
    ChatroomScreen,
    ChatroomInfoScreen,
    PdfDisplay,
    BlockedUsersScreen,
    CategoryScreen,
    CategorySelectionScreen
} from '../..'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoLiveScreen from '../../GoLive/GoLiveScreen'; 5

const Stack = createStackNavigator();

const SearchNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Search'} component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default SearchNavigator