import { Platform } from 'react-native'

export const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 33,
    android: 41,
    web: 34,
})
export const MAX_COMPOSER_HEIGHT = 200
export const DEFAULT_PLACEHOLDER = 'Type a message...'
export const DATE_FORMAT = 'll'
export const TIME_FORMAT = 'LT'