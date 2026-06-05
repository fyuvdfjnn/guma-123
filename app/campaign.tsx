import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions, type ScrollView as ScrollViewType } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;

type Variant = '1' | '2' | '3';

const submitRules = [
  '可在多个平台发布内容（如TikTok、Instagram，YouTube），每个平台符合要求的作品都可获得一份奖励。',
  '单条作品点赞或浏览量达到指定数量，可获得额外奖励。请联系客服领取。',
  '未通过审核的作品可根据要求修改后重新提交。',
  '提交的内容将在3个工作日内完成审核。',
  '禁止任何形式的作弊行为。如发现违规，奖励将被取消。',
];

export default function CampaignScreen() {
  const { width, height } = useWindowDimensions();
  const { variant, scrollTo, confirm } = useLocalSearchParams<{ variant?: string; scrollTo?: string; confirm?: string }>();
  const selected = (variant === '2' || variant === '3' ? variant : '1') as Variant;
  const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
  const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
  const scale = Math.min((width - 24) / previewWidth, (height - 24) / previewHeight, 1);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
        <View style={styles.phoneShell}>
          <View style={styles.speaker} />
          <View style={styles.phoneFrame}>
            {selected === '1' && <RewardImpactVariant scrollTo={typeof scrollTo === 'string' ? scrollTo : undefined} confirm={typeof confirm === 'string' ? confirm : undefined} />}
            {selected === '2' && <SoftGuideVariant />}
            {selected === '3' && <WorkFlowVariant />}
          </View>
        </View>
      </View>
    </View>
  );
}

const LATEST_WORK_IMAGE = 'https://picsum.photos/seed/beach-fashion-soft/344/461';

function goToWorks() {
  router.push('/');
}

function goToLatestWorkDetail() {
  router.push({
    pathname: '/detail',
    params: { image: LATEST_WORK_IMAGE, type: 'image', backTo: '/' },
  });
}

function closeCampaignToSettings() {
  router.replace({ pathname: '/settings', params: { backTo: '/' } });
}

function PhoneStatus({ dark = false }: { dark?: boolean }) {
  return (
    <View style={styles.statusRow}>
      <Text style={[styles.timeText, dark && styles.darkText]}>15:07</Text>
      <View style={styles.phoneIndicators}>
        <View style={styles.signalDots}>
          <View style={[styles.signalDot, dark && styles.darkDot]} />
          <View style={[styles.signalDot, dark && styles.darkDot]} />
          <View style={[styles.signalDot, dark && styles.darkDot]} />
          <View style={[styles.signalDotDim, dark && styles.darkDotDim]} />
        </View>
        <Ionicons name="wifi" size={25} color={dark ? '#080912' : '#FFFFFF'} />
        <View style={[styles.batteryPill, dark && styles.batteryDark]}>
          <Text style={[styles.batteryText, dark && styles.batteryTextDark]}>84</Text>
        </View>
      </View>
    </View>
  );
}

function FloatingSocialIcons() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.floatingIcon, styles.floatTikTokOne]}>
        <MaterialCommunityIcons name="music-note-eighth" size={23} color="rgba(138,255,184,0.28)" />
      </View>
      <View style={[styles.floatingIcon, styles.floatInstagramOne]}>
        <Feather name="instagram" size={22} color="rgba(255,255,255,0.22)" />
      </View>
      <View style={[styles.floatingIcon, styles.floatTikTokTwo]}>
        <MaterialCommunityIcons name="music-note-eighth" size={19} color="rgba(255,255,255,0.17)" />
      </View>
      <View style={[styles.floatingIcon, styles.floatInstagramTwo]}>
        <Feather name="instagram" size={18} color="rgba(102,255,166,0.22)" />
      </View>
    </View>
  );
}

function CampaignTopBar({ dark = false, hasRecord = false, hasLikeRecord = false }: { dark?: boolean; hasRecord?: boolean; hasLikeRecord?: boolean }) {
  return (
    <View style={styles.campaignTopBar}>
      <Pressable style={[styles.campaignBackButton, dark && styles.campaignBackButtonLight]} onPress={closeCampaignToSettings}>
        <Feather name="chevron-left" size={34} color={dark ? '#232333' : '#FFFFFF'} />
      </Pressable>
      <Pressable style={styles.claimRecordButton} onPress={() => router.push({ pathname: '/claim-record', params: { hasRecord: hasRecord ? '1' : '0', hasLikeRecord: hasLikeRecord ? '1' : '0' } })}>
        <Text style={[styles.claimRecordText, dark && styles.claimRecordTextDark]}>活动记录</Text>
      </Pressable>
    </View>
  );
}

