import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;
const FALLBACK_IMAGE = 'https://picsum.photos/seed/beach-fashion-soft/344/461';

const locationChips = ["Mr. Diddy's", '67 Club', 'W Atlanta - Downt...', 'Miami'];

export default function TikTokPublishScreen() {
  const { width, height } = useWindowDimensions();
  const { image } = useLocalSearchParams<{ image?: string }>();
  const [isSentModalVisible, setIsSentModalVisible] = useState(false);
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = Math.min((width - 24) / previewWidth, (height - 24) / previewHeight, 1);
  const imageUri = typeof image === 'string' ? image : FALLBACK_IMAGE;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <Text style={styles.timeText}>19:17</Text>
                <View style={styles.phoneIndicators}>
                  <View style={styles.signalDots}>
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDotDim} />
                    <View style={styles.signalDot} />
                    <View style={styles.signalDot} />
                  </View>
                  <Ionicons name="wifi" size={25} color="#000000" />
                  <View style={styles.batteryPill}>
                    <Text style={styles.batteryText}>35</Text>
                  </View>
                </View>
              </View>

              <View style={styles.headerBar}>
                <Pressable onPress={() => router.back()} hitSlop={10}>
                  <Feather name="x" size={43} color="#000000" />
                </Pressable>
                <Text style={styles.previewTitle}>预览</Text>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.thumbnailRow}>
                  <PostThumb image={imageUri} label="封面" index="1" />
                  <PostThumb image={imageUri} index="2" />
                  <PostThumb image="https://picsum.photos/seed/map-love/220/220" index="3" />
                  <PostThumb image={imageUri} index="4" compact />
                </View>

                <Text style={styles.titlePlaceholder}>添加一个吸睛标题</Text>
                <View style={styles.divider} />
                <TextInput multiline value="#guma #gumaai" style={styles.captionInput} />

                <View style={styles.quickTools}>
                  <QuickTool label="#" />
                  <QuickTool label="@" />
                  <QuickTool icon={<MaterialCommunityIcons name="lightbulb-on-outline" size={25} color="#000000" />} label="描述灵感" wide />
                  <QuickTool icon={<Feather name="edit-3" size={25} color="#6EEBF3" />} tint />
                  <View style={styles.quickSpacer} />
                  <QuickTool icon={<Feather name="maximize" size={25} color="#000000" />} />
                </View>

                <View style={styles.optionGroup}>
                  <OptionRow icon={<Feather name="map-pin" size={33} color="#000000" />} label="位置" info />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.locationChips}>
                    {locationChips.map((chip) => <Text key={chip} style={styles.locationChip}>{chip}</Text>)}
                  </ScrollView>
                  <OptionRow icon={<Feather name="globe" size={31} color="#000000" />} label="所有人可见" />
                  <OptionRow icon={<Feather name="settings" size={33} color="#000000" />} label="更多选项" />
                  <OptionRow icon={<Ionicons name="arrow-redo-outline" size={36} color="#000000" />} label="分享到" />
                </View>
              </ScrollView>

              <View style={styles.bottomBar}>
                <Pressable style={styles.draftButton}>
                  <Feather name="archive" size={30} color="#000000" />
                  <Text style={styles.draftText}>草稿</Text>
                </Pressable>
                <Pressable style={styles.publishButton} onPress={() => setIsSentModalVisible(true)}>
                  <Ionicons name="arrow-up-circle" size={31} color="#FFFFFF" />
                  <Text style={styles.publishText}>发布</Text>
                </Pressable>
              </View>
              {isSentModalVisible && <SentModal />}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function PostThumb({ image, label, index, compact = false }: { image: string; label?: string; index: string; compact?: boolean }) {
  return (
    <View style={[styles.postThumb, compact && styles.compactThumb]}>
      <ImageBackground source={{ uri: image }} resizeMode="cover" style={styles.thumbImage}>
        {label && <Text style={styles.thumbCover}>{label}</Text>}
        <Text style={styles.thumbIndex}>{index}</Text>
        <Text style={styles.thumbEdit}>编辑</Text>
      </ImageBackground>
    </View>
  );
}

function QuickTool({ label, icon, wide = false, tint = false }: { label?: string; icon?: React.ReactNode; wide?: boolean; tint?: boolean }) {
  return (
    <Pressable style={[styles.quickTool, wide && styles.quickToolWide, tint && styles.quickToolTint]}>
      {icon}
      {label && <Text style={styles.quickToolText}>{label}</Text>}
    </Pressable>
  );
}

function OptionRow({ icon, label, info = false }: { icon: React.ReactNode; label: string; info?: boolean }) {
  return (
    <View style={styles.optionRow}>
      <View style={styles.optionLeft}>{icon}<Text style={styles.optionLabel}>{label}</Text>{info && <Feather name="info" size={17} color="#8D8D8D" />}</View>
      <Feather name="chevron-right" size={27} color="#8D8D8D" />
    </View>
  );
}

