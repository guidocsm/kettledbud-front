import { Modal, StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { colors } from '@/src/constants/theme'

function LoadingContent() {
  return (
    <View style={styles.container}>
      <Mascot style={styles.mascot} />
      <CustomText
        text="CARGANDO..."
        fontWeight={700}
        fontSize={16}
        color={colors.main}
      />
    </View>
  )
}

export default function Loading({ isModal = false }) {
  if (!isModal) return <LoadingContent />

  return (
    <Modal visible transparent={false} animationType="none">
      <LoadingContent />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  mascot: {
    width: 180,
    height: 120,
  },
})
