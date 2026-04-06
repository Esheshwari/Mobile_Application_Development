// StatusBar

import { useState } from "react";
import { Button, StatusBar, View } from "react-native";

export default function App() {
  const [isStatusBarVisible, setIsStatusBarVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "plum", padding: 60 }}>
      <Button
        title="Hide / Show StatusBar"
        onPress={() => setIsStatusBarVisible(!isStatusBarVisible)}
      />
      <StatusBar
        backgroundColor="lightgreen"
        barStyle="light-content"
        hidden={isStatusBarVisible}
      />
    </View>
  );
}
