import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'

import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { colors } from '@/src/constants/theme'

const SHEET_OFFSET = 520

/**
 * @param {object} props
 * @param {boolean} props.visible
 * @param {string} [props.title]
 * @param {string} props.description
 * @param {string} props.primaryButtonText
 * @param {() => void} props.onPrimaryPress
 * @param {string} [props.secondaryButtonText]
 * @param {() => void} [props.onSecondaryPress]
 * @param {() => void} props.onClose
 */
export default function AlertModal({
  visible,
  title,
  description,
  primaryButtonText,
  onPrimaryPress,
  secondaryButtonText = 'Cancelar',
  onSecondaryPress,
  onClose,
}) {
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(visible)

  const overlayOpacity = useRef(new Animated.Value(0)).current
  const sheetTranslateY = useRef(new Animated.Value(SHEET_OFFSET)).current

  useEffect(() => {
    if (visible) {
      setIsMounted(true)
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()
      return
    }

    if (isMounted) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: SHEET_OFFSET,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => setIsMounted(false))
    }
  }, [visible, isMounted])

  if (!isMounted) return null

  const resolvedTitle = title || t('ALERT_MODAL.DEFAULT_TITLE')
  const resolvedSecondaryButtonText = secondaryButtonText || t('ALERT_MODAL.CANCEL')
  const handleSecondaryPress = onSecondaryPress || onClose

  return (
    <Modal transparent visible={isMounted} animationType="none">
      <View style={styles.container}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        <Pressable style={styles.overlayPressArea} onPress={onClose} />

        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: sheetTranslateY }] }]}
        >
          <View style={styles.handle} />
          <View style={styles.content}>
            <View style={styles.mascotContainer}>
              <Mascot style={styles.mascot} />
            </View>
            <CustomText
              text={resolvedTitle}
              fontWeight={500}
              fontSize={20}
              color={colors.white}
            />
            <CustomText
              text={description}
              fontWeight={400}
              fontSize={16}
              color={colors.whiteLight}
              lineHeight={24}
            />
            <View style={styles.buttonsContainer}>
              <Button
                type={BUTTON_TYPES.MAIN}
                text={primaryButtonText}
                onPress={onPrimaryPress}
              />
              <Button
                type={BUTTON_TYPES.OUTLINE}
                text={resolvedSecondaryButtonText}
                textColor={colors.white}
                style={styles.secondaryButton}
                onPress={handleSecondaryPress}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayPressArea: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    minHeight: '50%',
    maxHeight: '75%',
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    zIndex: 30,
  },
  handle: {
    width: 70,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#555',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    marginTop: 20,
    gap: 20,
  },
  mascot: {
    width: 121,
    height: 83,
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: 30,
    gap: 15,
  },
  secondaryButton: {
    borderColor: colors.main,
  },
})
