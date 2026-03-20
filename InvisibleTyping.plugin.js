/**
 * @name InvisibleTyping
 * @version 1.6.0
 * @author gg (Strict API Blocker)
 * @description Absolute silence. Drops the /typing API POST request but allows message API requests to pass.
 * @changelogDate 2026-03-20
 */

'use strict';

const React = BdApi.React;

var manifest = {
    "name": "InvisibleTyping",
    "version": "1.6.0",
    "author": "Strencher",
    "authorId": "415849376598982656",
    "description": "Absolute silence. Drops the /typing API POST request but allows message API requests to pass.",
    "invite": "gvA2ree",
    "changelog": [{
        "title": "Strict API Blocker",
        "type": "fixed",
        "items": [
            "Intercepts Discord's internal HTTP client directly.",
            "Drops any POST request targeting the /typing endpoint.",
            "Allows all message sending APIs to pass normally.",
            "Forces default state to Invisible to clear broken caches."
        ]
    }],
    "changelogDate": "2026-03-20"
};

const {
    Components,
    ContextMenu,
    Data,
    DOM,
    Logger,
    Patcher,
    UI,
    Webpack
} = new BdApi(manifest.name);

var Styles = {
    sheets: [],
    load() { DOM.addStyle(this.sheets.join("\n")); },
    unload() { DOM.removeStyle(); }
};

Styles.sheets.push("/* ../common/Changelog/style.scss */", `.Changelog-Title-Wrapper { font-size: 20px; font-weight: 600; font-family: var(--font-display); color: var(--header-primary); line-height: 1.2; } .Changelog-Title-Wrapper div { font-size: 12px; font-weight: 400; font-family: var(--font-primary); color: var(--primary-300); line-height: 1.3333333333; } .Changelog-Banner { width: 405px; border-radius: 8px; margin-bottom: 20px; } .Changelog-Item { color: #c4c9ce; } .Changelog-Item .Changelog-Header { display: flex; text-transform: uppercase; font-weight: 700; align-items: center; margin-bottom: 10px; } .Changelog-Item .Changelog-Header.added { color: #45BA6A; } .Changelog-Item .Changelog-Header.changed { color: #F0B232; } .Changelog-Item .Changelog-Header.fixed { color: #EC4245; } .Changelog-Item .Changelog-Header.improved { color: #5865F2; } .Changelog-Item .Changelog-Header::after { content: ""; flex-grow: 1; height: 1px; margin-left: 7px; background: currentColor; } .Changelog-Item span { display: list-item; list-style: inside; margin-left: 5px; } .Changelog-Item span::marker { color: var(--background-accent); }`);
Styles.sheets.push("/* components/typingButton.scss */", `.invisibleTypingButton svg { color: var(--interactive-normal); overflow: visible; } .invisibleTypingButton .disabledStrokeThrough { position: absolute; transform: translateX(-15px) translateY(530px) rotate(-45deg); } .invisibleTypingButton { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; } .invisibleTypingButton:hover:not(.disabled) svg { color: var(--interactive-hover); } .invisibleTypingTooltip { display: inline-flex; }`);

var styles = { "invisibleTypingButton": "invisibleTypingButton", "disabledStrokeThrough": "disabledStrokeThrough" };

function Keyboard({ disabled, ...props }) {
    return React.createElement("svg", { ...props, width: "25", height: "25", viewBox: "0 0 576 512" }, React.createElement("path", { fill: "currentColor", d: "M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z" }), disabled ? React.createElement("rect", { className: styles.disabledStrokeThrough, x: "10", y: "10", width: "600pt", height: "70px", fill: "#f04747" }) : null);
}

const buildClassName = (...args) => {
    return args.reduce((classNames, arg) => {
        if (!arg) return classNames;
        if (typeof arg === "string" || typeof arg === "number") { classNames.push(arg); } 
        else if (Array.isArray(arg)) { const nestedClassNames = buildClassName(...arg); if (nestedClassNames) classNames.push(nestedClassNames); } 
        else if (typeof arg === "object") { Object.keys(arg).forEach((key) => { if (arg[key]) classNames.push(key); }); }
        return classNames;
    }, []).join(" ");
};

