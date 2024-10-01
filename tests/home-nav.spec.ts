import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("test", async ({ page }) => {
  await page.getByRole("link", { name: "Home" }).click();
});

test("archive link", async ({ page }) => {
  await page.getByRole("link", { name: "Archive" }).click();
  await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible();
});

test("about link", async ({ page }) => {
  await page.getByRole("link", { name: "About" }).click();
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
});

test("contact link", async ({ page }) => {
  await page.getByRole("link", { name: "Contact" }).click();
  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
});

test("subscribe link", async ({ page }) => {
  await page.getByRole("link", { name: "Subscribe" }).click();
  await expect(page.getByPlaceholder("merp@example.com")).toBeVisible();
  await expect(page.getByPlaceholder("Friend Badger")).toBeVisible();
  await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
});
