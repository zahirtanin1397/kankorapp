import "@azure/core-asynciterator-polyfill";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { Amplify, Hub } from "aws-amplify";
import { DataStore, AuthModeStrategyType } from '@aws-amplify/datastore';
import amplifyconfig from "./src/aws-exports";
import AuthNavigation from "./screens/AuthScreen/AuthNavigation/AuthNavigation";
Amplify.configure({
  ...amplifyconfig,
  Analytics: {
    disabled: true,
  },
});
DataStore.configure({
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
});


function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
     <StatusBar style='light' barStyle="light-content" backgroundColor="#0c0b0c" />
      <SafeAreaProvider>
        <AuthNavigation />
      </SafeAreaProvider>
    </> );
  }
}

export default App;
