import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
var GeneralUtilitiesModule = /** @class */ (function () {
    function GeneralUtilitiesModule() {
    }
    GeneralUtilitiesModule.pad = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    GeneralUtilitiesModule = tslib_1.__decorate([
        NgModule({
            declarations: [],
            imports: [
                CommonModule
            ]
        })
    ], GeneralUtilitiesModule);
    return GeneralUtilitiesModule;
}());
export { GeneralUtilitiesModule };
//# sourceMappingURL=general-utilities.module.js.map