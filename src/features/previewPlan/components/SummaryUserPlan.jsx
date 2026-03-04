import { BurnIcon, GoalIcon, IOSWatchIcon } from "@/assets/Icons";
import CustomText from "@/src/components/CustomText";
import { colors } from "@/src/constants/theme";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { GOALS_KEYS } from "../../onboarding/utils/constants";

export function SummaryUserPlan({ durationWeeks = null, daysPerWeek = null, timePerSession = null, goal = null }) {
  const { t } = useTranslation()
  
  return (
    <View style={styles.container}>
      <View style={styles.goalContainer}>
        <View style={styles.goalIconContainer}>
        <GoalIcon color={colors.main} />
        </View>
        <View style={styles.goalTextContainer}>
          <CustomText 
            text={t(`COMMON.GOALS_KEYS.${GOALS_KEYS[goal]}`)}
            color={colors.white}
            fontWeight={600}
            fontSize={18}
          />
          <CustomText 
            text="Tu objetivo"
            color={colors.whiteLight}
            fontWeight={500}
            fontSize={14}
          />
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataItem}>
          <View style={styles.goalIconContainer}>
            <GoalIcon color={colors.main} />
          </View>
          <CustomText 
            text={durationWeeks} 
            color={colors.white} 
            fontWeight={600} 
            fontSize={24} 
          />
          <CustomText 
            text="semanas" 
            color={colors.white} 
            fontWeight={500} 
            fontSize={14} 
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.dataItem}>
          <View style={styles.goalIconContainer}>
            <BurnIcon color={colors.main} />
          </View>
          <CustomText 
            text={daysPerWeek}
            color={colors.white} 
            fontWeight={600} 
            fontSize={24} 
          />
          <CustomText 
            text="días / semanas" 
            color={colors.white} 
            fontWeight={500} 
            fontSize={14} 
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.dataItem}>
          <View style={styles.goalIconContainer}>
            <IOSWatchIcon color={colors.main} />
          </View>
          <CustomText 
            text={timePerSession}
            color={colors.white} 
            fontWeight={600} 
            fontSize={24} 
          />
          <CustomText 
            text="min / sesión" 
            color={colors.white} 
            fontWeight={500} 
            fontSize={14} 
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  goalContainer: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  goalIconContainer: {
    backgroundColor: colors.mainLight,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
  },
  goalTextContainer: {
    gap: 6,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dataItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.mainLight,
    height: '100%',
    width: 1,
  },
})