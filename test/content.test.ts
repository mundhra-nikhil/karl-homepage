import assert from "assert";
import { processArticleHtml } from "../lib/data/docs/content";

describe("processArticleHtml", () => {
  it("should convert p > strong to h2", () => {
    const input = "<p><strong>Heading Text</strong></p>";
    const result = processArticleHtml(input);
    assert.strictEqual(result.cleanHtml, '<h2 id="heading-text">Heading Text</h2>');
  });

  it("should extract headings and assign unique and clean IDs", () => {
    const input = "<h2>Heading 1</h2><p>some content</p><h2>Heading 2</h2>";
    const result = processArticleHtml(input);
    
    assert.strictEqual(result.headings.length, 2);
    assert.strictEqual(result.headings[0].text, "Heading 1");
    assert.strictEqual(result.headings[0].id, "heading-1");
    assert.strictEqual(result.headings[1].text, "Heading 2");
    assert.strictEqual(result.headings[1].id, "heading-2");
  });

  it("should handle duplicate heading text by appending numeric counters", () => {
    const input = "<h2>Duplicate</h2><h2>Duplicate</h2>";
    const result = processArticleHtml(input);
    
    assert.strictEqual(result.headings.length, 2);
    assert.strictEqual(result.headings[0].id, "duplicate");
    assert.strictEqual(result.headings[1].id, "duplicate-1");
  });

  it("should remove Table of Contents paragraphs with attributes", () => {
    const input = "<p>Table of Contents</p><p class=\"MsoNormal\"><strong>Table of Contents</strong></p><h2>Actual Header</h2>";
    const result = processArticleHtml(input);
    
    assert.ok(!result.cleanHtml.includes("Table of Contents"));
    assert.strictEqual(result.headings.length, 1);
    assert.strictEqual(result.headings[0].text, "Actual Header");
  });
});
