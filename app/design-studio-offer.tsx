import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function DesignStudioOfferScreen() {
  const { width, height } = useWindowDimensions();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const isReady = width > 24 && height > 24;
  const scale = isReady ? Math.min((width - 24) / previewWidth, (height - 24) / previewHeight, 1) : 1;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, opacity: isReady ? 1 : 0, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <LinearGradient colors={['#0A120D', '#122719', '#173A22', '#06100A']} locations={[0, 0.34, 0.72, 1]} style={StyleSheet.absoluteFill} />
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              <View style={styles.topGlow} />
              <View style={styles.bottomGlow} />
              <StarField />
            </View>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <PhoneStatus />
              <Pressable accessibilityLabel="关闭设计室优惠" style={styles.closeButton} onPress={() => router.replace('/')}>
                <Feather name="x" size={31} color="#DFFFE9" />
              </Pressable>

              <View style={styles.content}>
                <TicketHero />
                <View style={styles.priceBlock}>
                  <Text style={styles.planTitle}>Yearly subscription</Text>
                  <View style={styles.priceRow}>
                    <View style={styles.oldPriceWrap}>
                      <Text style={styles.oldPrice}>$64.98</Text>
                      <View style={styles.strikeLine} />
                    </View>
                    <Text style={styles.arrow}>→</Text>
                    <Text style={styles.newPrice}>$32.49</Text>
                  </View>
           
                </View>
              </View>

              <Pressable accessibilityLabel="获取设计室优惠" style={styles.ctaWrap} onPress={() => router.push('/secret-offer')}>
                <LinearGradient colors={['#22F178', '#43F0BC', '#D7EB49']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.cta}>
                  <Text style={styles.ctaText}>Grab the deal</Text>
                </LinearGradient>
              </Pressable>
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

function TicketHero() {
  return (
    <View style={styles.ticketWrap}>
      <LinearGradient colors={['#23F37B', '#39EFA8', '#45D4C8', '#D8EB49']} start={{ x: 0, y: 0.25 }} end={{ x: 1, y: 0.85 }} style={styles.ticket}>
        <Text style={styles.ticketKicker}>GET YOUR</Text>
        <Text style={styles.ticketDiscount}>-50%</Text>
        <Text style={styles.ticketSub}>to Discover Guma Pro</Text>
        <View style={[styles.ticketCut, styles.ticketCutLeft]} />
        <View style={[styles.ticketCut, styles.ticketCutRight]} />
      </LinearGradient>
    </View>
  );
}

function StarField() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Feather name="star" size={23} color="rgba(132,255,188,0.72)" style={[styles.starIcon, styles.starOne]} />
      <Feather name="star" size={21} color="#FFFFFF" style={[styles.starIcon, styles.starTwo]} />
      <Feather name="star" size={37} color="rgba(177,255,96,0.58)" style={[styles.starIcon, styles.starThree]} />
      <Feather name="star" size={18} color="#FFFFFF" style={[styles.starIcon, styles.starFour]} />
      <Feather name="star" size={28} color="rgba(65,247,211,0.65)" style={[styles.starIcon, styles.starFive]} />
      <Feather name="star" size={40} color="rgba(216,235,73,0.55)" style={[styles.starIcon, styles.starSix]} />
      <Feather name="star" size={22} color="#FFFFFF" style={[styles.starIcon, styles.starSeven]} />
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
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#06100A' },
  safeArea: { flex: 1 },
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  batteryText: { color: '#050505', fontSize: 16, fontWeight: '900' },
  closeButton: { position: 'absolute', top: 51, right: 24, width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.13)', alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  content: { flex: 1, alignItems: 'center', paddingTop: 150 },
  topGlow: { position: 'absolute', top: -22, alignSelf: 'center', width: 330, height: 330, borderRadius: 180, backgroundColor: 'rgba(45,242,123,0.20)', shadowColor: '#39EF83', shadowOpacity: 0.88, shadowRadius: 74 },
  bottomGlow: { position: 'absolute', bottom: -120, left: -70, right: -70, height: 300, borderRadius: 180, backgroundColor: 'rgba(59,239,160,0.20)' },
  ticketWrap: { width: 360, height: 300, alignItems: 'center', justifyContent: 'center' },
  ticket: { width: 328, height: 210, borderRadius: 25, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-4deg' }], shadowColor: '#41F7D3', shadowOpacity: 0.34, shadowRadius: 24, overflow: 'hidden' },
  ticketKicker: { color: '#FFFFFF', fontSize: 21, fontWeight: '900', letterSpacing: 1.2 },
  ticketDiscount: { marginTop: 27, color: '#FFFFFF', fontSize: 66, lineHeight: 75, fontWeight: '900', letterSpacing: -3 },
  ticketSub: { marginTop: 23, color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  ticketCut: { position: 'absolute', top: 87, width: 66, height: 66, borderRadius: 33, backgroundColor: '#112118' },
  ticketCutLeft: { left: -33 },
  ticketCutRight: { right: -33 },
  starIcon: { position: 'absolute' },
  starOne: { top: 128, left: 106, transform: [{ rotate: '16deg' }] },
  starTwo: { top: 140, left: 198, transform: [{ rotate: '-9deg' }] },
  starThree: { top: 92, right: 86, transform: [{ rotate: '12deg' }] },
  starFour: { top: 452, left: 97, transform: [{ rotate: '-11deg' }] },
  starFive: { top: 468, left: 170, transform: [{ rotate: '13deg' }] },
  starSix: { top: 449, right: 109, transform: [{ rotate: '-4deg' }] },
  starSeven: { top: 469, right: 57, transform: [{ rotate: '8deg' }] },
  priceBlock: { marginTop: 162, alignItems: 'center' },
  planTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  priceRow: { marginTop: 9, flexDirection: 'row', alignItems: 'center', gap: 14 },
  oldPriceWrap: { position: 'relative' },
  oldPrice: { color: 'rgba(255,255,255,0.56)', fontSize: 26, fontWeight: '700' },
  strikeLine: { position: 'absolute', left: -2, right: -2, top: 16, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.48)' },
  arrow: { color: 'rgba(255,255,255,0.72)', fontSize: 28, fontWeight: '700' },
  newPrice: { color: '#FFFFFF', fontSize: 31, fontWeight: '800' },
  linksRow: { marginTop: 31, flexDirection: 'row', alignItems: 'center', gap: 22 },
  linkText: { color: 'rgba(255,255,255,0.52)', fontSize: 17, fontWeight: '700' },
  dot: { color: 'rgba(255,255,255,0.36)', fontSize: 17, fontWeight: '900' },
  ctaWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 92, borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
  cta: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
});
