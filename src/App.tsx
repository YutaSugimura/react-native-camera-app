/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

const App: React.VFC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

  const cameraRef = useRef<Camera>(null);

  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      if (cameraPermission === 'authorized') {
        setAuthorized(true);
      } else if (
        cameraPermission === 'not-determined' ||
        cameraPermission === 'denied'
      ) {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === 'authorized') {
          setAuthorized(true);
        }
      }
    })();
  }, []);

  if (device === undefined || !authorized) {
    return (
      <SafeAreaView>
        <Text>loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Camera
        style={[StyleSheet.absoluteFill, styles.container]}
        ref={cameraRef}
        device={device}
        isActive={authorized}
        photo={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      {barcodes.map((barcode, idx) => (
        <Text key={idx} style={styles.barcodeTextURL}>
          {barcode.displayValue}
        </Text>
      ))}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
