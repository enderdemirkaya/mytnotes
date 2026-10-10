import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  iconKey,
  iconsMatch,
  searchAllIcons,
  totalSearchableIconCount,
} from '../studio/iconLibraries';
import { useTheme } from '../theme/useTheme';
import { ActivityIcon } from './ActivityIcon';

const NUM_COLUMNS = 5;

function IconCell({ icon, selected, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => onPress(icon)}
      style={[
        styles.cell,
        { backgroundColor: colors.surface, borderColor: colors.border },
        selected && { borderColor: colors.tint, borderWidth: 2 },
      ]}
    >
      <ActivityIcon icon={icon} size={26} color={colors.text} />
    </Pressable>
  );
}

export function IconPickerModal({ visible, value, onClose, onSelect }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchAllIcons(query), [query]);

  const hint = query.trim()
    ? `${results.length} shown${results.length >= 120 ? ' (refine search)' : ''}`
    : `Popular icons · search ${totalSearchableIconCount().toLocaleString()} total`;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={[styles.toolbar, { borderBottomColor: colors.border }]}>
          <Pressable accessibilityRole="button" onPress={onClose} hitSlop={8}>
            <Text style={[styles.cancel, { color: colors.tint }]}>Cancel</Text>
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>Choose icon</Text>
          <View style={styles.toolbarSpacer} />
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search icons and emoji…"
          placeholderTextColor={colors.placeholder}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          style={[
            styles.search,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.surface,
            },
          ]}
        />
        <Text style={[styles.hint, { color: colors.textSecondary }]}>{hint}</Text>

        <FlatList
          data={results}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item) => iconKey(item)}
          contentContainerStyle={styles.grid}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <IconCell
              icon={item}
              selected={iconsMatch(value, item)}
              onPress={(icon) => {
                onSelect(icon);
                onClose();
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.textSecondary }]}>
              No icons match “{query.trim()}”
            </Text>
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cancel: {
    fontSize: 17,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  toolbarSpacer: {
    width: 56,
  },
  search: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 17,
  },
  hint: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 8,
    fontSize: 13,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: '20%',
    margin: 4,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});
