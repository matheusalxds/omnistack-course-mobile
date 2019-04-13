import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import socket from 'socket.io-client';

import Loading from '../component/Loading/Loading';

import styles from './styles';
import api from '../../services/api';

export default class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.fetch = this.fetch.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.openFile = this.openFile.bind(this);
    this.subscribeToNewFiles = this.subscribeToNewFiles.bind(this);
  }

  async componentDidMount() {
    await this.fetch();
  }

  fetch = async () => {
    this.handleLoading(true);
    const id = await AsyncStorage.getItem('@RocketBox:box');

    // Fetch data using socket.io
    this.subscribeToNewFiles(id);

    const response = await api.get(`boxes/${id}`);

    this.setState({ box: response.data });
    this.handleLoading(false);
  };

  handleLoading = loading => this.setState({ loading });

  handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async upload => {
      if (upload.error) {
        console.log('ImagePicker error');
      } else if (upload.didCancel) {
        console.log('Canceled by user');
      } else {
        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        const data = new FormData();
        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        api.post(`boxes/${this.state.box._id}/files`, data);
      }
    });
  };

  subscribeToNewFiles = id => {
    const io = socket('https://omnistack-course-backend.herokuapp.com');
    io.emit('connectRoom', id);
    io.on('file', data => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] } // eslint-disable-line
      });
    });
  };

  openFile = async item => {
    console.log('item', item)
    const filePath = `${RNFS.DocumentDirectoryPath}/${item.title}`;
    // try/catch to avoid if the mobile cannot open the image
    try {
      await RNFS.downloadFile({
        fromUrl: item.url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (e) {

    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.openFile(item)}
      style={styles.file}
    >
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        Há{' '}
        {distanceInWords(item.createdAt, new Date(), {
          locale: pt,
        })}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { box, loading } = this.state;
    if (loading) return <Loading />;
    return box ? (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{box.title}</Text>

        <FlatList
          style={styles.list}
          data={box.files}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={this.renderItem}
        />

        <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
          <Icon name="cloud-upload" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    ) : null;
  }
}
