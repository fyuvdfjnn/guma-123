import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function ReferralCodeScreen() {
  const { width, height } = useWindowDimensions();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const fallbackWindow = Dimensions.get('window');
  const viewportWidth = width > 24 ? width : fallbackWindow.width;
  const viewportHeight = height > 24 ? height : fallbackWindow.height;
  const widthScale = viewportWidth > 24 ? (viewportWidth - 24) / previewWidth : 1;
  const heightScale = viewportHeight > 24 ? (viewportHeight - 24) / previewHeight : 1;
  const scale = 1;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <LinearGradient colors={['#010403', '#06150F', '#11140C', '#050806']} locations={[0, 0.38, 0.72, 1]} style={StyleSheet.absoluteFill} />
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              <View style={[styles.blurShape, styles.ticketTop]} />
              <View style={[styles.blurShape, styles.ticketLeft]} />
              <View style={[styles.blurShape, styles.starRight]} />
              <View style={[styles.smallStar, styles.smallStarOne]} />
              <View style={[styles.smallStar, styles.smallStarTwo]} />
            </View>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <PhoneStatus />
              <BrandPill />
              <Pressable
                accessibilityLabel="关闭邀请码页面"
                style={styles.closeButton}
                onPress={() => router.replace({ pathname: '/settings', params: { backTo: '/' } })}
              >
                <Feather name="x" size={35} color="#B8B8BF" />
              </Pressable>

              <View style={styles.content}>
                <Text style={styles.title}>Enter Your Referral Code</Text>
                <Text style={styles.optional}></Text>

                <View style={styles.ticketBubble}>
                  <LinearGradient colors={['rgba(255,255,255,0.23)', 'rgba(87, 255, 166, 0.18)', 'rgba(255,255,255,0.12)']} style={StyleSheet.absoluteFill} />
                  <MaterialCommunityIcons name="ticket-percent" size={62} color="rgba(255,255,255,0.78)" />
                  <View style={styles.bubbleTail} />
                </View>

                <View style={styles.inputWrap}>
                  <TextInput
                    accessibilityLabel="输入邀请码"
                    autoCapitalize="characters"
                    placeholder="输入邀请码（可选）"
                    placeholderTextColor="rgba(255,255,255,0.46)"
                    style={styles.input}
                  />
                </View>
              </View>

              <Pressable accessibilityLabel="继续到秘密优惠" style={styles.ctaWrap} onPress={() => router.push('/secret-offer')}>
                <LinearGradient colors={['#25F276', '#3FF0B6', '#D8EB46']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.cta}>
                  <Text style={styles.ctaText}>继续</Text>
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
  speaker: {
    position: 'absolute',
    top: 8,
    left: '50%',
    width: 78,
    height: 6,
    marginLeft: -39,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.12)',
    zIndex: 2,
  },
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#020403' },
  safeArea: { flex: 1 },
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  batteryText: { color: '#050505', fontSize: 16, fontWeight: '900' },
  brandPill: {
    position: 'absolute',
    top: 9,
    alignSelf: 'center',
    height: 45,
    paddingLeft: 9,
    paddingRight: 18,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: 'rgba(64, 116, 74, 0.7)',
    overflow: 'hidden',
  },
  brandIcon: { width: 34, height: 34, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  brandIconInner: { width: 15, height: 15, borderRadius: 8, borderWidth: 4, borderColor: 'rgba(21, 79, 45, 0.7)' },
  brandText: { color: '#FFFFFF', fontSize: 19, fontWeight: '900' },
  closeButton: {
    position: 'absolute',
    top: 58,
    right: 22,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 88 },
  title: { color: '#FFFFFF', fontSize: 35, lineHeight: 42, fontWeight: '900', letterSpacing: -1.3 },
  optional: { marginTop: 28, color: 'rgba(255,255,255,0.56)', fontSize: 25, fontWeight: '600' },
  ticketBubble: {
    alignSelf: 'center',
    marginTop: 74,
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    shadowColor: '#39EF83',
    shadowOpacity: 0.35,
    shadowRadius: 24,
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -13,
    width: 24,
    height: 24,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  inputWrap: {
    marginTop: 54,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.13)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  input: { color: '#FFFFFF', fontSize: 22, fontWeight: '600', outlineStyle: 'none' as never },
  ctaWrap: { marginHorizontal: 25, marginBottom: 29, borderRadius: 34, shadowColor: '#39EF83', shadowOpacity: 0.35, shadowRadius: 18 },
  cta: { height: 67, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  blurShape: { position: 'absolute', borderRadius: 42, backgroundColor: 'rgba(65, 247, 211, 0.14)', transform: [{ rotate: '-15deg' }] },
  ticketTop: { top: 218, right: -36, width: 128, height: 84 },
  ticketLeft: { bottom: 118, left: -42, width: 160, height: 100 },
  starRight: { bottom: 100, right: -20, width: 110, height: 92 },
  smallStar: { position: 'absolute', width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(216, 234, 72, 0.13)', transform: [{ rotate: '24deg' }] },
  smallStarOne: { top: 302, left: 57 },
  smallStarTwo: { bottom: 218, right: 152 },
});
