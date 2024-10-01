import { test, expect } from "@playwright/test";

test("prev-next navigation", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  // Front Page
  await expect(
    page.getByRole("link", { name: "Next comic" }),
  ).not.toBeVisible();
  await expect(
    page.getByRole("link", { name: "Previous comic" }),
  ).toBeVisible();
  await expect(page.getByRole("heading")).toContainText("Dollars Store");
  await expect(
    page.getByRole("img", { name: "Dollars Store sorrowbacon" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Food Bringer" })).toBeVisible();
  await expect(page.getByRole("link", { name: "The Cashier" })).toBeVisible();
  await page.getByRole("link", { name: "Previous comic" }).click();
  // Second Page
  await expect(page.getByRole("heading")).toContainText("Kitten Reason");
  await expect(page.getByRole("link", { name: "Next comic" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Previous comic" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Previous comic" }).click();
  // Third Page
  await expect(page.getByRole("heading")).toContainText("Werewolf Care");
});
