
export const DEFAULT_API_ROOT = 'http://localhost:8000'
export const DEFAULT_APP_URL = "http://localhost:3000"

// export const DEFAULT_API_ROOT = 'https://api.procurement.e4impactkenya.org'
// export const DEFAULT_APP_URL = "https://procurement.e4impactkenya.org"

export const APP_NAME = "E4IMPACT"
export const SEPARATOR = "|"

export const THEME_COOKIE_NAME = 'e4i-template-theme'
export const APP_KEY = 'E4IMPACT'

// App Colors
// export const BLUE_DARK_COLOR = 'rgb(36, 42, 73)'
// export const BLUE_BG_COLOR = "#d3d6e9"

export const BLUE_DARK_COLOR = '#131419'
export const BLUE_BG_COLOR = "#fff"

export const PRIMARY_SHADE = [
    "#23A455", // 1 -> Light
    "#23A455", // 0 -> Lighter
    "#23A455", // 2 -> Main Primary Color
    "#23A455", // 3 -> Deep
    "#23A455", // 4 -> Deeper
    "#23A455", // 5 -> Light rgba 20
]


export const containerSize = "lg"

export const URLS = {
    // AUTH
    REGISTER: `/account`,
    LOGIN: `/auth/login`,
    LOGOUT: `/auth/logout`,
    REQUEST_PASSWORD_RESET: `/auth/password-reset`,
    PASSWORD_RESET_CONFIRM: `/auth/password-reset/confirm`,
    PASSWORD_RESET_VALIDATE_TOKEN: `/auth/password-reset/validate-token`,
    CHECK_LOGIN_STATUS: '/auth/check-login-status',

    // USERS
    USERS: `/account`,

    // Accounting
    PROJECTS: `/accounting/projects`,
    PROJECT_MANAGERS: `/accounting/project-managers`,
    BUDGET_LINES: `/accounting/budget-lines`,
    FORM_USERS: `/accounting/form-users`,
    AMOUNT_RECEIVED: `/accounting/amount-received`,
    CASH_ADVANCE_FORMS: `/accounting/cash-advance-forms`,

    // Notifications
    NOTIFICATIONS: `/accounting/notifications`

}

export const EMOJIS = {
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
    "stuck_out_tongue_closed_eyes": "😝",
}

export const INVOICE_LEVELS = {
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
}

export const DEFAULT_MEDIA_PAGE_SIZE = 25

export const LINK_WEIGHT = 500

export const WEBSITE_LOGO = "https://e4impactkenya.org/wp-content/uploads/2021/11/E4Impact-Kenya.jpg"
export const FOUNDATION_LOGO = "https://e4impact.org/wp-content/uploads/2022/05/logo-header-retina-2022.png"
export const INVOICE_IMAGE = `${DEFAULT_APP_URL}/logos/invoice-logo.png`

export const COUNTRIES = [
    {
        country: 'Kenya',
        code: 'ke'
    },
    {
        country: 'Italy',
        code: 'it'
    },
]

export const CURRENCIES = ['usd', 'kes', 'euro']

export const LOCAL_STORAGE_KEYS = {
    user: `${APP_KEY}_user`,
    user_id: `${APP_KEY}_user_id`,
    token: `${APP_KEY}_token`,
    login_status: `${APP_KEY}_login_status`,
}