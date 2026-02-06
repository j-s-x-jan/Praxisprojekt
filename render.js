import { state } from "./state.js";
import { createButton, createCard, createHeader, createBadge, createAlert, createInput, createModal } from "./components.js";
import { getPreset } from "./presets.js";

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
const fontSizeValue = document.getElementById("font-size-value");
const paddingXValue = document.getElementById("padding-x-value");
const paddingYValue = document.getElementById("padding-y-value");
const propRadius = document.getElementById("prop-radius");
const radiusValue = document.getElementById("radius-value");
const propFontFamily = document.getElementById("prop-font-family");
const propAnimation = document.getElementById("prop-animation");
const propBgColor = document.getElementById("prop-bg-color");
const propTextColor = document.getElementById("prop-text-color");
const tokenPrimary = document.getElementById("token-primary-color");
const tokenSecondary = document.getElementById("token-secondary-color");
const tokenText = document.getElementById("token-text-color");
const tokenRadius = document.getElementById("token-border-radius");
const tokenRadiusValue = document.getElementById("token-border-radius-value");
const tokenSizeSmallFont = document.getElementById("token-size-small-font");
const tokenSizeSmallFontValue = document.getElementById("token-size-small-font-value");
const tokenSizeSmallPadX = document.getElementById("token-size-small-pad-x");
const tokenSizeSmallPadXValue = document.getElementById("token-size-small-pad-x-value");
const tokenSizeSmallPadY = document.getElementById("token-size-small-pad-y");
const tokenSizeSmallPadYValue = document.getElementById("token-size-small-pad-y-value");
const tokenSizeMediumFont = document.getElementById("token-size-medium-font");
const tokenSizeMediumFontValue = document.getElementById("token-size-medium-font-value");
const tokenSizeMediumPadX = document.getElementById("token-size-medium-pad-x");
const tokenSizeMediumPadXValue = document.getElementById("token-size-medium-pad-x-value");
const tokenSizeMediumPadY = document.getElementById("token-size-medium-pad-y");
const tokenSizeMediumPadYValue = document.getElementById("token-size-medium-pad-y-value");
const tokenSizeLargeFont = document.getElementById("token-size-large-font");
const tokenSizeLargeFontValue = document.getElementById("token-size-large-font-value");
const tokenSizeLargePadX = document.getElementById("token-size-large-pad-x");
const tokenSizeLargePadXValue = document.getElementById("token-size-large-pad-x-value");
const tokenSizeLargePadY = document.getElementById("token-size-large-pad-y");
const tokenSizeLargePadYValue = document.getElementById("token-size-large-pad-y-value");

export function renderFromState() {
  compSelect.value = state.component;
  compVariant.value = state.variant;
  compSize.value = state.size;

  const preset = getPreset(state.component, state.size);

  propText.value = state.text;
  const primaryLabel = document.querySelector('label[for="prop-text"]');
  if (primaryLabel) primaryLabel.textContent = "Text";

  if (state.component === "card" || state.component === "modal") {
    //für zweites Textfeld
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

  const effectiveFontSize = preset.font + state.fontSizeAdjust; //aktueller Wert aus Standardwert und Veränderung
  const effectivePaddingX = preset.paddingX + state.paddingXAdjust;
  const effectivePaddingY = preset.paddingY + state.paddingYAdjust;

  propFontSize.value = effectiveFontSize; //Slider in der linken Konfigurations-Spalte setzen
  propPaddingX.value = effectivePaddingX;
  propPaddingY.value = effectivePaddingY;

  fontSizeValue.textContent = px(effectiveFontSize); //px-Werte unter den Slidern anzeigen
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
  tokenSizeMediumPadXValue.textContent = px(state.tokens.sizes.medium.paddingX);
  tokenSizeMediumPadY.value = state.tokens.sizes.medium.paddingY;
  tokenSizeMediumPadYValue.textContent = px(state.tokens.sizes.medium.paddingY);

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
    //nicht mehr ausgewählte Animationen entfernen
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
