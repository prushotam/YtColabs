// oauthConfig.js
export default {
  issuer: 'https://accounts.google.com', // Replace with the issuer for your OAuth provider
  clientId: '978377831559-fvlhis6ralnbn73b3otkcc44o53opfrv.apps.googleusercontent.com', // Replace with your OAuth client ID
  redirectUrl: 'http://localhost', // Replace with your redirect URI (no need to change it)
  response_type: 'token',
  state:'auth',
  scope: [
    // 'openid',
    // 'profile',
    // 'email',
    'https://www.googleapis.com/auth/youtube.readonly', // Read-only access to YouTube channel and videos
    // 'https://www.googleapis.com/auth/youtube.upload', // Permission to upload videos to YouTube
  ], // Replace with the scopes you need
  // serviceConfiguration: {
  //   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth', // Replace with your authorization endpoint
  //   tokenEndpoint: 'https://oauth2.googleapis.com/token', // Replace with your token endpoint
  // },
};
