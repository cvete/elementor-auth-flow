import { Language } from '../contexts/LanguageContext';
import { en } from './en';
import { mk } from './mk';
import { de } from './de';

export const translations = {
  en,
  mk,
  de,
};

export function getTranslation(language: Language) {
  return translations[language];
}
