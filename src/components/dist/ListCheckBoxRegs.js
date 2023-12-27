"use strict";
exports.__esModule = true;
exports.ListCheckBoxRegions = void 0;
var react_1 = require("react");
var List_1 = require("@mui/material/List");
var ListItem_1 = require("@mui/material/ListItem");
var ListItemIcon_1 = require("@mui/material/ListItemIcon");
var ListItemSecondaryAction_1 = require("@mui/material/ListItemSecondaryAction");
var ListItemText_1 = require("@mui/material/ListItemText");
var Checkbox_1 = require("@mui/material/Checkbox");
var IconButton_1 = require("@mui/material/IconButton");
require("./ListCheckBox.css");
var hooks_1 = require("../app/hooks");
var regionReducer_1 = require("../app/regionReducer");
function ListCheckBoxRegions() {
    var selectedRegion = hooks_1.useAppSelector(function (state) { return state.selectedRegion.items; });
    var filterDistricts = hooks_1.useAppSelector(function (state) { return state.loadDistricts; });
    var dispatch = hooks_1.useAppDispatch();
    var handleToggleRegions = react_1.useCallback(function (text) {
        if (!(selectedRegion === text)) {
            dispatch(regionReducer_1.addRegion(text));
        }
        else {
            dispatch(regionReducer_1.removeRegion());
        }
    }, [dispatch, selectedRegion]);
    return (React.createElement(List_1["default"], { className: 'list-checkbox' }, filterDistricts.regions.map(function (value, index) {
        var labelId = "checkbox-list-label-" + index;
        return (React.createElement(ListItem_1["default"], { className: "checkbox-list-sidebar", key: index, role: undefined, dense: true, onClick: function () { return handleToggleRegions(value); } },
            React.createElement(ListItemIcon_1["default"], null,
                React.createElement(Checkbox_1["default"], { edge: "start", checked: selectedRegion === value, tabIndex: -1, disableRipple: true, inputProps: { 'aria-labelledby': labelId } })),
            React.createElement(ListItemText_1["default"], { id: labelId, primary: value }),
            React.createElement(ListItemSecondaryAction_1["default"], null,
                React.createElement(IconButton_1["default"], { edge: "end", "aria-label": "comments" }))));
    })));
}
exports.ListCheckBoxRegions = ListCheckBoxRegions;
