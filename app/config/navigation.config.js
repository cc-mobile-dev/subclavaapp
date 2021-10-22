// packages
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { fromRight, fromBottom } from 'react-navigation-transitions';

// screens
import {
  SignIn,
  OnboardScreen,
  OnboardScreen2,
  OnboardScreen3,
  Verification,
  MapScreen,
  CreateChatroomScreen,
  SearchScreen,
  ProfileScreen,
  SettingsScreen,
  CreatedChatroomsScreen,
  ChatroomScreen,
  ThreadScreen,
  EditAccountScreen,
  Notifications,
  FavoriteChatroomsScreen,
  PromotionsScreen,
  BlockedUsersScreen,
  ResetPassword,
  PdfDisplay,
  HomeScreen
} from '../components/screens';
import { NavBar } from '../components/screens/components/NavBar';

const NoAuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      path: '/signin',
    },
    Verification: {
      screen: Verification,
      path: '/verify',
    },
    Onboard: {
      screen: OnboardScreen,
      path: '/onboard',
    },
    Onboard2: {
      screen: OnboardScreen2,
      path: '/onboard2',
    },
    Onboard3: {
      screen: OnboardScreen3,
      path: '/onboard3',
    },
    ResetPassword: {
      screen: ResetPassword,
      path: '/resetpassword'
    },
    TermsOfService: {
      screen: PdfDisplay,
      path: '/termsofservice'
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      //   headerStyle: {
      //     backgroundColor: "#6039FE"
      //   },
      //   title: 'Clava',
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
    },
    transitionConfig: () => fromRight(),
    initialRouteName: 'SignIn',
  }
);

const BottomTabNav = createBottomTabNavigator(
  {
    Home: createStackNavigator({ Home: HomeScreen }), 
    // {
    //   screen: HomeScreen,
    //   path: '/home',
    //   navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS }
    // },
    Map: createStackNavigator({ Map: MapScreen }), 
    // {
    //   screen: MapScreen,
    //   path: '/map',
    //   navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS }
    // },
    CreateChatroom: createStackNavigator({ CreateChatroom: CreateChatroomScreen }), 
    // {
    //   screen: CreateChatroomScreen,
    //   path: '/new-chatroom',
    //   navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS }
    // },
    Notifications: createStackNavigator({ Notifications: Notifications }), 
    // {
    //   screen: Notifications,
    //   path: '/notifications',
    //   navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS }
    // },
    Profile: createStackNavigator({ Profile: ProfileScreen })
    // {
    //   screen: ProfileScreen,
    //   path: '/profile',
    //   navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS }
    // },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarButtonComponent: (props) => {
        return <NavBar
          routeName={navigation.state.routeName}
          { ...props }
        />
      }
    }),
  }
)

const AuthStack = createStackNavigator(
  {
    NavBar: {
      screen: NavBar,
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Home: {
      screen: HomeScreen,
      path: '/home',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Map: {
      screen: MapScreen,
      path: '/map',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    CreateChatroom: {
      screen: CreateChatroomScreen,
      path: '/new-chatroom',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Search: {
      screen: SearchScreen,
      path: '/search',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Profile: {
      screen: ProfileScreen,
      path: '/profile',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Settings: {
      screen: SettingsScreen,
      path: '/settings',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    CreatedChatrooms: {
      screen: CreatedChatroomsScreen,
      path: '/created-chatrooms',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    ChatroomScreen: {
      screen: ChatroomScreen,
      path: '/chatroom',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    ThreadScreen: {
      screen: ThreadScreen,
      path: '/threadScreen',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    EditAccount: {
      screen: EditAccountScreen,
      path: '/edit-account',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Notifications: {
      screen: Notifications,
      path: '/notifications',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    FavoriteChatrooms: {
      screen: FavoriteChatroomsScreen,
      path: '/favoriteChatrooms',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    Promotions: {
      screen: PromotionsScreen,
      path: '/promotions',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    BlockedUsers: {
      screen: BlockedUsersScreen,
      path: '/blockedUsers',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    },
    PrivacyPolicy: {
      screen: PdfDisplay,
      path: '/privacyPolicy',
      navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } 
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      // ...TransitionPresets.ModalSlideFromBottomIOS
    },
    initialRouteName: 'Home',
    // transitionConfig: () => ({...TransitionPresets.ModalSlideFromBottomIOS}),
  }
);

export { NoAuthStack, AuthStack, BottomTabNav };
