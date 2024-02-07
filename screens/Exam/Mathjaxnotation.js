const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/CommonHTML"],
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
      processEscapes: true,
      processEnvironments: true,
    },
    TeX: {
      extensions: [
        "AMSmath.js",
        "AMSsymbols.js",
        "noErrors.js",
        "noUndefined.js",
      ],
      equationNumbers: {
        autoNumber: "AMS",
      },
      displayAlign: "right", // Align displayed equations to the right
      unicode: {
        fonts: "TeX", // Use TeX fonts for proper rendering of RTL text
      },
    },
    CommonHTML: {
      scale: 50, // Adjust the scale value as needed (85 corresponds to 85% of the default size)
      displayAlign: "right", // Align displayed equations to the right
      undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif", // Define the font for RTL text
    },
  };