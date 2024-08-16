const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');

        await driver.wait(until.elementLocated(By.id('email')), 10000).sendKeys('hamza@gmail.com');
        await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('12345678');
        await driver.wait(until.elementLocated(By.css('.login-btn')), 10000).click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[2]/a')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.add-team-btn')), 10000).click();

        await driver.wait(until.elementLocated(By.id('team-name')), 10000).sendKeys('Oman');
        await driver.wait(until.elementLocated(By.id('country-name')), 10000).sendKeys('Oman');
        await driver.wait(until.elementLocated(By.xpath('(//input[@id="country-name"])[2]')), 10000).sendKeys('https://t4.ftcdn.net/jpg/08/31/97/61/360_F_831976180_KhmluVDpIU3c0huJCMexxp9K4K5RsmPO.jpg');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/div/form/div/div[2]/button')), 10000).click();

        await driver.executeScript('window.scrollTo(0, 0)');

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/table/tbody/tr[11]/td[4]/button[1]')), 10000).click();
        await driver.wait(until.elementLocated(By.id('player-name')), 10000).sendKeys('Husnain Khan');
        await driver.wait(until.elementLocated(By.id('player-age')), 10000).sendKeys('23');
        await driver.wait(until.elementLocated(By.id('player-shirt-number')), 10000).sendKeys('54');
        await driver.wait(until.elementLocated(By.css('select')), 10000).sendKeys('Bowler');
        await driver.wait(until.elementLocated(By.id('player-identity-number')), 10000).sendKeys('5463892004');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/div/form/div/div[2]/button')), 10000).click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/table/tbody/tr[11]/td[4]/button[2]/img')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.update-modal-btn')), 10000).click();
        await driver.wait(until.elementLocated(By.id('company-name')), 10000).click();
        await driver.findElement(By.id('company-name')).sendKeys('26');
        await driver.wait(until.elementLocated(By.xpath('(//input[@id="country-name"])[2]')), 10000).click();
        await driver.findElement(By.xpath('(//input[@id="country-name"])[2]')).sendKeys('51');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div[3]/div/div/form/div/div[2]/button')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.MuiModal-backdrop')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.nav-link:nth-child(3) > .nav-links')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.page-item:nth-child(5) span:nth-child(1)')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.page-item:nth-child(5) span:nth-child(1)')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.nav-link:nth-child(4) > .nav-links')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.add-team-btn')), 10000).click();
        await driver.wait(until.elementLocated(By.id('umpire-name')), 10000).click();
        await driver.findElement(By.id('umpire-name')).sendKeys('Zap King');
        await driver.findElement(By.id('umpire-description')).sendKeys('he is 20+ years experienced');
        await driver.findElement(By.id('umpire-image-url')).sendKeys('https://cdn.shopify.com/s/files/1/0278/4565/6649/files/WhatsApp_Image_2024-04-23_at_23.46.14.webp?v=1713896815');
        await driver.findElement(By.id('umpire-identity-no')).sendKeys('56738920234');
        await driver.wait(until.elementLocated(By.css('.btn-success')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.card:nth-child(8) path')), 10000).click();
        await driver.wait(until.elementLocated(By.id('country-name')), 10000).sendKeys('he is 20+ experienced with gold medal');
        await driver.wait(until.elementLocated(By.css('.btn-success')), 10000).click();

        await driver.wait(until.elementLocated(By.linkText('Venue')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.nav-link:nth-child(5) > .nav-links')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.add-team-btn')), 10000).click();
        await driver.wait(until.elementLocated(By.id('umpire-name')), 10000).click();
        await driver.findElement(By.id('umpire-name')).sendKeys('Australia');
        await driver.findElement(By.id('umpire-stadium')).sendKeys('MCG');
        await driver.findElement(By.id('umpire-image-url')).sendKeys('https://www.austadiums.com/stadiums/photos/MCG-aerial-2021.jpg');
        await driver.wait(until.elementLocated(By.css('.btn-success')), 10000).click();

        await driver.executeScript('window.scrollTo(0, 0)');
        await driver.wait(until.elementLocated(By.css('.card:nth-child(5) svg')), 10000).click();
        await driver.wait(until.elementLocated(By.id('country-name')), 10000).sendKeys('MCG (Melbourne)');
        await driver.wait(until.elementLocated(By.css('.btn-success')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.nav-link:nth-child(6) > .nav-links')), 10000).click();
        await driver.wait(until.elementLocated(By.css('.add-team-btn')), 10000).click();
        await driver.wait(until.elementLocated(By.id('team1')), 10000).click();
        await driver.findElement(By.id('team1')).sendKeys('England');
        await driver.findElement(By.id('team2')).sendKeys('USA');
        await driver.findElement(By.id('umpire1')).sendKeys('Bili Bowdern');
        await driver.wait(until.elementLocated(By.css('.form-section')), 10000).click();
        await driver.findElement(By.id('umpire2')).sendKeys('Jack');
        await driver.findElement(By.id('umpire3')).sendKeys('Nigle Lliong');
        await driver.findElement(By.id('venue')).sendKeys('Australia');
        await driver.findElement(By.id('dateAndTime')).sendKeys('2024-08-29T16:19');
        await driver.wait(until.elementLocated(By.css('.add-team-btn-div:nth-child(29) > .add-team-btn')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.card:nth-child(30) path')), 10000).click();
        await driver.findElement(By.id('umpire1')).sendKeys('Sangarkara');
        await driver.findElement(By.id('umpire3')).sendKeys('Marais Emarus');
        await driver.findElement(By.id('dateAndTime')).sendKeys('2024-08-30T11:19');
        await driver.wait(until.elementLocated(By.css('.add-team-btn-div:nth-child(29) > .add-team-btn')), 10000).click();

        await driver.wait(until.elementLocated(By.css('.btn')), 10000).click();
        await new Promise(resolve => setTimeout(resolve, 8000));

    } finally {
        await driver.quit();
    }
})();


const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');

        // Wait for email input and send keys
        let emailElement = await driver.wait(until.elementLocated(By.id('email')), 10000);
        await driver.wait(until.elementIsVisible(emailElement), 10000);
        await emailElement.sendKeys('hamza@gmail.com');

        // Wait for password input and send keys
        let passwordElement = await driver.wait(until.elementLocated(By.id('password')), 10000);
        await driver.wait(until.elementIsVisible(passwordElement), 10000);
        await passwordElement.sendKeys('12345678');

        // Wait for login button and click
        let loginBtn = await driver.wait(until.elementLocated(By.css('.login-btn')), 10000);
        await driver.wait(until.elementIsVisible(loginBtn), 10000);
        await loginBtn.click();

        // Wait for navigation link and click
        let navLink = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[2]/a')), 10000);
        await driver.wait(until.elementIsVisible(navLink), 10000);
        await navLink.click();

        // Wait for add team button and click
        let addTeamBtn = await driver.wait(until.elementLocated(By.css('.add-team-btn')), 10000);
        await driver.wait(until.elementIsVisible(addTeamBtn), 10000);
        await addTeamBtn.click();

        // Wait for team name input and send keys
        let teamNameElement = await driver.wait(until.elementLocated(By.id('team-name')), 10000);
        await driver.wait(until.elementIsVisible(teamNameElement), 10000);
        await teamNameElement.sendKeys('Oman');

        // Wait for country name input and send keys
        let countryNameElement = await driver.wait(until.elementLocated(By.id('country-name')), 10000);
        await driver.wait(until.elementIsVisible(countryNameElement), 10000);
        await countryNameElement.sendKeys('Oman');

        // Wait for image URL input and send keys
        let imageUrlElement = await driver.wait(until.elementLocated(By.xpath('(//input[@id="country-name"])[2]')), 10000);
        await driver.wait(until.elementIsVisible(imageUrlElement), 10000);
        await imageUrlElement.sendKeys('https://t4.ftcdn.net/jpg/08/31/97/61/360_F_831976180_KhmluVDpIU3c0huJCMexxp9K4K5RsmPO.jpg');

        // Wait for submit button and click
        let submitBtn = await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/div/form/div/div[2]/button')), 10000);
        await driver.wait(until.elementIsVisible(submitBtn), 10000);
        await submitBtn.click();

        // Close modal
        let closeModalBtn1 = await driver.wait(until.elementLocated(By.css('.MuiModalClose-root')), 10000);
        await driver.wait(until.elementIsVisible(closeModalBtn1), 10000);
        await closeModalBtn1.click();

        // Scroll to the top
        // await driver.executeScript('window.scrollTo(0, -200)');

        // Wait for add player button and click
        let addPlayerBtn = await driver.wait(until.elementLocated(By.css('.btn-success')), 10000);
        await driver.wait(until.elementIsVisible(addPlayerBtn), 10000);
        await addPlayerBtn.click();

        // Fill out player information
        let playerNameElement = await driver.wait(until.elementLocated(By.id('player-name')), 10000);
        await driver.wait(until.elementIsVisible(playerNameElement), 10000);
        await playerNameElement.sendKeys('Husnain Khan');

        let playerAgeElement = await driver.wait(until.elementLocated(By.id('player-age')), 10000);
        await driver.wait(until.elementIsVisible(playerAgeElement), 10000);
        await playerAgeElement.sendKeys('23');

        let playerShirtNumberElement = await driver.wait(until.elementLocated(By.id('player-shirt-number')), 10000);
        await driver.wait(until.elementIsVisible(playerShirtNumberElement), 10000);
        await playerShirtNumberElement.sendKeys('54');

        let playerRoleElement = await driver.wait(until.elementLocated(By.css('select')), 10000);
        await driver.wait(until.elementIsVisible(playerRoleElement), 10000);
        await playerRoleElement.sendKeys('Bowler');

        let playerIdentityNumberElement = await driver.wait(until.elementLocated(By.id('player-identity-number')), 10000);
        await driver.wait(until.elementIsVisible(playerIdentityNumberElement), 10000);
        await playerIdentityNumberElement.sendKeys('5463892004');

        // Submit player information
        let playerSubmitBtn = await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/div/form/div/div[2]/button')), 10000);
        await driver.wait(until.elementIsVisible(playerSubmitBtn), 10000);
        await playerSubmitBtn.click();

        // Close modal
        let closeModalBtn2 = await driver.wait(until.elementLocated(By.css('.MuiModalClose-root')), 10000);
        await driver.wait(until.elementIsVisible(closeModalBtn2), 10000);
        await closeModalBtn2.click();

        // Wait for edit player button and click
        let editPlayerBtn = await driver.wait(until.elementLocated(By.css('./view-btn')), 10000);
        await driver.wait(until.elementIsVisible(editPlayerBtn), 10000);
        await editPlayerBtn.click();

        // Wait for update button and click
        let updateModalBtn = await driver.wait(until.elementLocated(By.css('.update-modal-btn')), 10000);
        await driver.wait(until.elementIsVisible(updateModalBtn), 10000);
        await updateModalBtn.click();

        // Wait for company name input and update value
        let companyNameElement = await driver.wait(until.elementLocated(By.id('company-name')), 10000);
        await driver.wait(until.elementIsVisible(companyNameElement), 10000);
        await companyNameElement.sendKeys('26');

        // Wait for country name input and update value
        let updateCountryNameElement = await driver.wait(until.elementLocated(By.xpath('(//input[@id="country-name"])[2]')), 10000);
        await driver.wait(until.elementIsVisible(updateCountryNameElement), 10000);
        await updateCountryNameElement.sendKeys('51');

        // Wait for submit update button and click
        let submitUpdateBtn = await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div[3]/div/div/form/div/div[2]/button')), 10000);
        await driver.wait(until.elementIsVisible(submitUpdateBtn), 10000);
        await submitUpdateBtn.click();

        // Close modal
        let closeModalBtn = await driver.wait(until.elementLocated(By.css('.MuiModal-backdrop')), 10000);
        await driver.wait(until.elementIsVisible(closeModalBtn), 10000);
        await closeModalBtn.click();

        // Navigate to umpire section
        let umpireNavLink = await driver.wait(until.elementLocated(By.css('.nav-link:nth-child(3) > .nav-links')), 10000);
        await driver.wait(until.elementIsVisible(umpireNavLink), 10000);
        await umpireNavLink.click();

        // Go to next page
        let nextPageBtn = await driver.wait(until.elementLocated(By.css('.page-item:nth-child(5) span:nth-child(1)')), 10000);
        await driver.wait(until.elementIsVisible(nextPageBtn), 10000);
        await nextPageBtn.click();
        await nextPageBtn.click();  // Click twice as in your original flow

        // Add new umpire
        let addUmpireBtn = await driver.wait(until.elementLocated(By.css('.add-team-btn')), 10000);
        await driver.wait(until.elementIsVisible(addUmpireBtn), 10000);
        await addUmpireBtn.click();

        // Fill out umpire information
        let umpireNameElement = await driver.wait(until.elementLocated(By.id('umpire-name')), 10000);
        await driver.wait(until.elementIsVisible(umpireNameElement), 10000);
        await umpireNameElement.sendKeys('Zap King');

        let umpireDescriptionElement = await driver.findElement(By.id('umpire-description'));
        await umpireDescriptionElement.sendKeys('he is 20+ years experienced');

        let umpireImageUrlElement = await driver.findElement(By.id('umpire-image-url'));
        await umpireImageUrlElement.sendKeys('https://cdn.shopify.com/s/files/1/0278/4565/6649/files/WhatsApp_Image_2024-04-23_at_23.46.14.webp?v=1713896815');

        let umpireIdentityNoElement = await driver.findElement(By.id('umpire-identity-no'));
        await umpireIdentityNoElement.sendKeys('56738920234');

        // Submit new umpire
        let umpireSubmitBtn = await driver.wait(until.elementLocated(By.css('.btn-success')), 10000);
        await driver.wait(until.elementIsVisible(umpireSubmitBtn), 10000);
        await umpireSubmitBtn.click();

        // Edit umpire details
        let editUmpireBtn = await driver.wait(until.elementLocated(By.css('.card:nth-child(8) path')), 10000);
        await driver.wait(until.elementIsVisible(editUmpireBtn), 10000);
        await editUmpireBtn.click();

        // Submit updates
        let umpireUpdateSubmitBtn = await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/div/form/div/div[2]/button')), 10000);
        await driver.wait(until.elementIsVisible(umpireUpdateSubmitBtn), 10000);
        await umpireUpdateSubmitBtn.click();

        // Wait before closing the browser
        await new Promise(resolve => setTimeout(resolve, 8000));

    } finally {
        await driver.quit();
    }
})();
