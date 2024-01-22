/**
 * @author dimabreus
 * @name BetterBackground
 * @description Custom background everywhere.
 * @version 0.0.1
 */

let BetterBackgroundCSS = `
.BetterBackgroundLabel {
    color: white !important;
    padding-right: 5px !important;
}
`

let backgroundCallUrl;
let style;

let backgroundCallCSS

const updateStyles = () => {
    style.textContent = `
    ${BetterBackgroundCSS}
    
    ${backgroundCallCSS ? backgroundCallCSS : ""}
    `
}

const setBackgroundUrl = url => {
    backgroundCallCSS = `
.wrapper_bd2abe.minimum_ebf000, .callContainer_cbde45 {
    background: url("${url}") !important;
    background-size: cover !important;
}
`
    updateStyles()
}


module.exports = () => ({
    start() {



        console.info("BetterBackground enabled");

        if (!style) {
            style = document.createElement('style');
            style.id = "BetterBackgroundCSS";
            document.head.appendChild(style);
        }

        updateStyles()

        if (BdApi.Data.load("myPlugin", "settings").backgroundCallUrl) {
            backgroundCallUrl = BdApi.Data.load("myPlugin", "settings").backgroundCallUrl;
            
            setBackgroundUrl(backgroundCallUrl)
        }
    },
    stop() {

        if (style && style.parentNode === document.head) {
            document.head.removeChild(style);
            style = undefined
        }


        console.info("BetterBackground disabled");
    },
    getSettingsPanel: () => {
        const mySettingsPanel = document.createElement("div");
        mySettingsPanel.id = "BetterBackgroundSettings";

        const callBgSetting = document.createElement("div");
        callBgSetting.classList.add("setting");

        const callBgLabel = document.createElement("span");
        callBgLabel.textContent = "Call Background";
        callBgLabel.classList.add("BetterBackgroundLabel");

        const callBgInp = document.createElement("input");
        callBgInp.type = "text";
        callBgInp.addEventListener('change', () => {
            backgroundCallUrl = callBgInp.value;

            setBackgroundUrl(backgroundCallUrl)

            BdApi.Data.save("myPlugin", "settings", { backgroundCallUrl: backgroundCallUrl });
        });

        callBgSetting.append(callBgLabel, callBgInp);

        mySettingsPanel.append(callBgSetting);

        return mySettingsPanel;
    }
});
