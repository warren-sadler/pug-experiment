import * as cheerio from "cheerio";
import { renderTemplate } from "../src/render";

describe("renderTemplate", () => {
  it("returns a string", () => {
    return expect(
      renderTemplate("match", {
        title: "Meet your Provider",
        provider: { givenName: "Jim" },
        member: { giveName: "Pam" },
      })
    ).resolves.toBeDefined();
  });
  it("includes elements from the base index.pug", async () => {
    const template = await renderTemplate("match", {
      title: "Meet your Provider",
      provider: { givenName: "Jim" },
      member: { giveName: "Pam" },
    });
    const $ = cheerio.load(template);
    expect($("title").text()).toBe("Meet your Provider");
    expect($("h1").text()).toBe("Match Email");
    expect($("#providerName").text()).toBe("Jim");
  });
});
