import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/** @typedef {'solid' | 'regular' | 'brand'} FaVariant */

/**
 * @typedef {Object} VectorActivityIcon
 * @property {'vector'} kind
 * @property {string} libraryId
 * @property {string} name
 * @property {FaVariant} [variant]
 */

/**
 * @typedef {Object} EmojiActivityIcon
 * @property {'emoji'} kind
 * @property {string} emoji
 */

/** @typedef {VectorActivityIcon | EmojiActivityIcon} ActivityIconValue */

/** Expo Go–friendly sets only (Material, FA6, Ionicons, Feather). */
export const VECTOR_ICON_LIBRARIES = [
  { id: 'MaterialCommunityIcons', Icon: MaterialCommunityIcons, fa6: false },
  { id: 'MaterialIcons', Icon: MaterialIcons, fa6: false },
  { id: 'Ionicons', Icon: Ionicons, fa6: false },
  { id: 'FontAwesome6', Icon: FontAwesome6, fa6: true },
  { id: 'Feather', Icon: Feather, fa6: false },
];

const LIBRARY_SEARCH_ORDER = VECTOR_ICON_LIBRARIES.map((lib) => lib.id);

export const DEFAULT_ACTIVITY_ICON = {
  kind: 'vector',
  libraryId: 'MaterialCommunityIcons',
  name: 'run',
  variant: 'solid',
};

const nameCache = new Map();

function iconNames(IconComponent) {
  const map = IconComponent.glyphMap ?? IconComponent.getRawGlyphMap?.();
  return Object.keys(map ?? {});
}

/** @param {ActivityIconValue} icon */
export function iconKey(icon) {
  if (icon.kind === 'emoji') return `emoji:${icon.emoji}`;
  return `vector:${icon.libraryId}:${icon.name}:${icon.variant ?? 'solid'}`;
}

export function getLibraryById(libraryId) {
  return VECTOR_ICON_LIBRARIES.find((lib) => lib.id === libraryId) ?? null;
}

function getAllIconNames(libraryId) {
  if (nameCache.has(libraryId)) return nameCache.get(libraryId);
  const lib = getLibraryById(libraryId);
  if (!lib) return [];
  const names = iconNames(lib.Icon);
  nameCache.set(libraryId, names);
  return names;
}

