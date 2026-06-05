import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [showCreateFirstModal, setShowCreateFirstModal] = useState(false);
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
            <LinearGradient colors={['#091008', '#06070F', '#090912', '#03040B']} locations={[0, 0.22, 0.62, 1]} style={StyleSheet.absoluteFill} />
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              <View style={styles.topGreenGlow} />
              <View style={styles.topGoldGlow} />
              <View style={styles.midShadow} />
            </View>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <PhoneStatus />

              <View style={styles.topBar}>
                <PointsPill />
                <Pressable accessibilityLabel="打开设置" style={styles.settingsButton} onPress={() => router.push('/settings')}>
                  <Feather name="settings" size={34} color="#DDE1DA" />
                </Pressable>
              </View>

              <ProBanner />
              <EmptyWorks onCreatePress={() => setShowCreateFirstModal(true)} />
              <BottomTabBar />
              <View style={styles.homeIndicator} />
              {showCreateFirstModal && <CreateFirstModal onClose={() => setShowCreateFirstModal(false)} />}
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
      <View style={styles.statusLeft}>
        <Text style={styles.timeText}>6:26</Text>
        <View style={styles.statusBlock} />
        <Text style={styles.ellipsis}>•••</Text>
      </View>
      <View style={styles.statusRight}>
        <View style={styles.vpnBadge}><Text style={styles.vpnText}>VPN</Text></View>
        <Feather name="x-square" size={21} color="#FFFFFF" />
        <Ionicons name="wifi" size={24} color="#FFFFFF" />
        <Text style={styles.netText}>6</Text>
        <View style={styles.batteryOutline}><View style={styles.batteryFill} /></View>
      </View>
    </View>
  );
}

