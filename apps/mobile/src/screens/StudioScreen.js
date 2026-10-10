import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityDraftProvider,
  useActivityDraft,
} from '../context/ActivityDraftContext';
import { formatActivityIconLabel } from '../components/ActivityIcon';
import { BasicsTab } from '../studio/tabs/BasicsTab';
import { RepeatCyclesTab } from '../studio/tabs/RepeatCyclesTab';
import { useTheme } from '../theme/useTheme';

const Tab = createMaterialTopTabNavigator();

function StudioHeader() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { draft, resetDraft } = useActivityDraft();
  const canSave = draft.name.trim().length > 0;

  const onSave = () => {
    Alert.alert(
      'Activity saved (local)',
      `${formatActivityIconLabel(draft.icon)} ${draft.name.trim()}\n${draft.repeatCycles.length} repeat cycle(s).\n\nPersistence comes next.`,
      [{ text: 'OK', onPress: resetDraft }]
    );
  };

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top + 8,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerTitles}>
          <Text style={[styles.kicker, { color: colors.textSecondary }]}>
            Studio
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>New activity</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSave }}
          disabled={!canSave}
          onPress={onSave}
          style={({ pressed }) => [
            styles.saveBtn,
            { backgroundColor: colors.tint },
            !canSave && styles.saveBtnDisabled,
            pressed && canSave && styles.pressed,
          ]}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

function StudioTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarIndicatorStyle: { backgroundColor: colors.tint },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600', textTransform: 'none' },
        tabBarPressColor: colors.surface,
      }}
    >
      <Tab.Screen name="Basics" component={BasicsTab} />
      <Tab.Screen
        name="RepeatCycles"
        component={RepeatCyclesTab}
        options={{ title: 'Repeat cycles' }}
      />
    </Tab.Navigator>
  );
}

function StudioScreenInner() {
  const { colors } = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <StudioHeader />
      <View style={styles.tabs}>
        <StudioTabs />
      </View>
    </View>
  );
}

export function StudioScreen() {
  return (
    <ActivityDraftProvider>
      <StudioScreenInner />
    </ActivityDraftProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tabs: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerTitles: {
    flex: 1,
    paddingRight: 12,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 2,
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 4,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});
