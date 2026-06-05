import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;
const FALLBACK_IMAGE = 'https://picsum.photos/seed/beach-fashion-soft/344/461';

export default function TikTokPreviewScreen() {
  const { width, height } = useWindowDimensions();
  const { image } = useLocalSearchParams<{ image?: string }>();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = Math.min((width - 24) / previewWidth, (height - 24) / previewHeight, 1);
  const imageUri = typeof image === 'string' ? image : FALLBACK_IMAGE;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <Text style={styles.timeText}>19:16</Text>
                <View style={styles.phoneIndicators}>
                  <View style={styles.signalDots}>
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                  </View>
                  <Ionicons name="wifi" size={25} color="#FFFFFF" />
                  <View style={styles.batteryPill}>
                    <Text style={styles.batteryText}>36</Text>
                  </View>
                </View>
              </View>

              <View style={styles.headerBar}>
                <Pressable onPress={() => router.back()} hitSlop={10}>
                  <Feather name="chevron-left" size={46} color="#FFFFFF" />
                </Pressable>
                <Text style={styles.previewTitle}>预览</Text>
                <Feather name="maximize" size={32} color="#FFFFFF" />
              </View>

              <ImageBackground source={{ uri: imageUri }} resizeMode="cover" style={styles.previewImage}>
                <View style={styles.rightRail}>
                  <RoundTool icon={<Feather name="settings" size={33} color="#FFFFFF" />} />
                  <RoundTool icon={<MaterialCommunityIcons name="book-heart" size={32} color="#FF4E9A" />} />
                  <RoundTool icon={<MaterialCommunityIcons name="clipboard-check-outline" size={32} color="#D68636" />} badge />
                  <RoundTool icon={<MaterialCommunityIcons name="storefront" size={32} color="#D23A3F" />} />
                </View>
                <View style={styles.dialogCard}>
                  <View style={styles.namePill}><Text style={styles.nameText}>Amber</Text></View>
                  <Text style={styles.dialogText}>击掌！没有人能像你一样理解我。你是我的知己。</Text>
                </View>
                <View style={styles.contentMeta}>
                  <View style={styles.metaRow}>
                    <Text style={styles.accountText}>indigo</Text>
                    <View style={styles.photoPill}><Ionicons name="albums" size={18} color="#FFFFFF" /><Text style={styles.photoPillText}>照片</Text></View>
                  </View>
                  <Text numberOfLines={1} style={styles.hashText}>#guma #gumaai</Text>
                </View>
              </ImageBackground>

              <View style={styles.bottomBar}>
                <Pressable style={styles.editButton}>
                  <Feather name="edit-3" size={31} color="#FFFFFF" />
                  <Text style={styles.editText}>编辑照片</Text>
                </Pressable>
                <Pressable style={styles.publishButton} onPress={() => router.push({ pathname: '/tiktok-publish', params: { image: imageUri } })}>
                  <Ionicons name="arrow-up-circle" size={31} color="#FFFFFF" />
                  <Text style={styles.publishText}>发布</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function RoundTool({ icon, badge = false }: { icon: React.ReactNode; badge?: boolean }) {
  return (
    <View style={styles.roundTool}>
      {icon}
      {badge && <View style={styles.toolBadge}><Feather name="gift" size={17} color="#FFFFFF" /></View>}
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
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#000000' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.72)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  batteryText: { color: '#111111', fontSize: 16, fontWeight: '900' },
  headerBar: { position: 'absolute', top: 50, left: 17, right: 17, zIndex: 3, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  previewTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  previewImage: { flex: 1, marginBottom: 112, justifyContent: 'flex-end' },
  rightRail: { position: 'absolute', top: 128, right: 13, gap: 30, alignItems: 'center' },
  roundTool: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.84)', borderWidth: 3, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  toolBadge: { position: 'absolute', right: -6, top: -5, width: 26, height: 26, borderRadius: 13, backgroundColor: '#FF315D', alignItems: 'center', justifyContent: 'center' },
  dialogCard: { marginHorizontal: 15, marginBottom: 185, borderRadius: 18, paddingHorizontal: 20, paddingTop: 28, paddingBottom: 18, backgroundColor: '#FFF8E8', borderWidth: 3, borderColor: '#FFFFFF' },
  namePill: { position: 'absolute', left: 60, top: -20, height: 34, paddingHorizontal: 18, borderRadius: 12, backgroundColor: '#FFE2A5', justifyContent: 'center' },
  nameText: { color: '#5E3518', fontSize: 18, fontWeight: '900' },
  dialogText: { color: '#5A3528', fontSize: 21, lineHeight: 30, fontWeight: '900' },
  contentMeta: { position: 'absolute', left: 14, right: 14, bottom: 15 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accountText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  photoPill: { height: 28, paddingHorizontal: 8, borderRadius: 7, backgroundColor: 'rgba(0,0,0,0.55)', flexDirection: 'row', alignItems: 'center', gap: 4 },
  photoPillText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  hashText: { marginTop: 12, color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 112, paddingHorizontal: 16, paddingTop: 17, backgroundColor: '#000000', flexDirection: 'row', gap: 10 },
  editButton: { flex: 1, height: 60, borderRadius: 30, backgroundColor: '#1C1C1E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  editText: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
  publishButton: { flex: 1, height: 60, borderRadius: 30, backgroundColor: '#FF285B', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  publishText: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
});
