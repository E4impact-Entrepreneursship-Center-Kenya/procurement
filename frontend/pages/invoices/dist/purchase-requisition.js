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
var config_1 = require("../../config/config");
var constants_1 = require("../../config/constants");
var redirectIfNoAuth_1 = require("../../middleware/redirectIfNoAuth");
var requireAuthMiddleware_1 = require("../../middleware/requireAuthMiddleware");
var core_1 = require("@mantine/core");
var Approvals_1 = require("../../components/invoice/Approvals");
var ApprovalsSection_1 = require("../../components/invoice/ApprovalsSection");
var InvoiceFooter_1 = require("../../components/invoice/InvoiceFooter");
var InvoiceHeader_1 = require("../../components/invoice/InvoiceHeader");
var head_1 = require("next/head");
var form_1 = require("@mantine/form");
var icons_1 = require("@tabler/icons");
var mantine_datatable_1 = require("mantine-datatable");
var PurchaseRequisitionFields_1 = require("../../components/invoice/initial_fields/PurchaseRequisitionFields");
var SINGLE_ITEM = {
    no: '',
    description: '',
    qty: '',
    unit_price: '',
    amount: ''
};
var PurchaseRequisitionDatatable = function (_a) {
    var form = _a.form;
    function addItem() {
        form.insertListItem('items', SINGLE_ITEM);
    }
    function removeItem(index) {
        form.removeListItem('items', index);
    }
    var getTotal = function (units, rate, index) {
        if (units && units !== "" && rate && rate !== "") {
            var amt = parseFloat(units) * parseFloat(rate);
            form.setFieldValue("items." + index + ".amount", amt);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(mantine_datatable_1.DataTable, { horizontalSpacing: "xs", verticalSpacing: "md", minHeight: 120, records: form.values.items, columns: [
                {
                    accessor: 'no',
                    title: "No.",
                    width: "60px",
                    noWrap: true,
                    render: function (entry, i) {
                        return react_1["default"].createElement(core_1.NumberInput, __assign({ hideControls: true }, form.getInputProps("items." + i + ".no"), { placeholder: 'No.' }));
                    }
                },
                {
                    title: 'Item/Service Description/Specification',
                    accessor: 'description',
                    width: "250px",
                    render: function (entry, i) {
                        return react_1["default"].createElement(core_1.TextInput, __assign({}, form.getInputProps("items." + i + ".description"), { placeholder: "Give a description of this item" }));
                    }
                },
                {
                    title: 'Quantity',
                    accessor: 'qty',
                    width: "80px",
                    render: function (entry, i) {
                        return react_1["default"].createElement(core_1.NumberInput, __assign({ hideControls: true }, form.getInputProps("items." + i + ".qty"), { placeholder: '20', onBlur: function (el) { return getTotal(form.values.items[i].qty, form.values.items[i].unit_price, i); } }));
                    }
                },
                {
                    title: 'Unit Price',
                    accessor: 'unit_price',
                    width: "60px",
                    ellipsis: false,
                    // noWrap: false,
                    render: function (entry, i) {
                        return react_1["default"].createElement(core_1.NumberInput, __assign({ hideControls: true }, form.getInputProps("items." + i + ".unit_price"), { placeholder: '20', onBlur: function (el) { return getTotal(form.values.items[i].qty, form.values.items[i].unit_price, i); } }));
                    }
                },
                {
                    title: 'Estimated Budget Amount (KSH)',
                    accessor: 'amount',
                    width: "100px",
                    render: function (entry, i) {
                        return react_1["default"].createElement(core_1.NumberInput, __assign({ disabled: true, icon: 'KSH', thousandsSeparator: ',', hideControls: true }, form.getInputProps("items." + i + ".amount"), { parser: function (value) { return value.replace(/\$\s?|(,*)/g, ''); } }));
                    }
                },
                {
                    accessor: "actions",
                    title: "",
                    width: "40px",
                    render: function (item, i) { return (react_1["default"].createElement(core_1.Group, { position: 'center' },
                        react_1["default"].createElement(core_1.ActionIcon, { color: 'red', variant: 'light', onClick: function (e) { return removeItem(i); } },
                            react_1["default"].createElement(icons_1.IconTrash, null)))); }
                }
            ] }),
        react_1["default"].createElement(core_1.Group, { position: "right", mt: "md" },
            react_1["default"].createElement(core_1.Button, { radius: "md", leftIcon: react_1["default"].createElement(icons_1.IconPlus, null), onClick: addItem }, "Add Item"))));
};
var PurchaseRequisitionForm = function (_a) {
    var _b, _c, _d;
    var projects = _a.projects, checkers = _a.checkers, user = _a.user;
    var form = form_1.useForm({
        initialValues: {
            country: "",
            currency: "",
            invoice_number: "",
            requisition_date: "",
            date_required: "",
            project: "",
            deliver_to: "",
            items: Array(1).fill(SINGLE_ITEM),
            budget_availability: ''
        }
    });
    function getAmountTotal(items) {
        var _a, _b;
        if (items) {
            return items === null || items === void 0 ? void 0 : items.reduce(function (old, item, i) { return ((item === null || item === void 0 ? void 0 : item.amount) !== "" || (item === null || item === void 0 ? void 0 : item.amount) !== null) ? old + (item === null || item === void 0 ? void 0 : item.amount) : old; }, 0);
        }
        return (_b = (_a = form.values) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.reduce(function (old, item, i) { return ((item === null || item === void 0 ? void 0 : item.amount) !== "" || (item === null || item === void 0 ? void 0 : item.amount) !== null) ? old + (item === null || item === void 0 ? void 0 : item.amount) : old; }, 0);
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(head_1["default"], null,
            react_1["default"].createElement("title", null, constants_1.APP_NAME + " " + constants_1.SEPARATOR + " Purchase Requisition Form")),
        react_1["default"].createElement(core_1.Container, { size: "lg", mt: 20, my: "lg" },
            react_1["default"].createElement(core_1.Paper, { py: 30, px: 30, radius: "md", sx: function (theme) { return ({
                    background: config_1.getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0]
                }); } },
                react_1["default"].createElement("form", null,
                    react_1["default"].createElement(core_1.Stack, { spacing: 20 },
                        ((_b = form.values.country) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'kenya' ?
                            react_1["default"].createElement(core_1.Image, { mx: "auto", src: constants_1.WEBSITE_LOGO, width: 250, alt: 'E4I Invoice' })
                            :
                                react_1["default"].createElement(core_1.Image, { mx: "auto", src: constants_1.FOUNDATION_LOGO, width: 250, alt: 'E4I Invoice' }),
                        react_1["default"].createElement(InvoiceHeader_1["default"], { title: "PURCHASE REQUISITION FORM  (" + ((_d = (_c = form.values) === null || _c === void 0 ? void 0 : _c.currency) === null || _d === void 0 ? void 0 : _d.toUpperCase()) + ")", form: form }),
                        react_1["default"].createElement(PurchaseRequisitionFields_1["default"], { form: form, projects: projects }),
                        react_1["default"].createElement(PurchaseRequisitionDatatable, { form: form }),
                        react_1["default"].createElement(core_1.Group, { position: "right" },
                            react_1["default"].createElement(core_1.Title, { order: 3, weight: 600 }, "Total"),
                            react_1["default"].createElement(core_1.Title, { order: 3, weight: 600 }, "KSH " + config_1.formatCurrency(getAmountTotal()))),
                        react_1["default"].createElement(ApprovalsSection_1["default"], null,
                            react_1["default"].createElement(Approvals_1["default"], { person: 'Requested By', form: form, field_prefix: 'requested_by', field_name: 'user', active: true, level: constants_1.INVOICE_LEVELS.LEVEL_1 }),
                            react_1["default"].createElement(Approvals_1["default"], { person: 'Approved By', form: form, field_prefix: 'approved_by', field_name: 'user', active: false, level: constants_1.INVOICE_LEVELS.LEVEL_1 })),
                        react_1["default"].createElement(core_1.Box, null,
                            react_1["default"].createElement(core_1.Title, { order: 3, mb: "md" }, "For IT use only"),
                            react_1["default"].createElement(Approvals_1["default"], { person: 'Verified By', form: form, field_prefix: 'verified_by', field_name: 'user', active: false, level: constants_1.INVOICE_LEVELS.LEVEL_1 })),
                        react_1["default"].createElement(core_1.Box, null,
                            react_1["default"].createElement(core_1.Title, { order: 3 }, "For Finance use only"),
                            react_1["default"].createElement(core_1.Radio.Group, __assign({ label: "Budget Availability", withAsterisk: true }, form.getInputProps('budget_availability')),
                                react_1["default"].createElement(core_1.Group, { mt: "xs" },
                                    react_1["default"].createElement(core_1.Radio, { value: "no", label: "No" }),
                                    react_1["default"].createElement(core_1.Radio, { value: "yes", label: "Yes" })))),
                        react_1["default"].createElement(core_1.Box, null,
                            react_1["default"].createElement(Approvals_1["default"], { person: 'Confirmed By', form: form, field_prefix: 'confirmed_by', field_name: 'user', active: false, level: constants_1.INVOICE_LEVELS.LEVEL_1 })),
                        react_1["default"].createElement(InvoiceFooter_1["default"], null)))))));
};
exports.getServerSideProps = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var cookies, userDetails_, user, token, projectsQuery, checkersQuery;
    return __generator(this, function (_a) {
        requireAuthMiddleware_1["default"](context.req, context.res, function () { });
        cookies = context.req.cookies;
        userDetails_ = cookies[constants_1.LOCAL_STORAGE_KEYS.user];
        user = JSON.parse(userDetails_ !== null && userDetails_ !== void 0 ? userDetails_ : "null");
        token = cookies[constants_1.LOCAL_STORAGE_KEYS.token];
        projectsQuery = config_1.makeRequestOne({
            url: constants_1.URLS.PROJECTS,
            method: "GET",
            params: {
                limit: 100,
                fields: 'id,created_by,full_name,name,code,created_on'
            },
            extra_headers: {
                authorization: "Bearer " + token
            },
            useNext: true
        });
        checkersQuery = config_1.makeRequestOne({
            url: constants_1.URLS.USERS,
            method: "GET",
            params: {
                limit: 100,
                fields: 'id,full_name',
                profile__checker: true
            },
            extra_headers: {
                authorization: "Bearer " + token
            },
            useNext: true
        });
        return [2 /*return*/, Promise.allSettled([projectsQuery, checkersQuery]).then(function (res) {
                var _a, _b, _c, _d;
                var projects = res[0];
                var checkers = res[1];
                if ((projects === null || projects === void 0 ? void 0 : projects.status) === 'rejected') {
                    redirectIfNoAuth_1["default"](context.req, context.res);
                }
                return {
                    props: {
                        projects: (_b = (_a = projects === null || projects === void 0 ? void 0 : projects.value) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.results,
                        checkers: (_d = (_c = checkers === null || checkers === void 0 ? void 0 : checkers.value) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.results,
                        user: user ? user.full_name : null
                    }
                };
            })];
    });
}); };
PurchaseRequisitionForm.PageLayout = HeaderAndFooterWrapper_1["default"];
exports["default"] = PurchaseRequisitionForm;
