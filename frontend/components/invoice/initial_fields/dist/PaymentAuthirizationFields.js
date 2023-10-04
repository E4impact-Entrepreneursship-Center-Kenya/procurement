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
exports.__esModule = true;
var core_1 = require("@mantine/core");
var react_1 = require("react");
var PaymentAuthirizationFields = function (_a) {
    var form = _a.form, projects = _a.projects, budgetLines = _a.budgetLines, resetBudgetLines = _a.resetBudgetLines;
    var change = function () {
        form.setFieldValue('budget_line', '');
        // resetBudgetLines()
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(core_1.Grid, null,
            react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                react_1["default"].createElement(core_1.TextInput, __assign({}, form.getInputProps('name'), { label: "Name", placeholder: 'Name' }))),
            react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                react_1["default"].createElement(core_1.TextInput, __assign({}, form.getInputProps('cash_advance_received'), { label: "Cash Advance Received", placeholder: 'Cash Advance Received' }))),
            react_1["default"].createElement(core_1.Grid.Col, { span: 12 },
                react_1["default"].createElement(core_1.Textarea, __assign({}, form.getInputProps('purpose'), { label: "Purpose", placeholder: 'Give some more information' }))),
            react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                react_1["default"].createElement(core_1.Select, __assign({}, form.getInputProps('project'), { onBlur: change, label: "Project", placeholder: 'Project', data: projects === null || projects === void 0 ? void 0 : projects.map(function (project) { var _a; return ({ label: project.name, value: (_a = project === null || project === void 0 ? void 0 : project.id) === null || _a === void 0 ? void 0 : _a.toString() }); }) }))),
            react_1["default"].createElement(core_1.Grid.Col, { md: 6 },
                react_1["default"].createElement(core_1.Select, __assign({}, form.getInputProps('budget_line'), { searchable: true, label: "Budget Line", placeholder: 'Budget Line', data: budgetLines === null || budgetLines === void 0 ? void 0 : budgetLines.map(function (bl) { var _a; return ({ label: bl.code, value: (_a = bl === null || bl === void 0 ? void 0 : bl.id) === null || _a === void 0 ? void 0 : _a.toString() }); }) }))))));
};
exports["default"] = PaymentAuthirizationFields;
