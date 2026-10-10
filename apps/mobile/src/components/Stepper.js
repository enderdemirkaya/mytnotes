import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function Stepper({ label, value, min = 1, max = 99, onChange }) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={styles.controls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Decrease ${label}`}
          disabled={value <= min}
          onPress={() => onChange(Math.max(min, value - 1))}
          style={({ pressed }) => [
            styles.button,
            { borderColor: colors.border, backgroundColor: colors.surface },
            pressed && styles.pressed,
            value <= min && styles.disabled,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.tint }]}>−</Text>
        </Pressable>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Increase ${label}`}
          disabled={value >= max}
          onPress={() => onChange(Math.min(max, value + 1))}
          style={({ pressed }) => [
            styles.button,
            { borderColor: colors.border, backgroundColor: colors.surface },
            pressed && styles.pressed,
            value >= max && styles.disabled,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.tint }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    flex: 1,
    paddingRight: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '500',
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    minWidth: 28,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.35,
  },
});
