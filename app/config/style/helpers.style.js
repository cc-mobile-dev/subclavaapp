// packages
import { StyleSheet } from 'react-native';

// modules
import { BASE } from './colors.style';
import { FONT_SMALL } from './typography.style';
import { percentage, size } from '../../utilities';

/**
 * @file Manages a set of helper styles for the application.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const helpers = StyleSheet.create({
  ada_container: {
    flex: 1,
  },
  ada_content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: percentage(100),
  },
  ada_div: {
    width: percentage(100),
  },
  light_text: {
    color: BASE.light,
    fontSize: FONT_SMALL,
  },
  span: {
    fontWeight: '600',
    marginLeft: size(5),
  },
});

export default helpers;
