import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

type Plan = 'yearly' | 'weekly';

const plans = {
  yearly: { title: 'Yearly Membership', price: '$0.62', period: 'per week', fullPrice: 'US$32.49', sheetPrice: 'US$ 32.49/年' },
  weekly: { title: 'Weekly Membership', price: '$8.99', period: 'per week', fullPrice: 'US$8.99', sheetPrice: 'US$ 8.99/周' },
} as const;

export default function SecretOfferScreen() {
  const { width, height } = useWindowDimensions();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = Math.min((width - 24) / previewWidth, (height - 24) / previewHeight, 1);

  const handleGrabDeal = () => {
    setShowSheet(false);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowSheet(true);
    }, 650);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <LinearGradient colors={['#010403', '#07120D', '#09261A', '#020403']} locations={[0, 0.34, 0.68, 1]} style={StyleSheet.absoluteFill} />
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              <View style={styles.heroGlow} />
              <View style={[styles.bgTicket, styles.bgTicketLeft]} />
              <View style={[styles.bgTicket, styles.bgTicketRight]} />
            </View>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <PhoneStatus />
              <BrandPill />
              <Pressable accessibilityLabel="关闭秘密优惠" style={styles.closeButton} onPress={() => router.replace({ pathname: '/settings', params: { backTo: '/' } })}>
                <Feather name="x" size={35} color="#FFFFFF" />
              </Pressable>

              <View style={styles.content}>
                <Text style={styles.title}>You Discovered{`\n`}a Secret Offer</Text>
                <OfferArtwork />
                <View style={styles.planStack}>
                  <PlanCard plan="yearly" selected={selectedPlan === 'yearly'} onPress={() => setSelectedPlan('yearly')} />
                  <PlanCard plan="weekly" selected={selectedPlan === 'weekly'} onPress={() => setSelectedPlan('weekly')} />
                </View>
              </View>

              <View style={styles.bottomArea}>
                <Pressable accessibilityLabel="获取优惠" onPress={handleGrabDeal}>
                  <LinearGradient colors={['#27F17B', '#45F0C4', '#D7EB49']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.dealButton}>
                    <Text style={styles.dealText}>Grab The Deal</Text>
                  </LinearGradient>
                </Pressable>
                <View style={styles.footerLinks}>
                  <Text style={styles.footerText}>Terms of use</Text>
                  <Text style={styles.footerText}>Privacy policy</Text>
                  <Text style={styles.footerText}>Restore</Text>
                </View>
              </View>

              {isLoading && <LoadingOverlay />}
              {showSheet && <AppStoreSheet plan={selectedPlan} onClose={() => setShowSheet(false)} />}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function PhoneStatus() {
  return (
    <View style={styles.statusRow}>
      <Text style={styles.timeText}>15:30</Text>
      <View style={styles.phoneIndicators}>
        <View style={styles.signalDots}>
          <View style={styles.signalDotDim} />
          <View style={styles.signalDotDim} />
          <View style={styles.signalDotDim} />
          <View style={styles.signalDotDim} />
        </View>
        <Ionicons name="wifi" size={25} color="#FFFFFF" />
        <View style={styles.batteryPill}>
          <Text style={styles.batteryText}>88</Text>
        </View>
      </View>
    </View>
  );
}

function BrandPill() {
  return (
    <View style={styles.brandPill}>
      <LinearGradient colors={['#4AF08B', '#55F5C8', '#D8EA48']} style={styles.brandIcon}>
        <View style={styles.brandIconInner} />
      </LinearGradient>
      <Text style={styles.brandText}>Guma</Text>
    </View>
  );
}

function OfferArtwork() {
  return (
    <View style={styles.artWrap}>
      <View style={styles.artBackCard} />
      <LinearGradient colors={['#2CF27B', '#48F1C9']} style={styles.ticketCard}>
        <Text style={styles.discountText}>-50%</Text>
        <View style={[styles.ticketNotch, styles.ticketNotchLeft]} />
        <View style={[styles.ticketNotch, styles.ticketNotchRight]} />
      </LinearGradient>
      <LinearGradient colors={['rgba(32,115,76,0.92)', 'rgba(58,247,179,0.42)']} style={styles.envelope}>
        <Text style={styles.discountLabel}>DISCOUNT</Text>
      </LinearGradient>
      <LinearGradient colors={['#B9FF5C', '#45F0C4']} style={styles.fireBadge}>
        <Ionicons name="flame" size={34} color="#0B3A1F" />
      </LinearGradient>
      <View style={styles.miniTicket}>
        <MaterialCommunityIcons name="ticket-percent" size={24} color="#41F7D3" />
      </View>
    </View>
  );
}

