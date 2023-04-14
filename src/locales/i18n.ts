import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initReactI18next } from "react-i18next";

import * as en from "../locales/en/";
import * as pt from "../locales/pt/";

import i18n from "i18next";

const resources = {
    en,
    pt,
};

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    lng: Localization.locale,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

AsyncStorage.getItem("language").then((language) => i18n.changeLanguage(language || 'en'))

export default i18n;