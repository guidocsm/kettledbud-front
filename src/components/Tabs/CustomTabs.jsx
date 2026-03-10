import {
  ExploreIcon,
  HomeIcon,
  ProfileIcon,
  ProgressIcon,
} from '@/assets/Icons'
import { colors } from '@/src/constants/theme'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Tab } from './Tab'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            marginLeft: -(insets.left + 30),
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab Icon={HomeIcon} focused={focused} label={t('TABS.HOME')} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab
              Icon={ProgressIcon}
              focused={focused}
              label={t('TABS.PROGRESS')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab
              Icon={ExploreIcon}
              focused={focused}
              label={t('TABS.EXPLORE')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab
              Icon={ProfileIcon}
              focused={focused}
              label={t('TABS.PROFILE')}
            />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: colors.whiteLight,
    borderTopWidth: 1,
    height: 90,
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
    width: Dimensions.get('window').width,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  tabBarIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
