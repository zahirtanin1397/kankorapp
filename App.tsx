import "@azure/core-asynciterator-polyfill";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { Amplify, AuthModeStrategyType } from "aws-amplify";
import AppConfig from "./src/aws-exports";
import AuthNavigation from "./screens/AuthScreen/AuthNavigation/AuthNavigation";

Amplify.configure({
  ...AppConfig,
  Analytics: {
    disabled: true,
  },
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthNavigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default App;
