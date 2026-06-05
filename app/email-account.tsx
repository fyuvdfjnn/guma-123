import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePhonePreviewScale } from '@/components/usePhonePreviewScale';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function EmailAccountScreen() {
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
                <View>
                  <Text style={styles.timeText}>13:48</Text>
                  <Pressable style={styles.backAppButton} onPress={() => router.back()}>
                    <Text style={styles.backAppText}>◂ Guma</Text>
                  </Pressable>
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

              <View style={styles.navBar}>
                <Pressable style={styles.mailBackButton} onPress={() => router.back()}>
                  <Feather name="chevron-left" size={34} color="#FFFFFF" />
                </Pressable>
                <Text style={styles.navTitle}>欢迎使用 “邮件”</Text>
                <Pressable style={styles.nextButton} onPress={() => router.push('/google-auth')}>
                  <Text style={styles.nextText}>下一步</Text>
                </Pressable>
              </View>

              <View style={styles.content}>
                <View style={styles.mailIconWrap}>
                  <Text style={styles.mailEmoji}>✉️</Text>
                </View>
                <Text style={styles.title}>添加账户</Text>
                <Text style={styles.label}>输入电子邮件地址</Text>
                <TextInput editable={false} placeholder="user@example.com" placeholderTextColor="#66666F" style={styles.input} />
                <Text style={styles.helperText}>登录邮件账户提供商或</Text>
                <Text style={styles.linkText}>从列表中选取。</Text>
              </View>
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
  statusRow: { height: 62, paddingHorizontal: 29, paddingTop: 3, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, lineHeight: 30, fontWeight: '700' },
  backAppButton: { marginTop: 4, alignSelf: 'flex-start', minHeight: 28, justifyContent: 'center' },
  backAppText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 8 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.72)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.26)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  batteryText: { color: '#111111', fontSize: 16, fontWeight: '900' },
  navBar: { height: 70, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mailBackButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1C1C1E', alignItems: 'center', justifyContent: 'center' },
  navTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
  nextButton: { width: 84, height: 46, borderRadius: 23, backgroundColor: '#4A4A4D', borderWidth: 1, borderColor: '#66666A', alignItems: 'center', justifyContent: 'center' },
  nextText: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
  content: { flex: 1, paddingHorizontal: 17, paddingTop: 135 },
  mailIconWrap: { alignSelf: 'center', width: 62, height: 62, borderRadius: 17, backgroundColor: '#202024', borderWidth: 1, borderColor: '#4A4A4D', alignItems: 'center', justifyContent: 'center' },
  mailEmoji: { fontSize: 37 },
  title: { marginTop: 28, color: '#FFFFFF', textAlign: 'center', fontSize: 34, lineHeight: 42, fontWeight: '900' },
  label: { marginTop: 78, marginLeft: 16, color: '#9A9AA2', fontSize: 21, fontWeight: '900' },
  input: { height: 58, marginTop: 15, paddingHorizontal: 18, borderRadius: 29, backgroundColor: '#1C1C1E', color: '#FFFFFF', fontSize: 22, fontWeight: '600' },
  helperText: { marginTop: 18, marginLeft: 17, color: '#9A9AA2', fontSize: 18, lineHeight: 26, fontWeight: '700' },
  linkText: { marginLeft: 17, color: '#3F9BFF', fontSize: 18, lineHeight: 26, fontWeight: '700' },
});
