import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;
const PAGE_PADDING = 14;
const CARD_GAP = 9;
const CARD_WIDTH = (DESIGN_WIDTH - PAGE_PADDING * 2 - CARD_GAP * 2) / 3;
const CARD_HEIGHT = 154;

const galleryCards = [
  { id: '1', type: 'image', uri: 'https://picsum.photos/seed/beach-fashion-soft/344/461', tone: ['rgba(255,238,205,0.20)', 'rgba(0,0,0,0.05)'] as const },
  { id: '2', type: 'image', uri: 'https://picsum.photos/seed/mirror-flash-dark/344/461', tone: ['rgba(255,255,255,0.08)', 'rgba(0,0,0,0.38)'] as const },
  { id: '3', type: 'video', uri: 'https://picsum.photos/seed/fitness-studio-portrait/344/461', tone: ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.10)'] as const },
  { id: '4', type: 'image', uri: 'https://picsum.photos/seed/burger-garden-close/344/461', tone: ['rgba(31,90,34,0.10)', 'rgba(0,0,0,0.18)'] as const },
  { id: '5', type: 'video', uri: 'https://picsum.photos/seed/portrait-product-model/344/461', tone: ['rgba(255,255,255,0.04)', 'rgba(0,0,0,0.12)'] as const },
  { id: '6', type: 'image', uri: 'https://picsum.photos/seed/pencil-sketch-paper/344/461', tone: ['rgba(255,255,255,0.10)', 'rgba(0,0,0,0.02)'] as const },
  { id: '7', type: 'image', uri: 'https://picsum.photos/seed/black-white-fashion/344/461', tone: ['rgba(0,0,0,0.42)', 'rgba(255,255,255,0.02)'] as const },
  { id: '8', type: 'video', uri: 'https://picsum.photos/seed/purple-product-smoke/344/461', tone: ['rgba(112,45,170,0.18)', 'rgba(0,0,0,0.12)'] as const },
  { id: '9', type: 'image', uri: 'https://picsum.photos/seed/blue-silk-product/344/461', tone: ['rgba(191,219,254,0.18)', 'rgba(0,0,0,0.04)'] as const },
  { id: '10', type: 'image', uri: 'https://picsum.photos/seed/white-silk-product/344/461', tone: ['rgba(255,255,255,0.14)', 'rgba(0,0,0,0.03)'] as const },
  { id: '11', type: 'video', uri: 'https://picsum.photos/seed/indoor-beauty-hair/344/461', tone: ['rgba(255,232,200,0.12)', 'rgba(0,0,0,0.10)'] as const },
  { id: '12', type: 'video', uri: 'https://picsum.photos/seed/blue-fashion-room/344/461', tone: ['rgba(56,189,248,0.12)', 'rgba(0,0,0,0.18)'] as const },
  { id: '13', type: 'image', uri: 'https://picsum.photos/seed/dark-purple-gallery/344/461', tone: ['rgba(168,85,247,0.18)', 'rgba(0,0,0,0.18)'] as const },
  { id: '14', type: 'video', uri: 'https://picsum.photos/seed/neon-product-display/344/461', tone: ['rgba(236,72,153,0.14)', 'rgba(0,0,0,0.12)'] as const },
  { id: '15', type: 'image', uri: 'https://picsum.photos/seed/cyan-dream-card/344/461', tone: ['rgba(45,212,191,0.12)', 'rgba(0,0,0,0.16)'] as const },
] as const;

