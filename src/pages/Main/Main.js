import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../../assets/logo.png';
import Loading from '../component/Loading/Loading';

import api from '../../services/api';

import styles from './style';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.checkIfExists = this.checkIfExists.bind(this);

    this.state = {
      title: '',
      loading: false,
    };
  }

  async componentDidMount() {
    await this.checkIfExists()
  }

  checkIfExists = async () => {
    this.handleLoading(true);
    const { navigation } = this.props;
    const box = await AsyncStorage.getItem('@RocketBox:box');

    if (box) {
      this.handleLoading(false);
      navigation.navigate('Box');
    } else {
      this.handleLoading(false);
    }
  };

  handleLoading = loading => this.setState({ loading });

  handleSignIn = async () => {
    const { title } = this.state;
    const { navigation } = this.props;

    this.handleLoading(true);

    const response = await api.post('boxes', {
      title,
    });

    await AsyncStorage.setItem('@RocketBox:box', response.data._id);
    this.handleLoading(false);

    navigation.navigate('Box');
  };

  handleChange = title => {
    console.log('title ->', title);
    this.setState({ title });
  };

  render() {
    const { title, loading } = this.state;
    return !loading ? (
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} />
        <TextInput
          style={styles.input}
          placeholder="Crie um box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={title}
          onChangeText={text => this.handleChange(text)}
        />

        <TouchableOpacity
          onPress={this.handleSignIn}
          style={styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <Loading />
    );
  }
}
