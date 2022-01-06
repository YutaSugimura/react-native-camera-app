/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {Photo} from './components/Photo';
import {QRCodeScreen} from './components/QRCode';

const App: React.VFC = () => {
  const [cameraType, setCameraType] = useState<'' | 'photo' | 'qrcode'>('');

  const onPress = useCallback(
    (type: 'photo' | 'qrcode') => () => {
      setCameraType(type);
    },
    [],
  );

  const goBack = useCallback(() => {
    setCameraType('');
  }, []);

  if (cameraType === '') {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="photo" onPress={onPress('photo')} />
        <Button title="qrcode" onPress={onPress('qrcode')} />
      </SafeAreaView>
    );
  }

  return (
    <>
      {cameraType === 'photo' && <Photo goBack={goBack} />}
      {cameraType === 'qrcode' && <QRCodeScreen goBack={goBack} />}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