function RewardImpactVariant({ scrollTo, confirm }: { scrollTo?: string; confirm?: string }) {
  const scrollRef = useRef<ScrollViewType>(null);
  const [publishRewardSubmitted, setPublishRewardSubmitted] = useState(false);
  const [publishRewardClaimed, setPublishRewardClaimed] = useState(false);
  const [likeRewardReviewing, setLikeRewardReviewing] = useState(false);
  const [submitTarget, setSubmitTarget] = useState<'publish' | 'likes'>('publish');
  const [hasClaimRecord, setHasClaimRecord] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(confirm === 'published');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const scrollToRewards = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToSubmit = () => {
    scrollRef.current?.scrollTo({ y: 485, animated: true });
  };

  useEffect(() => {
    if (scrollTo !== 'submit') return;

    const timer = setTimeout(() => {
      scrollToSubmit();
    }, 120);

    return () => clearTimeout(timer);
  }, [scrollTo]);

  const handlePublishRewardPress = () => {
    if (publishRewardClaimed) return;

    if (publishRewardSubmitted) {
      setShowClaimModal(true);
      return;
    }

    setSubmitTarget('publish');
    scrollToSubmit();
  };

  const handleLikeRewardPress = () => {
    if (likeRewardReviewing) return;

    setSubmitTarget('likes');
    scrollToSubmit();
  };

  return (
    <LinearGradient colors={['#020403', '#061A12', '#0B3D28', '#07100C']} locations={[0, 0.34, 0.72, 1]} style={styles.screen}>
      <FloatingSocialIcons />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <PhoneStatus />
        <CampaignTopBar hasRecord={hasClaimRecord} hasLikeRecord={likeRewardReviewing} />
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.impactContent}>
          <View style={styles.brandRow}>
            <Feather name="heart" size={25} color="#FFFFFF" />
            <Text style={styles.brandText}>GUMA SHARE</Text>
          </View>

          <View style={styles.heroBurst} />
          <Text style={styles.heroTitle}>一起瓜分{`\n`}   100万现金！</Text>
          <Text style={styles.moneyText}>$1000,000</Text>
          <Text style={styles.moneyLeft}>✦</Text>
          <Text style={styles.moneyRight}>✧</Text>
          <StepBar steps={['分享作品', '发布社媒', '提交链接', '获取奖励']} />

          <SectionRibbon text="活动奖励" />
          <View style={styles.rewardCardsRow}>
            <RewardCard tag="发布作品" image="🪙×300" button={publishRewardClaimed ? '已领取' : publishRewardSubmitted ? '领取' : '前往'} onPress={handlePublishRewardPress} disabled={publishRewardClaimed} />
            <RewardCard tag="50 个赞" image="💳x1" button={likeRewardReviewing ? '审核中' : '前往'} onPress={handleLikeRewardPress} disabled={likeRewardReviewing} />
            <RewardCard tag="100万播放" image="$1000" button="联系我们" onPress={() => router.push('/email-account')} />
          </View>

          <SubmitLinkModule onSubmittingChange={setIsSubmitLoading} onSubmitted={() => {
            if (submitTarget === 'likes') {
              setLikeRewardReviewing(true);
            } else {
              setPublishRewardSubmitted(true);
            }
            scrollToRewards();
          }} />
        </ScrollView>
        <BottomCta title="参与活动" subtitle="去选择你的作品" />
        {isSubmitLoading && <SubmitLoadingOverlay />}
        {showClaimModal && <ClaimRewardModal onClose={() => {
          setShowClaimModal(false);
          setPublishRewardClaimed(true);
          setHasClaimRecord(true);
        }} />}
        {showPublishConfirm && <PublishConfirmModal onConfirm={() => {
          setShowPublishConfirm(false);
          scrollToSubmit();
        }} onCancel={() => setShowPublishConfirm(false)} />}
      </SafeAreaView>
    </LinearGradient>
  );
}

function SoftGuideVariant() {
  return (
    <LinearGradient colors={['#C7BBFF', '#BBA7F4', '#B9A7F2']} style={styles.screen}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <PhoneStatus dark />
        <CampaignTopBar dark />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.softContent}>
          <View style={styles.softTop}>
            <Text style={styles.recordText}>活动规则</Text>
          </View>

          <View style={styles.softMascot}>
            <Text style={styles.catEmoji}>🐱</Text>
            <View style={styles.dollarBubble}><Text style={styles.dollarText}>$1000</Text></View>
          </View>
          <Text style={styles.softTitle}>分享 Guma</Text>
          <Text style={styles.softReward}>获取<Text style={styles.pinkText}>100</Text>美元奖励!</Text>
          <View style={styles.progressPill}><Text style={styles.progressText}>进行中</Text></View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>在 TikTok 或 Instagram 发布你的 Guma 作品，并带上指定话题标签，即可参与奖励活动。</Text>
            <Text style={styles.joinTitle}>🎁 怎么参与?</Text>
            <LinearGradient colors={['#B7EAFF', '#D8B8FF', '#E355D5']} style={styles.stepsPill}>
              <Text style={styles.stepsText}>1 进入作品  》 2 点击分享  》 3 发布社媒</Text>
            </LinearGradient>
          </View>

          <View style={styles.basicCard}>
            <Text style={styles.basicTitle}>发布作品｜基础奖励</Text>
            <View style={styles.illustrationBox}>
              <Text style={styles.bigCat}>🐱</Text>
              <Text style={styles.giftBag}>🎬</Text>
              <Text style={styles.smallCatLeft}>📱</Text>
              <Text style={styles.smallCatRight}>✨</Text>
            </View>
            <Pressable style={styles.participateButton} onPress={goToWorks}>
              <Text style={styles.participateText}>参与活动</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Pressable style={styles.claimButton} onPress={goToWorks}>
          <Text style={styles.claimText}>选择作品去分享</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

function WorkFlowVariant() {
  return (
    <LinearGradient colors={['#160D2E', '#3A0A83', '#7D00FF']} style={styles.screen}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <PhoneStatus />
        <CampaignTopBar />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.flowContent}>
          <Text style={styles.flowKicker}>Campaign Flow</Text>
          <Text style={styles.flowTitle}>从作品详情页分享</Text>
          <Text style={styles.flowDesc}>活动页不直接发布作品。先进入你的作品，再用详情页分享按钮导出并打开 Instagram 或 TikTok。</Text>

          <View style={styles.flowPreviewCard}>
            <View style={styles.mockPhone}>
              <View style={styles.mockImage} />
              <View style={styles.mockFooter}>
                <View style={styles.mockSave} />
                <View style={styles.mockRegen} />
                <View style={styles.mockShare}><Feather name="share-2" size={24} color="#FFFFFF" /></View>
              </View>
            </View>
            <View style={styles.hashCard}>
              <Text style={styles.hashTitle}>自动复制标签</Text>
              <Text style={styles.hashText}>#GumaApp #AIVideo #AIAvatar</Text>
            </View>
          </View>

          <View style={styles.flowStepsCard}>
            <FlowStep index="1" title="选择作品" desc="从我的作品列表选择要参加活动的视频或图片。" />
            <FlowStep index="2" title="点击分享" desc="在作品 Detail 页点击分享，保存作品并复制活动标签。" />
            <FlowStep index="3" title="发布到社媒" desc="打开 TikTok / Instagram，粘贴标签并发布。" />
          </View>

          <View style={styles.platformPanel}>
            <Text style={styles.platformPanelTitle}>支持平台</Text>
            <View style={styles.platformButtons}>
              <LinearGradient colors={['#833AB4', '#FD1D1D', '#FCAF45']} style={styles.platformButton}>
                <Feather name="instagram" size={28} color="#FFFFFF" />
                <Text style={styles.platformButtonText}>Instagram</Text>
              </LinearGradient>
              <View style={[styles.platformButton, styles.tiktokPlatform]}>
                <MaterialCommunityIcons name="music-note-eighth" size={30} color="#FFFFFF" />
                <Text style={styles.platformButtonText}>TikTok</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomCta title="参与活动" subtitle="去我的作品页" />
      </SafeAreaView>
    </LinearGradient>
  );
}

