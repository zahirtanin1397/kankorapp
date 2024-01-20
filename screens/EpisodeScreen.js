import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { DataStore } from "@aws-amplify/datastore";
import NetInfo from '@react-native-community/netinfo';
import { TutorialEpisode } from '../src/models';
import VideoPlayer from '../components/VideoPlayer';
import { Storage } from "aws-amplify";
import EpisodeItem from '../components/EpisodeItem';

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
    const message = 'Cannot fetch data due to a network connection issue.';

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

      const episodesWithVideoAndPosterUrls = await Promise.all(episodesData.map(async (episode) => {
        const videoUrl = await Storage.get(episode.videoUri);
        const posterUrl = await Storage.get(episode.poster);
        return { ...episode, videoUri: videoUrl, posterUri: posterUrl };
      }));

      setEpisodes(episodesWithVideoAndPosterUrls);
      if (episodesWithVideoAndPosterUrls.length > 0) {
        setSelectedEpisode(episodesWithVideoAndPosterUrls[0]);
      }
    } catch (error) {
      displayNetworkToast();
    }
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    console.log("selected episode ", episode);
  };

  return (
    <View style={styles.container}>
      {selectedEpisode && selectedEpisode.videoUri && (
        <VideoPlayer episode={selectedEpisode} downloadable={selectedEpisode?.downloadable} />
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
    fontWeight: "900",
    textAlign: "left",
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
    marginTop: 1,
    marginHorizontal: 7,
  },
  duration: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default EpisodeScreen;