function PointsPill() {
  return (
    <View style={styles.pointsWrap}>
      <View style={styles.gemWrap}>
        <LinearGradient colors={['#E7F1FF', '#4DFF9B', '#0D8B55', '#D7C0FF']} start={{ x: 0.05, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gemOuter}>
          <View style={styles.gemInner}>
            <Feather name="star" size={31} color="#01180D" />
          </View>
        </LinearGradient>
      </View>
      <BlurView intensity={36} tint="dark" style={styles.pointsPill}>
        <LinearGradient colors={['rgba(255,255,255,0.13)', 'rgba(255,255,255,0.03)']} style={StyleSheet.absoluteFill} />
        <Text style={styles.pointsText}>8500</Text>
      </BlurView>
    </View>
  );
}

function ProBanner() {
  return (
    <View style={styles.proCard}>
      <LinearGradient colors={['rgba(27,240,104,0.48)', 'rgba(6,8,17,0.88)', 'rgba(10,13,20,0.95)']} start={{ x: 0, y: 0.16 }} end={{ x: 1, y: 0.75 }} style={StyleSheet.absoluteFill} />
      <View style={styles.proBottomGlow} />
      <Text style={[styles.spark, styles.sparkOne]}>✦</Text>
      <Text style={[styles.spark, styles.sparkTwo]}>✦</Text>
      <Text style={[styles.spark, styles.sparkThree]}>✦</Text>

      <View style={styles.logoRow}>
        <Text style={styles.gumaText}>Guma</Text>
        <LinearGradient colors={['#DFFF72', '#5CF493', '#D9E7FF']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.proPill}>
          <Text style={styles.proText}>PRO</Text>
        </LinearGradient>
        <Text style={styles.logoSpark}>✦</Text>
      </View>

      <View style={styles.featureRail}>
        <Text style={styles.featureText}>AI 图片</Text>
        <Text style={styles.checkText}>✓</Text>
        <Text style={styles.featureText}>AI滤镜</Text>
        <Text style={styles.checkText}>✓</Text>
        <Text style={styles.featureText}>AI换脸</Text>
        <Text style={styles.checkText}>✓</Text>
        <Text style={styles.featureText}>照片跳舞</Text>
        <Text style={styles.checkText}>✓</Text>
        <Text style={styles.featureText}>图生视频</Text>
      </View>

      <Pressable accessibilityLabel="立即开通 Guma Pro" style={styles.openButton} onPress={() => router.push('/secret-offer')}>
        <Text style={styles.openText}>立即开通!</Text>
      </Pressable>
    </View>
  );
}

function EmptyWorks({ onCreatePress }: { onCreatePress: () => void }) {
  return (
    <View style={styles.worksArea}>
      <View style={styles.grid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <View key={index} style={styles.gridCell} />
        ))}
      </View>
      <View style={styles.emptyCenter}>
        <Text style={styles.emptyTitle}>还没有任何作品</Text>
        <Text style={styles.emptySubtitle}>发现你的首个AI视频</Text>
        <Pressable accessibilityLabel="一键制作" style={styles.createButton} onPress={onCreatePress}>
          <Text style={styles.createText}>一键制作</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CreateFirstModal({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.modalOverlay}>
      <Pressable accessibilityLabel="关闭提示弹窗背景" style={styles.modalScrim} onPress={onClose} />
      <View style={styles.modalCard}>
        <LinearGradient colors={['rgba(36,243,164,0.32)', 'rgba(6,8,16,0.96)', 'rgba(5,18,12,0.98)']} locations={[0, 0.42, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.modalGlow} />
        <View style={styles.modalIconWrap}>
          <LinearGradient colors={['#DFFF72', '#36F58F', '#43F0BC']} style={styles.modalIcon}>
            <Feather name="image" size={32} color="#052317" />
          </LinearGradient>
        </View>
        <Text style={styles.modalTitle}>请先制作作品</Text>
        
        <Pressable accessibilityLabel="知道了" style={styles.modalButtonWrap} onPress={onClose}>
          <LinearGradient colors={['#25F276', '#43F0BC', '#D8EB46']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>知道了</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function BottomTabBar() {
  return (
    <View style={styles.bottomBar}>
      <TabItem icon="archive-outline" label="首页" />
      <TabItem icon="view-grid-plus-outline" label="设计室" onPress={() => router.push('/design-studio-offer')} />
      <TabItem icon="seal-variant" label="精选" onPress={() => router.push('/two')} />
      <Pressable accessibilityLabel="我的" style={styles.activeTab} onPress={() => router.push('/')}>
        <View style={styles.activeIconCircle}>
          <MaterialCommunityIcons name="emoticon-outline" size={32} color="#073B2D" />
        </View>
        <Text style={styles.activeTabText}>我的</Text>
      </Pressable>
    </View>
  );
}

function TabItem({ icon, label, onPress }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityLabel={label} style={styles.tabItem} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={31} color="rgba(255,255,255,0.78)" />
      <Text style={styles.tabText}>{label}</Text>
    </Pressable>
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
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#05060D' },
  safeArea: { flex: 1 },
  topGreenGlow: { position: 'absolute', top: -58, left: -70, width: 245, height: 310, borderRadius: 150, backgroundColor: 'rgba(22,222,83,0.30)', shadowColor: '#24F275', shadowOpacity: 0.7, shadowRadius: 54 },
  topGoldGlow: { position: 'absolute', top: -92, right: -22, width: 195, height: 170, borderRadius: 100, backgroundColor: 'rgba(153,190,52,0.22)' },
  midShadow: { position: 'absolute', left: -28, right: -28, top: 295, height: 520, backgroundColor: 'rgba(2,3,10,0.58)' },
  statusRow: { height: 43, paddingHorizontal: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timeText: { color: '#FFFFFF', fontSize: 19, fontWeight: '900' },
  statusBlock: { width: 24, height: 24, backgroundColor: '#FFFFFF' },
  ellipsis: { color: '#FFFFFF', fontSize: 22, lineHeight: 22, fontWeight: '900' },
  statusRight: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  vpnBadge: { height: 21, minWidth: 29, borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 3, alignItems: 'center', justifyContent: 'center' },
  vpnText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  netText: { marginLeft: -8, marginBottom: -10, color: '#FFFFFF', fontSize: 10, fontWeight: '900' },
  batteryOutline: { width: 43, height: 20, borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 5, padding: 2 },
  batteryFill: { flex: 1, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.82)' },
  topBar: { height: 94, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  pointsWrap: { width: 132, height: 65, justifyContent: 'center' },
  pointsPill: { position: 'absolute', left: 28, width: 106, height: 53, borderRadius: 27, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  gemWrap: { position: 'absolute', left: -1, zIndex: 2, width: 61, height: 61, transform: [{ rotate: '-13deg' }] },
  gemOuter: { flex: 1, borderRadius: 18, padding: 4, shadowColor: '#45F0A0', shadowOpacity: 0.6, shadowRadius: 14 },
  gemInner: { flex: 1, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.55)' },
  pointsText: { marginLeft: 20, color: '#FFFFFF', fontSize: 27, fontWeight: '900' },
  settingsButton: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  proCard: { height: 158, marginHorizontal: 20, borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(80,245,166,0.38)', shadowColor: '#35F297', shadowOpacity: 0.35, shadowRadius: 24 },
  proBottomGlow: { position: 'absolute', left: 10, right: 10, bottom: -54, height: 95, borderRadius: 90, backgroundColor: 'rgba(206,232,255,0.82)', shadowColor: '#6CF4C5', shadowOpacity: 0.95, shadowRadius: 24 },
  spark: { position: 'absolute', color: 'rgba(255,255,255,0.86)', fontSize: 25, fontWeight: '900', textShadowColor: '#FFFFFF', textShadowRadius: 9 },
  sparkOne: { top: 60, left: 68 },
  sparkTwo: { top: 95, right: 52, fontSize: 21 },
  sparkThree: { top: 23, right: 100, fontSize: 22 },
  logoRow: { marginTop: 37, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  gumaText: { color: '#FFFFFF', fontSize: 45, lineHeight: 52, fontWeight: '900', fontStyle: 'italic', letterSpacing: -1.8, fontFamily: 'serif' },
  proPill: { marginLeft: 9, width: 72, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  proText: { color: '#13391E', fontSize: 28, lineHeight: 31, fontWeight: '900', fontStyle: 'italic', fontFamily: 'serif' },
  logoSpark: { marginLeft: -2, marginTop: -35, color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
  featureRail: { marginTop: 27, marginLeft: -14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { color: '#FFFFFF', fontSize: 20, fontWeight: '500' },
  checkText: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
  openButton: { position: 'absolute', alignSelf: 'center', bottom: 27, height: 51, minWidth: 150, paddingHorizontal: 29, borderRadius: 26, borderWidth: 1.4, borderColor: '#6DF4B5', backgroundColor: 'rgba(8,9,16,0.70)', alignItems: 'center', justifyContent: 'center' },
  openText: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  worksArea: { flex: 1, marginTop: 97, paddingHorizontal: 19 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridCell: { width: 111, height: 156, borderRadius: 14, backgroundColor: 'rgba(22,27,37,0.76)' },
  emptyCenter: { position: 'absolute', top: 190, left: 0, right: 0, alignItems: 'center' },
  emptyTitle: { color: '#FFFFFF', fontSize: 26, fontWeight: '500' },
  emptySubtitle: { marginTop: 11, color: 'rgba(255,255,255,0.50)', fontSize: 22, fontWeight: '500' },
  createButton: { marginTop: 34, width: 140, height: 64, borderRadius: 32, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  createText: { color: '#07070B', fontSize: 23, fontWeight: '500' },
  bottomBar: { position: 'absolute', left: 28, right: 28, bottom: 37, height: 85, borderRadius: 43, paddingHorizontal: 16, backgroundColor: 'rgba(4,5,10,0.93)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000000', shadowOpacity: 0.7, shadowRadius: 20 },
  tabItem: { width: 59, height: 68, alignItems: 'center', justifyContent: 'center' },
  tabText: { marginTop: 4, color: 'rgba(255,255,255,0.75)', fontSize: 17, fontWeight: '500' },
  activeTab: { width: 105, height: 69, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.18)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  activeIconCircle: { width: 43, height: 43, borderRadius: 22, backgroundColor: '#24F3A4', alignItems: 'center', justifyContent: 'center' },
  activeTabText: { color: '#39F0B8', fontSize: 17, fontWeight: '600' },
  homeIndicator: { position: 'absolute', bottom: 10, alignSelf: 'center', width: 146, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.68)' },
  modalOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 30, alignItems: 'center', justifyContent: 'center' },
  modalScrim: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.62)' },
  modalCard: { width: 305, minHeight: 252, borderRadius: 30, paddingHorizontal: 24, paddingTop: 34, paddingBottom: 22, overflow: 'hidden', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(83,255,173,0.42)', shadowColor: '#24F3A4', shadowOpacity: 0.38, shadowRadius: 24 },
  modalGlow: { position: 'absolute', left: 30, right: 30, bottom: -52, height: 105, borderRadius: 70, backgroundColor: 'rgba(67,240,188,0.35)', shadowColor: '#43F0BC', shadowOpacity: 0.9, shadowRadius: 28 },
  modalIconWrap: { width: 72, height: 72, borderRadius: 24, padding: 4, backgroundColor: 'rgba(255,255,255,0.16)', transform: [{ rotate: '-8deg' }] },
  modalIcon: { flex: 1, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  modalTitle: { marginTop: 20, color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  modalDesc: { marginTop: 10, color: 'rgba(232,255,242,0.68)', fontSize: 15, lineHeight: 22, fontWeight: '600', textAlign: 'center' },
  modalButtonWrap: { marginTop: 24, width: 168, height: 50, borderRadius: 25, overflow: 'hidden' },
  modalButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  modalButtonText: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
});
