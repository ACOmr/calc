class ThemeToggle {
    constructor() {
        this.position = 0;
        this.step = 22;
        this.ball = document.getElementById("toggleBall");
        this.body = document.body;
        this.selectors = {
            calcWrapper: '.calc-wrapper',
            toggleContainer: '.toggle-container',
            title: '.wrapper-headr_h4',
            p: '.button-flex_p',
            span1: '.numbers-w',
            span2: '.numbers-t',
            span3: '.numbers-s',
            input: '.wrapper-input__th',
            calc: '.calculator',
            clear: '.c',
            remove: '.r',
            equal: '.equal'
        };

        this.elems = {};
        for (let key in this.selectors) {
            this.elems[key] = document.querySelector(this.selectors[key]);
        }

        this.themes = [
            {
                bg: "#3A4663", ball: "#D03F2F", toggle: "#242D44", text: "#fff",
                inputBg: "#181F33", calcBg: "#242D44", clear: "#647198", remove: "#647198", equal: "#D03F2F",
                clearShadow: "#414E73", removeShadow: "#414E73", equalShadow: "#93261A"
            },
            {
                bg: "#E6E6E6", ball: "#C85402", toggle: "#D2CDCD", text: "#36362C",
                inputBg: "#fff", calcBg: "#D2CDCD", clear: "#378187", remove: "#378187", equal: "#C85402",
                clearShadow: "#1B6066", removeShadow: "#1B6066", equalShadow: "#873901"
            },
            {
                bg: "#17062A", ball: "#00DED0", toggle: "#1E0936", text: "#FFE53D",
                inputBg: "#1E0936", calcBg: "#1E0936", clear: "#56077C", remove: "#56077C", equal: "#00DED0",
                clearShadow: "#BE15F4", removeShadow: "#BE15F4", equalShadow: "#6CF9F1"
            }
        ];
    }

    toggle() {
        this.position = (this.position + 1) % 3;
        this.ball.style.transform = `translateX(${this.position * this.step}px)`;
        this.applyTheme();
    }

    applyTheme() {
        const t = this.themes[this.position];
        Object.assign(this.body.style, { backgroundColor: t.bg });
        Object.assign(this.elems.calcWrapper.style, { backgroundColor: t.bg });
        Object.assign(this.ball.style, { backgroundColor: t.ball });
        Object.assign(this.elems.toggleContainer.style, { backgroundColor: t.toggle });
        [this.elems.title, this.elems.p, this.elems.span1, this.elems.span2, this.elems.span3]
            .forEach(el => el.style.color = t.text);
        Object.assign(this.elems.input.style, { backgroundColor: t.inputBg, color: t.text });
        Object.assign(this.elems.calc.style, { backgroundColor: t.calcBg });

        const btns = ['clear', 'remove', 'equal'];
        btns.forEach(btn => {
            this.elems[btn].style.backgroundColor = t[btn];
            this.elems[btn].style.boxShadow = `0px -4px 0px 0px ${t[btn + 'Shadow']} inset`;
        });
    }
}

class SimpleCalc {
    constructor(displaySelector, buttonSelector) {
        this.display = document.querySelector(displaySelector);
        this.buttons = document.querySelectorAll(buttonSelector);
        this.bindEvents();
    }

    bindEvents() {
        this.buttons.forEach(btn => {
            btn.addEventListener("click", () => this.handleInput(btn.innerText));
        });
    }

    handleInput(value) {
        if (value === "RESET") return this.display.value = "";
        if (value === "DEL") return this.display.value = this.display.value.slice(0, -1);
        if (value === "=") {
            try {
                const expr = this.display.value
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/–/g, "-");
                this.display.value = eval(expr);
            } catch {
                this.display.value = "Error";
            }
            return;
        }
        this.display.value += value;
    }
}

const theme = new ThemeToggle();
document.getElementById("toggleBall").addEventListener("click", () => theme.toggle());

const calc = new SimpleCalc(".wrapper-input__th", ".buttons button");