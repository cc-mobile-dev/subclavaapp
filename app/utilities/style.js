// packages
import { PixelRatio } from 'react-native';

/**
 * Style utility functions
 */

/**
 * Stringifies a percentage.
 *
 * @param {number} num percentage
 * @returns {string} percentage as a string
 */
export const percentage = num => `${num}%`;

/**
 * Scales the number argument to the device's font scale.
 *
 * @param {number} num percentage
 * @returns {string} percentage as a string
 */
export const size = num => num / PixelRatio.getFontScale();

/**
 * Color Constants
 *
 * @param {string} either [success, error, info]
 * @returns {object} style object
 */
export const color = {
  SUCCESS: {
    color: '#379D4D',
    backgroundColor: '#D4EDDA',
    borderColor: '#c3e6cb',
  },
  INFO: {
    color: '#FFEFED',
    backgroundColor: '#FF7B69',
    borderColor: '#bee5eb',
    zIndex: 1000,
  },
  WARNING: {
    color: '#856404',
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
  },
  DANGER: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
};
