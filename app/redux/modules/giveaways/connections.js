import AsyncStorage from '@react-native-community/async-storage';
import getEnvVars from '../../../../environment';
import { getJoinedChatrooms } from '../../../utilities';
import { checkChatroomSubscriptions } from '../../../utilities/api';

const { chatroomServiceUrl } = getEnvVars();