function SectionRibbon({ text }: { text: string }) {
  return (
    <View style={styles.sectionRibbon}>
      <Text style={styles.sparkle}>✦</Text>
      <Text style={styles.ribbonText}>{text}</Text>
      <Text style={styles.gearFlower}>✿</Text>
    </View>
  );
}

function RewardCard({ tag, image, button, onPress, disabled = false }: { tag: string; image: string; button?: string; onPress?: () => void; disabled?: boolean }) {
  return (
    <View style={styles.rewardCard}>
      <Text style={styles.rewardTag}>{tag}</Text>
      <View style={styles.rewardImage}><Text style={styles.rewardImageText}>{image}</Text></View>
      {button && (
        <Pressable style={[styles.rewardButton, disabled && styles.rewardButtonDisabled]} onPress={onPress} disabled={disabled}>
          <Text style={[styles.rewardButtonText, disabled && styles.rewardButtonTextDisabled]}>{button}</Text>
        </Pressable>
      )}
    </View>
  );
}

function ClaimRecordCard() {
  return (
    <View style={styles.claimRecordCard}>
      <View style={styles.claimRecordIconWrap}>
        <Feather name="dollar-sign" size={24} color="#03130B" />
      </View>
      <View style={styles.claimRecordInfo}>
        <Text style={styles.claimRecordTitle}>发布作品奖励   🪙×300</Text>
      </View>
      <Text style={styles.claimRecordStatus}>已领取</Text>
    </View>
  );
}

function ClaimRewardModal({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.claimOverlay}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Text style={[styles.claimConfetti, styles.claimConfettiOne]}>✦</Text>
        <Text style={[styles.claimConfetti, styles.claimConfettiTwo]}>✧</Text>
        <Text style={[styles.claimConfetti, styles.claimConfettiThree]}>▰</Text>
        <Text style={[styles.claimConfetti, styles.claimConfettiFour]}>▰</Text>
      </View>
      <View style={styles.claimModalWrap}>
        <Text style={styles.claimHalo}>◎</Text>
        <View style={styles.claimGiftBox}>
          <Text style={styles.claimGiftText}>🎁</Text>
        </View>
        <LinearGradient colors={['#39EF83', '#41F7D3', '#F8A3FF']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.claimRibbon}>
          <Text style={styles.claimRibbonText}>恭喜!</Text>
        </LinearGradient>
        <View style={styles.claimModalCard}>
          <View style={styles.claimRewardPreview}>
            <View style={styles.claimRewardGlow} />
            <Text style={styles.claimRewardCoin}>🪙</Text>
            <Text style={styles.claimRewardAmount}>×300</Text>
          </View>
          <Pressable onPress={onClose}>
            <LinearGradient colors={['#37F27E', '#41F7D3', '#F8A3FF']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.claimAcceptButton}>
              <Text style={styles.claimAcceptText}>收下了</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function PublishConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <View style={styles.publishConfirmOverlay}>
      <View style={styles.publishConfirmCard}>
        <LinearGradient colors={['#F8A3FF', '#41F7D3']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.publishConfirmTopLine} />
        <Text style={styles.publishConfirmTitle}>你成功发布作品了吗?</Text>
        <Pressable onPress={onConfirm}>
          <LinearGradient colors={['#F8A3FF', '#41F7D3']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.publishConfirmPrimary}>
            <Text style={styles.publishConfirmPrimaryText}>是的</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.publishConfirmSecondary} onPress={onCancel}>
          <Text style={styles.publishConfirmSecondaryText}>稍后再说</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SubmitLoadingOverlay() {
  const pulse = useRef(new Animated.Value(0.94)).current;
  const skew = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 320, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.94, duration: 320, useNativeDriver: true }),
      ])
    );
    const skewAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(skew, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.timing(skew, { toValue: -1, duration: 260, useNativeDriver: true }),
        Animated.timing(skew, { toValue: 0, duration: 260, useNativeDriver: true }),
      ])
    );

    pulseAnimation.start();
    skewAnimation.start();
    return () => {
      pulseAnimation.stop();
      skewAnimation.stop();
    };
  }, [pulse, skew]);

  const rotate = skew.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-7deg', '0deg', '7deg'] });
  const skewX = skew.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-10deg', '0deg', '10deg'] });

  return (
    <View style={styles.submitLoadingOverlay} pointerEvents="none">
      <Animated.View style={[styles.infinityLoader, { transform: [{ scale: pulse }, { rotate }, { skewX }] }]}>
        <View style={styles.infinityLoopLeft} />
        <View style={styles.infinityLoopRight} />
        <View style={styles.infinityCrossLeft} />
        <View style={styles.infinityCrossRight} />
      </Animated.View>
    </View>
  );
}

