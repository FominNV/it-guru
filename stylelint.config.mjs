/** @type {import("stylelint").Config} */

const config = {
  customSyntax: "postcss-scss",
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-idiomatic-order",
  ],
  plugins: ["stylelint-scss"],
  rules: {
    "no-empty-source": null,
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "media-feature-range-notation": null,
    "scss/operator-no-unspaced": null,
    "no-descending-specificity": null,
    "property-no-vendor-prefix": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["use", "include", "forward", "mixin"],
      },
    ],
    "scss/at-rule-no-unknown": true,
    "order/order": [
      "custom-properties",
      "dollar-variables",
      {
        type: "at-rule",
        name: "include",
        parameter: "font",
      },
      "declarations",
      {
        type: "at-rule",
        name: "include",
        parameter: "desktop",
        hasBlock: true,
      },
      {
        type: "at-rule",
        name: "include",
        parameter: "mobile",
        hasBlock: true,
      },
    ],
    "media-query-no-invalid": null,
    "nesting-selector-no-missing-scoping-root": null,
    "import-notation": null,
    "declaration-property-value-no-unknown": null,
  },
};

export default config;
