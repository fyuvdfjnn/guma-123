import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

const campaigns = [
  {
    id: '1',
    title: '版本 A：强奖励冲击',
    subtitle: '$100 分享活动，适合强转化入口',
    colors: ['#6D00FF', '#A855F7', '#F472B6'] as const,
  },
  {
    id: '2',
    title: '版本 B：轻量说明型',
    subtitle: '说明清晰，适合新用户理解规则',
    colors: ['#C4B5FD', '#F5D0FE', '#E0E7FF'] as const,
  },
  {
    id: '3',
    title: '版本 C：任务提交型',
    subtitle: '适合已经发布后提交链接审核',
    colors: ['#7C3AED', '#EC4899', '#22D3EE'] as const,
  },
] as const;

export default function FeaturedScreen() {
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
            <LinearGradient colors={['#080912', '#101025', '#080912']} style={StyleSheet.absoluteFill} />
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <Text style={styles.timeText}>15:07</Text>
                <View style={styles.phoneIndicators}>
                  <View style={styles.signalDots}>
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDotDim} />
                  </View>
                  <Ionicons name="wifi" size={25} color="#FFFFFF" />
                  <View style={styles.batteryPill}><Text style={styles.batteryText}>84</Text></View>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.eyebrow}>Featured Campaigns</Text>
                  <Text style={styles.title}>精选活动</Text>
                  <Text style={styles.desc}>选择一个活动详情页版本测试分享奖励流程。</Text>
                </View>

                {campaigns.map((campaign) => (
                  <Pressable
                    key={campaign.id}
                    style={styles.campaignCard}
                    onPress={() => router.push({ pathname: '/campaign', params: { variant: campaign.id } })}>
                    <LinearGradient colors={campaign.colors} style={styles.cardGradient}>
                      <View style={styles.cardTopRow}>
                        <View style={styles.badge}><Text style={styles.badgeText}>活动 {campaign.id}</Text></View>
                        <Feather name="arrow-up-right" size={28} color="#FFFFFF" />
                      </View>
                      <Text style={styles.cardTitle}>{campaign.title}</Text>
                      <Text style={styles.cardSubtitle}>{campaign.subtitle}</Text>
                      <View style={styles.rewardRow}>
                        <Text style={styles.rewardText}>$100</Text>
                        <Text style={styles.rewardSub}>分享作品赢奖励</Text>
                      </View>
                    </LinearGradient>
                  </Pressable>
                ))}
              </ScrollView>

              <BottomTabBar />
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function BottomTabBar() {
  return (
    <View style={styles.bottomBar}>
      <TabItem icon="home-variant-outline" label="首页" onPress={() => router.push('/')} />
      <TabItem icon="shopping-outline" label="设计室" onPress={() => router.push('/design-studio-offer')} />
      <View style={styles.activeTab}>
        <MaterialCommunityIcons name="seal-variant" size={32} color="#FFFFFF" />
        <Text style={styles.activeText}>精选</Text>
      </View>
      <TabItem icon="face-man-outline" label="我的" />
    </View>
  );
}

function TabItem({ icon, label, onPress }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={29} color="rgba(255,255,255,0.82)" />
      <Text style={styles.tabText}>{label}</Text>
    </Pressable>
  );
}

const shellStyles = {
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
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#080912' },
} as const;

const styles = StyleSheet.create({
  ...shellStyles,
  safeArea: { flex: 1 },
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.62)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  batteryPill: { height: 23, paddingHorizontal: 6, borderRadius: 6, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  batteryText: { color: '#6D00FF', fontSize: 16, fontWeight: '900' },
  content: { paddingHorizontal: 18, paddingBottom: 128 },
  header: { paddingTop: 32, paddingBottom: 18 },
  eyebrow: { color: '#A78BFA', fontSize: 13, fontWeight: '900', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { marginTop: 8, color: '#FFFFFF', fontSize: 34, fontWeight: '900' },
  desc: { marginTop: 8, color: 'rgba(255,255,255,0.62)', fontSize: 15, lineHeight: 22 },
  campaignCard: { height: 166, marginTop: 16, borderRadius: 28, overflow: 'hidden' },
  cardGradient: { flex: 1, padding: 18, justifyContent: 'space-between' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { height: 29, paddingHorizontal: 12, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.22)', justifyContent: 'center' },
  badgeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  cardTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
  cardSubtitle: { color: 'rgba(255,255,255,0.86)', fontSize: 14, fontWeight: '700' },
  rewardRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  rewardText: { color: '#D9FF57', fontSize: 38, lineHeight: 42, fontWeight: '900' },
  rewardSub: { marginBottom: 5, color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  bottomBar: { position: 'absolute', left: 22, right: 22, bottom: 23, height: 79, borderRadius: 39, paddingHorizontal: 9, backgroundColor: 'rgba(25,22,35,0.86)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tabItem: { width: 70, height: 66, alignItems: 'center', justifyContent: 'center' },
  tabText: { marginTop: 3, color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  activeTab: { width: 88, height: 64, borderRadius: 32, backgroundColor: 'rgba(124,58,237,0.54)', alignItems: 'center', justifyContent: 'center' },
  activeText: { marginTop: 1, color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});
