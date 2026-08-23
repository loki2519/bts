import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// Standalone Production Cloud URL — Does not depend on localhost, Vite server, or computer IP
const BTS_WORLD_URL = 'https://graceful-pothos-221f2e.netlify.app';

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle Android hardware back button
  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" backgroundColor="#0b0410" />
      <StatusBar barStyle="light-content" backgroundColor="#0b0410" />

      <View style={styles.content}>
        <WebView
          ref={webViewRef}
          source={{ uri: BTS_WORLD_URL }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#c084fc" />
              <Text style={styles.loadingText}>ENTERING BTS WORLD...</Text>
              <Text style={styles.subText}>ARMY FAN EXPERIENCE 💜</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0410',
  },
  content: {
    flex: 1,
    backgroundColor: '#0b0410',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0b0410',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0b0410',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#e9d5ff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
    marginTop: 16,
  },
  subText: {
    color: '#a855f7',
    fontSize: 12,
    letterSpacing: 1.5,
    marginTop: 6,
    fontWeight: '600',
  },
});
