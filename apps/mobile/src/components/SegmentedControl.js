import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function SegmentedControl({ options, value, onChange }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              selected && { backgroundColor: colors.background },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: selected ? colors.text : colors.textSecondary },
                selected && styles.labelSelected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelSelected: {
    fontWeight: '600',
  },
});
