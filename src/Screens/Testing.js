import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import ChannelData from '../Utils/Channel.json';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const SocialLink = props => {
  const {title, iconSize, url, icon, type, iconColor} = props;

  return (
    <Pressable
      style={styles.socialContainer}
      type="logo"
      onPress={() => url && Linking.openURL(url)}>
      <Icon
        name={
          type === 'url'
            ? 'globe-outline'
            : type === 'logo'
            ? `logo-${icon}`
            : icon
        }
        color={iconColor ? iconColor : '#212121'}
        size={iconSize ? iconSize : 20}
      />
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.link,
          color: type === 'logo' || type === 'url' ? '#1568d6' : '#212121',
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

const TestingScreen = props => {
  const data = ChannelData[0];
  const [isLoading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      console.log('video has finished playing!');
    }
  }, []);

  const bufferConfig = {
    minBufferMs: 15000,
    maxBufferMs: 60000,
    bufferForPlaybackMs: 2500,
    bufferForPlaybackAfterRebufferMs: 5000,
  };

  const buffering = event => {
    setIsLoading(event?.isBuffering ? true : false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>
          Be Strong and Free with Food Forest Abundance
        </Text>
        <Image
          source={require('../../assets/testing_image.png')}
          style={styles.profile}
        />
        <View style={styles.containerDescription}>
          <Text style={styles.titleDescription}>Why grow food?</Text>
          <Text style={styles.subTitleDescription}>RISING FOOD PRICES</Text>
          <Text style={styles.description}>
            A food forest provides a sustainable and abundant source of fresh
            produce, reducing the need to purchase expensive items from
            supermarkets.
          </Text>

          <Text style={styles.subTitleDescription}>GMO’S & PESTICIDES</Text>
          <Text style={styles.description}>
            Food forests can enhance biodiversity, protect soil and water,
            promote beneficial insects, and provide healthy food without the use
            of harmful GMOs and pesticides.{' '}
          </Text>

          <Text style={styles.subTitleDescription}>FOOD SECURITY</Text>
          <Text style={styles.description}>
            Food forests can increase food security by providing a reliable
            source of fresh, nutrient-dense food that is accessible to
            individuals and communities.{' '}
          </Text>
        </View>
        <View style={styles.youtubePlayer}>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={'Z-DC8A6XwUc'}
            onChangeState={onStateChange}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 15,
    marginTop: 8,
  },
  heading: {
    fontFamily: 'Roboto-Black',
    fontSize: 18,
    color: '#212121',
    marginTop: 50,
  },
  content: {
    color: '#2c2c2c',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  space: {
    height: 25,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  link: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginLeft: 14,
  },
  profile: {
    marginTop: 30,
    width: 320,
    height: 170,
  },
  titleDescription: {
    fontFamily: 'Roboto-Black',
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
  },
  subTitleDescription: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
  },
  description: {
    // marginTop: 30,
    fontFamily: 'Roboto-Light',
  },
  backgroundVideo: {
    marginTop: 20,
    height: 200,
    width: 320,
    flex: 1,
    // top: 0,
    backgroundColor: '#000',
  },
  youtubePlayer: {
    marginTop: 10,
  },
});

export default TestingScreen;
