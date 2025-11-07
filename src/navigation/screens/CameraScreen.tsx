import { useEffect, useState, useCallback, useRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useThemeColor } from '../../hooks/useThemeColor';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';

export const CameraScreen = () => {
  const navigation =
    useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const lastScanTime = useRef(0);

  // Cores do tema
  const backgroundColor = useThemeColor('background');
  const primary = useThemeColor('primary');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128', 'code-39'],
    onCodeScanned: codes => {
      const now = Date.now();
      if (now - lastScanTime.current < 2000) {
        return; // Throttle: ignora scans muito frequentes (2 segundos)
      }
      lastScanTime.current = now;

      if (codes.length > 0) {
        const code = codes[0];
        console.log(`Código escaneado: ${code.value} (${code.type})`);

        Alert.alert(
          'Código Escaneado',
          `Tipo: ${code.type.toUpperCase()}\nCódigo: ${code.value}`,
          [
            { text: 'Escanear Novamente', style: 'cancel' },
            {
              text: 'Buscar Produto',
              onPress: () => {
                // Navegar de volta para Home
                navigation.navigate('HomeTabs', {
                  screen: 'Home',
                } as any);
              },
            },
          ],
        );
      }
    },
  });

  const handleRequestPermission = useCallback(async () => {
    setIsRequestingPermission(true);
    try {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permissão Necessária',
          'Para usar o scanner, é necessário permitir o acesso à câmera nas configurações do app.',
          [
            { text: 'Voltar', onPress: () => navigation.goBack() },
            { text: 'Tentar Novamente', onPress: handleRequestPermission },
          ],
        );
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    } finally {
      setIsRequestingPermission(false);
    }
  }, [requestPermission, navigation]);

  useEffect(() => {
    if (!hasPermission && !isRequestingPermission) {
      handleRequestPermission();
    }
  }, [hasPermission, isRequestingPermission, handleRequestPermission]);

  if (!hasPermission) return; // Permitir Acesso à Câmera

  if (device == null) return; // Câmera não disponível

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
        androidPreviewViewType="surface-view"
        codeScanner={codeScanner}
      />

      {/* Overlay mascarado que deixa apenas o frame de scan visível */}
      <View style={styles.maskContainer}>
        {/* Top mask */}
        <View style={[styles.maskTop, { backgroundColor }]} />

        {/* Instruções acima do frame */}
        <View style={styles.instructionsAboveFrame}>
          <ThemedText type="defaultSemiBold">
            Posicione o código dentro do quadro
          </ThemedText>
        </View>

        <View style={styles.middleRow}>
          {/* Left mask */}
          <View style={[styles.maskSide, { backgroundColor }]} />

          {/* Scan frame - área transparente */}
          <View style={styles.scanFrame}>
            <View
              style={[
                styles.scanCorner,
                styles.topLeft,
                { borderColor: primary },
              ]}
            />
            <View
              style={[
                styles.scanCorner,
                styles.topRight,
                { borderColor: primary },
              ]}
            />
            <View
              style={[
                styles.scanCorner,
                styles.bottomLeft,
                { borderColor: primary },
              ]}
            />
            <View
              style={[
                styles.scanCorner,
                styles.bottomRight,
                { borderColor: primary },
              ]}
            />
          </View>

          {/* Right mask */}
          <View style={[styles.maskSide, { backgroundColor }]} />
        </View>

        {/* Bottom mask */}
        <View style={[styles.maskBottom, { backgroundColor }]} />
      </View>

      {/* Botão de entrada manual */}
      <View style={styles.instructionsContainer}>
        <ThemedButton
          title="Digitar código manualmente"
          onPress={() => console.log('Digitar código manualmente')}
          buttonStyle={styles.manualInputButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    marginBottom: 125, // metade da altura do scanFrame (250/2)
  },
  middleRow: {
    position: 'absolute',
    top: '50%',
    marginTop: -125, // metade da altura do scanFrame (250/2)
    left: 0,
    right: 0,
    height: 250,
    flexDirection: 'row',
  },
  maskSide: {
    flex: 1,
  },
  maskBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '50%',
    marginTop: 125, // metade da altura do scanFrame (250/2)
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionsAboveFrame: {
    position: 'absolute',
    top: '50%',
    marginTop: -180, // Posiciona acima do frame (que está em -125)
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  manualInputButton: {
    marginTop: 20,
  },
});
