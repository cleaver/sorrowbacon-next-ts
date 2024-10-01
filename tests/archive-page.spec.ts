import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Archive" }).click();
  await expect(page.getByRole("heading")).toContainText("Archive");
  await expect(page.getByRole("link", { name: "Dollars Store" })).toBeVisible();
  await expect(page.locator("main > article > section > ul li")).toHaveCount(
    20,
  );
  await expect(page.getByLabel("Page:")).toBeVisible();
  await expect(page.getByRole("link", { name: "Older" })).toBeVisible();
  await page.getByRole("link", { name: "Older" }).click();
  await expect(page.getByRole("link", { name: "Newer" })).toBeVisible();
});
