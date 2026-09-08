import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import {
  ChevronLeft,
  Home,
  Grid3x3,
  Tag,
  Package,
  Heart,
  User,
  HelpCircle,
  Globe,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { colors, spacing, radius, typography, shadows } from '@/lib/theme';
import { useAuth } from '@/lib/AuthContext';
import { ArabicText as Text } from '@/components/ArabicText';
import { DeleteAccountButton } from '@/components/DeleteAccountButton';
import { t } from '@/lib/i18n';

export default function MenuScreen() {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', action: () => router.push('/(tabs)/index') },
    { icon: Grid3x3, label: 'Categories', action: () => router.push('/(tabs)/search') },
    { icon: Tag, label: 'Offers & Coupons', action: () => router.push('/coupons') },
    { icon: Package, label: 'My Orders', action: () => router.push('/orders') },
    { icon: Heart, label: 'Wishlist', action: () => router.push('/(tabs)/wishlist') },
    { icon: User, label: 'My Account', action: () => router.push('/(tabs)/account') },
    { icon: HelpCircle, label: 'Help & Support', action: () => router.push('/support') },
    { icon: Globe, label: 'Language: English', action: () => {} },
    { icon: Shield, label: 'Privacy Policy', action: () => router.push('/privacy-policy') },
    { icon: FileText, label: 'Terms & Conditions', action: () => router.push('/terms') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: spacing.md, gap: spacing.md }}>
        <View style={styles.brandCard}>
          <Image source={require('@/assets/images/varlo-logo.png')} style={styles.brandLogo} />
          <Text style={styles.brandName}>VARLO</Text>
          <Text style={styles.brandTagline}>Everything You Need, All In One Place</Text>
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.menuItem,
                  i === menuItems.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={styles.menuIcon}>
                  <Icon size={20} color={colors.primary[600]} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <ChevronRight size={20} color={colors.neutral[400]} />
              </TouchableOpacity>
            );
          })}
        </View>
        {user ? (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              signOut();
              router.replace('/(tabs)');
            }}
          >
            <View style={[styles.menuIcon, { backgroundColor: colors.error[50] }]}>
              <LogOut size={20} color={colors.error[500]} />
            </View>
            <Text style={[styles.menuLabel, { color: colors.error[500] }]}>Sign Out</Text>
          </TouchableOpacity>
        ) : null}
        {user ? (
          <DeleteAccountButton style={styles.logoutBtn} />
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginBtnText}>Sign In / Sign Up</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h4,
    color: colors.text,
    fontWeight: '700',
  },
  brandCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  brandLogo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 4,
  },
  brandName: {
    ...typography.h2,
    fontWeight: '800',
    color: '#d4af37',
    letterSpacing: 4,
  },
  brandTagline: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.9)',
  },
  menuContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  loginBtn: {
    backgroundColor: colors.primary[600],
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  loginBtnText: {
    ...typography.button,
    color: colors.white,
  },
  version: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
