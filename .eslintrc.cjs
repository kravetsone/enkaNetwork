const { configure, presets } = require("eslint-kit");

module.exports = configure({
    extend: {
        rules: {
            "no-implicit-coercion": "off",
            "require-atomic-updates": "off",
        },
    },
    presets: [
        presets.imports(),
        presets.node(),
        presets.prettier({
            tabWidth: 4,
            singleQuote: false,
            semi: true,
            endOfLine: "auto",
        }),
        presets.typescript(),
    ],
});
