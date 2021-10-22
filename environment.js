const ENV = {
  dev: {
    authServiceUrl: "http://3.14.237.211:3000/api/v1",
    chatroomServiceUrl: "http://3.18.86.24:3000/api/v1",
    uploadServiceUrl: "http://18.221.240.25:3000/api/v1",
    amplitudeApiKey: null,
  },
  staging: {
    authServiceUrl: "http://3.14.237.211:3000/api/v1",
    chatroomServiceUrl: "http://3.18.86.24:3000/api/v1",
    uploadServiceUrl: "http://18.221.240.25:3000/api/v1",
    amplitudeApiKey: null,
  },
  prod: {
    authServiceUrl: "http://3.14.237.211:3000/api/v1",
    chatroomServiceUrl: "http://3.18.86.24:3000/api/v1",
    uploadServiceUrl: "http://18.221.240.25:3000/api/v1",
    amplitudeApiKey: null,
  }
};

const getEnvVars = (env = process.env.NODE_ENV) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  // if (__DEV__) {
  //   return ENV.dev;
  // } else if (env === 'staging') {
  //   return ENV.staging;
  // } else if (env === 'prod') {
  //   return ENV.prod;
  // }
  return {
    authServiceUrl: "http://3.14.237.211:3000/api/v1",
    // authServiceUrl: "http://localhost:3000/api/v1",
    chatroomServiceUrl: "http://3.18.86.24:3000/api/v1",
    // chatroomServiceUrl: "http://localhost:3000/api/v1",
    uploadServiceUrl: "http://18.221.240.25:3000/api/v1",
    amplitudeApiKey: null,
  }
};

export default getEnvVars;
