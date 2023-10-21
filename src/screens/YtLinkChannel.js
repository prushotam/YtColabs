import {StyleSheet, Text, View, Button, Linking, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {authorize} from 'react-native-app-auth';
import oauthConfig from '../utils/oauthConfig';
import auth from '@react-native-firebase/auth';
import axios from 'axios'
const YtLinkChannel = () => {
  //Handle deep links
  // const handleDeepLink = async () => {
  //   try {
  //     // Use Linking.getInitialURL() to get the initial deep link URL
  //     const url = await Linking.getInitialURL();

  //     // Check if the URL contains the custom scheme and path
  //     if (url && url.startsWith('https://yt-colabs.firebaseapp.com/__/auth/handler')) {
  //       // Parse the URL to extract the authorization code
  //       const authorizationCode = url.split('=')[1];

  //       // Now you have the authorization code, continue with OAuth flow
  //       // (exchange code for access token, etc.)

  //       console.log('Authorization code:', authorizationCode);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error handling deep link:', error.message);
  //   }
  // };

  // useEffect(() => {
  //   handleDeepLink();
  // }, []);

  const handleLinkChannel = async () => {
    try {
      // Initiate OAuth flow

      // const currentUser = auth().currentUser;
      // if (currentUser) {
      //   const accessToken = await currentUser.getIdToken();
      //   console.log('Access Token:', accessToken);

      //   // Set up the headers with the ID token
      //   const apiUrl = 'https://www.googleapis.com/youtube/v3/channels';
      //   const headers = {
      //     Authorization: `Bearer ${accessToken}`,
      //   };

      //   // Make authorized requests to YouTube Data API
      //   const channelInfoResponse = await axios.get(apiUrl,
      //     {
      //       headers,
      //       params: {
      //         part: 'snippet',
      //         mine: true, // Retrieve the channel info for the authenticated user
      //       },
      //     },
      //   );

      //   const channelId = channelInfoResponse.data.items[0].id;
      //   console.log(channelId)

        // You can now use channelId to upload videos, etc.
      
      const authState = await authorize(oauthConfig);
        console.log(authState)
      // Handle the response, including token exchange, on your server
      // Continue with linking the YouTube channel
    } catch (error) {
      console.error( error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <View>
      <Button title="Link" onPress={() => handleLinkChannel()} />
    </View>
  );
};

export default YtLinkChannel;

const styles = StyleSheet.create({});
