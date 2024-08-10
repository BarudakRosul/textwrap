const assert = require("assert");
const { TextWrapper, wrap, fill, shorten, dedent, indent } = require("./index");

describe("Testing TextWrapper API", () => {
  it("should create an instance with default settings", () => {
    const tw = new TextWrapper();
    assert.strictEqual(tw.width, 70);
    assert.strictEqual(tw.initial_indent, "");
    assert.strictEqual(tw.subsequent_indent, "");
    assert.strictEqual(tw.max_lines, null);
  });

  it("should create an instance with custom settings", () => {
    const tw = new TextWrapper({ width: 50, initial_indent: "  ", max_lines: 2 });
    assert.strictEqual(tw.width, 50);
    assert.strictEqual(tw.initial_indent, "  ");
    assert.strictEqual(tw.max_lines, 2);
  });

  it("should wrap text correctly with default width", () => {
    const tw = new TextWrapper();
    const text = "This is a long sentence that should be wrapped.";
    const result = tw.wrap(text);
    assert.deepStrictEqual(result, [
      "This is a long sentence that should be wrapped."
    ]);
  });

  it("should fill text correctly with default width", () => {
    const tw = new TextWrapper();
    const text = "This is a long sentence that should be wrapped.";
    const result = tw.fill(text);
    assert.strictEqual(result, "This is a long sentence that should be wrapped.");
  });
});

describe("Testing 'wrap' function", () => {
  it("should wrap text correctly with default width", () => {
    const text = "This is a long sentence that should be wrapped.";
    const result = wrap(text);
    assert.deepStrictEqual(result, [
      "This is a long sentence that should be wrapped."
    ]);
  });

  it("should wrap text correctly with custom width", () => {
    const text = "This is a long sentence that should be wrapped.";
    const result = wrap(text, 20);
    assert.deepStrictEqual(result, [
      "This is a long",
      "sentence that should",
      "be wrapped."
    ]);
  });

  it("should wrap text correctly with custom options", () => {
    const text = "This is a long sentence that should be wrapped.";
    const options = {
      initial_indent: " - ",
      subsequent_indent: " - ",
      max_lines: 2,
      placeholder: " (...)"
    };
    const result = wrap(text, 20, options);
    assert.deepStrictEqual(result, [
      " - This is a long",
      " - sentence (...)"
    ]);
  });

  it("should wrap text letters (A-Z) with width 1", () => {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = wrap(text, 1);
    assert.deepStrictEqual(result, [
      "A", "B", "C", "D", "E", "F",
      "G", "H", "I", "J", "K", "L",
      "M", "N", "O", "P", "Q", "R",
      "S", "T", "U", "V", "W", "X",
      "Y", "Z"
    ]);
  });
});

describe("Testing 'fill' function", () => {
  it("should fill text correctly with default width", () => {
    const text = "This is a long sentence that should be wrapped.";
    const result = fill(text);
    assert.strictEqual(result, "This is a long sentence that should be wrapped.");
  });

  it("should fill text correctly with custom width", () => {
    const text = "This is a long sentence that should be wrapped.";
    const result = fill(text, 20);
    assert.strictEqual(result, "This is a long\nsentence that should\nbe wrapped.");
  });

  it("should fill text correctly with custom options", () => {
    const text = "This is a long sentence that should be wrapped.";
    const options = {
      initial_indent: " - ",
      subsequent_indent: " - ",
      max_lines: 2,
      placeholder: " (...)"
    };
    const result = fill(text, 20, options);
    assert.strictEqual(result, " - This is a long\n - sentence (...)");
  });

  it("should fill text letters (A-Z) with width 1", () => {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = fill(text, 1);
    assert.strictEqual(result, "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ");
  });
});

describe("Testing 'shorten' function", () => {
  it("should shorten text correctly to fit within width", () => {
    const text = "This is a very long sentence that needs to be shortened.";
    const result = shorten(text, 30);
    assert.strictEqual(result, "This is a very long [...]");
  });

  it("should handle text shorter than width without change", () => {
    const text = "Short sentence.";
    const result = shorten(text, 30);
    assert.strictEqual(result, "Short sentence.");
  });
});

describe("Testing 'dedent' function", () => {
  it("should remove leading whitespace correctly", () => {
    const text = "\tThis is a sentence.\n\tThis is another sentence.";
    const result = dedent(text);
    assert.strictEqual(result, "This is a sentence.\nThis is another sentence.");
  });

  it("should handle text without leading whitespace correctly", () => {
    const text = "No leading whitespace.";
    const result = dedent(text);
    assert.strictEqual(result, "No leading whitespace.");
  });
});

describe("Testing 'indent' function", () => {
  it("should indent text with default predicate", () => {
    const text = "Apple\nBanana\nCherry\nElderberry\nMango";
    const result = indent(text, "- ");
    assert.strictEqual(result, "- Apple\n- Banana\n- Cherry\n- Elderberry\n- Mango");
  });

  it("should indent a single line", () => {
    const text = "Mango"
    const result = indent(text, "- ");
    assert.strictEqual(result, "- Mango");
  });

  it("should indent if lines start with \"A\"", () => {
    const text = "Apple\nBanana\nCherry\nElderberry\nMango";
    const result = indent(text, "- ", lines => lines.startsWith("A"));
    assert.strictEqual(result, "- Apple\nBanana\nCherry\nElderberry\nMango");
  });

  it("should indent if lines length is <= 5 ", () => {
    const text = "Apple\nBanana\nCherry\nElderberry\nMango";
    const result = indent(text, "- ", lines => lines.length <= 5);
    assert.strictEqual(result, "Apple\nBanana\nCherry\nElderberry\n- Mango");
  });

  it("should indent if lines include string \"a\"", () => {
    const text = "Apple\nBanana\nCherry\nElderberry\nMango";
    const result = indent(text, "- ", lines => lines.includes("a"));
    assert.strictEqual(result, "Apple\n- Banana\nCherry\nElderberry\n- Mango");
  });

  it("should not indent text empty lines", () => {
    const text = "Apple\n\nBanana\n\nCherry";
    const result = indent(text, "- ");
    assert.strictEqual(result, "- Apple\n\n- Banana\n\n- Cherry");
  });

  it("should indent text empty lines", () => {
    const text = "Apple\n\nBanana\n\nCherry";
    const result = indent(text, "- ", lines => true);
    assert.strictEqual(result, "- Apple\n- \n- Banana\n- \n- Cherry");
  });
});
