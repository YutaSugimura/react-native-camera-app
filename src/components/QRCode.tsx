import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

type Props = {
  goBack: () => void;
};

export const QRCodeScreen: React.VFC<Props> = ({goBack}) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

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
      <SafeAreaView style={styles.wrapper}>
        <Text>unsupported device</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Camera
        style={[styles.container]}
        device={device}
        isActive={authorized}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />

      <SafeAreaView style={styles.contentContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonLabel}>{'<'}</Text>
        </TouchableOpacity>

        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  backButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  backButtonLabel: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
