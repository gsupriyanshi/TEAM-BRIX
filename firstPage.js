(function () {
    "use strict";

    /* =====================================================
       SETTINGS: CHANGE THESE
       ===================================================== */
    var TEXT = "Small actions, big impact.";   // the tagline
    var HIGHLIGHT_FROM_WORD = 2;               // highlight from this word on (0 = first word)
    var START_DELAY = 1600;    // ms to wait before typing starts (the logo fades in first)
    var TYPE_SPEED = 75;       // ms per letter
    var TYPE_JITTER = 45;      // random extra ms, so it feels like a real person typing
    var COMMA_PAUSE = 450;     // pause after the comma
    var ERASE_SPEED = 28;      // ms per letter while deleting
    var LOOP = true;           // true = type, wait, delete, type again. false = type once
    var HOLD = 5500;           // ms the finished tagline stays before it is erased

    var tagline = document.getElementById("tagline");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Build the tagline out of word and letter pieces */
    var chars = [];
    var caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");

    function build() {
        var words = TEXT.split(" ");
        var group = null;
        tagline.textContent = "";
        words.forEach(function (word, i) {
            var parent = tagline;
            if (i >= HIGHLIGHT_FROM_WORD) {
                if (!group) {
                    group = document.createElement("span");
                    group.className = "em-group";
                    tagline.appendChild(group);
                }
                parent = group;
            }
            var wordEl = document.createElement("span");
            wordEl.className = "word";
            wordEl.setAttribute("aria-hidden", "true");
            word.split("").forEach(function (letter) {
                var ch = document.createElement("span");
                ch.className = "ch";
                ch.textContent = letter;
                wordEl.appendChild(ch);
                chars.push(ch);
            });
            parent.appendChild(wordEl);
            if (i < words.length - 1) parent.appendChild(document.createTextNode(" "));
        });
    }

    /* Puts the cursor right after the letters typed so far */
    var shown = 0;
    function placeCaret() {
        if (shown === 0) tagline.insertBefore(caret, tagline.firstChild);
        else chars[shown - 1].after(caret);
    }

    var timer;

    function type() {
        if (shown >= chars.length) { finish(); return; }
        tagline.classList.add("typing");
        chars[shown].classList.add("on");
        shown++;
        placeCaret();
        var letter = chars[shown - 1].textContent;
        var delay = TYPE_SPEED + Math.random() * TYPE_JITTER;
        if (letter === ",") delay += COMMA_PAUSE;
        timer = setTimeout(type, delay);
    }

    function finish() {
        tagline.classList.remove("typing");   // cursor starts blinking
        tagline.classList.add("done");        // highlight swipes in
        if (LOOP) timer = setTimeout(erase, HOLD);
    }

    function erase() {
        tagline.classList.remove("done");
        tagline.classList.add("typing");
        (function step() {
            if (shown > 0) {
                shown--;
                chars[shown].classList.remove("on");
                placeCaret();
                timer = setTimeout(step, ERASE_SPEED);
            } else {
                tagline.classList.remove("typing");
                timer = setTimeout(type, 800);
            }
        })();
    }

    build();

    if (reduceMotion) {
        // No animation: show the full tagline straight away
        chars.forEach(function (ch) { ch.classList.add("on"); });
        tagline.classList.add("done");
        return;
    }

    placeCaret();
    setTimeout(function () { tagline.classList.add("ready"); }, 900);   // cursor appears and blinks
    timer = setTimeout(type, START_DELAY);
})();