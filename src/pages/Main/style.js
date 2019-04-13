import { StyleSheet } from 'react-native';

import {
  paddingHorizontal,
  justifyContent,
  alignItems,
  borderRadius,
  fontSize,
  marginTop,
  height,
  primaryColor,
} from '../../util/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent,
    // alignItems = strech to occupy all the width space
    alignItems: 'stretch',
    paddingHorizontal: paddingHorizontal * 1.5,
  },

  logo: {
    alignSelf: 'center',
  },

  input: {
    height,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius,
    fontSize,
    marginTop: marginTop * 3,
    paddingHorizontal,
  },

  button: {
    height,
    borderRadius,
    fontSize,
    paddingHorizontal,
    justifyContent,
    alignItems,
    marginTop,
    backgroundColor: primaryColor,
  },

  buttonText: {
    fontSize,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default styles;
