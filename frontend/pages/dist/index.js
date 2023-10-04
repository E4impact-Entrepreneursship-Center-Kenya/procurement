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
exports.getServerSideProps = exports.InvoiceCard = void 0;
var core_1 = require("@mantine/core");
var HeaderAndFooterWrapper_1 = require("../layouts/HeaderAndFooterWrapper");
var requireAuthMiddleware_1 = require("../middleware/requireAuthMiddleware");
var link_1 = require("next/link");
var config_1 = require("../config/config");
exports.InvoiceCard = function (_a) {
    var title = _a.title, href = _a.href, icon = _a.icon;
    return (React.createElement(link_1["default"], { href: href, style: { textDecoration: "none" } },
        React.createElement(core_1.Card, { radius: "md", sx: function (theme) { return ({
                background: config_1.getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[0],
                border: '2px solid transparent',
                ':hover': {
                    border: "2px solid " + theme.primaryColor
                }
            }); } },
            React.createElement(core_1.Image, { src: icon, mx: 'auto', width: 66, alt: title }),
            React.createElement(core_1.Title, { order: 3, weight: 400, align: "center", mt: 'md' }, title))));
};
var invoices = [
    {
        title: "Cash Advance",
        href: "/invoices/cash-advance",
        icon: 'https://img.icons8.com/carbon-copy/100/40C057/cash-register.png'
    },
    {
        title: "Expense Claim Form",
        href: "/invoices/expense-claim-form",
        icon: 'https://img.icons8.com/dotty/80/40C057/delete-receipt.png'
    },
    {
        title: "Purchase Requisition",
        href: "/invoices/purchase-requisition",
        icon: 'https://img.icons8.com/dotty/80/40C057/shopping-cart-with-money.png'
    },
    {
        title: "Request For Quotation",
        href: "/invoices/request-for-quotation",
        icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
    },
    // {
    //   title: "Payment Authorization",
    //   href: "/invoices/payment-authorization-form",
    //   icon: 'https://img.icons8.com/wired/64/40C057/card-in-use.png'
    // },
    {
        title: "Local Purchase Order",
        href: "/invoices/local-purchase-order",
        icon: 'https://img.icons8.com/dotty/80/40C057/purchase-order.png'
    },
    {
        title: "Over Expenditure Form",
        href: "/invoices/over-expenditure-form",
        icon: 'https://img.icons8.com/wired/64/40C057/estimate.png'
    },
    {
        title: "Under Expenditure Form",
        href: "/invoices/under-expenditure-form",
        icon: 'https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/40C057/external-accounting-accounting-smashingstocks-detailed-outline-smashing-stocks-3.png'
    },
    {
        title: "Surrender Form",
        href: "/invoices/surrender-form",
        icon: 'https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/40C057/external-accounting-accounting-smashingstocks-detailed-outline-smashing-stocks-3.png'
    },
];
function IndexPage(props) {
    return (React.createElement("div", null,
        React.createElement(core_1.Container, { py: 50, size: "lg" },
            React.createElement(core_1.Stack, { spacing: 40 },
                React.createElement(core_1.Title, { align: "center" }, "PROCUREMENT"),
                React.createElement(core_1.Grid, null, invoices.map(function (invoice, i) { return (React.createElement(core_1.Grid.Col, { key: "invoice_card_" + i, md: 4 },
                    React.createElement(exports.InvoiceCard, __assign({}, invoice)))); }))))));
}
exports.getServerSideProps = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        requireAuthMiddleware_1["default"](context.req, context.res, function () { });
        return [2 /*return*/, {
                props: {}
            }];
    });
}); };
IndexPage.PageLayout = HeaderAndFooterWrapper_1["default"];
exports["default"] = IndexPage;
