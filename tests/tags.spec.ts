import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Food Bringer" }).click();
  await expect(page.getByRole("link", { name: "Dollars Store" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Love Me" })).toBeVisible();
  await page.getByRole("link", { name: "Love Me" }).click();
  await expect(page.getByRole("heading")).toContainText("Love Me");
});