function splitIntoColumns() {
  const columns: (typeof galleryCards[number])[][] = [[], [], []];
  galleryCards.forEach((item, index) => columns[index % 3].push(item));
  return columns;
}

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const fallbackWindow = Dimensions.get('window');
  const viewportWidth = width > 24 ? width : fallbackWindow.width;
  const viewportHeight = height > 24 ? height : fallbackWindow.height;
  const scale = Math.min(Math.max((viewportWidth - 24) / previewWidth, 0.01), Math.max((viewportHeight - 24) / previewHeight, 0.01), 1);
  const columns = splitIntoColumns();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
        <LinearGradient
          colors={['#1A2419', '#0D1F1E', '#080912', '#15101F']}
          locations={[0, 0.31, 0.67, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.auroraLeft} />
        <View style={styles.auroraRight} />
        <StarField />

        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          <View style={styles.statusRow}>
            <Text style={styles.timeText}>11:05</Text>
            <View style={styles.phoneIndicators}>
              <View style={styles.signalDots}>
                <View style={styles.signalDot} />
                <View style={styles.signalDot} />
                <View style={styles.signalDot} />
                <View style={styles.signalDotDim} />
              </View>
              <Ionicons name="wifi" size={25} color="#FFFFFF" />
              <View style={styles.batteryPill}>
                <Text style={styles.batteryText}>87</Text>
                <Feather name="zap" size={11} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.topBar}>
            <BlurView intensity={36} tint="dark" style={styles.pointsPill}>
              <View style={styles.gemOuter}>
                <LinearGradient colors={['#E8FFF1', '#5EF2B8', '#76A8FF', '#A98AFF']} style={styles.gemInner}>
                  <Feather name="star" size={22} color="#10251F" />
                </LinearGradient>
              </View>
              <Text style={styles.pointsText}>82850</Text>
            </BlurView>

            <View style={styles.topActions}>
              <GlassCircle>
                <Ionicons name="layers-outline" size={30} color="#FFFFFF" />
              </GlassCircle>
              <GlassCircle onPress={() => router.push('/settings')}>
                <Feather name="settings" size={29} color="#FFFFFF" />
              </GlassCircle>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.masonry}>
              {columns.map((column, columnIndex) => (
                <View key={columnIndex} style={styles.column}>
                  {column.map((card) => <GalleryCardView key={card.id} card={card} />)}
                </View>
              ))}
            </View>
          </ScrollView>

          <BottomTabBar />
        </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function GalleryCardView({ card }: { card: typeof galleryCards[number] }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/detail',
          params: { image: card.uri, type: card.type },
        })
      }>
      <ImageBackground source={{ uri: card.uri }} resizeMode="cover" style={styles.cardImage}>
        <LinearGradient colors={card.tone} style={StyleSheet.absoluteFill} />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.16)']} style={styles.cardBottomScrim} />
        <View style={styles.mediaBadge}>
          <Feather name={card.type === 'video' ? 'video' : 'image'} size={14} color="#FFFFFF" />
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function GlassCircle({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return (
    <Pressable style={styles.glassCircle} onPress={onPress}>
      <BlurView intensity={46} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient colors={['rgba(255,255,255,0.19)', 'rgba(255,255,255,0.04)']} style={StyleSheet.absoluteFill} />
      {children}
    </Pressable>
  );
}

function BottomTabBar() {
  return (
    <View style={styles.bottomWrapper}>
      <BlurView intensity={64} tint="dark" style={styles.bottomBlur}>
        <LinearGradient colors={['rgba(255,255,255,0.17)', 'rgba(255,255,255,0.05)']} style={styles.bottomGradient}>
          <TabItem icon="home-variant-outline" label="首页" onPress={() => router.push('/home')} />
          <View style={styles.tabWithBadge}>
            <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>
            <TabItem icon="shopping-outline" label="设计室" onPress={() => router.push('/design-studio-offer')} />
          </View>
          <TabItem icon="seal-variant" label="精选" size={34} onPress={() => router.push('/two')} />
          <Pressable style={styles.activeTab}>
            <LinearGradient colors={['rgba(87,244,202,0.35)', 'rgba(100,116,139,0.10)']} style={StyleSheet.absoluteFill} />
            <View style={styles.activeIconCircle}>
              <MaterialCommunityIcons name="face-man-outline" size={31} color="#05322D" />
            </View>
            <Text style={styles.activeTabText}>我的</Text>
          </Pressable>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

function TabItem({ icon, label, size = 30, onPress }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; size?: number; onPress?: () => void }) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress}>
      <View style={styles.tabIcon}><MaterialCommunityIcons name={icon} size={size} color="#FFFFFF" /></View>
      <Text style={styles.tabText}>{label}</Text>
    </Pressable>
  );
}

function StarField() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[styles.star, styles.starOne]} />
      <View style={[styles.star, styles.starTwo]} />
      <View style={[styles.star, styles.starThree]} />
      <View style={[styles.starSmall, styles.starFour]} />
      <View style={[styles.starSmall, styles.starFive]} />
      <View style={[styles.crossStar, styles.crossStarOne]} />
      <View style={[styles.crossStar, styles.crossStarTwo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0F4',
  },
  previewScaler: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  phoneFrame: {
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
    overflow: 'hidden',
    borderRadius: 39,
    backgroundColor: '#080912',
  },
  safeArea: {
    flex: 1,
  },
  auroraLeft: {
    position: 'absolute',
    top: -100,
    left: -95,
    width: 245,
    height: 245,
    borderRadius: 130,
    backgroundColor: 'rgba(56,102,49,0.34)',
  },
  auroraRight: {
    position: 'absolute',
    top: -56,
    right: -80,
    width: 205,
    height: 205,
    borderRadius: 110,
    backgroundColor: 'rgba(90,68,130,0.32)',
  },
  statusRow: {
    height: 38,
    paddingHorizontal: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
  },
  phoneIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  signalDots: {
    flexDirection: 'row',
    gap: 3,
  },
  signalDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.62)',
  },
  signalDotDim: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  batteryPill: {
    height: 23,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#65D96D',
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  topBar: {
    height: 74,
    paddingHorizontal: PAGE_PADDING + 3,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointsPill: {
    height: 49,
    minWidth: 134,
    paddingLeft: 8,
    paddingRight: 22,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  gemOuter: {
    width: 51,
    height: 51,
    marginLeft: -9,
    marginRight: 8,
    borderRadius: 17,
    transform: [{ rotate: '-12deg' }],
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#94F7C6',
    shadowOpacity: 0.72,
    shadowRadius: 12,
  },
  gemInner: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  topActions: {
    flexDirection: 'row',
    gap: 13,
  },
  glassCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: 148,
  },
  masonry: {
    flexDirection: 'row',
    gap: CARD_GAP,
  },
  column: {
    width: CARD_WIDTH,
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
  },
  mediaBadge: {
    position: 'absolute',
    right: 7,
    bottom: 7,
    width: 22,
    height: 18,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWrapper: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 23,
    height: 79,
    borderRadius: 39,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.21)',
    backgroundColor: 'rgba(25,22,25,0.63)',
    shadowColor: '#000000',
    shadowOpacity: 0.42,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  bottomBlur: {
    flex: 1,
  },
  bottomGradient: {
    flex: 1,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabItem: {
    width: 70,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  tabWithBadge: {
    width: 70,
    height: 66,
  },
  newBadge: {
    position: 'absolute',
    top: -17,
    left: 23,
    zIndex: 2,
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 7,
    backgroundColor: '#F464E8',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '8deg' }],
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  activeTab: {
    width: 88,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#5EF2CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabText: {
    marginTop: -1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  star: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  starSmall: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  starOne: { top: 38, left: 212 },
  starTwo: { top: 118, left: 282 },
  starThree: { top: 190, left: 70 },
  starFour: { top: 154, right: 118 },
  starFive: { top: 230, left: 88 },
  crossStar: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.34)',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  crossStarOne: { top: 50, right: 82 },
  crossStarTwo: { top: 124, left: 74 },
});
