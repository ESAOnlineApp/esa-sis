// @ts-check
import { test, expect } from '@playwright/test';
// import {Eyes, Target} from '@applitools/eyes-playwright';

test('checking Validation', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('');

  await page.getByTestId('password').fill('');

  await page.getByRole('button').click();

  await expect(page).not.toHaveURL(/admin/);

  const errorEmail = page.getByTestId('errorEmail');

  const errPassword = page.getByTestId('errorPassword');

  await expect(errorEmail).toBeTruthy();

  await expect(errPassword).toBeTruthy();
});

test('checking Logout admin', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('1');

  await page.getByTestId('password').fill('shop?123');

  await page.getByRole('button').click();

  await expect(page).toHaveURL(/admin/);

  await page.getByTestId('img').click();

  await page.getByText('Logout').click();

  await expect(page).toHaveURL(`${process.env.NEXTAUTH_URL}`);
});

test('checking Password Validation', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('test@test.com');

  await page.getByTestId('password').fill('asd');

  await page.getByRole('button').click();

  await expect(page).not.toHaveURL(/admin/);

  // const errorEmail = page.getByTestId('errorEmail')

  const errPassword = page.getByTestId('errorPassword');

  await expect(errPassword).toHaveText('password is more than 6 chars');
});

test('checking Info', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('test@test.com');

  await page.getByTestId('password').fill('asdasdasd');

  await page.getByRole('button').click();

  await expect(page).not.toHaveURL(/admin/);

  const errorInfo = page.getByTestId('error');

  await expect(errorInfo).toHaveText('user does not exist');
});

test('checking Login admin', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('1');

  await page.getByTestId('password').fill('shop?123');

  await page.getByRole('button').click();

  await expect(page).toHaveURL(/admin/);
});

test('checking Login program Manager', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('PM1000');

  await page.getByTestId('password').fill('shop?123');

  await page.getByRole('button').click();

  await expect(page).toHaveURL(/programManager/);
});
test('checking Logout program Manager', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('PM1000');

  await page.getByTestId('password').fill('shop?123');

  await page.getByRole('button').click();

  await expect(page).toHaveURL(/programManager/);

  await page.getByTestId('img').click();

  await page.getByText('Logout').click();

  await expect(page).toHaveURL(`${process.env.NEXTAUTH_URL}`);
});

test('checking Login student', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('23106408');

  await page.getByTestId('password').fill('shop?123');

  await page.getByRole('button').click();

  await expect(page).toHaveURL(/student/);
});

test('checking Logout Student', async ({ page }) => {
  test.setTimeout(0);
  await page.goto(`${process.env.NEXTAUTH_URL}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESA SIS - Login/);

  await page.getByTestId('username').fill('23106408');

  await page.getByTestId('password').fill('shop?123');

  await page.getByRole('button').click();

  await expect(page).toHaveURL(/student/);

  await page.getByTestId('img').click();

  await page.getByText('Logout').click();

  await expect(page).toHaveURL(`${process.env.NEXTAUTH_URL}`);
});
