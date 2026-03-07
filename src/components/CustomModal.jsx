import { BlurView } from 'expo-blur'
import { Modal, StyleSheet, View } from 'react-native'

export function CustomModal({
  visible,
  onClose,
  children,
  transparent = false,
  animationType = 'fade',
  showBlur = false,
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={transparent}
      animationType={animationType}
    >
      <View style={styles.overlay}>
        {showBlur && (
          <BlurView intensity={6} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <View style={styles.contentWrapper}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    paddingHorizontal: 30,
  },
})