/** @type {ActivityIconValue[]} */
export const POPULAR_ICONS = [
  { kind: 'emoji', emoji: '🏃' },
  { kind: 'emoji', emoji: '💪' },
  { kind: 'emoji', emoji: '🧘' },
  { kind: 'emoji', emoji: '🚴' },
  { kind: 'emoji', emoji: '🏊' },
  { kind: 'emoji', emoji: '🏋️' },
  { kind: 'emoji', emoji: '🚶' },
  { kind: 'emoji', emoji: '🥗' },
  { kind: 'emoji', emoji: '💧' },
  { kind: 'emoji', emoji: '💤' },
  { kind: 'emoji', emoji: '🔥' },
  { kind: 'emoji', emoji: '🎯' },
  { kind: 'emoji', emoji: '⏱️' },
  { kind: 'emoji', emoji: '📚' },
  { kind: 'emoji', emoji: '🧠' },
  { kind: 'emoji', emoji: '❤️' },
  { kind: 'emoji', emoji: '☀️' },
  { kind: 'emoji', emoji: '🌙' },
  { kind: 'emoji', emoji: '⚡' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'run', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'walk', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'dumbbell', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'yoga', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'swim', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'bike', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'food-apple', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'sleep', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'water', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialCommunityIcons', name: 'heart-pulse', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialIcons', name: 'fitness-center', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialIcons', name: 'self-improvement', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialIcons', name: 'directions-run', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialIcons', name: 'directions-bike', variant: 'solid' },
  { kind: 'vector', libraryId: 'MaterialIcons', name: 'pool', variant: 'solid' },
  { kind: 'vector', libraryId: 'Ionicons', name: 'barbell', variant: 'solid' },
  { kind: 'vector', libraryId: 'Ionicons', name: 'bicycle', variant: 'solid' },
  { kind: 'vector', libraryId: 'Ionicons', name: 'fitness', variant: 'solid' },
  { kind: 'vector', libraryId: 'Ionicons', name: 'nutrition', variant: 'solid' },
  { kind: 'vector', libraryId: 'FontAwesome6', name: 'person-running', variant: 'solid' },
  { kind: 'vector', libraryId: 'FontAwesome6', name: 'dumbbell', variant: 'solid' },
  { kind: 'vector', libraryId: 'FontAwesome6', name: 'heart-pulse', variant: 'solid' },
  { kind: 'vector', libraryId: 'Feather', name: 'activity', variant: 'solid' },
  { kind: 'vector', libraryId: 'Feather', name: 'target', variant: 'solid' },
  { kind: 'vector', libraryId: 'Feather', name: 'award', variant: 'solid' },
  { kind: 'vector', libraryId: 'Feather', name: 'clock', variant: 'solid' },
  { kind: 'vector', libraryId: 'Feather', name: 'heart', variant: 'solid' },
];

const POPULAR_RANK = new Map(POPULAR_ICONS.map((icon, index) => [iconKey(icon), index]));

/** @type {{ emoji: string, terms: string[] }[]} */
const EMOJI_SEARCH_INDEX = [
  { emoji: '🏃', terms: ['run', 'running', 'cardio'] },
  { emoji: '💪', terms: ['strength', 'muscle', 'lift', 'gym'] },
  { emoji: '🧘', terms: ['yoga', 'meditate', 'stretch', 'mindful'] },
  { emoji: '🚴', terms: ['bike', 'cycle', 'cycling'] },
  { emoji: '🏊', terms: ['swim', 'pool'] },
  { emoji: '🥗', terms: ['food', 'salad', 'diet', 'nutrition'] },
  { emoji: '💤', terms: ['sleep', 'rest'] },
  { emoji: '📚', terms: ['read', 'study', 'book'] },
  { emoji: '🎯', terms: ['goal', 'target', 'focus'] },
  { emoji: '⚡', terms: ['energy', 'power'] },
  { emoji: '🚶', terms: ['walk', 'steps'] },
  { emoji: '🏋️', terms: ['weights', 'workout'] },
  { emoji: '⏱️', terms: ['time', 'timer'] },
  { emoji: '🔥', terms: ['streak', 'calories'] },
  { emoji: '💧', terms: ['water', 'hydration'] },
  { emoji: '🧠', terms: ['mind', 'mental'] },
  { emoji: '🛏️', terms: ['bed', 'sleep'] },
  { emoji: '☀️', terms: ['morning', 'sun'] },
  { emoji: '🌙', terms: ['night'] },
  { emoji: '❤️', terms: ['heart', 'health'] },
  { emoji: '🍎', terms: ['apple', 'fruit', 'food'] },
  { emoji: '🥦', terms: ['vegetable', 'healthy'] },
  { emoji: '🧗', terms: ['climb'] },
  { emoji: '⛹️', terms: ['basketball', 'sport'] },
  { emoji: '🤸', terms: ['flexibility'] },
];

function emojiMatchesQuery(entry, q) {
  if (!q) return true;
  return (
    entry.emoji.includes(q) ||
    entry.terms.some((term) => term.includes(q) || q.includes(term))
  );
}

/**
 * @param {string} query
 * @param {number} limit
 * @returns {ActivityIconValue[]}
 */
export function searchAllIcons(query, limit = 120) {
  const q = query.trim().toLowerCase().replace(/\s+/g, '-');
  if (!q) return POPULAR_ICONS.slice(0, limit);

  /** @type {{ icon: ActivityIconValue, score: number }[]} */
  const matches = [];

  for (const entry of EMOJI_SEARCH_INDEX) {
    if (!emojiMatchesQuery(entry, q)) continue;
    const icon = { kind: 'emoji', emoji: entry.emoji };
    const rank = POPULAR_RANK.get(iconKey(icon));
    matches.push({ icon, score: rank ?? 200 + matches.length });
  }

  for (const libraryId of LIBRARY_SEARCH_ORDER) {
    const libraryBias = LIBRARY_SEARCH_ORDER.indexOf(libraryId) * 3;
    const names = getAllIconNames(libraryId);

    for (const name of names) {
      if (/^[0-9]$/.test(name)) continue;

      let tier;
      if (name === q) tier = 0;
      else if (name.startsWith(q)) tier = 1;
      else if (name.includes(q)) tier = 2;
      else continue;

      const icon = {
        kind: 'vector',
        libraryId,
        name,
        variant: 'solid',
      };
      const popularRank = POPULAR_RANK.get(iconKey(icon));
      const score =
        popularRank ??
        (tier === 0 ? 40 : tier === 1 ? 80 : 120) + libraryBias;

      matches.push({ icon, score });
    }
  }

  matches.sort((a, b) => a.score - b.score);

  /** @type {ActivityIconValue[]} */
  const unique = [];
  const seen = new Set();
  for (const { icon } of matches) {
    const key = iconKey(icon);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(icon);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function iconsMatch(a, b) {
  if (!a || !b) return false;
  return iconKey(a) === iconKey(b);
}

export function totalSearchableIconCount() {
  const emojiCount = EMOJI_SEARCH_INDEX.length;
  const vectorCount = VECTOR_ICON_LIBRARIES.reduce(
    (sum, lib) => sum + iconNames(lib.Icon).length,
    0
  );
  return emojiCount + vectorCount;
}