// FORCE OVERRIDE: Clear old cache and force default to INVISIBLE
let currentEnable = Data.load("autoEnable");
if (currentEnable === undefined || currentEnable === true) {
    Data.save("autoEnable", false); // Force invisible on first load
}

const Settings = new class SettingsStore extends EventTarget {
    get(key, def) {
        let val = Data.load(key);
        return val !== undefined ? val : def;
    }
    set(key, value) {
        Data.save(key, value);
        this.dispatchEvent(new Event("change"));
    }
}();

function useSettings(key, def) {
    const [value, setValue] = React.useState(() => Settings.get(key, def));
    React.useEffect(() => {
        const listener = () => setValue(Settings.get(key, def));
        Settings.addEventListener("change", listener);
        return () => Settings.removeEventListener("change", listener);
    }, [key, def]);
    return value;
}

const ChatButtonMod = Webpack.getModule(Webpack.Filters.byStrings("CHAT_INPUT_BUTTON_NOTIFICATION"));
const ChatButton = ChatButtonMod ? (ChatButtonMod.A || ChatButtonMod.Z || ChatButtonMod.default || ChatButtonMod) : "button";

const removeItem = function(array, item) {
    while (array.includes(item)) { array.splice(array.indexOf(item), 1); }
    return array;
};

function InvisibleTypingContextMenu() {
    const enabled = useSettings("autoEnable", false);
    const excludeList = useSettings("exclude", []);
    
    return React.createElement(ContextMenu.Menu, { navId: "invisible-typing-context-menu", onClose: ContextMenu.close },
        React.createElement(ContextMenu.Item, {
            id: "globally-disable-or-enable-typing",
            label: enabled ? "Disable Globally (Be Invisible)" : "Enable Globally (Show Typing)",
            action: () => Settings.set("autoEnable", !enabled)
        }),
        React.createElement(ContextMenu.Item, {
            color: "danger", label: "Reset Config", disabled: !excludeList.length, id: "reset-config",
            action: () => {
                Settings.set("exclude", []);
                UI.showToast("Successfully reset config.", { type: "success" });
            }
        })
    );
}

function InvisibleTypingButton({ channel, isEmpty }) {
    const autoEnable = useSettings("autoEnable", false);
    const excludeList = useSettings("exclude", []);
    const isExcluded = excludeList.includes(channel.id);
    
    let enabled = autoEnable;
    if (autoEnable && isExcluded) enabled = false;
    if (isExcluded && !autoEnable) enabled = true;

    const handleClick = React.useCallback(() => {
        const newExcludeList = [...Settings.get("exclude", [])];
        const TypingModule = Webpack.getModule(Webpack.Filters.byProps("startTyping"));
        
        if (newExcludeList.includes(channel.id)) {
            removeItem(newExcludeList, channel.id);
            if(TypingModule && typeof TypingModule.stopTyping === "function") TypingModule.stopTyping(channel.id);
        } else {
            newExcludeList.push(channel.id);
            if (!isEmpty && TypingModule && typeof TypingModule.startTyping === "function") TypingModule.startTyping(channel.id);
        }
        Settings.set("exclude", newExcludeList);
    }, [channel.id, isEmpty]);

    const handleContextMenu = React.useCallback((event) => {
        ContextMenu.open(event, () => React.createElement(InvisibleTypingContextMenu, null));
    }, []);

    return React.createElement(Components.Tooltip, { text: enabled ? "Typing Visible" : "Typing Hidden" }, (props) => React.createElement("div", {
        ...props, onClick: handleClick, onContextMenu: handleContextMenu, style: { padding: "5px", display: "flex", alignItems: "center" }
    }, React.createElement(ChatButton, { className: buildClassName(styles.invisibleTypingButton, { enabled, disabled: !enabled }) },
        React.createElement(Keyboard, { disabled: !enabled })
    )));
}

var SettingsItems = [{
    type: "switch",
    name: "Show Typing Status Globally",
    note: "If OFF, you are invisible everywhere. Turn ON if you only want to hide in specific channels.",
    id: "autoEnable",
    value: false
}];

const { SettingItem, SwitchInput } = Components;

