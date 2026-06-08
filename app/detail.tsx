import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePhonePreviewScale } from '@/components/usePhonePreviewScale';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;
const FALLBACK_IMAGE = 'https://picsum.photos/seed/beach-fashion-soft/344/461';

export default function DetailScreen() {
  const { width, height } = useWindowDimensions();
  const { image, backTo } = useLocalSearchParams<{ image?: string; type?: string; backTo?: string }>();
  const [isShareSheetVisible, setIsShareSheetVisible] = useState(false);
  const [isHashtagModalVisible, setIsHashtagModalVisible] = useState(false);
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = usePhonePreviewScale(width, height, previewWidth, previewHeight);
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
                <Text style={styles.timeText}>13:28</Text>
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

              <View style={styles.header}>
                <CircleButton onPress={() => (backTo === '/' ? router.replace('/') : router.back())}>
                  <Feather name="chevron-left" size={42} color="#FFFFFF" />
                </CircleButton>
                <CircleButton>
                  <MaterialCommunityIcons name="dots-vertical" size={35} color="#FFFFFF" />
                </CircleButton>
              </View>

              <View style={styles.imageWrap}>
                <ImageBackground source={{ uri: imageUri }} resizeMode="cover" style={styles.mainImage}>
                  <View style={styles.sideActions}>
                    <ToolAction icon="human-handsup" labelTop="DIY运动" labelBottom="控制" />
                    <ToolAction icon="video-vintage" labelTop="AI视频" />
                    <ToolAction icon="face-man-shimmer" labelTop="AI换脸" />
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.footer}>
                <View style={styles.actionRow}>
                  <Pressable style={styles.saveButton}>
                    <Text style={styles.saveText}>保存</Text>
                  </Pressable>
                  <Pressable style={styles.regenerateButton}>
                    <Text style={styles.regenerateText}>重新生成</Text>
                  </Pressable>
                  <Pressable style={styles.shareButton} onPress={() => setIsShareSheetVisible(true)}>
                    <View style={styles.shareArrowWrap}>
                      <Ionicons name="arrow-redo-outline" size={42} color="#F8A3FF" style={styles.shareArrowGlow} />
                      <Ionicons name="arrow-redo-outline" size={42} color="#41F7D3" style={styles.shareArrowCyan} />
                      <Ionicons name="arrow-redo-outline" size={42} color="#E9C5FF" />
                    </View>
                    <View style={styles.sharePlatforms}>
                      <View style={[styles.platformMiniIcon, styles.instagramMiniIcon]}>
                        <Feather name="instagram" size={15} color="#FFFFFF" />
                      </View>
                      <View style={[styles.platformMiniIcon, styles.tiktokMiniIcon]}>
                        <MaterialCommunityIcons name="music-note-eighth" size={17} color="#FFFFFF" />
                      </View>
                    </View>
                  </Pressable>
                </View>
                <Text style={styles.noticeText}>作品72小时内有效，请及时保存。</Text>
              </View>
              {isShareSheetVisible && <ShareSheet onClose={() => setIsShareSheetVisible(false)} onInstagramPress={() => {
                setIsShareSheetVisible(false);
                setIsHashtagModalVisible(true);
              }} />}
              {isHashtagModalVisible && <HashtagModal onClose={() => setIsHashtagModalVisible(false)} />}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function CircleButton({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return (
    <Pressable style={styles.circleButton} onPress={onPress}>
      {children}
    </Pressable>
  );
}

function ToolAction({ icon, labelTop, labelBottom }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; labelTop: string; labelBottom?: string }) {
  return (
    <View style={styles.toolAction}>
      <MaterialCommunityIcons name={icon} size={42} color="#FFFFFF" />
      <Text style={styles.toolText}>{labelTop}</Text>
      {labelBottom && <Text style={styles.toolText}>{labelBottom}</Text>}
    </View>
  );
}

function ShareSheet({ onClose, onInstagramPress }: { onClose: () => void; onInstagramPress: () => void }) {
  return (
    <View style={styles.shareSheet}>
      <View style={styles.shareSheetHeader}>
        <Text style={styles.shareSheetTitle}>分享到</Text>
        <Pressable style={styles.shareSheetClose} onPress={onClose}>
          <Feather name="x" size={23} color="#FFFFFF" />
        </Pressable>
      </View>
      <View style={styles.shareSheetScroller}>
        <SharePlatform icon={<MaterialCommunityIcons name="music-note-eighth" size={31} color="#FFFFFF" />} label="TikTok" style={styles.tiktokPlatformIcon} onPress={() => router.push({ pathname: '/tiktok-preview', params: { image: FALLBACK_IMAGE } })} />
        <SharePlatform icon={<Feather name="instagram" size={29} color="#FFFFFF" />} label="Instagram" style={styles.instagramPlatformIcon} onPress={onInstagramPress} />
        <SharePlatform icon={<Feather name="youtube" size={31} color="#FFFFFF" />} label="YouTube" style={styles.youtubePlatformIcon} />
        <SharePlatform icon={<Text style={styles.xPlatformText}>𝕏</Text>} label="X" style={styles.xPlatformIcon} />
      </View>
    </View>
  );
}

