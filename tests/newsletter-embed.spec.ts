import { expect, test } from "@playwright/test";

test("newsletter signup stays in the current tab", async ({ page }) => {
  await page.goto("http://localhost:3000/newsletter");

  await expect(page.getByRole("heading", { name: "Get Updates!" })).toBeVisible();
  await expect(page.locator('iframe[src*="substack.com/embed"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Subscribe on Substack" })).toHaveAttribute(
    "href",
    "https://millieho.substack.com/subscribe",
  );
  await expect(page.getByRole("link", { name: "Subscribe on Substack" })).toHaveAttribute(
    "target",
    "_self",
  );
});
