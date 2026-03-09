/**
 * /src/molecules/DropCard.tsx
 * Renders in two modes:
 *   hero={true}  → full-width Featured Hero Card (every 5th item)
 *   hero={false} → 2-column grid card
 *
 * The floating PriceTag uses position:'absolute', bottom:-18
 * (= half of the 36px tag height) to sit halfway off the image edge.
 */

import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import COLORS from '../theme/colors';
import { Product } from '../data/mockData';
import StyledText from '../atoms/StyledText';
import Badge from '../atoms/Badge';
import PriceTag from '../atoms/PriceTag';

const { width: SW } = Dimensions.get('window');
const H_PAD  = 16;
const GUTTER = 10;
const GRID_W = (SW - H_PAD * 2 - GUTTER) / 2;

// ── Placeholder image (replace with <Image> in production) ────────────────
const PlaceholderImage = memo(({ product, height }: { product: Product; height: number }) => (
  <View style={[styles.imgPlaceholder, { height, backgroundColor: product.colorHex }]}>
    <View style={[styles.accentOrb, { backgroundColor: product.accentHex }]} />
    <Text style={styles.monogram}>{product.name.charAt(0)}</Text>
  </View>
));

// ── Hero Card ──────────────────────────────────────────────────────────────
const HeroCard = memo(({ product, onPress }: { product: Product; onPress: () => void }) => (
  <TouchableOpacity style={styles.heroCard} onPress={onPress} activeOpacity={0.92}>
    <View style={styles.imgWrapper}>
      <PlaceholderImage product={product} height={200} />
      {/* Floating PriceTag — bottom:-18 = half of 36px tag height */}
      <PriceTag
        retailPrice={product.retailPrice}
        marketPrice={product.marketPrice}
        style={styles.heroPriceTag}
      />
    </View>
    <View style={styles.heroInfo}>
      <View style={styles.heroRow}>
        <Badge type={product.releaseType} />
        <StyledText variant="caption" style={styles.dateText}>{product.dropDate}</StyledText>
      </View>
      <StyledText variant="heading" numberOfLines={2} style={styles.heroName}>{product.name}</StyledText>
      <StyledText variant="caption">{product.category}</StyledText>
    </View>
  </TouchableOpacity>
));

// ── Grid Card ──────────────────────────────────────────────────────────────
const GridCard = memo(({ product, onPress }: { product: Product; onPress: () => void }) => (
  <TouchableOpacity style={styles.gridCard} onPress={onPress} activeOpacity={0.92}>
    <View style={styles.imgWrapper}>
      <PlaceholderImage product={product} height={150} />
      <PriceTag
        retailPrice={product.retailPrice}
        marketPrice={product.marketPrice}
        style={styles.gridPriceTag}
      />
    </View>
    <View style={styles.gridInfo}>
      <Badge type={product.releaseType} style={styles.gridBadge} />
      <StyledText variant="subheading" numberOfLines={2} style={styles.gridName}>{product.name}</StyledText>
      <StyledText variant="caption" numberOfLines={1}>{product.dropDate}</StyledText>
    </View>
  </TouchableOpacity>
));

// ── Public DropCard ────────────────────────────────────────────────────────
interface Props {
  product: Product;
  hero?: boolean;
  onPress: (product: Product) => void;
}

const DropCard = memo<Props>(({ product, hero = false, onPress }) => {
  const handlePress = useCallback(() => onPress(product), [onPress, product]);
  return hero
    ? <HeroCard product={product} onPress={handlePress} />
    : <GridCard product={product} onPress={handlePress} />;
});

DropCard.displayName = 'DropCard';

const styles = StyleSheet.create({
  // ── Hero ──────────────────────────────────────────────────────────────
  heroCard: {
    marginHorizontal: H_PAD, marginBottom: 22,
    backgroundColor: COLORS.surface, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.border,
    overflow: 'visible', // lets PriceTag bleed out
  },
  imgWrapper: { overflow: 'visible' },
  imgPlaceholder: {
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
  },
  accentOrb: {
    position: 'absolute', width: '60%', height: '60%',
    borderRadius: 999, bottom: -30, right: -30, opacity: 0.35,
  },
  monogram: {
    fontSize: 72, fontWeight: '900', color: '#fff', opacity: 0.12,
  },
  heroPriceTag: {
    position: 'absolute', bottom: -18, left: 16, zIndex: 10,
  },
  heroInfo:  { padding: 16, paddingTop: 28 },
  heroRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  heroName:  { marginBottom: 6 },
  dateText:  { color: COLORS.textMuted },

  // ── Grid ──────────────────────────────────────────────────────────────
  gridCard: {
    width: GRID_W,
    backgroundColor: COLORS.surface, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.border,
    overflow: 'visible', marginBottom: 20,
  },
  gridPriceTag: { position: 'absolute', bottom: -18, left: 10, zIndex: 10 },
  gridInfo:     { padding: 10, paddingTop: 26 },
  gridBadge:    { marginBottom: 6 },
  gridName:     { fontSize: 13, marginBottom: 4, lineHeight: 18 },
});

export default DropCard;