function SwitchItem(props) {
    const value = useSettings(props.id, props.value);
    return React.createElement(SettingItem, { ...props, inline: true },
        React.createElement(SwitchInput, { value, onChange: (v) => Settings.set(props.id, v) })
    );
}

function renderItems(items) {
    return items.map((item, i) => {
        if (item.type === "switch") return React.createElement(SwitchItem, { key: i, ...item });
        return null;
    });
}

function SettingsPanel() {
    return React.createElement("div", null, renderItems(SettingsItems));
}

class InvisibleTyping {
    start() {
        Styles.load();
        this.patchNetworkAPI();
        this.patchLegacyTyping();
        this.patchChannelTextArea();
    }
    
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }
    
    // THE API BLOCKER: Intercepts POST requests and filters out "/typing"
    patchNetworkAPI() {
        const HTTPModules = Webpack.getModules(m => m && typeof m.post === "function" && typeof m.get === "function");
        
        for (const HTTP of HTTPModules) {
            Patcher.instead(HTTP, "post", (_, args, originalMethod) => {
                try {
                    const req = args[0];
                    const url = typeof req === "string" ? req : (req && req.url ? req.url : "");
                    
                    // If the request is specifically for the typing indicator
                    if (url && url.includes("/typing")) {
                        const match = url.match(/\/channels\/(\d+)\/typing/);
                        const channelId = match ? match[1] : null;

                        if (channelId) {
                            const globalTypingEnabled = Settings.get("autoEnable", false); // DEFAULT INVISIBLE
                            const excludeList = Settings.get("exclude", []);
                            const isExcluded = excludeList.includes(channelId);
                            
                            const shouldType = globalTypingEnabled ? !isExcluded : isExcluded;
                            
                            // IF YOU ARE INVISIBLE: Drop the packet, fake a success response.
                            if (!shouldType) {
                                return Promise.resolve({ ok: true, status: 200, body: {} }); 
                            }
                        }
                    }
                } catch (err) {
                    Logger.error("HTTP Patch Error:", err);
                }
                
                // Allow all other requests (like /messages) to pass through untouched
                return originalMethod(...args);
            });
        }
    }

    // Double coverage: Catch the UI trigger before it even creates the API request
    patchLegacyTyping() {
        const TypingModules = Webpack.getModules(m => m && typeof m.startTyping === "function");
        
        for (const mod of TypingModules) {
            Patcher.instead(mod, "startTyping", (_, args, originalMethod) => {
                try {
                    let channelId = args[0];
                    if (channelId && typeof channelId === "object" && channelId.channelId) {
                        channelId = channelId.channelId;
                    }
                    
                    if (typeof channelId === "string") {
                        const globalTypingEnabled = Settings.get("autoEnable", false);
                        const isExcluded = Settings.get("exclude", []).includes(channelId);
                        const shouldType = globalTypingEnabled ? !isExcluded : isExcluded;
                        
                        // Drop the UI event
                        if (!shouldType) return Promise.resolve();
                    }
                } catch (e) {}
                
                return originalMethod(...args);
            });
        }
    }
    
    patchChannelTextArea() {
        const ChatButtonsGroupMod = Webpack.getModule(Webpack.Filters.byStrings("type", "showAllButtons"));
        const ChatButtonsGroup = ChatButtonsGroupMod ? (ChatButtonsGroupMod.A || ChatButtonsGroupMod.Z || ChatButtonsGroupMod.default || ChatButtonsGroupMod) : null;
        
        if (!ChatButtonsGroup || typeof ChatButtonsGroup.type !== "function") return;

        Patcher.after(ChatButtonsGroup, "type", (_, args, res) => {
            if (args.length == 2 && !args[0].disabled && args[0].type && args[0].type.analyticsName == "normal" && res && res.props && res.props.children && Array.isArray(res.props.children)) {
                res.props.children.unshift(React.createElement(InvisibleTypingButton, {
                    channel: args[0].channel,
                    isEmpty: !Boolean(args[0].textValue)
                }));
            }
        });
    }
    
    getSettingsPanel() {
        return React.createElement(SettingsPanel, null);
    }
}

module.exports = InvisibleTyping;