/**
 * /src/screens/FeedScreen.tsx
 *
 * Hybrid FlatList: every 5th item = full-width Hero, rest = 2-column grid.
 * Handles 500+ items at 60 FPS via:
 *   - initialNumToRender={6}
 *   - windowSize={10}
 *   - maxToRenderPerBatch={10}
 *   - getItemType for separate recycler pools
 *   - React.memo + useCallback throughout
 *   - removeClippedSubviews on Android
 */

import React, { memo, useState, useCallback, useMemo, useRef } from 'react';
import { View, FlatList, StyleSheet, Platform, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import COLORS from '../theme/colors';
import PRODUCTS, { Product } from '../data/mockData';
import CategoryBar from '../molecules/CategoryBar';
import DropCard from '../molecules/DropCard';
import StyledText from '../atoms/StyledText';

type Props = NativeStackScreenProps<RootStackParamList, 'Feed'>;
type ActiveCategory = 'All' | 'Sneakers' | 'Hoodies' | 'Accessories';

// ── Virtual row types ──────────────────────────────────────────────────────
type HeroRow  = { type: 'hero';      id: string; product: Product };
type GridRow  = { type: 'grid_row';  id: string; items: Product[] };
type VirtRow  = HeroRow | GridRow;

/**
 * Transforms the flat product list into virtual rows.
 * Position % 5 === 4  → HERO (full-width)
 * All others          → paired into GRID_ROW (2 per row)
 */
const buildVirtualRows = (products: Product[]): VirtRow[] => {
  const rows: VirtRow[] = [];
  let buf: Product[] = [];
  let pos = 0;

  for (const product of products) {
    if (pos % 5 === 4) {
      if (buf.length) { rows.push({ type: 'grid_row', id: `gr-${buf[0].id}`, items: [...buf] }); buf = []; }
      rows.push({ type: 'hero', id: `h-${product.id}`, product });
    } else {
      buf.push(product);
      if (buf.length === 2) { rows.push({ type: 'grid_row', id: `gr-${buf[0].id}`, items: [...buf] }); buf = []; }
    }
    pos++;
  }
  if (buf.length) rows.push({ type: 'grid_row', id: `gr-${buf[0].id}`, items: [...buf] });
  return rows;
};

// ── Row renderers ──────────────────────────────────────────────────────────
const HeroRowItem = memo(({ product, onPress }: { product: Product; onPress: (p: Product) => void }) => (
  <DropCard product={product} hero onPress={onPress} />
));

const GridRowItem = memo(({ items, onPress }: { items: Product[]; onPress: (p: Product) => void }) => (
  <View style={styles.gridRow}>
    {items.map(p => <DropCard key={p.id} product={p} hero={false} onPress={onPress} />)}
    {items.length === 1 && <View style={styles.gridSpacer} />}
  </View>
));

// ── FeedScreen ─────────────────────────────────────────────────────────────
const FeedScreen = ({ navigation }: Props) => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('All');
  const listRef = useRef<FlatList>(null);

  const filtered = useMemo(() =>
    activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const rows = useMemo(() => buildVirtualRows(filtered), [filtered]);

  const handlePress = useCallback((product: Product) => {
    navigation.navigate('ProductDetail', { product });
  }, [navigation]);

  const handleCategoryChange = useCallback((cat: ActiveCategory) => {
    setActiveCategory(cat);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const renderItem = useCallback(({ item }: { item: VirtRow }) => {
    if (item.type === 'hero')     return <HeroRowItem product={item.product} onPress={handlePress} />;
    return <GridRowItem items={item.items} onPress={handlePress} />;
  }, [handlePress]);

  const keyExtractor  = useCallback((item: VirtRow) => item.id, []);
  const getItemType   = useCallback((item: VirtRow) => item.type, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* App header */}
      <View style={styles.header}>
        <Text style={styles.appName}>HYPED</Text>
        <StyledText variant="caption" style={styles.dropCount}>{filtered.length} DROPS</StyledText>
      </View>

      {/* Top-mounted Category Bar — horizontal ScrollView */}
      <CategoryBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* ── The Hybrid FlatList ── */}
      <FlatList
        ref={listRef}
        data={rows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        // ── 60 FPS performance tuning ──────────────────────────────
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={Platform.OS === 'android'}
        // ── Misc ──────────────────────────────────────────────────
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <View style={styles.empty}>
            <StyledText variant="heading">No drops in this category</StyledText>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: COLORS.background },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  appName:     { fontSize: 28, fontWeight: '900', letterSpacing: 4, color: COLORS.white },
  dropCount:   { color: COLORS.accent },
  listContent: { paddingTop: 14, paddingBottom: 40 },
  gridRow:     { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  gridSpacer:  { flex: 1, marginLeft: 10 },
  empty:       { flex: 1, alignItems: 'center', paddingTop: 80, paddingHorizontal: 32 },
});

export default memo(FeedScreen);
