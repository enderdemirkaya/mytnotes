import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Stepper } from '../../components/Stepper';
import { useActivityDraft } from '../../context/ActivityDraftContext';
import {
  createEmptyRepeatCycle,
  formatRepeatCycle,
} from '../../studio/activityDraft';
import { useTheme } from '../../theme/useTheme';

const PERIOD_OPTIONS = [
  { label: 'Daily', value: 'day' },
  { label: 'Weekly', value: 'week' },
  { label: 'Monthly', value: 'month' },
];

function RepeatCycleEditor({ cycle, onChange, onDone, onCancel }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.editor,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.editorTitle, { color: colors.text }]}>
        Repeat cycle
      </Text>
      <Text style={[styles.hint, { color: colors.textSecondary }]}>
        How often should someone do this activity, and how much each time?
      </Text>

      <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
        Period
      </Text>
      <SegmentedControl
        options={PERIOD_OPTIONS}
        value={cycle.period}
        onChange={(period) => onChange({ period })}
      />

      <Stepper
        label="Times per period"
        value={cycle.timesPerPeriod}
        min={1}
        max={cycle.period === 'day' ? 12 : cycle.period === 'week' ? 14 : 31}
        onChange={(timesPerPeriod) => onChange({ timesPerPeriod })}
      />
      <Stepper
        label="Sets per session"
        value={cycle.setsPerSession}
        min={0}
        max={20}
        onChange={(setsPerSession) => onChange({ setsPerSession })}
      />

      <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
        Reps or duration
      </Text>
      <TextInput
        value={cycle.repsOrDuration}
        onChangeText={(repsOrDuration) => onChange({ repsOrDuration })}
        placeholder="e.g. 12 reps, 30 min, 5 km"
        placeholderTextColor={colors.placeholder}
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border, backgroundColor: colors.background },
        ]}
      />

      <Text style={[styles.preview, { color: colors.tint }]}>
        {formatRepeatCycle(cycle)}
      </Text>

      <View style={styles.editorActions}>
        <Pressable
          accessibilityRole="button"
          onPress={onCancel}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.tint }]}>
            Cancel
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onDone}
          style={({ pressed }) => [
            styles.primaryBtn,
            { backgroundColor: colors.tint },
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryBtnText}>Add cycle</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function RepeatCyclesTab() {
  const { draft, addRepeatCycle, removeRepeatCycle } = useActivityDraft();
  const { colors } = useTheme();
  const [editorCycle, setEditorCycle] = useState(null);

  const startAdd = () => setEditorCycle(createEmptyRepeatCycle());

  const confirmAdd = () => {
    if (!editorCycle) return;
    addRepeatCycle(editorCycle);
    setEditorCycle(null);
  };

  const confirmRemove = (id, label) => {
    Alert.alert('Remove cycle?', label, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeRepeatCycle(id),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.intro, { color: colors.textSecondary }]}>
        Prescription cycles (sets attachment). Add one or more — e.g. 3× per week
        with 3 sets of 12 reps.
      </Text>

      {draft.repeatCycles.length === 0 && !editorCycle ? (
        <View
          style={[
            styles.empty,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No repeat cycles yet
          </Text>
          <Text style={[styles.emptyBody, { color: colors.textSecondary }]}>
            Tap below to define how often this activity happens.
          </Text>
        </View>
      ) : (
        draft.repeatCycles.map((cycle) => (
          <View
            key={cycle.id}
            style={[
              styles.cycleCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.cycleText}>
              <Text style={[styles.cycleTitle, { color: colors.text }]}>
                {formatRepeatCycle(cycle)}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Remove repeat cycle"
              onPress={() => confirmRemove(cycle.id, formatRepeatCycle(cycle))}
              hitSlop={8}
            >
              <Text style={[styles.remove, { color: colors.danger }]}>Remove</Text>
            </Pressable>
          </View>
        ))
      )}

      {editorCycle ? (
        <RepeatCycleEditor
          cycle={editorCycle}
          onChange={(patch) =>
            setEditorCycle((prev) => ({ ...prev, ...patch }))
          }
          onDone={confirmAdd}
          onCancel={() => setEditorCycle(null)}
        />
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={startAdd}
          style={({ pressed }) => [
            styles.addBtn,
            { borderColor: colors.tint },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.addBtnText, { color: colors.tint }]}>
            + Add repeat cycle
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  intro: {
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 16,
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptyBody: {
    fontSize: 15,
    lineHeight: 21,
  },
  cycleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cycleText: {
    flex: 1,
    paddingRight: 8,
  },
  cycleTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  remove: {
    fontSize: 15,
    fontWeight: '500',
  },
  addBtn: {
    borderWidth: 1.5,
    borderRadius: 12,
    borderStyle: 'dashed',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  editor: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  editorTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  hint: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  preview: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
  },
  editorActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 20,
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.75,
  },
});