function SentModal() {
  return (
    <View style={styles.sentOverlay}>
      <View style={styles.sentCard}>
        <LinearGradient colors={['#F8A3FF', '#41F7D3']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.sentCheckRing}>
          <View style={styles.sentCheckInner}>
            <Feather name="check" size={54} color="#16C272" />
          </View>
        </LinearGradient>
        <Text style={styles.sentTitle}>已发送</Text>
        <Pressable style={styles.sentAction} onPress={() => router.replace({ pathname: '/campaign', params: { variant: '1', scrollTo: 'submit', confirm: 'published' } })}>
          <Text style={styles.sentActionText}>返回 Guma</Text>
        </Pressable>
        <Pressable style={styles.sentAction}>
          <Text style={styles.sentActionText}>留在 TikTok</Text>
        </Pressable>
      </View>
    </View>
  );
}

const shellStyles = {
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0F4' },
  previewScaler: { alignItems: 'center', justifyContent: 'center' },
  phoneShell: { width: DESIGN_WIDTH + PHONE_BEZEL * 2, height: DESIGN_HEIGHT + PHONE_BEZEL * 2, padding: PHONE_BEZEL, borderRadius: 52, backgroundColor: '#0A0B10', shadowColor: '#000000', shadowOpacity: 0.26, shadowRadius: 34, shadowOffset: { width: 0, height: 18 }, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  speaker: { position: 'absolute', top: 8, left: '50%', width: 78, height: 6, marginLeft: -39, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 2 },
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#FFFFFF' },
} as const;

const styles = StyleSheet.create({
  ...shellStyles,
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#000000', fontSize: 25, fontWeight: '600' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.64)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.22)' },
  batteryPill: { height: 23, paddingHorizontal: 7, borderRadius: 7, backgroundColor: '#111111', justifyContent: 'center' },
  batteryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  headerBar: { height: 78, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  previewTitle: { color: '#000000', fontSize: 25, fontWeight: '900' },
  content: { paddingBottom: 118 },
  thumbnailRow: { height: 118, paddingLeft: 17, flexDirection: 'row', gap: 9, overflow: 'hidden' },
  postThumb: { width: 100, height: 100, borderRadius: 9, overflow: 'hidden', backgroundColor: '#EDEDED' },
  compactThumb: { width: 74 },
  thumbImage: { width: '100%', height: '100%' },
  thumbCover: { position: 'absolute', top: 4, left: 6, color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  thumbIndex: { position: 'absolute', top: 35, alignSelf: 'center', color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  thumbEdit: { position: 'absolute', left: 6, bottom: 7, color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  titlePlaceholder: { marginTop: 11, marginHorizontal: 21, color: '#A0A0A0', fontSize: 25, fontWeight: '900' },
  divider: { height: 1, marginTop: 24, marginHorizontal: 17, backgroundColor: '#E8E8E8' },
  captionInput: { minHeight: 250, paddingHorizontal: 21, paddingTop: 22, color: '#000000', fontSize: 27, lineHeight: 38, fontWeight: '900' },
  quickTools: { height: 83, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
  quickTool: { minWidth: 35, height: 35, paddingHorizontal: 13, borderRadius: 7, backgroundColor: '#F1F1F3', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  quickToolWide: { paddingHorizontal: 12 },
  quickToolTint: { backgroundColor: '#EFFFFF' },
  quickToolText: { color: '#000000', fontSize: 22, fontWeight: '900' },
  quickSpacer: { flex: 1 },
  optionGroup: { borderTopWidth: 1, borderTopColor: '#EDEDED' },
  optionRow: { height: 75, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionLabel: { color: '#000000', fontSize: 26, fontWeight: '900' },
  locationChips: { paddingLeft: 47, paddingBottom: 11, gap: 10 },
  locationChip: { paddingHorizontal: 12, height: 35, borderRadius: 18, backgroundColor: '#F1F1F3', color: '#8A8A8A', fontSize: 19, lineHeight: 35, fontWeight: '800' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 108, paddingHorizontal: 13, paddingTop: 18, backgroundColor: '#FFFFFF', flexDirection: 'row', gap: 7 },
  draftButton: { flex: 1, height: 60, borderRadius: 30, backgroundColor: '#F1F1F3', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  draftText: { color: '#000000', fontSize: 24, fontWeight: '900' },
  publishButton: { flex: 1, height: 60, borderRadius: 30, backgroundColor: '#FF285B', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  publishText: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  sentOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 30, backgroundColor: 'rgba(0,0,0,0.64)', alignItems: 'center', justifyContent: 'center' },
  sentCard: { width: 296, borderRadius: 28, overflow: 'hidden', backgroundColor: '#FFFFFF', alignItems: 'center', shadowColor: '#000000', shadowOpacity: 0.22, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
  sentCheckRing: { width: 96, height: 96, marginTop: 42, borderRadius: 48, padding: 3, alignItems: 'center', justifyContent: 'center' },
  sentCheckInner: { flex: 1, width: '100%', borderRadius: 45, backgroundColor: '#F9F9FA', alignItems: 'center', justifyContent: 'center' },
  sentTitle: { marginTop: 20, marginBottom: 26, color: '#606060', fontSize: 25, fontWeight: '600' },
  sentAction: { width: '100%', height: 58, borderTopWidth: 1, borderTopColor: '#E4E4E4', alignItems: 'center', justifyContent: 'center' },
  sentActionText: { color: '#000000', fontSize: 22, fontWeight: '900' },
});
