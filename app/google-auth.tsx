import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function GoogleAuthScreen() {
  const { width, height } = useWindowDimensions();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const isReady = width > 24 && height > 24;
  const scale = isReady ? Math.min((width - 24) / previewWidth, (height - 24) / previewHeight, 1) : 1;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, opacity: isReady ? 1 : 0, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <View>
                  <Text style={styles.timeText}>13:47</Text>
                  <Text style={styles.backAppText}>◂ Love8</Text>
                </View>
                <View style={styles.phoneIndicators}>
                  <View style={styles.signalDots}>
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                  </View>
                  <Ionicons name="wifi" size={25} color="#FFFFFF" />
                  <View style={styles.batteryPill}><Text style={styles.batteryText}>100</Text></View>
                </View>
              </View>

              <View style={styles.browserSheet}>
                <View style={styles.browserHeader}>
                  <Pressable style={styles.circleButton} onPress={() => router.back()}>
                    <Feather name="x" size={34} color="#FFFFFF" />
                  </Pressable>
                  <Text style={styles.domainText}>accounts.google.com</Text>
                  <View style={styles.circleButton}>
                    <Feather name="menu" size={31} color="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.googleRow}>
                  <Text style={styles.googleLogo}>G</Text>
                  <Text style={styles.googleLoginText}>使用 Google 账号登录</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.content}>
                  <Text style={styles.loginTitle}>登录iOS</Text>
                  <View style={styles.accountPill}>
                    <View style={styles.avatar}><Text style={styles.avatarText}>思雨</Text></View>
                    <Text style={styles.emailText}>indigo110124@gmail.com</Text>
                    <Feather name="chevron-down" size={22} color="#FFFFFF" />
                  </View>
                  <Text style={styles.permissionTitle}>Google 将允许iOS访问这类与您有关的信息</Text>
                  <InfoRow icon="user" title="黄思雨" desc="名称和个人资料照片" />
                  <InfoRow icon="mail" title="indigo110124@gmail.com" desc="邮箱" />
                  <Text style={styles.paragraph}>查看“iOS”的 <Text style={styles.link}>《隐私权政策》</Text> 和 <Text style={styles.link}>《服务条款》</Text>，了解“iOS”会如何处理和保护您的数据。</Text>
                  <Text style={styles.paragraph}>您可随时前往您的 <Text style={styles.link}>Google 账号</Text>进行更改。</Text>
                  <Text style={styles.paragraph}>详细了解“<Text style={styles.link}>使用 Google 账号登录</Text>”功能。</Text>
                </View>

                <View style={styles.actionRow}>
                  <Pressable style={styles.outlineButton}>
                    <Text style={styles.outlineButtonText}>取消</Text>
                  </Pressable>
                  <Pressable style={styles.outlineButton} onPress={() => router.push('/email-compose')}>
                    <Text style={styles.outlineButtonText}>继续</Text>
                  </Pressable>
                </View>

                <View style={styles.browserBottom}>
                  <View style={styles.bottomCircle}><Feather name="chevron-left" size={34} color="#FFFFFF" /></View>
                  <View style={styles.bottomPill}>
                    <Feather name="share" size={29} color="#FFFFFF" />
                    <Feather name="refresh-cw" size={29} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function InfoRow({ icon, title, desc }: { icon: keyof typeof Feather.glyphMap; title: string; desc: string }) {
  return (
    <View style={styles.infoRow}>
      <Feather name={icon} size={31} color="#D4D4D8" />
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const shellStyles = {
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0F4' },
  previewScaler: { alignItems: 'center', justifyContent: 'center' },
  phoneShell: { width: DESIGN_WIDTH + PHONE_BEZEL * 2, height: DESIGN_HEIGHT + PHONE_BEZEL * 2, padding: PHONE_BEZEL, borderRadius: 52, backgroundColor: '#0A0B10', shadowColor: '#000000', shadowOpacity: 0.26, shadowRadius: 34, shadowOffset: { width: 0, height: 18 }, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  speaker: { position: 'absolute', top: 8, left: '50%', width: 78, height: 6, marginLeft: -39, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 2 },
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#000000' },
} as const;

const styles = StyleSheet.create({
  ...shellStyles,
  safeArea: { flex: 1, backgroundColor: '#000000' },
  statusRow: { height: 62, paddingHorizontal: 29, paddingTop: 3, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, lineHeight: 30, fontWeight: '700' },
  backAppText: { marginTop: 4, color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 8 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.72)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.26)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  batteryText: { color: '#111111', fontSize: 16, fontWeight: '900' },
  browserSheet: { flex: 1, marginTop: 20, borderTopLeftRadius: 34, borderTopRightRadius: 34, backgroundColor: '#111111', overflow: 'hidden' },
  browserHeader: { height: 86, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  circleButton: { width: 55, height: 55, borderRadius: 28, backgroundColor: '#242426', borderWidth: 1, borderColor: '#3C3C3F', alignItems: 'center', justifyContent: 'center' },
  domainText: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
  googleRow: { height: 72, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', gap: 14 },
  googleLogo: { color: '#4EA1F9', fontSize: 33, fontWeight: '900' },
  googleLoginText: { color: '#DADCE0', fontSize: 21, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#474747' },
  content: { paddingHorizontal: 24, paddingTop: 48 },
  loginTitle: { color: '#FFFFFF', fontSize: 40, fontWeight: '500' },
  accountPill: { alignSelf: 'flex-start', marginTop: 25, height: 38, paddingLeft: 5, paddingRight: 15, borderRadius: 19, borderWidth: 1, borderColor: '#A0A0A0', flexDirection: 'row', alignItems: 'center', gap: 9 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF5A24', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  emailText: { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  permissionTitle: { marginTop: 42, color: '#F1F1F1', fontSize: 29, lineHeight: 38, fontWeight: '500' },
  infoRow: { marginTop: 26, flexDirection: 'row', alignItems: 'flex-start' },
  infoTextWrap: { marginLeft: 21 },
  infoTitle: { color: '#F1F1F1', fontSize: 23, fontWeight: '500' },
  infoDesc: { marginTop: 5, color: '#C8C8CC', fontSize: 18, fontWeight: '500' },
  paragraph: { marginTop: 31, color: '#F1F1F1', fontSize: 18, lineHeight: 28, fontWeight: '500' },
  link: { color: '#BBD1FF', fontWeight: '800' },
  actionRow: { position: 'absolute', left: 24, right: 24, bottom: 98, height: 48, flexDirection: 'row', gap: 12 },
  outlineButton: { flex: 1, borderRadius: 24, borderWidth: 1, borderColor: '#A0A0A0', alignItems: 'center', justifyContent: 'center' },
  outlineButtonText: { color: '#BBD1FF', fontSize: 20, fontWeight: '900' },
  browserBottom: { position: 'absolute', left: 23, right: 23, bottom: 17, height: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bottomCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#1C1C1E', borderWidth: 1, borderColor: '#333333', alignItems: 'center', justifyContent: 'center' },
  bottomPill: { width: 104, height: 56, borderRadius: 28, backgroundColor: '#1C1C1E', borderWidth: 1, borderColor: '#333333', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
});
