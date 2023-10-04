"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INVOICE_IMAGE = exports.WEBSITE_LOGO = exports.LINK_WEIGHT = exports.DEFAULT_MEDIA_PAGE_SIZE = exports.INVOICE_LEVELS = exports.EMOJIS = exports.URLS = exports.containerSize = exports.PRIMARY_SHADE = exports.BLUE_BG_COLOR = exports.BLUE_DARK_COLOR = exports.APP_KEY = exports.THEME_COOKIE_NAME = exports.SEPARATOR = exports.APP_NAME = exports.DEFAULT_APP_URL = exports.DEFAULT_API_ROOT = void 0;
// export const DEFAULT_API_ROOT = 'http://localhost:8000'
// export const DEFAULT_APP_URL = "http://localhost:3000"
var DEFAULT_API_ROOT = 'https://api.procurement.e4impactkenya.org';
exports.DEFAULT_API_ROOT = DEFAULT_API_ROOT;
var DEFAULT_APP_URL = "https://procurement.e4impactkenya.org";
exports.DEFAULT_APP_URL = DEFAULT_APP_URL;
var APP_NAME = "E4IMPACT";
exports.APP_NAME = APP_NAME;
var SEPARATOR = "|";
exports.SEPARATOR = SEPARATOR;
var THEME_COOKIE_NAME = 'e4i-template-theme';
exports.THEME_COOKIE_NAME = THEME_COOKIE_NAME;
var APP_KEY = 'E4IMPACT'; // App Colors
// export const BLUE_DARK_COLOR = 'rgb(36, 42, 73)'
// export const BLUE_BG_COLOR = "#d3d6e9"

exports.APP_KEY = APP_KEY;
var BLUE_DARK_COLOR = '#131419';
exports.BLUE_DARK_COLOR = BLUE_DARK_COLOR;
var BLUE_BG_COLOR = "#fff";
exports.BLUE_BG_COLOR = BLUE_BG_COLOR;
var PRIMARY_SHADE = ["#23A455", // 1 -> Light
"#23A455", // 0 -> Lighter
"#23A455", // 2 -> Main Primary Color
"#23A455", // 3 -> Deep
"#23A455", // 4 -> Deeper
"#23A455" // 5 -> Light rgba 20
];
exports.PRIMARY_SHADE = PRIMARY_SHADE;
var containerSize = "lg";
exports.containerSize = containerSize;
var URLS = {
  // AUTH
  REGISTER: "/account",
  LOGIN: "/auth/login",
  REQUEST_PASSWORD_RESET: "/auth/password-reset",
  PASSWORD_RESET_CONFIRM: "/auth/password-reset/confirm",
  PASSWORD_RESET_VALIDATE_TOKEN: "/auth/password-reset/validate-token",
  // USERS
  USERS: "/account",
  // Accounting
  PROJECTS: "/accounting/projects",
  PROJECT_MANAGERS: "/accounting/project-managers",
  BUDGET_LINES: "/accounting/budget-lines",
  FORM_USERS: "/accounting/form-users",
  AMOUNT_RECEIVED: "/accounting/amount-received",
  CASH_ADVANCE_FORMS: "/accounting/cash-advance-forms",
  CASH_ADVANCE_FORM_RECEIVERS: "/accounting/cash-advance-form-receiver",
  // Notifications
  NOTIFICATIONS: "/accounting/notifications"
};
exports.URLS = URLS;
var EMOJIS = {
  "100": "💯",
  "1234": "🔢",
  "grinning": "😀",
  "grimacing": "😬",
  "grin": "😁",
  "joy": "😂",
  "rofl": "🤣",
  "partying": "🥳",
  "partypopper": "🎉",
  "smiley": "😃",
  "smile": "😄",
  "sweat_smile": "😅",
  "laughing": "😆",
  "innocent": "😇",
  "wink": "😉",
  "blush": "😊",
  "slightly_smiling_face": "🙂",
  "upside_down_face": "🙃",
  "relaxed": "☺️",
  "yum": "😋",
  "relieved": "😌",
  "heart_eyes": "😍",
  "kissing_heart": "😘",
  "kissing": "😗",
  "kissing_smiling_eyes": "😙",
  "kissing_closed_eyes": "😚",
  "stuck_out_tongue_winking_eye": "😜",
  "zany_face": "🤪",
  "raised_eyebrow": "🤨",
  "monocle_face": "🧐",
  "stuck_out_tongue_closed_eyes": "😝"
};
exports.EMOJIS = EMOJIS;
var INVOICE_LEVELS = {
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_4: 4
};
exports.INVOICE_LEVELS = INVOICE_LEVELS;
var DEFAULT_MEDIA_PAGE_SIZE = 25;
exports.DEFAULT_MEDIA_PAGE_SIZE = DEFAULT_MEDIA_PAGE_SIZE;
var LINK_WEIGHT = 500;
exports.LINK_WEIGHT = LINK_WEIGHT;
var WEBSITE_LOGO = "https://e4impactkenya.org/Demo/wp-content/uploads/2021/11/E4Impact-Kenya.jpg";
exports.WEBSITE_LOGO = WEBSITE_LOGO;
var INVOICE_IMAGE = "".concat(DEFAULT_APP_URL, "/logos/invoice-logo.png");
exports.INVOICE_IMAGE = INVOICE_IMAGE;