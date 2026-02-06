import { state } from "./state.js";

export function createButton({ text, variant, size }) {
  const btn = document.createElement("button");
  btn.className = `preview-button preview-component ${variant} size-${size}`;
  btn.textContent = text || "Text";
  return btn;
}

export function createCard({ variant, size } = {}) {
  const titleText = state.text && state.text.trim() ? state.text : "Title";
  const contentText = state.text2 && state.text2.trim() ? state.text2 : "Example content";

  const cardEl = document.createElement("div");
  cardEl.className = `preview-card preview-component ${variant} size-${size}`;

  const h = document.createElement("h3");
  h.textContent = titleText;

  const p = document.createElement("p");
  p.textContent = contentText;

  cardEl.append(h, p);
  return cardEl;
}

export function createHeader({ text, variant, size }) {
  const h = document.createElement("header");
  h.className = `preview-header preview-component ${variant} size-${size}`;
  h.textContent = text || "Heading";
  return h;
}

export function createBadge({ text, variant, size }) {
  const badge = document.createElement("span");
  badge.className = `preview-badge preview-component ${variant} size-${size}`;
  badge.textContent = text || "Badge";
  return badge;
}

export function createAlert({ text, variant, size }) {
  const alert = document.createElement("div");
  alert.className = `preview-alert preview-component ${variant} size-${size}`;
  alert.textContent = text || "Alert message";
  return alert;
}

export function createInput({ variant, size } = {}) {
  const container = document.createElement("div");
  container.className = `preview-input preview-component ${variant} size-${size}`;

  const wrap = document.createElement("div");
  wrap.className = "input-wrap";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type...";
  input.value = state.text ?? "";
  input.autocomplete = "off";

  // nur state ändern
  input.addEventListener("input", (e) => {
    state.text = e.target.value;
  });

  wrap.appendChild(input);
  container.appendChild(wrap);
  return container;
}

export function createModal({ variant, size } = {}) {
  const titleText = state.text && state.text.trim() ? state.text : "Title";
  const bodyText = state.text2 && state.text2.trim() ? state.text2 : "Modal content";

  const modal = document.createElement("div");
  modal.className = `preview-modal preview-component ${variant} size-${size}`;

  const h = document.createElement("h3");
  h.textContent = titleText;

  const bodyWrap = document.createElement("div");
  bodyWrap.className = "modal-body";

  const textarea = document.createElement("textarea");
  textarea.value = bodyText;
  textarea.placeholder = "Enter details...";

  // nur state ändern
  textarea.addEventListener("input", (e) => {
    state.text2 = e.target.value;
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
