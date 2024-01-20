import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Linking, StatusBar, ToastAndroid } from 'react-native';
import { Storage } from 'aws-amplify';
import { DataStore } from "@aws-amplify/datastore";
import { Book } from "../src/models";
import { AntDesign } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

const BookScreen = () => {
  const [books, setBooks] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable && state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      fetchBooks();
    }
  }, [isConnected]);

  const fetchBooks = async () => {
    try {
      const bookData = await DataStore.query(Book);

      // Fetch book URLs from S3
      const booksWithUrls = await Promise.all(
        bookData.map(async (book) => {
          let bookUrl = null;
          let posterUrl = null;

          try {
            bookUrl = await Storage.get(book.fileUri);
            posterUrl = await Storage.get(book.poster);
          } catch (error) {
            ToastAndroid.show('خطا در دریافت لینک‌های کتاب', ToastAndroid.LONG);
          }

          return { ...book, bookUrl, posterUrl };
        })
      );

      setBooks(booksWithUrls);
    } catch (error) {
      ToastAndroid.show('خطا در دریافت لینک‌های کتاب', ToastAndroid.LONG);
    }
  };

  const handleOpenBook = (bookUrl) => {

    Linking.openURL(bookUrl)
      .catch((error) => {
        ToastAndroid.show('خطا در باز کردن کتاب', ToastAndroid.LONG);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <AntDesign name="clouddownload" size={40} color="#074d22"
          onPress={() => handleOpenBook(item.bookUrl)} style={styles.icons}
        />
        {item.posterUrl && (
          <Image
            source={{ uri: item.posterUrl }} 
            style={styles.poster} 
          />
        )}
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};


export default BookScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 1,
    marginTop: 1
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: 5,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 9,
    padding: 3,
    marginBottom: 1,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
  },
  icons : {
    marginLeft : 20,
    marginRight : "auto"
  },
  poster : {
    width: 70, height: 90,borderRadius: 8, marginLeft: 8,
  }
});
