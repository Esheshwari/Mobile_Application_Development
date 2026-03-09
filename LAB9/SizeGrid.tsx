/**
 * /src/molecules/SizeGrid.tsx
 * flexWrap:'wrap' multi-row size selector.
 * Each box toggles background color on selection — spec requirement.
 */

import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../theme/colors';
import StyledText from '../atoms/StyledText';

interface Props {
  sizes: string[];
  unavailableSizes?: string[];
}

const SizeBox = memo(({ size, isSelected, disabled, onSelect }: {
  size: string; isSelected: boolean; disabled: boolean; onSelect: (s: string) => void;
}) => {
  const handle = useCallback(() => { if (!disabled) onSelect(size); }, [size, disabled, onSelect]);
  return (
    <TouchableOpacity
      style={[styles.box, isSelected && styles.boxSelected, disabled && styles.boxDisabled]}
      onPress={handle}
      activeOpacity={0.75}
      disabled={disabled}
    >
      <StyledText
        variant="caption"
        style={[styles.boxText, isSelected && styles.boxTextSelected, disabled && styles.boxTextDisabled]}
      >
        {size}
      </StyledText>
      {disabled && <View style={styles.strike} />}
    </TouchableOpacity>
  );
});

const SizeGrid = memo<Props>(({ sizes, unavailableSizes = [] }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback((size: string) => {
    setSelected(prev => prev === size ? null : size);
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <StyledText variant="label">Select Size</StyledText>
        {selected && <StyledText variant="body" style={styles.selectedText}>Size: {selected}</StyledText>}
      </View>
      {/* flexWrap:'wrap' creates the multi-row grid — spec requirement */}
      <View style={styles.grid}>
        {sizes.map(size => (
          <SizeBox
            key={size}
            size={size}
            isSelected={selected === size}
            disabled={unavailableSizes.includes(size)}
            onSelect={handleSelect}
          />
        ))}
      </View>
    </View>
  );
});

SizeGrid.displayName = 'SizeGrid';

const styles = StyleSheet.create({
  header:              { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  selectedText:        { fontSize: 12, color: COLORS.accent },
  grid:                { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },   // ← spec requirement
  box:                 { width: 56, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surfaceElevated, borderRadius: 8, borderWidth: 1.5, borderColor: COLORS.border, position: 'relative', overflow: 'visible' },
  boxSelected:         { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  boxDisabled:         { backgroundColor: COLORS.background, borderColor: '#222', opacity: 0.5 },
  boxText:             { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary, textTransform: 'none', letterSpacing: 0 },
  boxTextSelected:     { color: '#000', fontWeight: '900' },
  boxTextDisabled:     { color: COLORS.textMuted },
  strike:              { position: 'absolute', width: '140%', height: 1.5, backgroundColor: COLORS.textMuted, transform: [{ rotate: '-25deg' }], opacity: 0.6 },
});

export default SizeGrid;