function HashtagModal({ onClose }: { onClose: () => void }) {
  const handleCopy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText('#guma#gumaai');
    }
    onClose();
  };

  return (
    <View style={styles.hashtagOverlay}>
      <Pressable accessibilityLabel="关闭标签弹窗背景" style={styles.hashtagScrim} onPress={onClose} />
      <View style={styles.hashtagCard}>
        <View style={styles.hashtagIconWrap}>
          <Feather name="instagram" size={31} color="#FFFFFF" />
        </View>
        <Text style={styles.hashtagTitle}>复制发布标签</Text>
        <Text style={styles.hashtagText}>#guma#gumaai</Text>
        <Pressable accessibilityLabel="复制标签" style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.copyButtonText}>复制</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SharePlatform({ icon, label, style, onPress }: { icon: React.ReactNode; label: string; style: object; onPress?: () => void }) {
  return (
    <Pressable style={styles.sharePlatform} onPress={onPress}>
      <View style={[styles.sharePlatformIcon, style]}>{icon}</View>
      <Text style={styles.sharePlatformLabel}>{label}</Text>
    </Pressable>
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
    backgroundColor: '#070711',
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
  header: {
    height: 113,
    paddingHorizontal: 13,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1C29',
    borderWidth: 1,
    borderColor: '#353649',
  },
  imageWrap: {
    height: 527,
    width: DESIGN_WIDTH,
    overflow: 'hidden',
    backgroundColor: '#10111A',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  sideActions: {
    position: 'absolute',
    right: 22,
    top: 213,
    alignItems: 'center',
    gap: 30,
  },
  toolAction: {
    width: 56,
    alignItems: 'center',
  },
  toolText: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.32)',
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  footer: {
    flex: 1,
    paddingTop: 58,
    paddingHorizontal: 21,
    backgroundColor: '#070711',
  },
  actionRow: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    width: 144,
    height: 59,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  saveText: {
    color: '#080912',
    fontSize: 22,
    fontWeight: '900',
  },
  regenerateButton: {
    width: 142,
    height: 59,
    marginLeft: 8,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#062927',
  },
  regenerateText: {
    color: '#16F2C2',
    fontSize: 19,
    fontWeight: '900',
  },
  shareButton: {
    width: 54,
    marginLeft: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareArrowWrap: {
    width: 48,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareArrowGlow: {
    position: 'absolute',
    opacity: 0.78,
    transform: [{ translateX: -2 }],
  },
  shareArrowCyan: {
    position: 'absolute',
    opacity: 0.78,
    transform: [{ translateX: 2 }],
  },
  sharePlatforms: {
    width: 38,
    height: 20,
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformMiniIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  instagramMiniIcon: {
    marginRight: -2,
    backgroundColor: '#D83DBB',
    zIndex: 2,
  },
  tiktokMiniIcon: {
    marginLeft: -2,
    backgroundColor: '#020204',
  },
  shareSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 187,
    paddingTop: 18,
    paddingHorizontal: 21,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#070711',
    borderTopWidth: 1,
    borderColor: '#20212B',
    zIndex: 20,
  },
  shareSheetHeader: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareSheetTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },
  shareSheetClose: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1C29',
    borderWidth: 1,
    borderColor: '#353649',
  },
  shareSheetScroller: {
    paddingTop: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sharePlatform: {
    width: 76,
    alignItems: 'center',
  },
  sharePlatformIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  tiktokPlatformIcon: {
    backgroundColor: '#020204',
  },
  instagramPlatformIcon: {
    backgroundColor: '#D83DBB',
  },
  youtubePlatformIcon: {
    backgroundColor: '#FF0033',
  },
  xPlatformIcon: {
    backgroundColor: '#FFFFFF',
  },
  xPlatformText: {
    color: '#080912',
    fontSize: 30,
    fontWeight: '900',
  },
  sharePlatformLabel: {
    marginTop: 7,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  hashtagOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashtagScrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  hashtagCard: {
    width: 302,
    minHeight: 238,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: '#07130E',
    borderWidth: 1,
    borderColor: 'rgba(65,247,211,0.45)',
    alignItems: 'center',
    shadowColor: '#39EF83',
    shadowOpacity: 0.35,
    shadowRadius: 22,
  },
  hashtagIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#D83DBB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashtagTitle: {
    marginTop: 18,
    color: '#E8FFF2',
    fontSize: 23,
    fontWeight: '900',
  },
  hashtagText: {
    marginTop: 18,
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  copyButton: {
    marginTop: 24,
    width: 156,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#39EF83',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonText: {
    color: '#04110B',
    fontSize: 21,
    fontWeight: '900',
  },
  noticeText: {
    marginTop: 11,
    color: '#606171',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
});
