import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyApp from "./src";

const App = () => {
  return (
    <GestureHandlerRootView >
      <MyApp />
    </GestureHandlerRootView>
  );
};

export default App;
