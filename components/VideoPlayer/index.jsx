import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, 
  ToastAndroid, Platform, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const VideoPlayer = (props) => {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { episode , downloadable} = props;

  const downloadFile = async () => {
    let folderPath = ''; // Declare folderPath variable

    if (isDownloading) {
      // Cancel the download if it is already in progress
      downloadResumable && downloadResumable.pauseAsync();
      setIsDownloading(false);
      setDownloadProgress(0);
    } else {
      setIsDownloading(true);
      const folderName = 'kankordanish';
      folderPath = FileSystem.documentDirectory + folderName + '/';

      // Create the folder if it doesn't exist
      try {
        await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
        console.log('Created folder:', folderPath);
      } catch (error) {
        console.error('Error creating folder:', error);
        setIsDownloading(false);
        return;
      }
    }

    const timestamp = new Date().getTime();
    const fileName = `download_${timestamp}.mp4`;
    const fileUri = folderPath + fileName;

    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      episode.videoUri,
      fileUri,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to:', uri);
      setDownloadProgress(0); // Clear the progress when the download finishes
      await MediaLibrary.saveToLibraryAsync(uri); 
      // Save the video to the device's media library
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG)
      } else {
        AlertIOS.alert(msg);
      }
    } catch (error) {
      ToastAndroid.show('امکان اضافه کردن به کتابخانه وجود ندارد!', ToastAndroid.SHORT);
    }
  };

  function setOrientation() {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      // Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      // Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  const video = useRef(null);
  useEffect(() => {
    if (!video.current) {
      return;
    }

    setLoading(true);

    (async () => {
      await video.current.unloadAsync();
      await video.current.loadAsync({ uri: episode.videoUri }, {}, false);
      setLoading(false);
      video.current.playAsync(); // Start playing the video after loading
    })();

    return () => {
      video.current && video.current.unloadAsync();
    };
  }, [episode]);


  const downloadAsyncWithoutHash = async () => {
    setIsDownloading(true);
  
    // Request media library permissions
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied
      Alert.alert('دسترسی رد شد. قادر به ذخیره ویدیو در کتابخانه نیست.');
      setIsDownloading(false);
      return;
    }
  
    await downloadFile();
    setIsDownloading(false);
  };

  return (
    <View style={styles.container}>

      <Video
        ref={video}
        isLooping={true}
        source={{
          uri: episode.videoUri,
        }}

        onloadstart={() => setLoading(true)}
        shouldPlay={false} 
        isBuffering = {true}
        isLoaded = {true}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN }
        onPlaybackStatusUpdate={(status) => setStatus(status)}
        style={styles.videoshow}
        onFullscreenUpdate={setOrientation}
        onreadyfordisplay={() => setLoading(false)}
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#03622e" />
        </View>
      )}


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{status.isPlaying ? 'توقف' : 'پخش'}</Text>
        </TouchableOpacity>
        

        {downloadable &&  status.isPlaying && (
          <TouchableOpacity onPress={downloadAsyncWithoutHash} style={styles.button}>
            {isDownloading ? (
              <Text style={styles.buttonText}>در حال دانلود...</Text>
            ) : (
              <Text style={styles.buttonText}>دانلود</Text>
            )}
            {downloadProgress > 0 && (
              <Text style={styles.progressText}>{`در حال دانلود: ${Math.round(downloadProgress * 100)}٪`}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoPlayer;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 1,
  },
  button: {
    backgroundColor: '#03622e',
    flex: 1,
    height: 35,
    marginRight: 5,
    marginLeft: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '200',
    color: '#e7e0e0',
  },
  loadingContainer:{
    marginTop : 0
  },
  videoshow : {
    width: Dimensions.get('window').width, height: 290,marginTop:0 

  }
});