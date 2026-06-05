import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePhonePreviewScale } from '@/components/usePhonePreviewScale';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function EmailComposeScreen() {
  const { width, height } = useWindowDimensions();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = usePhonePreviewScale(width, height, previewWidth, previewHeight);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <Text style={styles.timeText}>14:16</Text>
                <View style={styles.phoneIndicators}>
                  <View style={styles.signalDots}>
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                  </View>
                  <Ionicons name="wifi" size={25} color="#FFFFFF" />
                  <View style={styles.batteryPill}><Text style={styles.batteryText}>98</Text></View>
                </View>
              </View>

              <View style={styles.header}>
                <Pressable style={styles.closeButton} onPress={() => router.back()}>
                  <Feather name="x" size={38} color="#FFFFFF" />
                </Pressable>
                <Pressable style={styles.sendButton} onPress={() => router.replace({ pathname: '/campaign', params: { variant: '1' } })}>
                  <Ionicons name="arrow-up" size={38} color="#B7F7FF" />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Text style={styles.title}>新邮件</Text>
                <View style={styles.formLine}>
                  <Text style={styles.fieldLabel}>收件人：</Text>
                  <Text style={styles.blueText}>gumaai@gmail.com</Text>
                </View>
                <View style={styles.formLine}>
                  <Text style={styles.fieldLabel}>抄送/密送， 发件人： indigo110124@gmail.com</Text>
                </View>
                <View style={styles.formLine}>
                  <Text style={styles.fieldLabel}>主题：</Text>
                </View>

                <Text style={styles.bodyText}>如果你的作品播放量已达到100万次，请提供以下信息：</Text>
                <Text style={styles.bodyText}>● 作品链接：</Text>
                <Text style={styles.indentText}>（每个链接仅限领取一次奖励）</Text>
                <Text style={styles.bodyText}>● PayPal账号：</Text>
                <Text style={styles.indentText}>（请务必准确填写，确保信息无误）</Text>
                <Text style={styles.bodyText}>我们将在收到你的邮件后 3个工作日内 回复你并发放奖励。</Text>

                <Text style={styles.bodyText}>------------------------------</Text>
                <Text style={styles.bodyText}>UserID: 59DB2086EE4C</Text>
                <Text style={styles.bodyText}>Model: iPhone 14</Text>
                <Text style={styles.bodyText}>OS version: 26.5</Text>
                <Text style={styles.bodyText}>App version: 1.50.0</Text>
                <Text style={styles.bodyText}>Network: Wi-Fi</Text>
                <Text style={styles.bodyText}>Region: DE</Text>
                <Text style={styles.bodyText}>请不要删除上述信息，方便我们准确核对身份。</Text>
                <Text style={styles.footerText}>发自我的 iPhone</Text>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
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
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '700' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.72)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.26)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  batteryText: { color: '#111111', fontSize: 16, fontWeight: '900' },
  header: { height: 92, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  closeButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#1C1C1E', alignItems: 'center', justifyContent: 'center' },
  sendButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#2F9BFF', alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 17, paddingBottom: 80 },
  title: { color: '#FFFFFF', fontSize: 39, lineHeight: 50, fontWeight: '900', marginBottom: 48 },
  formLine: { minHeight: 49, borderBottomWidth: 1, borderBottomColor: '#1C1C1E', flexDirection: 'row', alignItems: 'center' },
  fieldLabel: { color: '#9A9AA2', fontSize: 19, fontWeight: '600' },
  blueText: { color: '#2F9BFF', fontSize: 19, fontWeight: '600' },
  bodyText: { color: '#FFFFFF', fontSize: 22, lineHeight: 34, fontWeight: '500' },
  indentText: { color: '#FFFFFF', fontSize: 22, lineHeight: 34, fontWeight: '500', paddingLeft: 27 },
  footerText: { marginTop: 26, color: '#FFFFFF', fontSize: 22, lineHeight: 34, fontWeight: '500' },
});
