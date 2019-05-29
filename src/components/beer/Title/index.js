import glamorous from 'glamorous-native';
import { colors } from '../../../config/theme';

const Title = glamorous.text((props, theme) => ({
  fontFamily: 'robotoRegular',
  fontSize: 12,
  color: props.color || colors.black,
  lineHeight: 20,
  textAlign: props.align || 'left',
  alignSelf: props.alignSelf || 'center'
}));

export default Title;