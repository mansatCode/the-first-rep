import { StyleSheet, View, Text } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Track Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
