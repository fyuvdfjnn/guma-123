import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

const socialRows = [
  { label: 'Instagram', type: 'instagram' },
  { label: 'TikTok', type: 'tiktok' },
] as const;

const settingRows = [
  { label: '填写邀请码（可选）' },
  { label: '用户协议' },
  { label: '区域切换', value: '欧美区' },
  { label: '隐私政策' },
  { label: '提供反馈' },
  { label: '联系我们' },
  { label: '清除缓存', value: '256.32 M' },
] as const;

export default function SettingsScreen() {
  const { width, height } = useWindowDimensions();
  const { backTo } = useLocalSearchParams<{ backTo?: string }>();
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
            <LinearGradient colors={['#070711', '#080912', '#070711']} style={StyleSheet.absoluteFill} />
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <Text style={styles.timeText}>13:27</Text>
                <View style={styles.phoneIndicators}>
                  <View style={styles.signalDots}>
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDotDim} />
                  </View>
                  <Ionicons name="wifi" size={25} color="#FFFFFF" />
                  <View style={styles.batteryPill}>
                    <Text style={styles.batteryText}>100</Text>
                  </View>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                  <Pressable style={styles.backButton} onPress={() => (backTo === '/' ? router.replace('/') : router.back())}>
                    <Feather name="chevron-left" size={42} color="#FFFFFF" />
                  </Pressable>
                  <Text style={styles.title}>设置</Text>
                  <View style={styles.headerSpacer} />
                </View>

                <ProCard />
                <ShareRewardEntry />

                <View style={styles.list}>
                  {socialRows.map((row) => (
                    <SettingsRow key={row.label} label={row.label} iconType={row.type} />
                  ))}

                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>暗黑模式</Text>
                    <Switch
                      value
                      trackColor={{ false: '#2A2A35', true: '#30D15B' }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#2A2A35"
                    />
                  </View>

                  {settingRows.map((row) => (
                    <SettingsRow
                      key={row.label}
                      label={row.label}
                      value={'value' in row ? row.value : undefined}
                      onPress={row.label === '填写邀请码（可选）' ? () => router.push('/referral-code') : undefined}
                    />
                  ))}
                </View>

                <Pressable style={styles.logoutButton}>
                  <Text style={styles.logoutText}>退出登录</Text>
                </Pressable>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function ProCard() {
  return (
    <View style={styles.proCard}>
      <LinearGradient
        colors={['rgba(51, 180, 91, 0.48)', 'rgba(7, 8, 18, 0.96)', 'rgba(7, 8, 18, 0.94)']}
        locations={[0, 0.34, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.proGlow} />
      <View style={[styles.proStar, styles.proStarOne]} />
      <View style={[styles.proStar, styles.proStarTwo]} />
      <View style={[styles.proStarSmall, styles.proStarThree]} />

      <View style={styles.logoRow}>
        <Text style={styles.gumaText}>Guma</Text>
        <LinearGradient colors={['#DAFF8D', '#63F0A5', '#B58BFF']} style={styles.proPill}>
          <Text style={styles.proText}>PRO</Text>
        </LinearGradient>
        <Text style={styles.logoSpark}>✦</Text>
      </View>

      <Text style={styles.expireText}>有效期：2026.07.30</Text>

      <Pressable style={styles.renewOuter}>
        <LinearGradient colors={['#12F2C2', '#D5E739', '#EF62E7']} style={styles.renewBorder}>
          <View style={styles.renewInner}>
            <Text style={styles.renewText}>续订!</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

function ShareRewardEntry() {
  return (
    <Pressable style={styles.shareEntry} onPress={() => router.push({ pathname: '/campaign', params: { variant: '1' } })}>
      <LinearGradient colors={['#6EF2E8', '#B99BFF', '#FF8AE6']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
      <View style={styles.shareEntryGrid} />
      <View style={styles.shareEntryTextWrap}>
        <Text style={styles.shareEntryTitle}>Get Paid $100</Text>
        <Text style={styles.shareEntrySubtitle}>for Sharing app</Text>
      </View>
      <View style={styles.shareEntryWallet}>
        <Text style={styles.shareMoney}>$</Text>
        <Text style={styles.shareCash}>💸</Text>
      </View>
      <Text style={styles.shareSparkOne}>✦</Text>
      <Text style={styles.shareSparkTwo}>✧</Text>
    </Pressable>
  );
}

function SettingsRow({ label, value, iconType, onPress }: { label: string; value?: string; iconType?: 'instagram' | 'tiktok'; onPress?: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        {iconType === 'instagram' && <InstagramIcon />}
        {iconType === 'tiktok' && <TikTokIcon />}
        <Text style={[styles.rowLabel, iconType && styles.socialLabel]}>{label}</Text>
      </View>
      <View style={styles.rowRight}>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        <Feather name="chevron-right" size={31} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

function InstagramIcon() {
  return (
    <LinearGradient colors={['#833AB4', '#FD1D1D', '#FCAF45']} style={styles.socialIcon}>
      <Feather name="instagram" size={29} color="#FFFFFF" />
    </LinearGradient>
  );
}

function TikTokIcon() {
  return (
    <View style={[styles.socialIcon, styles.tiktokIcon]}>
      <MaterialCommunityIcons name="music-note-eighth" size={33} color="#FFFFFF" />
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
    backgroundColor: '#070711',
  },
  safeArea: {
    flex: 1,
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
    backgroundColor: '#30D15B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 36,
  },
  header: {
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1C29',
    borderWidth: 1,
    borderColor: '#353649',
  },
  title: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },
  headerSpacer: {
    width: 60,
  },
  proCard: {
    height: 157,
    marginHorizontal: 9,
    borderRadius: 27,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(51, 236, 192, 0.68)',
    backgroundColor: '#080912',
  },
  proGlow: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: -42,
    height: 92,
    borderRadius: 80,
    backgroundColor: 'rgba(136, 255, 182, 0.68)',
    shadowColor: '#8BFFC4',
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  proStar: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.86)',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  proStarSmall: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.76)',
  },
  proStarOne: { top: 56, left: 72 },
  proStarTwo: { top: 88, right: 48 },
  proStarThree: { top: 28, left: 132 },
  logoRow: {
    height: 70,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gumaText: {
    color: '#FFFFFF',
    fontSize: 43,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1.4,
  },
  proPill: {
    marginLeft: 9,
    paddingHorizontal: 13,
    height: 39,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proText: {
    color: '#052113',
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  logoSpark: {
    marginLeft: -3,
    marginTop: -35,
    color: '#FFFFFF',
    fontSize: 23,
  },
  expireText: {
    marginTop: -2,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  renewOuter: {
    alignSelf: 'center',
    marginTop: 20,
  },
  renewBorder: {
    width: 110,
    height: 44,
    padding: 1.4,
    borderRadius: 23,
  },
  renewInner: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 31, 29, 0.95)',
  },
  renewText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  shareEntry: {
    height: 92,
    marginTop: 16,
    marginHorizontal: 9,
    borderRadius: 28,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingLeft: 26,
    shadowColor: '#67F4EE',
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  shareEntryGrid: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  shareEntryTextWrap: {
    zIndex: 2,
  },
  shareEntryTitle: {
    color: '#FFF9A8',
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '900',
  },
  shareEntrySubtitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
  },
  shareEntryWallet: {
    position: 'absolute',
    right: 21,
    bottom: 13,
    width: 78,
    height: 55,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.28)',
    transform: [{ rotate: '-9deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareMoney: {
    position: 'absolute',
    right: 10,
    top: 4,
    color: '#EFFF75',
    fontSize: 30,
    fontWeight: '900',
  },
  shareCash: {
    fontSize: 34,
  },
  shareSparkOne: {
    position: 'absolute',
    top: 15,
    right: 111,
    color: '#FFF8A8',
    fontSize: 22,
    fontWeight: '900',
  },
  shareSparkTwo: {
    position: 'absolute',
    bottom: 13,
    right: 100,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  list: {
    marginTop: 18,
  },
  row: {
    minHeight: 55,
    paddingHorizontal: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#20212B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    marginRight: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tiktokIcon: {
    backgroundColor: '#020204',
    borderWidth: 0.5,
    borderColor: '#31313A',
  },
  rowLabel: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '400',
  },
  socialLabel: {
    fontSize: 20,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    marginRight: 9,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '400',
  },
  logoutButton: {
    alignSelf: 'center',
    width: 130,
    height: 48,
    marginTop: 28,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3B3C4A',
  },
  logoutText: {
    color: '#9295A5',
    fontSize: 20,
    fontWeight: '400',
  },
});
