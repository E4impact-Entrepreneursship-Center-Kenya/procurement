"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var react_1 = require("react");
var HeaderAndFooterWrapper_1 = require("../../layouts/HeaderAndFooterWrapper");
var core_1 = require("@mantine/core");
var publicStyles_1 = require("../../styles/publicStyles");
var CallToActionButton_1 = require("../../components/cta/CallToActionButton");
var icons_1 = require("@tabler/icons");
var link_1 = require("next/link");
var cookies_next_1 = require("cookies-next");
var appProvider_1 = require("../../providers/appProvider");
var router_1 = require("next/router");
var notifications_1 = require("@mantine/notifications");
var config_1 = require("../../config/config");
var constants_1 = require("../../config/constants");
var functions_1 = require("../../config/functions");
var form_1 = require("@mantine/form");
var SEOHeader_1 = require("../../components/seo/SEOHeader");
var CustomPasswordInput_1 = require("../../components/auth/CustomPasswordInput");
var SignUp = function (props) {
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var login_status = appProvider_1.useAppContext().login_status;
    var classes = publicStyles_1["default"]().classes;
    var router = router_1.useRouter();
    var theme = core_1.useMantineTheme();
    var emailRegex = /[A-Za-z0-9._%+-]+@e4impact\.org/gi;
    var form = form_1.useForm({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            profile: {
                // profile_photo: '',
                phone_no: ''
            },
            password: '',
            password2: ''
        },
        validate: {
            username: function (value) { return value === '' ? 'Username is required' : null; },
            first_name: function (value) { return value === '' ? 'First name is required' : null; },
            last_name: function (value) { return value === '' ? 'Last name is required' : null; },
            email: function (value) {
                if (value === '') {
                    return "Email is required";
                }
                else if (!emailRegex.test(value)) {
                    return "Only E4Impact emails are required!";
                }
                return null;
            },
            password: function (value) {
                if (value === '') {
                    return 'Password is required';
                }
                if (value.length < 8) {
                    return 'Password must be at least 8 characters long';
                }
                if (value !== form.values.password2) {
                    return 'Passwords do not match';
                }
                return null;
            },
            password2: function (value) { return value === '' ? 'Password confirmation is required' : null; }
        }
    });
    var handleSignup = function () {
        var requestOptions = {
            url: "" + constants_1.URLS.REGISTER,
            method: 'POST',
            extra_headers: {},
            data: form.values,
            params: {},
            useNext: true
        };
        setLoading(true);
        config_1.makeRequestOne(requestOptions).then(function (res) {
            notifications_1.showNotification({
                title: "Congratulations " + constants_1.EMOJIS['partypopper'] + " " + constants_1.EMOJIS['partypopper'],
                message: "Account created successfully. Please login to continue",
                color: 'green',
                icon: react_1["default"].createElement(icons_1.IconAlertCircle, { stroke: 1.5 })
            });
            router.push('/auth/login');
        })["catch"](function (error) {
            var _a;
            var errors = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
            functions_1.displayErrors(form, errors);
            notifications_1.showNotification({
                title: 'Error',
                message: error === null || error === void 0 ? void 0 : error.message,
                color: 'red',
                icon: react_1["default"].createElement(icons_1.IconAlertTriangle, { stroke: 1.5 })
            });
        })["finally"](function () {
            setLoading(false);
        });
    };
    var seoDetails = {
        url: '/auth/signup',
        title: 'Sign Up',
        description: 'Create a new account',
        keywords: '',
        image: '',
        twitter_card: ''
    };
    react_1["default"].useEffect(function () {
        if (login_status) {
            router.push('/');
        }
    }, [login_status]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(SEOHeader_1["default"], __assign({}, seoDetails)),
        react_1["default"].createElement(core_1.Box, null,
            react_1["default"].createElement(core_1.Container, { size: "xs", py: 50 },
                react_1["default"].createElement(core_1.Card, { radius: "lg", p: 50, style: {
                        background: config_1.getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[0],
                        position: "relative"
                    } },
                    react_1["default"].createElement(core_1.LoadingOverlay, { visible: loading }),
                    react_1["default"].createElement(core_1.Stack, null,
                        react_1["default"].createElement(core_1.Center, null,
                            react_1["default"].createElement(core_1.Image, { src: constants_1.WEBSITE_LOGO, radius: "md", className: classes.image, width: 200 })),
                        react_1["default"].createElement(core_1.Title, { className: classes.title2, align: 'center' }, "Sign Up"),
                        react_1["default"].createElement(core_1.Text, { align: 'center' }, "Create a new free account."),
                        react_1["default"].createElement("form", { onSubmit: form.onSubmit(function (values) { return handleSignup(); }) },
                            react_1["default"].createElement(core_1.Grid, null,
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(core_1.TextInput, __assign({ label: "First Name", placeholder: 'Enter your first name', radius: "md", icon: react_1["default"].createElement(icons_1.IconUser, { stroke: 1.5 }), autoFocus: true }, form.getInputProps('first_name')))),
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(core_1.TextInput, __assign({ label: "Last Name", placeholder: 'Enter your last name', radius: "md", icon: react_1["default"].createElement(icons_1.IconUser, { stroke: 1.5 }) }, form.getInputProps('last_name')))),
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(core_1.TextInput, __assign({ label: "Email", placeholder: 'Enter your email', radius: "md", icon: react_1["default"].createElement(icons_1.IconMail, { stroke: 1.5 }) }, form.getInputProps('email')))),
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(core_1.TextInput, __assign({ label: "Username", placeholder: 'Enter your username', radius: "md", icon: react_1["default"].createElement(icons_1.IconUser, { stroke: 1.5 }) }, form.getInputProps('username')))),
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(core_1.TextInput, __assign({ label: "Phone Number", placeholder: 'Enter your phone number', radius: "md", icon: react_1["default"].createElement(icons_1.IconPhone, { stroke: 1.5 }) }, form.getInputProps('profile.phone_no')))),
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(CustomPasswordInput_1["default"], { form: form, fieldName: 'password', label: 'Password' })),
                                react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                                    react_1["default"].createElement(CustomPasswordInput_1["default"], { form: form, fieldName: 'password2', label: 'Repeat Password' })),
                                react_1["default"].createElement(core_1.Grid.Col, null,
                                    react_1["default"].createElement(core_1.Stack, { align: 'center', spacing: 16 },
                                        react_1["default"].createElement(CallToActionButton_1.CallToActionButtonAction, { label: 'Create Account', type: 'submit', icon: react_1["default"].createElement(icons_1.IconUserPlus, { stroke: 1.5, color: 'white' }) }),
                                        react_1["default"].createElement(core_1.Group, { spacing: 4, p: 0 },
                                            react_1["default"].createElement(core_1.Text, { size: "sm" }, "Already have an account?"),
                                            react_1["default"].createElement(core_1.Anchor, { component: link_1["default"], href: "/auth/login", size: "sm" }, "Login"))))))))))));
};
SignUp.PageLayout = HeaderAndFooterWrapper_1["default"];
function getServerSideProps(context) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            status = cookies_next_1.getCookie(appProvider_1.LOCAL_STORAGE_KEYS.login_status, context);
            return [2 /*return*/, {
                    props: {
                        loginStatus: status ? status : null
                    }
                }];
        });
    });
}
exports.getServerSideProps = getServerSideProps;
exports["default"] = SignUp;
