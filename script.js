(function () {
  const previewArea = document.getElementById("preview-area");

  const compSelect = document.getElementById("component-select");
  const compVariant = document.getElementById("component-variant");
  const compSize = document.getElementById("component-size");

  const propText = document.getElementById("prop-text");
  const propText2Group = document.getElementById("prop-text-2-group");
  const propText2 = document.getElementById("prop-text-2");
  const propFontSize = document.getElementById("prop-font-size");
  const propPaddingX = document.getElementById("prop-padding-x");
  const propPaddingY = document.getElementById("prop-padding-y");
  const paddingXValue = document.getElementById("padding-x-value");
  const paddingYValue = document.getElementById("padding-y-value");
  const propRadius = document.getElementById("prop-radius");
  const propFontFamily = document.getElementById("prop-font-family");
  const propAnimation = document.getElementById("prop-animation");
  const propBgColor = document.getElementById("prop-bg-color");
  const propTextColor = document.getElementById("prop-text-color");

  const fontSizeValue = document.getElementById("font-size-value");
  const paddingValue = document.getElementById("padding-value");
  const radiusValue = document.getElementById("radius-value");

  const tokenPrimary = document.getElementById("token-primary-color");
  const tokenSecondary = document.getElementById("token-secondary-color");
  const tokenText = document.getElementById("token-text-color");
  const tokenRadius = document.getElementById("token-border-radius");
  const tokenRadiusValue = document.getElementById("token-border-radius-value");
  const tokenSizeSmallFont = document.getElementById("token-size-small-font");
  const tokenSizeSmallFontValue = document.getElementById(
    "token-size-small-font-value",
  );
  const tokenSizeSmallPadX = document.getElementById("token-size-small-pad-x");
  const tokenSizeSmallPadXValue = document.getElementById(
    "token-size-small-pad-x-value",
  );
  const tokenSizeSmallPadY = document.getElementById("token-size-small-pad-y");
  const tokenSizeSmallPadYValue = document.getElementById(
    "token-size-small-pad-y-value",
  );

  const tokenSizeMediumFont = document.getElementById("token-size-medium-font");
  const tokenSizeMediumFontValue = document.getElementById(
    "token-size-medium-font-value",
  );
  const tokenSizeMediumPadX = document.getElementById(
    "token-size-medium-pad-x",
  );
  const tokenSizeMediumPadXValue = document.getElementById(
    "token-size-medium-pad-x-value",
  );
  const tokenSizeMediumPadY = document.getElementById(
    "token-size-medium-pad-y",
  );
  const tokenSizeMediumPadYValue = document.getElementById(
    "token-size-medium-pad-y-value",
  );

  const tokenSizeLargeFont = document.getElementById("token-size-large-font");
  const tokenSizeLargeFontValue = document.getElementById(
    "token-size-large-font-value",
  );
  const tokenSizeLargePadX = document.getElementById("token-size-large-pad-x");
  const tokenSizeLargePadXValue = document.getElementById(
    "token-size-large-pad-x-value",
  );
  const tokenSizeLargePadY = document.getElementById("token-size-large-pad-y");
  const tokenSizeLargePadYValue = document.getElementById(
    "token-size-large-pad-y-value",
  );

  const exportCSSBtn = document.getElementById("export-css");
  const exportJSONBtn = document.getElementById("export-json");
  const undoBtn = document.getElementById("undo-btn");
  const redoBtn = document.getElementById("redo-btn");
  const resetBtn = document.getElementById("reset-btn");
  const clearAllBtn = document.getElementById("clearAllBtn");

  const px = (v) => v + "px";
  const deepCopy = (o) => JSON.parse(JSON.stringify(o));
  const STORAGE_KEY = "ui-configurator-state-v1"; //lokales speichern im Browser

  function mergeDeep(target, source) {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  function saveStateToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Could not save state to localStorage:", err);
    }
  }

  function loadStateFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      mergeDeep(state, parsed);
      return true;
    } catch (err) {
      console.warn("Could not load state from localStorage:", err);
      return false;
    }
  }

  const PRESETS = {
    button: {
      small: { font: 13, paddingX: 10, paddingY: 6 },
      medium: { font: 16, paddingX: 14, paddingY: 10 },
      large: { font: 20, paddingX: 20, paddingY: 14 },
    },
    card: {
      small: { font: 14, paddingX: 8, paddingY: 8 },
      medium: { font: 16, paddingX: 16, paddingY: 16 },
      large: { font: 18, paddingX: 24, paddingY: 24 },
    },
    header: {
      small: { font: 16, paddingX: 8, paddingY: 8 },
      medium: { font: 20, paddingX: 12, paddingY: 12 },
      large: { font: 26, paddingX: 16, paddingY: 16 },
    },
    badge: {
      small: { font: 12, paddingX: 6, paddingY: 6 },
      medium: { font: 14, paddingX: 8, paddingY: 8 },
      large: { font: 16, paddingX: 10, paddingY: 10 },
    },
    alert: {
      small: { font: 14, paddingX: 10, paddingY: 10 },
      medium: { font: 16, paddingX: 14, paddingY: 14 },
      large: { font: 18, paddingX: 18, paddingY: 18 },
    },
    input: {
      small: { font: 13, paddingX: 8, paddingY: 6 },
      medium: { font: 14, paddingX: 10, paddingY: 8 },
      large: { font: 16, paddingX: 12, paddingY: 10 },
    },
    modal: {
      small: { font: 14, paddingX: 10, paddingY: 10 },
      medium: { font: 16, paddingX: 12, paddingY: 12 },
      large: { font: 18, paddingX: 16, paddingY: 16 },
    },
  };

  function getPreset(component, size) {
    const tokenPreset = state.tokens.sizes[size];
    return tokenPreset ?? PRESETS[component][size];
  }

  function setRootVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function applyTokensToPreview() {
    const root = document.getElementById("preview-area");
    const t = state.tokens;

    root.style.setProperty("--token-primary", t.primary);
    root.style.setProperty("--token-secondary", t.secondary);
    root.style.setProperty("--token-text", t.text);
    root.style.setProperty("--token-border-radius", px(t.radius));
    root.style.setProperty("--token-on-primary", t.text);
    root.style.setProperty("--token-on-secondary", t.text);
  }

  let state = { 
    component: "button",
    variant: "primary",
    size: "medium",
    text: "",
    text2: "",
    fontSizeAdjust: 0,
    paddingXAdjust: 0,
    paddingYAdjust: 0,

    radius: 8,
    bgColor: "#4a78ff",
    textColor: "#ffffff",

    overrides: {
      radius: false,
      bgColor: false,
      textColor: false,
      fontSize: false,
      paddingX: false,
      paddingY: false,
    },

    fontFamily: "system-ui",
    animation: "none",

    tokens: {
      primary: "#4a78ff",
      secondary: "#335bef",
      text: "#ffffff",
      radius: 8,

      sizes: {
        small: { font: 13, paddingX: 6, paddingY: 6 },
        medium: { font: 16, paddingX: 10, paddingY: 10 },
        large: { font: 20, paddingX: 14, paddingY: 14 },
      },
    },
  };

  let history = []; //für undo und redo
  let historyIndex = -1; // aktueller Zustand

  function recordState() {
    history = history.slice(0, historyIndex + 1);
    history.push(deepCopy(state));
    historyIndex++;
    updateUndoRedoButtons();
    saveStateToStorage();
  }

  function undo() {
    if (historyIndex <= 0) return;
    historyIndex--;
    state = deepCopy(history[historyIndex]);
    renderFromState();
    updateUndoRedoButtons();
  }

  function redo() {
    if (historyIndex >= history.length - 1) return;
    historyIndex++;
    state = deepCopy(history[historyIndex]);
    renderFromState();
    updateUndoRedoButtons();
  }

  function updateUndoRedoButtons() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;
  }

  function createButton({ text, variant, size }) {
    const btn = document.createElement("button");
    btn.className = `preview-button preview-component ${variant} size-${size}`;
    btn.textContent = text || "Text";
    return btn;
  }

  function createCard({ variant, size } = {}) {
    const titleText =
      state.text && state.text.trim().length > 0 ? state.text : "Title";

    const contentText =
      state.text2 && state.text2.trim().length > 0
        ? state.text2
        : "Example content";

    const cardEl = document.createElement("div");
    cardEl.className = `preview-card preview-component ${variant} size-${size}`;

    const h = document.createElement("h3");
    h.textContent = titleText;

    const p = document.createElement("p");
    p.textContent = contentText;

    cardEl.append(h, p);
    return cardEl;
  }

  function createHeader({ text, variant, size }) {
    const h = document.createElement("header");
    h.className = `preview-header preview-component ${variant} size-${size}`;
    h.textContent = text || "Heading";
    return h;
  }

  function createBadge({ text, variant, size }) {
    const badge = document.createElement("span");
    badge.className = `preview-badge preview-component ${variant} size-${size}`;
    badge.textContent = text || "Badge";
    return badge;
  }

  function createAlert({ text, variant, size }) {
    const alert = document.createElement("div");
    alert.className = `preview-alert preview-component ${variant} size-${size}`;
    alert.textContent = text || "Alert message";
    return alert;
  }

  function createInput({ variant, size } = {}) {
    const value = state.text ?? "";
    const container = document.createElement("div");
    container.className = `preview-input preview-component ${variant} size-${size}`;

    const wrap = document.createElement("div");
    wrap.className = "input-wrap";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type...";
    input.value = value;
    input.autocomplete = "off";

    input.addEventListener("input", (e) => {
      state.text = e.target.value;
      if (propText) propText.value = state.text;
    });

    wrap.appendChild(input);
    container.appendChild(wrap);
    return container;
  }

  function createModal({ variant, size } = {}) {
    const titleText =
      state.text && state.text.trim().length > 0 ? state.text : "Title";
    const bodyText =
      state.text2 && state.text2.trim().length > 0
        ? state.text2
        : "Modal content";

    const modal = document.createElement("div");
    modal.className = `preview-modal preview-component ${variant} size-${size}`;

    const h = document.createElement("h3");
    h.textContent = titleText;

    const bodyWrap = document.createElement("div");
    bodyWrap.className = "modal-body";

    const textarea = document.createElement("textarea");
    textarea.value = bodyText;
    textarea.placeholder = "Enter details...";

    textarea.addEventListener("input", (e) => {
      state.text2 = e.target.value;
      if (propText2) propText2.value = state.text2;
    });

    bodyWrap.appendChild(textarea);

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "8px";
    actions.style.justifyContent = "flex-end";
    actions.style.marginTop = "8px";

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.className = `preview-button ${variant} size-${size}`;
    cancel.addEventListener("click", () => {});

    const ok = document.createElement("button");
    ok.textContent = "OK";
    ok.className = `preview-button ${variant} size-${size}`;
    ok.addEventListener("click", () => {});

    actions.append(cancel, ok);

    modal.append(h, bodyWrap, actions);
    return modal;
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16),
        parseInt(h[1] + h[1], 16),
        parseInt(h[2] + h[2], 16),
      ];
    }
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }

  function getLuminance(rgb) {
    const srgb = rgb
      .map((v) => v / 255)
      .map((v) =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
      );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hexToRgb(hex1));
    const lum2 = getLuminance(hexToRgb(hex2));
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function updateContrastWarning() {
    const warningEl = document.getElementById("contrast-warning");
    const bg = state.overrides.bgColor ? state.bgColor : state.tokens.primary;
    const text = state.overrides.textColor
      ? state.textColor
      : state.tokens.text;
    const ratio = getContrastRatio(bg, text);

    if (ratio < 2.5) {
      warningEl.textContent = `⚠️ Low contrast between text and background. Text may be hard to read.`;
    } else {
      warningEl.textContent = "";
    }
  }

  function renderFromState() {
    compSelect.value = state.component;
    compVariant.value = state.variant;
    compSize.value = state.size;

    const preset = getPreset(state.component, state.size);

    propText.value = state.text;
    const primaryLabel = document.querySelector('label[for="prop-text"]');
    if (primaryLabel) primaryLabel.textContent = "Text";

    if (state.component === "card" || state.component === "modal") {
      if (propText2Group) {
        propText2Group.classList.remove("hidden");
        propText2Group.setAttribute("aria-hidden", "false");
      }
      if (propText2) {
        propText2.disabled = false;
        propText2.value = state.text2;
      }
    } else {
      if (propText2Group) {
        propText2Group.classList.add("hidden");
        propText2Group.setAttribute("aria-hidden", "true");
      }
      if (propText2) {
        propText2.disabled = true;
      }
    }

    const effectiveFontSize = preset.font + state.fontSizeAdjust;
    const effectivePaddingX = preset.paddingX + state.paddingXAdjust;
    const effectivePaddingY = preset.paddingY + state.paddingYAdjust;

    propFontSize.value = effectiveFontSize;
    propPaddingX.value = effectivePaddingX;
    propPaddingY.value = effectivePaddingY;

    fontSizeValue.textContent = px(effectiveFontSize);
    paddingXValue.textContent = px(effectivePaddingX);
    paddingYValue.textContent = px(effectivePaddingY);

    const effectiveRadius = state.overrides.radius
      ? state.radius
      : state.tokens.radius;

    propRadius.value = effectiveRadius;
    radiusValue.textContent = px(effectiveRadius);

    propFontFamily.value = state.fontFamily;

    propAnimation.value = state.animation;

    propBgColor.value = state.bgColor;

    const effectiveTextColor = state.overrides.textColor
      ? state.textColor
      : state.tokens.text;

    propTextColor.value = effectiveTextColor;

    tokenPrimary.value = state.tokens.primary;
    tokenSecondary.value = state.tokens.secondary;
    tokenText.value = state.tokens.text;

    tokenRadius.value = state.tokens.radius;
    tokenRadiusValue.textContent = px(state.tokens.radius);

    tokenSizeSmallFont.value = state.tokens.sizes.small.font;
    tokenSizeSmallFontValue.textContent = px(state.tokens.sizes.small.font);
    tokenSizeSmallPadX.value = state.tokens.sizes.small.paddingX;
    tokenSizeSmallPadXValue.textContent = px(state.tokens.sizes.small.paddingX);
    tokenSizeSmallPadY.value = state.tokens.sizes.small.paddingY;
    tokenSizeSmallPadYValue.textContent = px(state.tokens.sizes.small.paddingY);

    tokenSizeMediumFont.value = state.tokens.sizes.medium.font;
    tokenSizeMediumFontValue.textContent = px(state.tokens.sizes.medium.font);
    tokenSizeMediumPadX.value = state.tokens.sizes.medium.paddingX;
    tokenSizeMediumPadXValue.textContent = px(
      state.tokens.sizes.medium.paddingX,
    );
    tokenSizeMediumPadY.value = state.tokens.sizes.medium.paddingY;
    tokenSizeMediumPadYValue.textContent = px(
      state.tokens.sizes.medium.paddingY,
    );

    tokenSizeLargeFont.value = state.tokens.sizes.large.font;
    tokenSizeLargeFontValue.textContent = px(state.tokens.sizes.large.font);
    tokenSizeLargePadX.value = state.tokens.sizes.large.paddingX;
    tokenSizeLargePadXValue.textContent = px(state.tokens.sizes.large.paddingX);
    tokenSizeLargePadY.value = state.tokens.sizes.large.paddingY;
    tokenSizeLargePadYValue.textContent = px(state.tokens.sizes.large.paddingY);

    applyTokensToPreview();

    previewArea.innerHTML = "";
    let el;

    if (state.component === "button") {
      el = createButton(state);
    } else if (state.component === "card") {
      el = createCard(state);
    } else if (state.component === "header") {
      el = createHeader(state);
    } else if (state.component === "badge") {
      el = createBadge(state);
    } else if (state.component === "alert") {
      el = createAlert(state);
    } else if (state.component === "input") {
      el = createInput(state);
    } else if (state.component === "modal") {
      el = createModal(state);
    }

    el.style.setProperty("--font-size-base", px(preset.font));
    el.style.setProperty("--padding-x-base", px(preset.paddingX));
    el.style.setProperty("--padding-y-base", px(preset.paddingY));

    el.style.setProperty("--font-size-adjust", px(state.fontSizeAdjust));
    el.style.setProperty("--padding-adjust-x", px(state.paddingXAdjust));
    el.style.setProperty("--padding-adjust-y", px(state.paddingYAdjust));
    el.style.fontFamily = state.fontFamily;

    el.classList.remove(
      "anim-hover-scale",
      "anim-hover-fade",
      "anim-hover-lift",
      "anim-press-scale",
    );

    if (state.animation !== "none") {
      el.classList.add(`anim-${state.animation}`);
    }

    if (state.overrides.radius) {
      el.style.setProperty("--component-border-radius", px(state.radius));
    } else {
      el.style.removeProperty("--component-border-radius");
    }

    if (state.overrides.bgColor) {
      el.style.setProperty("--component-bg", state.bgColor);
    } else {
      el.style.removeProperty("--component-bg");
    }

    if (state.overrides.textColor) {
      el.style.setProperty("--component-text", state.textColor);
    } else {
      el.style.removeProperty("--component-text");
    }

    previewArea.appendChild(el);

    updateContrastWarning();
  }

  function exportCSS() {
    const t = state.tokens;
    const preset = getPreset(state.component, state.size);

    const computedFontSize = (preset.font || 0) + (state.fontSizeAdjust || 0);
    const computedPaddingX =
      (preset.paddingX || 0) + (state.paddingXAdjust || 0);
    const computedPaddingY =
      (preset.paddingY || 0) + (state.paddingYAdjust || 0);

    let css = ":root {\n";
    css += `  --token-primary: ${t.primary};\n`;
    css += `  --token-secondary: ${t.secondary};\n`;
    css += `  --token-text: ${t.text};\n`;
    css += `  --token-border-radius: ${t.radius}px;\n`;

    css += `  --token-font-small: ${t.sizes.small.font}px;\n`;
    css += `  --token-padding-x-small: ${t.sizes.small.paddingX}px;\n`;
    css += `  --token-padding-y-small: ${t.sizes.small.paddingY}px;\n`;

    css += `  --token-font-medium: ${t.sizes.medium.font}px;\n`;
    css += `  --token-padding-x-medium: ${t.sizes.medium.paddingX}px;\n`;
    css += `  --token-padding-y-medium: ${t.sizes.medium.paddingY}px;\n`;

    css += `  --token-font-large: ${t.sizes.large.font}px;\n`;
    css += `  --token-padding-x-large: ${t.sizes.large.paddingX}px;\n`;
    css += `  --token-padding-y-large: ${t.sizes.large.paddingY}px;\n\n`;

    css += `  --component-font-family: ${state.fontFamily};\n`;
    css += `  --component-font-size: ${computedFontSize}px;\n`;
    css += `  --component-padding-x: ${computedPaddingX}px;\n`;
    css += `  --component-padding-y: ${computedPaddingY}px;\n`;

    if (state.overrides.radius) {
      css += `  --component-border-radius: ${state.radius}px;\n`;
    }
    if (state.overrides.bgColor) {
      css += `  --component-background-color: ${state.bgColor};\n`;
    }
    if (state.overrides.textColor) {
      css += `  --component-text-color: ${state.textColor};\n`;
    }

    css += "}\n";

    if (state.animation !== "none") {
      css += `\n/* Requires animation preset: .anim-${state.animation} */\n`;
    }

    navigator.clipboard.writeText(css).then(() => alert("CSS copied!"));
  }

  function exportJSON() {
    const preset = getPreset(state.component, state.size);

    const computedFontSize = (preset.font || 0) + (state.fontSizeAdjust || 0);
    const computedPaddingX =
      (preset.paddingX || 0) + (state.paddingXAdjust || 0);
    const computedPaddingY =
      (preset.paddingY || 0) + (state.paddingYAdjust || 0);

    const exportData = {
      component: state.component,
      variant: state.variant,
      size: state.size,
      text: state.text,
      text2: state.text2,
      fontFamily: state.fontFamily,
      animation: state.animation !== "none" ? state.animation : null,
      fontSize: computedFontSize + "px",
      padding: {
        x: {
          base: preset.paddingX,
          adjust: state.paddingXAdjust || 0,
          value: computedPaddingX,
        },
        y: {
          base: preset.paddingY,
          adjust: state.paddingYAdjust || 0,
          value: computedPaddingY,
        },
      },
      radius: state.radius,
      bgColor: state.bgColor,
      textColor: state.textColor,
      tokens: state.tokens,
    };

    navigator.clipboard
      .writeText(JSON.stringify(exportData, null, 2))
      .then(() => alert("JSON copied!"));
  }

  function attachListeners() {
    [compSelect, compVariant].forEach((el) =>
      el.addEventListener("change", () => {
        state.component = compSelect.value;
        state.variant = compVariant.value;
        recordState();
        renderFromState();
      }),
    );

    propText.addEventListener("input", () => {
      state.text = propText.value;
      recordState();
      renderFromState();
    });

    propText2.addEventListener("input", () => {
      state.text2 = propText2.value;
      recordState();
      renderFromState();
    });

    propRadius.addEventListener("input", () => {
      state.radius = propRadius.valueAsNumber;
      state.overrides.radius = true;
      radiusValue.textContent = px(state.radius);
      recordState();
      renderFromState();
    });

    propFontFamily.addEventListener("input", () => {
      state.fontFamily = propFontFamily.value;
      recordState();
      renderFromState();
    });

    propAnimation.addEventListener("change", () => {
      state.animation = propAnimation.value;
      recordState();
      renderFromState();
    });

    propBgColor.addEventListener("input", () => {
      state.bgColor = propBgColor.value;
      state.overrides.bgColor = true;
      recordState();
      renderFromState();
    });

    propTextColor.addEventListener("input", () => {
      state.textColor = propTextColor.value;
      state.overrides.textColor = true;
      recordState();
      renderFromState();
    });

    propFontSize.addEventListener("input", () => {
      const base = getPreset(state.component, state.size).font;

      state.fontSizeAdjust = propFontSize.valueAsNumber - base;
      state.overrides.fontSize = true;

      recordState();
      renderFromState();
    });

    propPaddingX.addEventListener("input", () => {
      const base = getPreset(state.component, state.size).paddingX;

      state.paddingXAdjust = propPaddingX.valueAsNumber - base;
      state.overrides.paddingX = true;

      recordState();
      renderFromState();
    });

    propPaddingY.addEventListener("input", () => {
      const base = getPreset(state.component, state.size).paddingY;

      state.paddingYAdjust = propPaddingY.valueAsNumber - base;
      state.overrides.paddingY = true;

      recordState();
      renderFromState();
    });

    compSize.addEventListener("change", () => {
      state.size = compSize.value;

      state.overrides.fontSize = false;
      state.overrides.paddingX = false;
      state.overrides.paddingY = false;

      state.fontSizeAdjust = 0;
      state.paddingXAdjust = 0;
      state.paddingYAdjust = 0;

      const preset = getPreset(state.component, state.size);

      propFontSize.value = preset.font;
      propPaddingX.value = preset.paddingX;
      propPaddingY.value = preset.paddingY;

      recordState();
      renderFromState();
    });

    tokenPrimary.addEventListener("input", () => {
      state.tokens.primary = tokenPrimary.value;
      recordState();
      renderFromState();
    });

    tokenSecondary.addEventListener("input", () => {
      state.tokens.secondary = tokenSecondary.value;
      recordState();
      renderFromState();
    });

    tokenText.addEventListener("input", () => {
      state.tokens.text = tokenText.value;
      recordState();
      renderFromState();
    });

    tokenRadius.addEventListener("input", () => {
      state.tokens.radius = tokenRadius.valueAsNumber;
      tokenRadiusValue.textContent = px(state.tokens.radius);
      recordState();
      renderFromState();
    });

    tokenSizeSmallFont.addEventListener("input", () => {
      const v = tokenSizeSmallFont.valueAsNumber;
      state.tokens.sizes.small.font = v;
      tokenSizeSmallFontValue.textContent = px(v);
      recordState();
      if (!state.overrides.fontSize) renderFromState();
    });

    tokenSizeMediumFont.addEventListener("input", () => {
      const v = tokenSizeMediumFont.valueAsNumber;
      state.tokens.sizes.medium.font = v;
      tokenSizeMediumFontValue.textContent = px(v);
      recordState();
      if (!state.overrides.fontSize) renderFromState();
    });

    tokenSizeLargeFont.addEventListener("input", () => {
      const v = tokenSizeLargeFont.valueAsNumber;
      state.tokens.sizes.large.font = v;
      tokenSizeLargeFontValue.textContent = px(v);
      recordState();
      if (!state.overrides.fontSize) renderFromState();
    });

    tokenSizeSmallPadX.addEventListener("input", () => {
      const v = tokenSizeSmallPadX.valueAsNumber;

      state.tokens.sizes.small.paddingX = v;
      tokenSizeSmallPadXValue.textContent = px(v);

      recordState();
      if (!state.overrides.paddingX) renderFromState();
    });

    tokenSizeSmallPadY.addEventListener("input", () => {
      const v = tokenSizeSmallPadY.valueAsNumber;

      state.tokens.sizes.small.paddingY = v;
      tokenSizeSmallPadYValue.textContent = px(v);

      recordState();
      if (!state.overrides.paddingY) renderFromState();
    });

    tokenSizeMediumPadX.addEventListener("input", () => {
      const v = tokenSizeMediumPadX.valueAsNumber;

      state.tokens.sizes.medium.paddingX = v;
      tokenSizeMediumPadXValue.textContent = px(v);

      recordState();
      if (!state.overrides.paddingX) renderFromState();
    });

    tokenSizeMediumPadY.addEventListener("input", () => {
      const v = tokenSizeMediumPadY.valueAsNumber;

      state.tokens.sizes.medium.paddingY = v;
      tokenSizeMediumPadYValue.textContent = px(v);

      recordState();
      if (!state.overrides.paddingY) renderFromState();
    });

    tokenSizeLargePadX.addEventListener("input", () => {
      const v = tokenSizeLargePadX.valueAsNumber;

      state.tokens.sizes.large.paddingX = v;
      tokenSizeLargePadXValue.textContent = px(v);

      recordState();
      if (!state.overrides.paddingX) renderFromState();
    });

    tokenSizeLargePadY.addEventListener("input", () => {
      const v = tokenSizeLargePadY.valueAsNumber;

      state.tokens.sizes.large.paddingY = v;
      tokenSizeLargePadYValue.textContent = px(v);

      recordState();
      if (!state.overrides.paddingY) renderFromState();
    });

    exportCSSBtn.addEventListener("click", exportCSS);
    exportJSONBtn.addEventListener("click", exportJSON);
    undoBtn.addEventListener("click", undo);
    redoBtn.addEventListener("click", redo);

    resetBtn.addEventListener("click", () => {
      const comp = state.component;
      const variant = state.variant;
      const size = state.size;

      state.fontSizeAdjust = 0;
      state.paddingXAdjust = 0;
      state.paddingYAdjust = 0;
      state.radius = state.tokens.radius;
      state.bgColor = state.tokens.primary;
      state.textColor = state.tokens.text;

      state.overrides = {
        radius: false,
        bgColor: false,
        textColor: false,
        fontSize: false,
        paddingX: false,
        paddingY: false,
      };

      state.component = comp;
      state.variant = variant;
      state.size = size;

      renderFromState();
      recordState();
    });

    clearAllBtn.addEventListener("click", () => {
      const confirmed = confirm(
        "Resetting all settings will restore the default configuration and permanently remove all user customizations. Do you wish to continue?",
      );
      if (!confirmed) return;

      localStorage.removeItem(STORAGE_KEY);

      state = {
        component: "button",
        variant: "primary",
        size: "medium",
        text: "",
        text2: "",
        fontSizeAdjust: 0,
        paddingXAdjust: 0,
        paddingYAdjust: 0,

        radius: 8,
        bgColor: "#4a78ff",
        textColor: "#ffffff",

        overrides: {
          radius: false,
          bgColor: false,
          textColor: false,
          fontSize: false,
          paddingX: false,
          paddingY: false,
        },

        fontFamily: "system-ui",
        animation: "none",

        tokens: {
          primary: "#4a78ff",
          secondary: "#335bef",
          text: "#ffffff",
          radius: 8,
          sizes: {
            small: { font: 13, paddingX: 6, paddingY: 6 },
            medium: { font: 16, paddingX: 10, paddingY: 10 },
            large: { font: 20, paddingX: 14, paddingY: 14 },
          },
        },
      };

      history = [deepCopy(state)];
      historyIndex = 0;

      renderFromState();
      updateUndoRedoButtons();
    });
  }

  function init() {
    loadStateFromStorage();
    history = [deepCopy(state)];
    historyIndex = 0;
    attachListeners();
    renderFromState();
    updateUndoRedoButtons();
  }

  init();
})();
