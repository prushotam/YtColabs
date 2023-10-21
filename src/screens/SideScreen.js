import { StyleSheet, FlatList, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppTheme from './commonComponents/AppTheme';
import { Colors } from '../utils/colors';
import AppBarCommon from './commonComponents/AppBarCommon';
import EditorsListCard from './commonComponents/EditorsListCard';
import firestore from '@react-native-firebase/firestore';
import { SCREEN_HEIGHT } from '../utils/others';
import SearchBox from './commonComponents/searchBox';

const SideScreen = (props) => {
  const [editors, setEditors] = useState([]);
  useEffect(() => {
    // Fetch documents where role is "editor" from Firestore
    const fetchEditors = async () => {
      try {
        const editorSnapshot = await firestore()
          .collection('users') // Replace with your Firestore collection name
          .where('role', '==', 'Editor') // Filter by role "editor"
          .get();
        const editorData = [];
        editorSnapshot.forEach((doc) => {
          // Access each document's data and add it to the editorData array
          editorData.push({
            id: doc.id, // Document ID
            ...doc.data(), // Document data
          });
        });
        // Set the editorData array in the state
        setEditors(editorData);
      } catch (error) {
       ToastAndroid.show('Error fetching editors data:', error,ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
    };
    // Call the fetchEditors function
    fetchEditors();
  }, []);

  return (
    <AppTheme>
      <AppBarCommon
        title="Registered Editors"
        backgroundColor={Colors.Secondary}
        color={Colors.fontColorActive}
        enableBack={true}
      />
      <View style={styles.panel}>
        <SearchBox/>
      </View>
      <FlatList
        data={editors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EditorsListCard
            editorName={item.name}
            editorEmail={item.email}
            salesPitch={item.salesPitch}
            status={item.availability}

          />
        )}
      />
    </AppTheme>
  );
};

export default SideScreen;

const styles = StyleSheet.create({
  panel:{
    height:SCREEN_HEIGHT*0.15,
    backgroundColor: Colors.Secondary
  }
});