function SubmitLinkModule({ onSubmitted, onSubmittingChange }: { onSubmitted?: () => void; onSubmittingChange?: (isSubmitting: boolean) => void }) {
  const [workLink, setWorkLink] = useState('');
  const [homepageScreenshot, setHomepageScreenshot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = workLink.trim().length > 0 && homepageScreenshot && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    onSubmittingChange?.(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmittingChange?.(false);
      onSubmitted?.();
    }, 1000);
  };

  const pickHomepageScreenshot = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setHomepageScreenshot(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.submitLinkCard}>
      <Text style={styles.submitLinkTitle}>提交链接</Text>
      <Text style={styles.submitLinkLabel}>作品链接</Text>
      <View style={styles.submitInputBox}>
        <TextInput
          value={workLink}
          onChangeText={setWorkLink}
          placeholder="粘贴作品链接"
          placeholderTextColor="#8A8A96"
          style={styles.submitInput}
        />
        {workLink.length > 0 && (
          <Pressable style={styles.inputClearButton} onPress={() => setWorkLink('')}>
            <Feather name="x" size={16} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
      <Text style={styles.submitLinkLabel}>主页截图</Text>
      <View style={styles.screenshotUploadWrap}>
        <Pressable style={styles.screenshotUploadBox} onPress={pickHomepageScreenshot}>
          {homepageScreenshot ? (
            <Image source={{ uri: homepageScreenshot }} style={styles.screenshotPreview} />
          ) : (
            <Feather name="plus" size={27} color="#7C3AED" />
          )}
        </Pressable>
        {homepageScreenshot && (
          <Pressable style={styles.screenshotClearButton} onPress={() => setHomepageScreenshot(null)}>
            <Feather name="x" size={15} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
      {(canSubmit || isSubmitting) && (
        <Pressable style={styles.submitSmallButton} onPress={handleSubmit} disabled={isSubmitting}>
          <Text style={styles.submitSmallButtonText}>提交</Text>
        </Pressable>
      )}
      <Text style={styles.rulesTitle}>规则详情</Text>
      <View style={styles.rulesList}>
        {submitRules.map((rule, index) => (
          <View key={rule} style={styles.ruleRow}>
            <Text style={styles.ruleIndex}>{index + 1}.</Text>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function StepBar({ steps }: { steps: string[] }) {
  return (
    <LinearGradient colors={['#9BE7E3', '#CDB0F6', '#E89DFF']} style={styles.stepBar}>
      <Text style={styles.stepBarText}>{steps.join('  》  ')}</Text>
    </LinearGradient>
  );
}

function BottomCta({ title }: { title: string; subtitle: string }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 720,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 720,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [scale]);

  return (
    <View style={styles.bottomCtaOnly}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable onPress={goToLatestWorkDetail}>
          <LinearGradient colors={['#37F27E', '#41F7D3', '#F8A3FF']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.mainCta}>
            <Text style={styles.mainCtaText}>{title}</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function FlowStep({ index, title, desc }: { index: string; title: string; desc: string }) {
  return (
    <View style={styles.flowStep}>
      <View style={styles.flowStepIndex}><Text style={styles.flowStepIndexText}>{index}</Text></View>
      <View style={styles.flowStepTextWrap}>
        <Text style={styles.flowStepTitle}>{title}</Text>
        <Text style={styles.flowStepDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const shellStyles = {
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0F4' },
  previewScaler: { alignItems: 'center', justifyContent: 'center' },
  phoneShell: { width: DESIGN_WIDTH + PHONE_BEZEL * 2, height: DESIGN_HEIGHT + PHONE_BEZEL * 2, padding: PHONE_BEZEL, borderRadius: 52, backgroundColor: '#0A0B10', shadowColor: '#000000', shadowOpacity: 0.26, shadowRadius: 34, shadowOffset: { width: 0, height: 18 }, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  speaker: { position: 'absolute', top: 8, left: '50%', width: 78, height: 6, marginLeft: -39, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 2 },
  phoneFrame: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, overflow: 'hidden', borderRadius: 39, backgroundColor: '#6D00FF' },
} as const;

const styles = StyleSheet.create({
  ...shellStyles,
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  statusRow: { height: 38, paddingHorizontal: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeText: { color: '#FFFFFF', fontSize: 25, fontWeight: '600' },
  darkText: { color: '#070711' },
  phoneIndicators: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  signalDots: { flexDirection: 'row', gap: 3 },
  signalDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.62)' },
  signalDotDim: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  darkDot: { backgroundColor: 'rgba(0,0,0,0.38)' },
  darkDotDim: { backgroundColor: 'rgba(0,0,0,0.15)' },
  batteryPill: { height: 23, paddingHorizontal: 6, borderRadius: 6, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  batteryDark: { backgroundColor: '#13101F' },
  batteryText: { color: '#6D00FF', fontSize: 16, fontWeight: '900' },
  batteryTextDark: { color: '#FFFFFF' },
  closePurple: { position: 'absolute', top: 57, right: 18, width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(3,20,13,0.68)', borderWidth: 1, borderColor: 'rgba(130,255,184,0.18)', zIndex: 10 },
  campaignTopBar: { height: 66, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  campaignBackButton: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(3,20,13,0.68)', borderWidth: 1, borderColor: 'rgba(130,255,184,0.18)' },
  campaignBackButtonLight: { backgroundColor: 'rgba(255,255,255,0.86)', borderColor: 'rgba(35,35,51,0.12)' },
  claimRecordText: { color: '#E8FFF2', fontSize: 18, fontWeight: '900' },
  claimRecordTextDark: { color: '#232333' },
  claimRecordButton: { minWidth: 86, height: 44, alignItems: 'flex-end', justifyContent: 'center' },
  claimRecordOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 31, backgroundColor: 'rgba(0,0,0,0.68)', justifyContent: 'flex-start', paddingTop: 98, paddingHorizontal: 16 },
  claimRecordPanel: { borderRadius: 28, padding: 16, backgroundColor: '#07100C', borderWidth: 1, borderColor: 'rgba(65,247,211,0.46)', shadowColor: '#41F7D3', shadowOpacity: 0.28, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
  claimRecordHeader: { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  claimRecordPanelTitle: { color: '#E8FFF2', fontSize: 22, fontWeight: '900' },
  claimRecordClose: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  claimRecordEmpty: { height: 86, borderRadius: 20, backgroundColor: 'rgba(236,255,244,0.08)', alignItems: 'center', justifyContent: 'center' },
  claimRecordEmptyText: { color: '#B4FFD4', fontSize: 17, fontWeight: '800' },
  claimRecordCard: { marginTop: 12, minHeight: 74, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 13, backgroundColor: 'rgba(236,255,244,0.96)', borderWidth: 1, borderColor: 'rgba(65,247,211,0.5)', flexDirection: 'row', alignItems: 'center', shadowColor: '#41F7D3', shadowOpacity: 0.22, shadowRadius: 13, shadowOffset: { width: 0, height: 7 } },
  claimRecordIconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#8AFFB8', alignItems: 'center', justifyContent: 'center' },
  claimRecordInfo: { flex: 1, marginLeft: 12 },
  claimRecordTitle: { color: '#04110B', fontSize: 17, fontWeight: '900' },
  claimRecordDesc: { marginTop: 4, color: '#0A8F46', fontSize: 14, fontWeight: '800' },
  claimRecordStatus: { color: '#B05AC9', fontSize: 14, fontWeight: '900' },
  impactContent: { paddingHorizontal: 16, paddingBottom: 175 },
  brandRow: { alignSelf: 'center', marginTop: 0, flexDirection: 'row', alignItems: 'center', gap: 7 },
  brandText: { color: '#E8FFF2', fontSize: 20, fontWeight: '900' },
  floatingIcon: { position: 'absolute', width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(139,255,184,0.13)', backgroundColor: 'rgba(255,255,255,0.035)', alignItems: 'center', justifyContent: 'center' },
  floatTikTokOne: { top: 118, left: 18, transform: [{ rotate: '-15deg' }] },
  floatInstagramOne: { top: 174, right: 26, transform: [{ rotate: '13deg' }] },
  floatTikTokTwo: { top: 420, right: 18, width: 36, height: 36, borderRadius: 18, transform: [{ rotate: '18deg' }] },
  floatInstagramTwo: { top: 532, left: 24, width: 34, height: 34, borderRadius: 17, transform: [{ rotate: '-10deg' }] },
  heroBurst: { position: 'absolute', top: 48, left: 62, width: 268, height: 268, borderRadius: 150, backgroundColor: 'rgba(42,255,139,0.13)' },
  heroTitle: { marginTop: 42, textAlign: 'center', color: '#E8FFF2', fontSize: 39, fontWeight: '900' },
  moneyText: { marginTop: 5, textAlign: 'center', color: '#94FF39', fontSize: 54, lineHeight: 62, fontWeight: '900', textShadowColor: 'rgba(84,255,147,0.45)', textShadowRadius: 18 },
  heroSubtitle: { textAlign: 'center', color: '#FFFFFF', fontSize: 34, fontWeight: '900' },
  heroDesc: { marginTop: 9, textAlign: 'center', color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  moneyLeft: { position: 'absolute', top: 83, left: -8, color: '#8AFFB8', fontSize: 45, transform: [{ rotate: '-16deg' }] },
  moneyRight: { position: 'absolute', top: 121, right: 4, color: '#FFFFFF', fontSize: 44, transform: [{ rotate: '18deg' }] },
  sectionRibbon: { alignSelf: 'center', marginTop: 39, height: 40, minWidth: 190, paddingHorizontal: 22, backgroundColor: '#26F27E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  sparkle: { position: 'absolute', left: -28, color: '#B7FF5C', fontSize: 31, fontWeight: '900' },
  ribbonText: { color: '#04110B', fontSize: 22, fontWeight: '900' },
  gearFlower: { position: 'absolute', right: -25, color: '#B4FFD4', fontSize: 30 },
  rewardCardsRow: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between' },
  rewardCard: { width: 101, height: 116, borderRadius: 18, backgroundColor: 'rgba(237,255,245,0.96)', alignItems: 'center', paddingTop: 13, shadowColor: '#27FF8A', shadowOpacity: 0.24, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  rewardTag: { position: 'absolute', top: -12, alignSelf: 'center', paddingHorizontal: 8, height: 25, borderRadius: 13, backgroundColor: '#39EF83', color: '#03130B', fontSize: 13, fontWeight: '900', lineHeight: 25 },
  rewardImage: { width: 76, height: 58, borderRadius: 14, backgroundColor: '#D7FFE5', alignItems: 'center', justifyContent: 'center' },
  rewardImageText: { color: '#0A8F46', fontSize: 28, fontWeight: '900' },
  rewardButton: { marginTop: 8, width: 76, height: 28, borderRadius: 14, backgroundColor: '#05130D', alignItems: 'center', justifyContent: 'center' },
  rewardButtonDisabled: { backgroundColor: '#8C948F' },
  rewardButtonText: { color: '#8AFFB8', fontSize: 13, fontWeight: '900' },
  rewardButtonTextDisabled: { color: '#EFFFF5' },
  claimOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 30, backgroundColor: 'rgba(0,0,0,0.76)', alignItems: 'center', justifyContent: 'center' },
  claimModalWrap: { width: 346, alignItems: 'center' },
  claimHalo: { position: 'absolute', top: -70, left: 52, color: '#D8FF53', fontSize: 56, fontWeight: '900', transform: [{ rotate: '-18deg' }] },
  claimGiftBox: { position: 'absolute', top: -82, width: 156, height: 116, borderRadius: 30, backgroundColor: 'rgba(57,239,131,0.2)', borderWidth: 1, borderColor: 'rgba(138,255,184,0.46)', alignItems: 'center', justifyContent: 'center', shadowColor: '#39EF83', shadowOpacity: 0.55, shadowRadius: 20 },
  claimGiftText: { fontSize: 82 },
  claimRibbon: { position: 'absolute', top: 22, width: 332, height: 76, borderRadius: 26, zIndex: 3, alignItems: 'center', justifyContent: 'center', shadowColor: '#39EF83', shadowOpacity: 0.38, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
  claimRibbonText: { color: '#04110B', fontSize: 29, fontWeight: '900' },
  claimModalCard: { width: 312, marginTop: 61, paddingTop: 68, paddingBottom: 32, paddingHorizontal: 30, borderRadius: 28, backgroundColor: '#ECFFF4', borderWidth: 2, borderColor: '#39EF83', alignItems: 'center', shadowColor: '#39EF83', shadowOpacity: 0.34, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
  claimRewardPreview: { width: 184, height: 184, borderRadius: 30, backgroundColor: '#D7FFE5', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  claimRewardGlow: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(248,163,255,0.24)' },
  claimRewardCoin: { fontSize: 72 },
  claimRewardAmount: { marginTop: -6, color: '#0A8F46', fontSize: 42, lineHeight: 48, fontWeight: '900', textShadowColor: 'rgba(255,255,255,0.8)', textShadowRadius: 6 },
  claimAcceptButton: { width: 232, height: 58, marginTop: 31, borderRadius: 29, alignItems: 'center', justifyContent: 'center', shadowColor: '#37F27E', shadowOpacity: 0.44, shadowRadius: 13, shadowOffset: { width: 0, height: 7 } },
  claimAcceptText: { color: '#03130B', fontSize: 24, fontWeight: '900' },
  claimConfetti: { position: 'absolute', color: '#A98CFF', fontSize: 24, fontWeight: '900' },
  claimConfettiOne: { top: 219, left: 47, color: '#8AFFB8' },
  claimConfettiTwo: { top: 245, right: 43, color: '#F8A3FF', fontSize: 32 },
  claimConfettiThree: { bottom: 156, left: 70, transform: [{ rotate: '5deg' }] },
  claimConfettiFour: { bottom: 96, right: 54, color: '#8AFFB8', transform: [{ rotate: '-32deg' }] },
  publishConfirmOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 32, backgroundColor: 'rgba(12,10,22,0.58)', alignItems: 'center', justifyContent: 'center' },
  publishConfirmCard: { width: 223, borderRadius: 25, paddingTop: 27, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#F6FEFF', borderWidth: 1, borderColor: 'rgba(65,247,211,0.58)', alignItems: 'center', shadowColor: '#F8A3FF', shadowOpacity: 0.34, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, overflow: 'hidden' },
  publishConfirmTopLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 6 },
  publishConfirmTitle: { marginTop: 17, marginBottom: 24, color: '#7E4E91', fontSize: 17, lineHeight: 23, fontWeight: '900', textAlign: 'center' },
  publishConfirmPrimary: { width: 169, height: 41, borderRadius: 21, alignItems: 'center', justifyContent: 'center', shadowColor: '#41F7D3', shadowOpacity: 0.4, shadowRadius: 14, shadowOffset: { width: 0, height: 7 } },
  publishConfirmPrimaryText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  publishConfirmSecondary: { width: 169, height: 41, marginTop: 11, borderRadius: 21, backgroundColor: '#EFFFFF', borderWidth: 1, borderColor: 'rgba(248,163,255,0.56)', alignItems: 'center', justifyContent: 'center' },
  publishConfirmSecondaryText: { color: '#B05AC9', fontSize: 15, fontWeight: '900' },
  stepBar: { height: 42, marginTop: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  stepBarText: { color: '#5B2B62', fontSize: 15.5, fontWeight: '900' },
  submitLinkCard: { marginTop: 24, borderRadius: 24, padding: 16, backgroundColor: 'rgba(236,255,244,0.96)' },
  submitLinkTitle: { color: '#04110B', fontSize: 25, fontWeight: '900', textAlign: 'center' },
  submitLinkLabel: { marginTop: 16, color: '#10251A', fontSize: 16, fontWeight: '800' },
  submitInputBox: { height: 46, marginTop: 8, borderRadius: 23, paddingLeft: 16, paddingRight: 44, backgroundColor: '#DDF7E8', flexDirection: 'row', alignItems: 'center' },
  submitInput: { flex: 1, color: '#10251A', fontSize: 15, fontWeight: '600', paddingVertical: 0 },
  inputClearButton: { position: 'absolute', right: 10, width: 24, height: 24, borderRadius: 12, backgroundColor: '#0A2A19', alignItems: 'center', justifyContent: 'center' },
  screenshotUploadWrap: { alignSelf: 'flex-start', marginTop: 8 },
  screenshotUploadBox: { width: 77, height: 77, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#B9EBCB', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  screenshotPreview: { width: '100%', height: '100%' },
  screenshotClearButton: { position: 'absolute', top: -7, right: -7, width: 24, height: 24, borderRadius: 12, backgroundColor: '#03130B', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#EFFFF5' },
  submitSmallButton: { alignSelf: 'center', marginTop: 10, width: 88, height: 34, borderRadius: 17, backgroundColor: '#07150F', alignItems: 'center', justifyContent: 'center' },
  submitSmallButtonText: { color: '#8AFFB8', fontSize: 15, fontWeight: '900' },
  submitLoadingOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 28, alignItems: 'center', justifyContent: 'center' },
  infinityLoader: { width: 118, height: 70, alignItems: 'center', justifyContent: 'center' },
  infinityLoopLeft: { position: 'absolute', left: 14, width: 46, height: 46, borderRadius: 23, borderWidth: 7, borderTopColor: '#F8A3FF', borderRightColor: '#41F7D3', borderBottomColor: '#41F7D3', borderLeftColor: '#F8A3FF', transform: [{ rotate: '45deg' }], shadowColor: '#41F7D3', shadowOpacity: 0.72, shadowRadius: 12 },
  infinityLoopRight: { position: 'absolute', right: 14, width: 46, height: 46, borderRadius: 23, borderWidth: 7, borderTopColor: '#41F7D3', borderRightColor: '#F8A3FF', borderBottomColor: '#F8A3FF', borderLeftColor: '#41F7D3', transform: [{ rotate: '45deg' }], shadowColor: '#F8A3FF', shadowOpacity: 0.72, shadowRadius: 12 },
  infinityCrossLeft: { position: 'absolute', left: 47, width: 31, height: 7, borderRadius: 4, backgroundColor: '#F8A3FF', transform: [{ rotate: '34deg' }] },
  infinityCrossRight: { position: 'absolute', left: 47, width: 31, height: 7, borderRadius: 4, backgroundColor: '#41F7D3', transform: [{ rotate: '-34deg' }] },
  rulesTitle: { marginTop: 18, color: '#04110B', fontSize: 20, fontWeight: '900' },
  rulesList: { marginTop: 8, gap: 8 },
  ruleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  ruleIndex: { width: 22, color: '#0FAE55', fontSize: 13, lineHeight: 20, fontWeight: '900' },
  ruleText: { flex: 1, color: '#1B3626', fontSize: 13, lineHeight: 20, fontWeight: '700' },
  bottomCtaOnly: { position: 'absolute', left: 0, right: 0, bottom: 24, alignItems: 'center' },
  mainCta: { width: 306, height: 58, borderRadius: 31, backgroundColor: '#37F27E', alignItems: 'center', justifyContent: 'center', shadowColor: '#37F27E', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
  mainCtaText: { color: '#03130B', fontSize: 23, fontWeight: '900' },
  softContent: { paddingBottom: 94 },
  softTop: { height: 110, paddingHorizontal: 16, paddingTop: 17, flexDirection: 'row', justifyContent: 'space-between' },
  lightClose: { width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(255,255,255,0.86)', alignItems: 'center', justifyContent: 'center' },
  recordText: { marginTop: 18, marginRight: 5, color: '#343245', fontSize: 22, fontWeight: '900', textDecorationLine: 'underline' },
  softMascot: { position: 'absolute', top: 70, right: 25, width: 160, height: 160, alignItems: 'center', justifyContent: 'center' },
  catEmoji: { fontSize: 92 },
  dollarBubble: { position: 'absolute', bottom: 12, paddingHorizontal: 12, height: 46, borderRadius: 23, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  dollarText: { color: '#EE57B7', fontSize: 34, fontWeight: '900' },
  softTitle: { marginLeft: 20, color: '#080923', fontSize: 35, fontWeight: '900' },
  softReward: { alignSelf: 'flex-start', marginTop: 12, marginLeft: 18, paddingHorizontal: 8, backgroundColor: '#C7F2FF', color: '#080923', fontSize: 24, fontWeight: '900' },
  pinkText: { color: '#D93783' },
  progressPill: { marginLeft: 17, marginTop: 13, width: 62, height: 24, borderRadius: 12, backgroundColor: 'rgba(155,116,255,0.56)', alignItems: 'center', justifyContent: 'center' },
  progressText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  infoCard: { marginTop: 102, marginHorizontal: 17, borderRadius: 24, padding: 18, backgroundColor: 'rgba(255,255,255,0.88)' },
  infoText: { color: '#111127', fontSize: 18, lineHeight: 29, fontWeight: '900' },
  joinTitle: { marginTop: 19, color: '#111127', fontSize: 24, fontWeight: '900' },
  stepsPill: { height: 48, marginTop: 14, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  stepsText: { color: '#111127', fontSize: 15, fontWeight: '700' },
  basicCard: { marginTop: 27, borderTopLeftRadius: 38, borderTopRightRadius: 38, paddingTop: 28, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.82)', minHeight: 338 },
  basicTitle: { color: '#111127', fontSize: 27, fontWeight: '900' },
  illustrationBox: { marginTop: 27, width: 354, height: 196, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  bigCat: { fontSize: 80 },
  giftBag: { position: 'absolute', fontSize: 92, bottom: 10 },
  smallCatLeft: { position: 'absolute', left: 56, bottom: 55, fontSize: 42 },
  smallCatRight: { position: 'absolute', right: 58, bottom: 58, fontSize: 42 },
  participateButton: { marginTop: -31, width: 246, height: 64, borderRadius: 34, backgroundColor: '#2A3141', alignItems: 'center', justifyContent: 'center' },
  participateText: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  claimButton: { position: 'absolute', left: 17, right: 17, bottom: 11, height: 59, borderRadius: 18, backgroundColor: '#7B70D6', alignItems: 'center', justifyContent: 'center' },
  claimText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  flowContent: { paddingHorizontal: 18, paddingBottom: 170 },
  flowKicker: { marginTop: 42, color: '#C4B5FD', fontSize: 14, fontWeight: '900', letterSpacing: 1.1, textTransform: 'uppercase' },
  flowTitle: { marginTop: 10, color: '#FFFFFF', fontSize: 34, lineHeight: 42, fontWeight: '900' },
  flowDesc: { marginTop: 12, color: 'rgba(255,255,255,0.78)', fontSize: 17, lineHeight: 27, fontWeight: '700' },
  flowPreviewCard: { marginTop: 24, height: 226, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.13)', overflow: 'hidden' },
  mockPhone: { position: 'absolute', left: 18, top: 18, width: 130, height: 190, borderRadius: 22, backgroundColor: '#090A12', overflow: 'hidden' },
  mockImage: { height: 128, backgroundColor: '#F5C99E' },
  mockFooter: { flex: 1, padding: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  mockSave: { width: 43, height: 20, borderRadius: 10, backgroundColor: '#FFFFFF' },
  mockRegen: { width: 43, height: 20, borderRadius: 10, backgroundColor: '#07302D' },
  mockShare: { width: 23, height: 23, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  hashCard: { position: 'absolute', right: 16, top: 38, width: 176, borderRadius: 22, padding: 16, backgroundColor: '#FFFFFF' },
  hashTitle: { color: '#111127', fontSize: 18, fontWeight: '900' },
  hashText: { marginTop: 8, color: '#7C3AED', fontSize: 15, lineHeight: 22, fontWeight: '900' },
  flowStepsCard: { marginTop: 20, borderRadius: 28, padding: 18, backgroundColor: '#FFFFFF' },
  flowStep: { flexDirection: 'row', paddingVertical: 11 },
  flowStepIndex: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center' },
  flowStepIndexText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  flowStepTextWrap: { flex: 1, marginLeft: 12 },
  flowStepTitle: { color: '#111127', fontSize: 19, fontWeight: '900' },
  flowStepDesc: { marginTop: 4, color: '#555566', fontSize: 14, lineHeight: 21, fontWeight: '600' },
  platformPanel: { marginTop: 20, borderRadius: 28, padding: 18, backgroundColor: '#FFFFFF' },
  platformPanelTitle: { color: '#111127', fontSize: 21, fontWeight: '900', textAlign: 'center' },
  platformButtons: { marginTop: 16, flexDirection: 'row', gap: 12 },
  platformButton: { flex: 1, height: 52, borderRadius: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  tiktokPlatform: { backgroundColor: '#000000' },
  platformButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
});
