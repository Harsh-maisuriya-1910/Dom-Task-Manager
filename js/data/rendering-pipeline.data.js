export const renderingPipelineData = [
  {
    title: "HTML Processing Flow",
    steps: [
      {
        label: "Step 1: ",
        name: "HTML Document",
        description: "Browser receives the HTML document from the server.",
        type: "normal",
      },
      {
        label: "Step 2: ",
        name: "HTML Parsing",
        description: "Browser reads and understands the HTML structure.",
        type: "normal",
      },
      {
        label: "Step 3: ",
        name: "HTML Tokenization",
        description: "HTML code is converted into meaningful tokens.",
        type: "normal",
      },
      {
        label: "Step 4: ",
        name: "DOM Tree Creation",
        description: "Browser creates the Document Object Model tree.",
        type: "final",
      },
    ],
  },
  {
    title: "CSS Processing Flow",
    steps: [
      {
        label: "Step 1: ",
        name: "CSS Stylesheet",
        description: "Browser receives and reads the CSS rules.",
        type: "normal",
      },
      {
        label: "Step 2: ",
        name: "CSSOM Tree Creation",
        description: "CSS rules are converted into the CSS Object Model tree.",
        type: "final",
      },
    ],
  },
  {
    title: "Rendering Flow",
    steps: [
      {
        label: "Step 1: ",
        name: "DOM + CSSOM Combination",
        description: "Browser combines page structure with styling rules.",
        type: "final",
      },
      {
        label: "Step 2: ",
        name: "Render Tree Generation",
        description: "Browser prepares only the visible elements for rendering.",
        type: "final",
      },
      {
        label: "Step 3: ",
        name: "Layout Calculation",
        description: "Browser calculates each element's size and position.",
        type: "normal",
      },
      {
        label: "Step 4: ",
        name: "Paint Process",
        description: "Browser paints text, colors, borders, and shadows.",
        type: "normal",
      },
      {
        label: "Step 5: ",
        name: "Compositing",
        description: "Browser combines layers and displays the final page.",
        type: "final",
      },
    ],
  },
];