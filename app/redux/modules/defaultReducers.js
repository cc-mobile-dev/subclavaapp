// @flow

const animationState = {
  action: null,
};

const accountState = {
  balance: 0,
  history: [],
  lastTransaction: null,
  isFetching: false
}

const globalState = {
  location: null,
  constants: null,
  branchData: null
};

const chatroomsState = {
  allChatrooms: [],
  newChatroomData: {
    title: '',
    description: '',
    rules: '',
    imageUrl: '',
  },
  chatroomsByLocation: [],
  isFetching: false
};

const promotionsState = {
  didVoteForPromotions: false,
  coupons: [],
};

const favoriteChatroomsState = {
  favoriteChatrooms: [],
  isFavoriting: false
};

const joinedChatroomsState = {
  memberships: [],
  subbed: [],
  tryingToJoin: null,
  isJoining: false,
  isLeaving: false,
  isFetching: false
}

const notificationState = {
  items: [],
  isFetching: false
};

const searchState = {
  recentSearches: [],
};

const authState = {
  currentUser: null,
  sendbirdLogin: false,
  isFetching: false,
  appliedAsTalent: false,
  onboarded: false,
  token: ''
};

const sendBirdState = {
  login: {
    user: null
  },
  chat: null,
  groupChannel: null
}

const subscriptionsState = {
  subscriptions: [],
  entitlement: '',
  lastestPurchasedProduct: null,
  latestTransactionDate: null, // date to capture the when the user tried
  isSubscribing: false
}

export const giveawaysState = {
  all: [],
  isFetching: false,
  selectedGiveaway: null,
  memberships: {},
  latestGiveaway: null
}

export const liveVideoState = {
  isActive: false,
  token: '',
  expiresIn: null,
  channel: '',
  uid: null,
  isFetching: false,
  currentView: null,
  totalViewers: 0
}

export const socketState = {
  connected: false
}


export const chatState = {
  messages: [],
  connected: false,
  currentUser: {
    username: '',
    profileImage: ''
  },
  numUsers: 0
}

export const defaultReducers = {
  animationState,
  chatroomsState,
  searchState,
  globalState,
  authState,
  favoriteChatroomsState,
  joinedChatroomsState,
  notificationState,
  promotionsState,
  sendBirdState,
  subscriptionsState,
  giveawaysState,
  liveVideoState,
  socketState,
  accountState
};
