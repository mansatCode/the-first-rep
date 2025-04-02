import Colors from '@/utilities/color';
import { StyleSheet, View, Text } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Global Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEEP_BLUE,
  }
});
