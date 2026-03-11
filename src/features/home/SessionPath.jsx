import { StyleSheet, View } from 'react-native'

import { ActiveSession } from './ActiveSession'
import { EmptyHistory } from './EmptyHistory'
import { PathConnector } from './PathConnector'
import { SessionNode } from './SessionNode'

export function SessionPath({ weeklyStatus, onActiveSessionPress }) {
  if (
    !weeklyStatus ||
    !Array.isArray(weeklyStatus.days) ||
    weeklyStatus.days.length === 0
  ) {
    return null
  }

  const [today, ...historyDays] = weeklyStatus.days

  return (
    <View>
      <ActiveSession
        nextSession={weeklyStatus.nextSession}
        onPress={onActiveSessionPress}
      />
      {historyDays.length === 0 ? (
        <EmptyHistory />
      ) : (
        <View style={styles.pathContainer}>
          {historyDays.map((day, index) => {
            const position = index % 2 === 0 ? 'right' : 'left'
            const previousPosition =
              index === 0 ? 'center' : index % 2 === 0 ? 'left' : 'right'

            return (
              <View key={`${day.dayLabel}-${index}`} style={styles.nodeGroup}>
                <PathConnector from={previousPosition} to={position} />
                <SessionNode day={day} position={position} />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  pathContainer: {
    paddingHorizontal: 16,
  },
  nodeGroup: {
    marginBottom: 12,
  },
})

export default SessionPath
