class ignoreInput {
    static #timeout;
    static debounce (cb, delay = 100) {
        clearTimeout(this.#timeout);
        this.#timeout = setTimeout(() => {
            cb();
        }
        , delay);
    }

    static #wait = false;
    static #lastIn;
    static throttle (cb, delay = 100) {
        ((...args) => {
        if (this.#wait == true) {
            this.#lastIn = args;
            return;
        }
        cb(...args);
        this.#wait = true;
        setTimeout(() => {
            if (this.#lastIn != null)
                cb(...this.#lastIn);
            this.#lastIn = null;
            this.#wait = false;
        }, delay);
        })();
    }    
};

const throttle = (cb, delay = 100) => {ignoreInput.throttle(cb, delay)};
const debounce = (cb, delay = 100) => {ignoreInput.debounce(cb, delay)};
const header = document.getElementsByClassName("header")[0] as HTMLElement;
const title = document.getElementById ("title") as HTMLElement;
const social = document.getElementsByClassName("social")[0] as HTMLElement;
const social_display = social.style.display;

function if_change_dummy () {
    var last : boolean = false;
    function if_change (task : Function, condition : () => boolean) : void {
        if (last === condition()) return;
        task(condition());
        console.log ({last, cond: condition()});
        last = condition();
    };
    return if_change;
}

const if_change = if_change_dummy();
// const header_height = (() => {return})();
const header_height = 10;
console.log ({header_height});
(function headerAnimation () {
    const logo = document.getElementsByClassName("CLA_LOGO")[0] as HTMLImageElement;
    const big_logo = logo.src;
    const small_logo = "images/CLA_logo-removebg_SMALL.png";
    function CLA_big () {
        logo.src = big_logo;
    }

    function CLA_small () {
        logo.src = small_logo;
    }
    
    const condition = () => {return window.scrollY > header_height};
    const task = (cond) => {
        if (cond) {
            CLA_small();
            social.style.display = "none";
        }
        else {
            CLA_big();
            social.style.display = social_display;
        }
        title.classList.toggle ("small-logo", cond); // change size and play animation
        header.classList.toggle ("small-font", cond); // change font size of all element in header
    };

    window.onscroll = () => {
        if_change (
            task, condition
        );
    }
})();

function activateOther(id: string, inputID = (id + "_other")) {
    console.log({ id, inputID });
    const selector = document.getElementById(id) as HTMLSelectElement;
    const other = document.getElementById(inputID);
    selector.addEventListener("change", () => {
        console.log(id + "change");
        if (selector.value == "other")
            other.style.display = "block";
        else if (other.style.display != 'none') other.style.display = "none";
    });
}

const emailCheck = (input: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        return (true)
    }
    return (false)
}


const phoneCheck = (input: any) => {
    if (input.length != 10) return false;
    if (input[0] == '0')
        return false;
    function isNumeric(str: string | number) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(Number (str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
    return isNumeric(input);
}

const tick_class = "fa-solid fa-circle-check";
const cross_class = "fa-solid fa-circle-xmark";
const emailMessage = (displayID: string, isRight: any): void => {
    const display = document.getElementById(displayID);
    if (isRight) {
        display.innerHTML = `<span style = "color: green" ><i class = "${tick_class}"></i> </span>`;
    } else {
        display.innerHTML = 
        `<span style = "
            color: red;
            font-family: 'Courier New', Courier, monospace;" > 
            <i class = "${cross_class}"></i> 
            Please enter a valid E-mail address 
        </span>`;
    }
};

const phoneMessage = (displayID: string, isRight: any): void => {
    const display = document.getElementById(displayID);
    if (isRight) {
        display.innerHTML = `<span style = "color: green" ><i class = "${tick_class}"></i> </span>`;
    } else {
        display.innerHTML = 
    `<span style = "color: red; 
    font-family: 'Courier New', Courier, monospace;" >  
            <i class = "${cross_class}"></i>
            Please enter a valid Phone no. <br>
            A valid Phone no. is: <br>
            1. 10 digits long. <br>
            2. Starts with a non-zero no.</span>`;
    }
};


function validator (inputID : string, check, message : (id : string, right : boolean) => void, displayID : string)
{ 
    const display = document.getElementById(displayID) as HTMLElement;
    
    const input = document.getElementById(inputID) as HTMLInputElement;
    input.addEventListener("input", () => {
        debounce(() => {
            message(displayID, check(input.value));
        }, 150);
    });
}

