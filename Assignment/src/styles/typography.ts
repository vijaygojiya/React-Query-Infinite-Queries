import {StyleSheet} from 'react-native';
import AppFonts from '../assets/fonts';

const typography = StyleSheet.create({
  // Headings
  h1: {
    fontSize: 32,
    fontFamily: AppFonts.bold,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontFamily: AppFonts.semiBold,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontFamily: AppFonts.regular,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontFamily: AppFonts.regular,
    lineHeight: 28,
  },

  // Subheadings
  subheading: {
    fontSize: 18,
    fontFamily: AppFonts.semiBold,
    lineHeight: 24,
  },

  // Body
  body: {
    fontSize: 16,
    fontFamily: AppFonts.regular,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontFamily: AppFonts.bold,
    lineHeight: 24,
  },

  // Caption
  caption: {
    fontSize: 14,
    fontFamily: AppFonts.regular,
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 14,
    fontFamily: AppFonts.bold,
    lineHeight: 20,
  },

  // Overline
  overline: {
    fontSize: 12,
    fontFamily: AppFonts.medium,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

export default typography;
