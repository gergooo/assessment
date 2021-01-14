'use strict';

require('chai').should();
const { Builder, By, Key } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

describe('E2E tests', function () {
  let driver, inputField, submitButton, output;

  before(async function () {
    driver = await startDriver();
    await driver.get(`file:///${__dirname}/../index.html`);
    ({ inputField, submitButton, output } = await findElementsOnPage(driver));
  });

  context('happy path', function () {
    it('phrase is shown when pressing Submit', async function () {
      await inputField.sendKeys('10');
      await submitButton.click();

      (await output.getText()).should.equal('ten');
    });

    it('phrase is shown when pressing Enter', async function () {
      await inputField.sendKeys('66');
      await inputField.sendKeys(Key.RETURN);

      (await output.getText()).should.equal('sixty-six');
    });

    it('works with negative numbers', async function () {
      await inputField.sendKeys('-100');
      await submitButton.click();

      (await output.getText()).should.equal('minus one hundred');
    });
  });

  context('error handling', function () {
    it('shows error message on empty input field', async function () {
      await submitButton.click();

      (await output.getText()).should.equal('Please enter a valid integer.');
    });

    it('shows error message on too large number', async function () {
      await inputField.sendKeys('1000000000000000');
      await submitButton.click();

      (await output.getText()).should.equal(
        'Please enter an integer smaller than 999,999,999,999,999.'
      );
    });

    it('shows error message on too small number', async function () {
      await inputField.sendKeys('-1000000000000000');
      await submitButton.click();

      (await output.getText()).should.equal(
        'Please enter an integer larger than -999,999,999,999,999.'
      );
    });

    it('shows error message on invalid number', async function () {
      await inputField.sendKeys('13blab');
      await submitButton.click();

      (await output.getText()).should.equal('Please enter a valid integer.');
    });

    it('shows error message on fractional', async function () {
      await inputField.sendKeys('13.66');
      await submitButton.click();

      (await output.getText()).should.equal('Please enter a valid integer.');
    });
  });

  afterEach(async function () {
    inputField.clear();
  });

  after(async function () {
    driver.quit();
  });

  async function startDriver() {
    process.env.path = process.env.path + ';node_modules/geckodriver/';

    const options = new firefox.Options();
    options.addArguments('-headless');

    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();

    return driver;
  }

  async function findElementsOnPage(driver) {
    const inputField = await await driver.findElement(By.id('input'));
    const submitButton = await driver.findElement(By.id('submit'));
    const output = await driver.findElement(By.className('output'));

    return { inputField, submitButton, output };
  }
});
