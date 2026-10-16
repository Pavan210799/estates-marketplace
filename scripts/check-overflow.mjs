import { chromium } from "playwright";

const BASE = process.env.PREVIEW_URL || "http://127.0.0.1:4173";

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
];

const ROUTES = [
  "/login",
  "/register",
  "/",
  "/listings",
  "/property/marine-atelier",
  "/agents",
  "/wishlist",
  "/compare",
  "/submit",
];

function audit(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const docW = document.documentElement.scrollWidth;
    const bodyW = document.body.scrollWidth;
    const overflow = Math.max(docW, bodyW) - vw;

    const sticky = [];
    for (const el of document.querySelectorAll("[class*='sticky'], header")) {
      const style = getComputedStyle(el);
      if (style.position !== "sticky" && el.tagName !== "HEADER") continue;
      const r = el.getBoundingClientRect();
      if (r.width > vw + 1) {
        sticky.push(`header/sticky width=${Math.round(r.width)} vw=${vw}`);
        break;
      }
    }

    return { vw, docW, bodyW, overflow, sticky };
  });
}

const browser = await chromium.launch();
const context = await browser.newContext();
await context.addInitScript(() => {
  localStorage.setItem(
    "estates.session",
    JSON.stringify({ name: "Layout Audit", email: "audit@estates.in" }),
  );
  localStorage.setItem(
    "estates.wishlist.byUser",
    JSON.stringify({ "audit@estates.in": ["marine-atelier", "pali-crest"] }),
  );
  localStorage.setItem(
    "estates.compare.byUser",
    JSON.stringify({ "audit@estates.in": ["marine-atelier", "pali-crest"] }),
  );
});

const failures = [];

for (const vp of VIEWPORTS) {
  const page = await context.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });

  for (const route of ROUTES) {
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 25000 });
      await page.waitForTimeout(route === "/" ? 1500 : 700);
      const result = await audit(page);
      if (result.overflow > 1 || result.sticky.length) {
        failures.push({ vp: vp.name, route, ...result });
      }
    } catch (error) {
      failures.push({ vp: vp.name, route, error: String(error) });
    }
  }
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error("Layout audit failures:\n", JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(`Layout audit passed (${VIEWPORTS.length} viewports × ${ROUTES.length} routes).`);
