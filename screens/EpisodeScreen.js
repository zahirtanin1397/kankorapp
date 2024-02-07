import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { TutorialEpisode } from '../src/models';
import VideoPlayer from '../components/VideoPlayer';
import { Storage } from 'aws-amplify';
import EpisodeItem from '../components/EpisodeItem';
import NetInfo from '@react-native-community/netinfo';

const EpisodeScreen = ({ route }) => {
  const { seasonId } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      displayNetworkToast();
    }
  }, [isConnected]);

  const displayNetworkToast = () => {
    const message = 'Cannot play the video due to a network connection issue.';

    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100
    );
  };

  const fetchEpisodes = async () => {
    try {
      const episodesData = await DataStore.query(TutorialEpisode, (e) => e.tutorialseasonID.eq(seasonId));

      episodesData.sort((a, b) => {
        const createdAtB = new Date(a.createdAt);
        const createdAtA = new Date(b.createdAt);
        return createdAtB - createdAtA;
   });


      const episodesWithVideoAndPosterUrls = await Promise.all(
        episodesData.map(async (episode) => {
          let videoUrl = null;
          let posterUrl = null;

          if (isConnected) {
            try {
              videoUrl = await Storage.get(episode.videoUri);
            } catch (error) {
              console.log('Hello can not fetch video!');
            }
          }
          try {
            posterUrl = await Storage.get(episode.poster);
          } catch (error) {
            console.error('Error fetching poster:', error);
            // Handle error fetching poster (e.g., display a placeholder image)
          }

          return { ...episode, videoUri: videoUrl, posterUri: posterUrl };
        })
      );

      setEpisodes(episodesWithVideoAndPosterUrls);
      if (episodesWithVideoAndPosterUrls.length > 0) {
        setSelectedEpisode(episodesWithVideoAndPosterUrls[0]);
      }
    } catch (error) {
      console.error('Error fetching episodes:', error);
      displayNetworkToast();
    }
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <View style={styles.container}>
      {selectedEpisode && selectedEpisode.videoUri && isConnected && (
        <VideoPlayer episode={selectedEpisode} downloadable={selectedEpisode?.downloadable} />
      )}
      {!isConnected && (
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>عدم اتصال به اینترنت!</Text>
        </View>
      )}
      <FlatList
        data={episodes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEpisodeSelect(item)}>
            <EpisodeItem episode={item} onPress={handleEpisodeSelect} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          selectedEpisode ? (
            <View style={styles.listHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.movieTitle}>{selectedEpisode.name}</Text>
                <Text style={styles.duration}>{selectedEpisode.duration}</Text>
              </View>
              <View style={styles.subtitleContainer}></View>
              <Text style={styles.description}>{selectedEpisode.descrition}</Text>
            </View>
          ) : null
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 1,
  },
  noInternetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: 290,
    marginTop: 0,
  },
  noInternetText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  episodeContainer: {
    marginBottom: 10,
  },
  episodeName: {
    fontWeight: 'bold',
    backgroundColor: '#3b2727',
    padding: 8,
    borderRadius: 20,
  },
  listHeader: {
    marginTop: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'left',
    marginHorizontal: 9,
  },
  posterImage: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    marginTop: 3,
    marginHorizontal: 7,
  },
  duration: {
    fontSize: 16,
    marginLeft: 5,
  },
  subtitleContainer : {
    marginTop : -5,
  }

});

export default EpisodeScreen;