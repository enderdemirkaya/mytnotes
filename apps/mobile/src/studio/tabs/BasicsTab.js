import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ActivityIcon, formatActivityIconLabel } from '../../components/ActivityIcon';
import { IconPickerModal } from '../../components/IconPickerModal';
import { useActivityDraft } from '../../context/ActivityDraftContext';
import { useTheme } from '../../theme/useTheme';

export function BasicsTab() {
  const { draft, updateDraft } = useActivityDraft();
  const { colors } = useTheme();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Icon
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Choose activity icon"
          onPress={() => setPickerOpen(true)}
          style={[
            styles.iconButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <ActivityIcon icon={draft.icon} size={36} color={colors.text} />
        </Pressable>
        <Text style={[styles.iconMeta, { color: colors.textSecondary }]}>
          {formatActivityIconLabel(draft.icon)} · tap to search
        </Text>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Name
        </Text>
        <TextInput
          value={draft.name}
          onChangeText={(name) => updateDraft({ name })}
          placeholder="Activity name"
          placeholderTextColor={colors.placeholder}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface },
          ]}
          autoCapitalize="sentences"
        />

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Summary
        </Text>
        <TextInput
          value={draft.summary}
          onChangeText={(summary) => updateDraft({ summary })}
          placeholder="What is this activity for?"
          placeholderTextColor={colors.placeholder}
          style={[
            styles.input,
            styles.multiline,
            { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface },
          ]}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <IconPickerModal
        visible={pickerOpen}
        value={draft.icon}
        onClose={() => setPickerOpen(false)}
        onSelect={(icon) => updateDraft({ icon })}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 8,
    marginTop: 8,
  },
  iconButton: {
    alignSelf: 'flex-start',
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconMeta: {
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    marginBottom: 8,
  },
  multiline: {
    minHeight: 96,
  },
});
