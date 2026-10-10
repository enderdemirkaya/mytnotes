import { Text } from 'react-native';
import { getLibraryById } from '../studio/iconLibraries';

export function ActivityIcon({ icon, size = 32, color }) {
  if (!icon) return null;

  if (icon.kind === 'emoji') {
    return <Text style={{ fontSize: size * 0.9 }}>{icon.emoji}</Text>;
  }

  const lib = getLibraryById(icon.libraryId);
  if (!lib) return null;

  const IconComponent = lib.Icon;
  const variant = icon.variant ?? 'solid';

  if (lib.fa6) {
    const iconStyle =
      variant === 'brand' ? 'brand' : variant === 'regular' ? 'regular' : 'solid';
    return (
      <IconComponent name={icon.name} size={size} color={color} iconStyle={iconStyle} />
    );
  }

  return <IconComponent name={icon.name} size={size} color={color} />;
}

export function formatActivityIconLabel(icon) {
  if (!icon) return '';
  if (icon.kind === 'emoji') return icon.emoji;
  return icon.name.replace(/-/g, ' ');
}
