/**
 * /src/screens/ProductDetail.tsx
 *
 * Drop Detail Screen.
 * 1. Receives product via route.params (Stack Navigation — spec requirement)
 * 2. Sticky Footer — "Join Waitlist" pinned via position:'absolute' outside ScrollView
 * 3. Size Grid — flexWrap:'wrap' with toggle (spec requirement)
 * 4. SafeAreaView + useSafeAreaInsets for notch/home indicator
 */

import React, { memo, useState, useCallback } from 'react';
import {
  View, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, Alert, Platform, StatusBar, Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import COLORS from '../theme/colors';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import Badge from '../atoms/Badge';
import SizeGrid from '../molecules/SizeGrid';
import PriceTag from '../atoms/PriceTag';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;
const { width: SW } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }: Props) => {
  // ── Receive product via route.params ────────────────────────────────────
  const { product } = route.params;
  const insets = useSafeAreaInsets();
  const [joined, setJoined] = useState(false);

  // Sticky footer total height
  const FOOTER_H = 54 + 32 + (insets.bottom > 0 ? insets.bottom : 16);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleJoin = useCallback(() => {
    if (product.isSoldOut) { Alert.alert('Sold Out', 'This drop has ended.'); return; }
    setJoined(true);
    Alert.alert('🔥 You\'re In!', `Your ${product.releaseType} entry for ${product.name} was submitted.`);
  }, [product]);

  const unavailableSizes = product.sizes.filter((_, i) => i % 4 === 3);

  const relDesc: Record<string, string> = {
    RAFFLE:    'Submit your entry before the deadline. Winners are selected randomly and notified via email within 24 hours.',
    FCFS:      'First come, first served. The drop goes live at the listed time — have your payment info ready.',
    EXCLUSIVE: 'Invitation-only. Access granted to verified HYPED members with a qualifying purchase history.',
    DRAW:      'Enter the draw for a chance to purchase. No advantage for early entry — all entries are equal.',
    LIVE:      'This drop is LIVE NOW. Complete checkout immediately — stock is disappearing in real time.',
    SOLD_OUT:  'This drop has ended. All units have been claimed.',
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: FOOTER_H + 16 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Hero image */}
        <View style={[styles.heroImg, { backgroundColor: product.colorHex }]}>
          <View style={[styles.heroOrb, { backgroundColor: product.accentHex }]} />
          <Text style={styles.heroMonogram}>{product.name.charAt(0)}</Text>

          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.75}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          {/* Floating price tag on hero */}
          <PriceTag
            retailPrice={product.retailPrice}
            marketPrice={product.marketPrice}
            style={styles.heroPrice}
          />
        </View>

        <View style={styles.content}>
          {/* Badge + category */}
          <View style={styles.badgeRow}>
            <Badge type={product.releaseType} />
            <StyledText variant="caption" style={styles.catLabel}>{product.category}</StyledText>
          </View>

          {/* Name + date */}
          <StyledText variant="display" style={styles.name}>{product.name}</StyledText>
          <StyledText variant="label" style={styles.dateLabel}>Drop Date: {product.dropDate}</StyledText>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: 'RETAIL',  val: `$${product.retailPrice}`, accent: false },
              { label: 'MARKET',  val: `$${product.marketPrice}`, accent: true  },
              { label: 'PREMIUM', val: `+${product.premium}%`,    accent: true  },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <View style={styles.statDiv} />}
                <View style={styles.stat}>
                  <StyledText variant="caption" style={styles.statLabel}>{s.label}</StyledText>
                  <StyledText variant="heading" style={[styles.statVal, s.accent && styles.statAccent]}>{s.val}</StyledText>
                </View>
              </React.Fragment>
            ))}
          </View>

          {/* Size Grid — flexWrap:'wrap' spec requirement */}
          <View style={styles.section}>
            <SizeGrid sizes={product.sizes} unavailableSizes={unavailableSizes} />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <StyledText variant="label" style={styles.sectionTitle}>About This Drop</StyledText>
            <StyledText variant="body">{product.description}</StyledText>
            <StyledText variant="body" style={styles.extraDesc}>
              This release has been years in the making. The collaboration brings together two iconic names in street culture, resulting in a piece that will define the aesthetic of this generation. Every unit has been individually inspected — the packaging alone took six months of development.
            </StyledText>
          </View>

          {/* Release info */}
          <View style={[styles.section, styles.releaseBox]}>
            <StyledText variant="label" style={styles.sectionTitle}>Release: {product.releaseType}</StyledText>
            <StyledText variant="body">{relDesc[product.releaseType] ?? relDesc.DRAW}</StyledText>
          </View>
        </View>
      </ScrollView>

      {/* ══════════════════════════════════════════════════════════
          STICKY FOOTER
          position:'absolute' keeps it outside the scroll context.
          The button is ALWAYS visible — it never scrolls away.
          paddingBottom uses safe area inset for iPhone home bar.
      ══════════════════════════════════════════════════════════ */}
      <View style={[styles.stickyFooter, { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }]}>
        <StyledButton
          label={
            product.isSoldOut ? 'Sold Out'
            : joined          ? '✓ Entry Submitted'
            :                   `Join ${product.releaseType} →`
          }
          onPress={handleJoin}
          variant={joined ? 'ghost' : 'primary'}
          disabled={product.isSoldOut || joined}
          fullWidth
        />
        {!product.isSoldOut && !joined && (
          <StyledText variant="caption" style={styles.footerNote}>
            Entry closes {product.dropDate} · Limited allocations
          </StyledText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root:         { flex: 1, backgroundColor: COLORS.background },
  scroll:       { flex: 1 },

  // Hero image
  heroImg:      { width: SW, height: 280, alignItems: 'center', justifyContent: 'center', overflow: 'visible', position: 'relative' },
  heroOrb:      { position: 'absolute', width: SW * 0.7, height: SW * 0.7, borderRadius: SW, bottom: -(SW * 0.2), right: -(SW * 0.1), opacity: 0.3 },
  heroMonogram: { fontSize: 110, fontWeight: '900', color: '#fff', opacity: 0.12 },
  heroPrice:    { position: 'absolute', bottom: -18, right: 20, zIndex: 10 },

  // Back button
  backBtn:      { position: 'absolute', top: Platform.OS === 'android' ? 40 : 16, left: 16, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: '#333' },
  backText:     { fontSize: 11, fontWeight: '800', letterSpacing: 1.2, color: '#ccc' },

  // Content
  content:      { paddingHorizontal: 20, paddingTop: 28 },
  badgeRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  catLabel:     { color: COLORS.textMuted },
  name:         { fontSize: 26, lineHeight: 32, marginBottom: 8 },
  dateLabel:    { color: COLORS.accent, marginBottom: 22 },

  // Stats
  statsRow:     { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, marginBottom: 26, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  stat:         { flex: 1, alignItems: 'center' },
  statDiv:      { width: 1, height: 32, backgroundColor: COLORS.border },
  statLabel:    { marginBottom: 4, color: COLORS.textMuted },
  statVal:      { fontSize: 18, fontWeight: '900' },
  statAccent:   { color: COLORS.accent },

  // Sections
  section:      { marginBottom: 28 },
  sectionTitle: { marginBottom: 14 },
  extraDesc:    { marginTop: 12 },
  releaseBox:   { backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.border },

  // Sticky footer
  stickyFooter: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  footerNote:   { textAlign: 'center', marginTop: 8, color: COLORS.textMuted },
});

export default memo(ProductDetail);
