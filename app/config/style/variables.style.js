// packages
import { Dimensions } from 'react-native';

// modules
import { size, percentage } from '../../utilities';

/**
 * @file Style constants.
 * @module style_config
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// spacing
const MARGIN = size(20);
const COLUMN_WIDTH = size(20);
const GUTTER_WIDTH = size(16);

// elements
const WRAPPER_HEIGHT = percentage(96);
const WRAPPER_WIDTH = percentage(96);

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export {
  MARGIN,
  COLUMN_WIDTH,
  GUTTER_WIDTH,
  WRAPPER_HEIGHT,
  WRAPPER_WIDTH,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
};