function PlanCard({ plan, selected, onPress }: { plan: Plan; selected: boolean; onPress: () => void }) {
  const item = plans[plan];
  return (
    <Pressable accessibilityLabel={`选择${item.title}`} onPress={onPress} style={[styles.planCard, selected && styles.planCardSelected]}>
      {selected && <LinearGradient colors={['rgba(57,239,131,0.24)', 'rgba(65,247,211,0.08)']} style={StyleSheet.absoluteFill} />}
      <View>
        <Text style={styles.planTitle}>{item.title}</Text>
        <Text style={styles.planFullPrice}>{item.fullPrice}</Text>
      </View>
      <View style={styles.priceCol}>
        <Text style={styles.planPrice}>{item.price}</Text>
        <Text style={styles.planPeriod}>{item.period}</Text>
      </View>
    </Pressable>
  );
}

function LoadingOverlay() {
  return (
    <View style={styles.loadingOverlay} pointerEvents="none">
      <ActivityIndicator size="large" color="#D9FFE7" />
    </View>
  );
}

function AppStoreSheet({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const item = plans[plan];
  return (
    <View style={styles.sheetOverlay}>
      <Pressable accessibilityLabel="关闭订阅弹窗背景" style={styles.sheetScrim} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>App Store</Text>
          <Pressable accessibilityLabel="关闭订阅弹窗" style={styles.sheetClose} onPress={onClose}>
            <Feather name="x" size={36} color="#FFFFFF" />
          </Pressable>
        </View>
        <View style={styles.productCard}>
          <View style={styles.productTopRow}>
            <LinearGradient colors={['#31F179', '#41F7D3', '#D7EB49']} style={styles.appIcon}>
              <View style={styles.appIconRing} />
            </LinearGradient>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Guma Pro Subscription</Text>
              <Text style={styles.productMeta}>Guma：视频编辑特效制作 <Text style={styles.ageBadge}>18+</Text></Text>
              <Text style={styles.productMeta}>订阅</Text>
            </View>
          </View>
          <View style={styles.productDivider} />
          <Text style={styles.sheetPrice}>{item.sheetPrice}</Text>
          <View style={styles.productDivider} />
          <Text style={styles.sheetCopy}>在每个续期日期前至少一天，你可随时在“设置”＞“Apple 账户”中取消。方案将自动续期，直到取消为止。</Text>
          <View style={styles.productDivider} />
          <Text style={styles.accountText}>账户： zhanmeng2272@foxmail.com</Text>
        </View>
        <Pressable accessibilityLabel="订阅" style={styles.subscribeButton}>
          <Text style={styles.subscribeText}>订阅</Text>
        </Pressable>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0F4' },
  previewScaler: { alignItems: 'center', justifyContent: 'center' },
  phoneShell: {
    width: DESIGN_WIDTH + PHONE_BEZEL * 2,
    height: DESIGN_HEIGHT + PHONE_BEZEL * 2,
    padding: PHONE_BEZEL,
    borderRadius: 52,
    backgroundColor: '#0A0B10',
    shadowColor: '#000000',
    shadowOpacity: 0.26,
    shadowRadius: 34,
    shadowOffset: { width: 0, height: 18 },
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  speaker: { position: 'absolute', top: 8, left: '50%', width: 78, height: 6, marginLeft: -39, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 2 },
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#020403' },
  safeArea: { flex: 1 },
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  batteryText: { color: '#050505', fontSize: 16, fontWeight: '900' },
  brandPill: { position: 'absolute', top: 9, alignSelf: 'center', height: 45, paddingLeft: 9, paddingRight: 18, borderRadius: 23, flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: 'rgba(64, 116, 74, 0.7)', overflow: 'hidden' },
  brandIcon: { width: 34, height: 34, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  brandIconInner: { width: 15, height: 15, borderRadius: 8, borderWidth: 4, borderColor: 'rgba(21, 79, 45, 0.7)' },
  brandText: { color: '#FFFFFF', fontSize: 19, fontWeight: '900' },
  closeButton: { position: 'absolute', top: 58, left: 25, width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  content: { flex: 1, paddingHorizontal: 22, paddingTop: 92, alignItems: 'center' },
  title: { color: '#FFFFFF', fontSize: 34, lineHeight: 41, fontWeight: '900', textAlign: 'center', letterSpacing: -1.2 },
  heroGlow: { position: 'absolute', top: 112, left: 20, right: 20, height: 330, borderRadius: 180, backgroundColor: 'rgba(57,239,131,0.18)', shadowColor: '#39EF83', shadowOpacity: 0.7, shadowRadius: 70 },
  bgTicket: { position: 'absolute', width: 160, height: 86, borderRadius: 28, backgroundColor: 'rgba(65,247,211,0.10)', transform: [{ rotate: '-11deg' }] },
  bgTicketLeft: { left: -48, top: 220 },
  bgTicketRight: { right: -54, top: 210 },
  artWrap: { width: 290, height: 268, marginTop: 45, alignItems: 'center' },
  artBackCard: { position: 'absolute', top: 48, width: 250, height: 126, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.11)', transform: [{ rotate: '8deg' }] },
  ticketCard: { position: 'absolute', top: 75, width: 244, height: 138, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  discountText: { color: '#FFFFFF', fontSize: 58, fontWeight: '900', letterSpacing: -2 },
  ticketNotch: { position: 'absolute', width: 46, height: 46, borderRadius: 23, backgroundColor: '#0B2318' },
  ticketNotchLeft: { left: -23 },
  ticketNotchRight: { right: -23 },
  envelope: { position: 'absolute', bottom: 22, width: 275, height: 108, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  discountLabel: { marginTop: 34, color: '#FFFFFF', fontSize: 16, fontWeight: '900', letterSpacing: 8 },
  fireBadge: { position: 'absolute', top: 22, left: 58, width: 72, height: 72, borderRadius: 23, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-9deg' }], shadowColor: '#D7EB49', shadowOpacity: 0.4, shadowRadius: 18 },
  miniTicket: { position: 'absolute', right: 56, bottom: 5, width: 58, height: 58, borderRadius: 20, backgroundColor: '#103325', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '9deg' }] },
  planStack: { width: '100%', gap: 16, marginTop: 2 },
  planCard: { height: 78, borderRadius: 25, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)' },
  planCardSelected: { borderWidth: 3, borderColor: '#39EF83', shadowColor: '#39EF83', shadowOpacity: 0.32, shadowRadius: 16 },
  planTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  planFullPrice: { marginTop: 4, color: '#9BFFBD', fontSize: 18, fontWeight: '600' },
  priceCol: { alignItems: 'flex-end' },
  planPrice: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  planPeriod: { marginTop: 3, color: 'rgba(255,255,255,0.44)', fontSize: 17, fontWeight: '700' },
  bottomArea: { paddingHorizontal: 25, paddingBottom: 19 },
  dealButton: { height: 66, borderRadius: 33, alignItems: 'center', justifyContent: 'center', shadowColor: '#39EF83', shadowOpacity: 0.34, shadowRadius: 18 },
  dealText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  footerLinks: { marginTop: 27, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  footerText: { color: 'rgba(255,255,255,0.58)', fontSize: 15, fontWeight: '500' },
  loadingOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(1,4,3,0.76)', alignItems: 'center', justifyContent: 'center', zIndex: 20 },
  sheetOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 30 },
  sheetScrim: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.62)' },
  sheet: { position: 'absolute', left: 6, right: 6, bottom: 8, minHeight: 390, borderRadius: 32, paddingHorizontal: 16, paddingTop: 27, backgroundColor: '#120D11', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sheetTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '800' },
  sheetClose: { width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center' },
  productCard: { marginTop: 18, borderRadius: 20, padding: 18, backgroundColor: 'rgba(255,255,255,0.14)' },
  productTopRow: { flexDirection: 'row', alignItems: 'center' },
  appIcon: { width: 62, height: 62, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  appIconRing: { width: 27, height: 27, borderRadius: 14, borderWidth: 7, borderColor: 'rgba(34,88,48,0.55)' },
  productInfo: { flex: 1, marginLeft: 15 },
  productName: { color: '#FFFFFF', fontSize: 20, fontWeight: '600' },
  productMeta: { marginTop: 2, color: 'rgba(255,255,255,0.62)', fontSize: 16, lineHeight: 21 },
  ageBadge: { fontSize: 12, color: '#D8D8DE' },
  productDivider: { height: 1, marginVertical: 16, backgroundColor: 'rgba(255,255,255,0.08)' },
  sheetPrice: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  sheetCopy: { color: '#FFFFFF', fontSize: 18, lineHeight: 29, fontWeight: '500' },
  accountText: { color: 'rgba(255,255,255,0.5)', fontSize: 17 },
  subscribeButton: { alignSelf: 'center', marginTop: 22, width: 128, height: 48, borderRadius: 24, backgroundColor: '#1397F5', alignItems: 'center', justifyContent: 'center' },
  subscribeText: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  homeIndicator: { alignSelf: 'center', width: 130, height: 5, marginTop: 18, borderRadius: 3, backgroundColor: '#FFFFFF' },
});
