import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

import { ActiveSession } from './ActiveSession'
import { EmptyHistory } from './EmptyHistory'
import { PathConnector } from './PathConnector'
import { SessionNode } from './SessionNode'

const buildWeekSections = (weeks) => {
  const sections = []
  let globalIndex = 0

  for (let w = weeks.length - 1; w >= 0; w--) {
    const week = weeks[w]
    const isCurrentWeek = w === weeks.length - 1
    const days = isCurrentWeek ? week.days.slice(1) : week.days

    if (days.length > 0) {
      sections.push({
        weekNumber: week.weekNumber,
        days,
        startIndex: globalIndex,
      })
      globalIndex += days.length
    }
  }

  return sections
}

const buildNodeProps = (index) => {
  return {
    position: index % 2 === 0 ? 'right' : 'left',
    previousPosition: index === 0 ? 'center' : index % 2 === 0 ? 'left' : 'right',
  }
}

export function SessionPath({ sessionsHistory, onActiveSessionPress, onWeekLayout }) {
  const { t } = useTranslation()

  const sections = useMemo(
    () =>
      sessionsHistory?.weeks ? buildWeekSections(sessionsHistory.weeks) : [],
    [sessionsHistory?.weeks],
  )

  const currentWeekNumber = sessionsHistory?.weeks?.[sessionsHistory.weeks.length - 1]?.weekNumber
  const hasHistory = sections.some((s) => s.days.length > 0)
  const isWorkoutCompleted = (
    !sessionsHistory?.nextSession?.sessionId
    || (
      sessionsHistory?.totalSessions > 0
      && sessionsHistory?.completedSessions >= sessionsHistory?.totalSessions
    )
  )

  if (!sections.length) return null

  return (
    <View>
      <ActiveSession
        nextSession={sessionsHistory.nextSession}
        onPress={onActiveSessionPress}
        isWorkoutCompleted={isWorkoutCompleted}
      />
      {!hasHistory ? (
        <EmptyHistory />
      ) : (
        sections.map((section) => (
          <View
            key={section.weekNumber}
            style={styles.pathContainer}
            onLayout={(e) => onWeekLayout?.(section.weekNumber, e.nativeEvent.layout.y)}
          >
            {section.weekNumber !== currentWeekNumber && (
              <View style={styles.weekDivider}>
                <CustomText
                  text={t('HOME.PAST_WEEK_TITLE', { week: section.weekNumber })}
                  fontWeight={700}
                  fontSize={16}
                  color={colors.whiteLight}
                />
              </View>
            )}
            {section.days.map((day, localIndex) => {
              const index = section.startIndex + localIndex
              const { position, previousPosition } = buildNodeProps(index)

              return (
                <View key={index} style={styles.nodeGroup}>
                  <PathConnector from={previousPosition} to={position} />
                  <SessionNode day={day} position={position} />
                </View>
              )
            })}
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  pathContainer: {
    paddingHorizontal: 40,
  },
  weekDivider: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  nodeGroup: {
    marginBottom: 12,
  },
})

export default SessionPath
