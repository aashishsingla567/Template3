var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var ignoreInput = /** @class */ (function () {
    function ignoreInput() {
    }
    ignoreInput.debounce = function (cb, delay) {
        if (delay === void 0) { delay = 100; }
        clearTimeout(__classPrivateFieldGet(this, _a, "f", _ignoreInput_timeout));
        __classPrivateFieldSet(this, _a, setTimeout(function () {
            cb();
        }, delay), "f", _ignoreInput_timeout);
    };
    ignoreInput.throttle = function (cb, delay) {
        var _this = this;
        if (delay === void 0) { delay = 100; }
        (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (__classPrivateFieldGet(_this, _a, "f", _ignoreInput_wait) == true) {
                __classPrivateFieldSet(_this, _a, args, "f", _ignoreInput_lastIn);
                return;
            }
            cb.apply(void 0, args);
            __classPrivateFieldSet(_this, _a, true, "f", _ignoreInput_wait);
            setTimeout(function () {
                if (__classPrivateFieldGet(_this, _a, "f", _ignoreInput_lastIn) != null)
                    cb.apply(void 0, __classPrivateFieldGet(_this, _a, "f", _ignoreInput_lastIn));
                __classPrivateFieldSet(_this, _a, null, "f", _ignoreInput_lastIn);
                __classPrivateFieldSet(_this, _a, false, "f", _ignoreInput_wait);
            }, delay);
        })();
    };
    var _a, _ignoreInput_timeout, _ignoreInput_wait, _ignoreInput_lastIn;
    _a = ignoreInput;
    _ignoreInput_timeout = { value: void 0 };
    _ignoreInput_wait = { value: false };
    _ignoreInput_lastIn = { value: void 0 };
    return ignoreInput;
}());
;
var throttle = function (cb, delay) {
    if (delay === void 0) { delay = 100; }
    ignoreInput.throttle(cb, delay);
};
var debounce = function (cb, delay) {
    if (delay === void 0) { delay = 100; }
    ignoreInput.debounce(cb, delay);
};
var header = document.getElementsByClassName("header")[0];
var title = document.getElementById("title");
var social = document.getElementsByClassName("social")[0];
var social_display = social.style.display;
function if_change_dummy() {
    var last = false;
    function if_change(task, condition) {
        if (last === condition())
            return;
        task(condition());
        console.log({ last: last, cond: condition() });
        last = condition();
    }
    ;
    return if_change;
}
var if_change = if_change_dummy();
// const header_height = (() => {return})();
var header_height = 10;
console.log({ header_height: header_height });
(function headerAnimation() {
    var logo = document.getElementsByClassName("CLA_LOGO")[0];
    var big_logo = logo.src;
    var small_logo = "images/CLA_logo-removebg_SMALL.png";
    function CLA_big() {
        logo.src = big_logo;
    }
    function CLA_small() {
        logo.src = small_logo;
    }
    var condition = function () { return window.scrollY > header_height; };
    var task = function (cond) {
        if (cond) {
            CLA_small();
            social.style.display = "none";
        }
        else {
            CLA_big();
            social.style.display = social_display;
        }
        title.classList.toggle("small-logo", cond); // change size and play animation
        header.classList.toggle("small-font", cond); // change font size of all element in header
    };
    window.onscroll = function () {
        if_change(task, condition);
    };
})();
function activateOther(id, inputID) {
    if (inputID === void 0) { inputID = (id + "_other"); }
    console.log({ id: id, inputID: inputID });
    var selector = document.getElementById(id);
    var other = document.getElementById(inputID);
    selector.addEventListener("change", function () {
        console.log(id + "change");
        if (selector.value == "other")
            other.style.display = "block";
        else if (other.style.display != 'none')
            other.style.display = "none";
    });
}
var emailCheck = function (input) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        return (true);
    }
    return (false);
};
var phoneCheck = function (input) {
    if (input.length != 10)
        return false;
    if (input[0] == '0')
        return false;
    function isNumeric(str) {
        if (typeof str != "string")
            return false; // we only process strings!  
        return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
    }
    return isNumeric(input);
};
var tick_class = "fa-solid fa-circle-check";
var cross_class = "fa-solid fa-circle-xmark";
var emailMessage = function (displayID, isRight) {
    var display = document.getElementById(displayID);
    if (isRight) {
        display.innerHTML = "<span style = \"color: green\" ><i class = \"".concat(tick_class, "\"></i> </span>");
    }
    else {
        display.innerHTML =
            "<span style = \"\n            color: red;\n            font-family: 'Courier New', Courier, monospace;\" > \n            <i class = \"".concat(cross_class, "\"></i> \n            Please enter a valid E-mail address \n        </span>");
    }
};
var phoneMessage = function (displayID, isRight) {
    var display = document.getElementById(displayID);
    if (isRight) {
        display.innerHTML = "<span style = \"color: green\" ><i class = \"".concat(tick_class, "\"></i> </span>");
    }
    else {
        display.innerHTML =
            "<span style = \"color: red; \n    font-family: 'Courier New', Courier, monospace;\" >  \n            <i class = \"".concat(cross_class, "\"></i>\n            Please enter a valid Phone no. <br>\n            A valid Phone no. is: <br>\n            1. 10 digits long. <br>\n            2. Starts with a non-zero no.</span>");
    }
};
function validator(inputID, check, message, displayID) {
    var display = document.getElementById(displayID);
    var input = document.getElementById(inputID);
    input.addEventListener("input", function () {
        debounce(function () {
            message(displayID, check(input.value));
        }, 150);
    });
}
