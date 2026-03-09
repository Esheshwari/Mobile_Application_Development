/**
 * /src/molecules/CategoryBar.tsx
 * Horizontal scroll category filter.
 * showsHorizontalScrollIndicator={false} — spec requirement.
 */

import React, { memo, useCallback } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import COLORS from '../theme/colors';

type Category = 'All' | 'Sneakers' | 'Hoodies' | 'Accessories';
const CATEGORIES: Category[] = ['All', 'Sneakers', 'Hoodies', 'Accessories'];

interface Props {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

const Pill = memo(({ label, isActive, onPress }: { label: Category; isActive: boolean; onPress: (c: Category) => void }) => {
  const handle = useCallback(() => onPress(label), [label, onPress]);
  return (
    <TouchableOpacity
      style={[styles.pill, isActive && styles.pillActive]}
      onPress={handle}
      activeOpacity={0.75}
    >
      <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
});

const CategoryBar = memo<Props>(({ activeCategory, onCategoryChange }) => (
  <View style={styles.wrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}   // ← spec requirement
      contentContainerStyle={styles.content}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      {CATEGORIES.map(cat => (
        <Pill key={cat} label={cat} isActive={activeCategory === cat} onPress={onCategoryChange} />
      ))}
    </ScrollView>
  </View>
));

CategoryBar.displayName = 'CategoryBar';

const styles = StyleSheet.create({
  wrapper:       { backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  content:       { paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  pill:          { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surfaceElevated, borderWidth: 1, borderColor: COLORS.border, marginRight: 8 },
  pillActive:    { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  pillText:      { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', color: COLORS.textMuted },
  pillTextActive:{ color: '#000', fontWeight: '900' },
});

export default CategoryBar;
