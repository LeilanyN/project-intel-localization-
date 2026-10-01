// These language codes need right-to-left text direction.
const rtlLanguages = ["ar", "ckb", "dv", "fa", "he", "ps", "sd", "ug", "ur", "yi"];

function hasTranslationClass(className) {
  const root = document.documentElement;
  const body = document.body;

  return root.classList.contains(className) ||
    (body && body.classList.contains(className));
}

function updateTextDirection() {
  const root = document.documentElement;
  const language = (root.getAttribute("lang") || "").toLowerCase().split("-")[0];

  // Google Translate adds one of these classes when it changes text direction.
  if (hasTranslationClass("translated-rtl")) {
    root.dir = "rtl";
  } else if (hasTranslationClass("translated-ltr")) {
    root.dir = "ltr";
  } else {
    root.dir = rtlLanguages.includes(language) ? "rtl" : "ltr";
  }
}

// Watch for language changes and translation classes added to the page.
const directionObserver = new MutationObserver(updateTextDirection);
directionObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang", "class"]
});

if (document.body) {
  directionObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}

updateTextDirection();