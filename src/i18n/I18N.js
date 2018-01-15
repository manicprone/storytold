import objectUtils from '../utils/object-utils';
import enGB from './locales/en-GB/common';
import zhCN from './locales/zh-CN/common';

let instance = null;

// TODO: Load locales via init, handle translation source dynamically !!!

export default class I18N {
  constructor() {
    if (!instance) {
      this.isInitialized = false;
      // The default locale (from init)...
      this.defaultLocale = 'en-GB';
      // The supported locales that will be loaded...
      this.registeredLocales = [];

      instance = this;
    }

    return instance;
  }

  static getInstance() {
    return new I18N();
  }

  init(allLocales, defaultLocale, options) {
    // Handle options...
    const logInit = objectUtils.get(options, 'logInit', false);

    if (!this.isInitialized) {
      if (logInit) console.log('I18N Service initializing...');

      // Save provided settings...
      this.registeredLocales = allLocales;
      this.defaultLocale = defaultLocale;

      // Mark as initialized...
      this.isInitialized = true;
    }
  }

  translate(translationKey, locale, interpolations) {
    const localeToUse = locale || this.defaultLocale;
    let value = translationKey;

    // Determine translation source...
    let translations = {};
    if (localeToUse === 'en-GB') {
      translations = enGB;
    } else {
      translations = zhCN;
    }

    // Perform translation...
    let translated = objectUtils.get(translations, translationKey, null);
    if (translated) {
      // Handle any interpolations...
      if (interpolations) {
        Object.keys(interpolations).forEach((interp) => {
          const interpValue = interpolations[interp];
          const regex = new RegExp(`{{${interp}}}`, 'g');
          translated = translated.replace(regex, interpValue);
        });
      }

      value = translated;
    } // end-if (translated)

    return value;
  }
}
