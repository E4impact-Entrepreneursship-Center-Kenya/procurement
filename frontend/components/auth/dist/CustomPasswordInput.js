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
var react_1 = require("react");
var icons_react_1 = require("@tabler/icons-react");
var core_1 = require("@mantine/core");
function PasswordRequirement(_a) {
    var meets = _a.meets, label = _a.label;
    return (React.createElement(core_1.Text, { color: meets ? 'teal' : 'red', sx: { display: 'flex', alignItems: 'center' }, mt: 7, size: "sm" },
        meets ? React.createElement(icons_react_1.IconCheck, { size: "0.9rem" }) : React.createElement(icons_react_1.IconX, { size: "0.9rem" }),
        " ",
        React.createElement(core_1.Box, { ml: 10 }, label)));
}
var requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];
function getStrength(password) {
    var multiplier = password.length > 5 ? 0 : 1;
    requirements.forEach(function (requirement) {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
function CustomPasswordInput(props) {
    var form = props.form, fieldName = props.fieldName, label = props.label;
    var _a = react_1.useState(false), popoverOpened = _a[0], setPopoverOpened = _a[1];
    //   const [value, setValue] = useState('');
    var value = form.values[fieldName];
    var checks = requirements.map(function (requirement, index) { return (React.createElement(PasswordRequirement, { key: index, label: requirement.label, meets: requirement.re.test(value) })); });
    var strength = getStrength(value);
    var color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    return (React.createElement(core_1.Box, { maw: 340, mx: "auto" },
        React.createElement(core_1.Popover, { opened: popoverOpened, position: "bottom", width: "target", transitionProps: { transition: 'pop' } },
            React.createElement(core_1.Popover.Target, null,
                React.createElement("div", { onFocusCapture: function () { return setPopoverOpened(true); }, onBlurCapture: function () { return setPopoverOpened(false); } },
                    React.createElement(core_1.PasswordInput, __assign({ withAsterisk: true, label: label, placeholder: "Enter Password", value: value }, form.getInputProps(fieldName))))),
            React.createElement(core_1.Popover.Dropdown, null,
                React.createElement(core_1.Progress, { color: color, value: strength, size: 5, mb: "xs" }),
                React.createElement(PasswordRequirement, { label: "Includes at least 6 characters", meets: value.length > 5 }),
                checks))));
}
exports["default"] = CustomPasswordInput;
