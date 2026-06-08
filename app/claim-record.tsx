import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePhonePreviewScale } from '@/components/usePhonePreviewScale';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

export default function ClaimRecordScreen() {
  const { width, height } = useWindowDimensions();
  const [showLikeClaimModal, setShowLikeClaimModal] = useState(false);
  const { hasRecord, hasLikeRecord, hasLikeClaim } = useLocalSearchParams<{ hasRecord?: string; hasLikeRecord?: string; hasLikeClaim?: string }>();
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = usePhonePreviewScale(width, height, previewWidth, previewHeight);
  const showClaimRecord = hasRecord === '1';
  const showLikeRecord = hasLikeRecord === '1';
  const showLikeClaim = hasLikeClaim === '1';
  const hasAnyRecord = showClaimRecord || showLikeRecord || showLikeClaim;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            <LinearGradient colors={['#020403', '#061A12', '#07100C']} style={StyleSheet.absoluteFill} />
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
              <View style={styles.statusRow}>
                <Text style={styles.timeText}>15:08</Text>
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

              <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                  <Feather name="chevron-left" size={34} color="#FFFFFF" />
                </Pressable>
                <Text style={styles.title}>活动记录</Text>
                <View style={styles.headerSpacer} />
              </View>

              <View style={styles.content}>
                {hasAnyRecord ? (
                  <>
                    {showClaimRecord && <ClaimRecordCard />}
                    {showLikeRecord && <LikeReviewRecordCard />}
                    {showLikeClaim && <LikeClaimRecordCard onClaim={() => setShowLikeClaimModal(true)} />}
                  </>
                ) : (
                  <EmptyRecord />
                )}
              </View>
              {showLikeClaimModal && <LikeClaimRewardModal onClose={() => setShowLikeClaimModal(false)} />}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

function ClaimRecordCard() {
  return (
    <View style={styles.claimRecordCard}>
      <View style={styles.claimRecordIconWrap}>
        <Feather name="dollar-sign" size={25} color="#03130B" />
      </View>
      <View style={styles.claimRecordInfo}>
        <Text style={styles.claimRecordTitle}>发布作品奖励</Text>
        <Text style={styles.claimRecordDesc}>已领取 🪙×300</Text>
      </View>
      <Text style={styles.claimRecordStatus}>已完成</Text>
    </View>
  );
}

function LikeReviewRecordCard() {
  return (
    <View style={styles.claimRecordCard}>
      <View style={[styles.claimRecordIconWrap, styles.reviewIconWrap]}>
        <Feather name="thumbs-up" size={25} color="#03130B" />
      </View>
      <View style={styles.claimRecordInfo}>
        <Text style={styles.claimRecordTitle}>作品点赞量50👍</Text>
        <Text style={styles.claimRecordDesc}>周卡 💳 x 1</Text>
      </View>
      <Text style={styles.reviewStatus}>审核中</Text>
    </View>
  );
}

function LikeClaimRecordCard({ onClaim }: { onClaim: () => void }) {
  return (
    <View style={styles.claimRecordCard}>
      <View style={[styles.claimRecordIconWrap, styles.claimIconWrap]}>
        <Feather name="credit-card" size={25} color="#03130B" />
      </View>
      <View style={styles.claimRecordInfo}>
        <Text style={styles.claimRecordTitle}>作品点赞量50👍</Text>
        <Text style={styles.claimRecordDesc}>周卡 💳 x 1</Text>
      </View>
      <Pressable accessibilityLabel="领取50个赞奖励" style={styles.likeClaimButton} onPress={onClaim}>
        <Text style={styles.likeClaimButtonText}>领取</Text>
      </Pressable>
    </View>
  );
}

function LikeClaimRewardModal({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.rewardModalOverlay}>
      <Pressable accessibilityLabel="关闭领取奖励弹窗背景" style={styles.rewardModalScrim} onPress={onClose} />
      <View style={styles.rewardModalWrap}>
        <Text style={styles.rewardHalo}>◎</Text>
        <View style={styles.rewardGiftBox}>
          <Text style={styles.rewardGiftText}>🎁</Text>
        </View>
        <LinearGradient colors={['#39EF83', '#41F7D3', '#F8A3FF']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.rewardRibbon}>
          <Text style={styles.rewardRibbonText}>恭喜!</Text>
        </LinearGradient>
        <View style={styles.rewardModalCard}>
          <View style={styles.rewardPreviewBox}>
            <View style={styles.rewardPreviewGlow} />
            <Text style={styles.rewardCardIcon}>💳</Text>
            <Text style={styles.rewardCardAmount}>×1</Text>
          </View>
          <Pressable accessibilityLabel="收下奖励" onPress={onClose}>
            <LinearGradient colors={['#37F27E', '#41F7D3', '#F8A3FF']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.rewardAcceptButton}>
              <Text style={styles.rewardAcceptText}>收下了</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function EmptyRecord() {
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>暂无领取记录</Text>
      <Text style={styles.emptyDesc}>完成活动任务后，奖励记录会显示在这里。</Text>
    </View>
  );
}

const shellStyles = {
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0F4' },
  previewScaler: { alignItems: 'center', justifyContent: 'center' },
  phoneShell: { width: DESIGN_WIDTH + PHONE_BEZEL * 2, height: DESIGN_HEIGHT + PHONE_BEZEL * 2, padding: PHONE_BEZEL, borderRadius: 52, backgroundColor: '#0A0B10', shadowColor: '#000000', shadowOpacity: 0.26, shadowRadius: 34, shadowOffset: { width: 0, height: 18 }, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  speaker: { position: 'absolute', top: 8, left: '50%', width: 78, height: 6, marginLeft: -39, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 2 },
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#020403' },
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
  batteryPill: { height: 23, paddingHorizontal: 6, borderRadius: 6, backgroundColor: '#30D15B', alignItems: 'center', justifyContent: 'center' },
  batteryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  header: { height: 74, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(3,20,13,0.68)', borderWidth: 1, borderColor: 'rgba(130,255,184,0.18)', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#E8FFF2', fontSize: 25, fontWeight: '900' },
  headerSpacer: { width: 52 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 18 },
  claimRecordCard: { minHeight: 82, marginBottom: 12, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: 'rgba(236,255,244,0.96)', borderWidth: 1, borderColor: 'rgba(65,247,211,0.5)', flexDirection: 'row', alignItems: 'center', shadowColor: '#41F7D3', shadowOpacity: 0.26, shadowRadius: 16, shadowOffset: { width: 0, height: 9 } },
  claimRecordIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#8AFFB8', alignItems: 'center', justifyContent: 'center' },
  reviewIconWrap: { backgroundColor: '#D9FF57' },
  claimIconWrap: { backgroundColor: '#41F7D3' },
  claimRecordInfo: { flex: 1, marginLeft: 12 },
  claimRecordTitle: { color: '#04110B', fontSize: 18, fontWeight: '900' },
  claimRecordDesc: { marginTop: 5, color: '#0A8F46', fontSize: 15, fontWeight: '800' },
  claimRecordStatus: { color: '#B05AC9', fontSize: 15, fontWeight: '900' },
  reviewStatus: { color: '#0A8F46', fontSize: 15, fontWeight: '900' },
  likeClaimButton: { minWidth: 54, height: 32, borderRadius: 16, backgroundColor: '#39EF83', alignItems: 'center', justifyContent: 'center' },
  likeClaimButtonText: { color: '#03130B', fontSize: 15, fontWeight: '900' },
  rewardModalOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.46)' },
  rewardModalScrim: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  rewardModalWrap: { width: 312, alignItems: 'center' },
  rewardHalo: { position: 'absolute', top: -16, left: 30, color: '#D9FF57', fontSize: 49, lineHeight: 54, fontWeight: '900', zIndex: 3 },
  rewardGiftBox: { position: 'absolute', top: -49, zIndex: 4, width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  rewardGiftText: { fontSize: 60, lineHeight: 68 },
  rewardRibbon: { zIndex: 2, width: 282, height: 62, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#39EF83', shadowOpacity: 0.38, shadowRadius: 14 },
  rewardRibbonText: { color: '#03130B', fontSize: 24, fontWeight: '900' },
  rewardModalCard: { width: 264, marginTop: -1, paddingTop: 52, paddingBottom: 30, paddingHorizontal: 30, borderBottomLeftRadius: 26, borderBottomRightRadius: 26, backgroundColor: '#ECFFF4', alignItems: 'center', shadowColor: '#39EF83', shadowOpacity: 0.4, shadowRadius: 18, shadowOffset: { width: 0, height: 12 } },
  rewardPreviewBox: { width: 138, height: 138, borderRadius: 28, backgroundColor: '#DDE9E8', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  rewardPreviewGlow: { position: 'absolute', width: 128, height: 128, borderRadius: 64, backgroundColor: 'rgba(57,239,131,0.13)' },
  rewardCardIcon: { fontSize: 45, lineHeight: 51 },
  rewardCardAmount: { marginTop: 5, color: '#0A8F46', fontSize: 34, lineHeight: 39, fontWeight: '900' },
  rewardAcceptButton: { marginTop: 28, width: 178, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', shadowColor: '#39EF83', shadowOpacity: 0.3, shadowRadius: 12 },
  rewardAcceptText: { color: '#03130B', fontSize: 22, fontWeight: '900' },
  emptyCard: { height: 138, borderRadius: 26, padding: 22, backgroundColor: 'rgba(236,255,244,0.08)', borderWidth: 1, borderColor: 'rgba(65,247,211,0.28)', alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { color: '#E8FFF2', fontSize: 21, fontWeight: '900' },
  emptyDesc: { marginTop: 10, color: '#8EA898', fontSize: 14, lineHeight: 21, fontWeight: '700', textAlign: 'center' },
});
