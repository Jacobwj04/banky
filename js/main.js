class GetDataFromApi {
    url = "";
    data = null;

    constructor(newUrl) {
        this.url = newUrl
        console.log(this.url);
    }

    async getData() {
        if (this.data === null) {
            await fetch(this.url)
                .then(function (response) {
                    return response.json();
                }).then((data) => {
                    this.data = data;
                });
        }
        console.log(this.data);
        return this.data;

    }
}

class Header {
    headerElement;
    figureElement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement;
    avatarElement;
    avatarHeadElement;
    avatarBodyElement;

    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-sack-dollar";

        this.logoHeadingElement = document.createElement("h2");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "Banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "avatarWrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "avatar__head";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "avatar__body";
    }

    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);
    }
}

class BankyMain {
    placeToRenderBankyMain;
    leftSection;
    rightSection;

    constructor(placeToRenderBankyMain) {
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        /* Main */
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement, this);
    }

    makeButtonsFromData(data) {
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData(Object.entries(data)[0][0], data);
    }

    callFromRightSection(account,data){
        this.leftSection.makeTransactionsFromData(account, data);
    }

    render() {
        this.placeToRenderBankyMain.appendChild(this.mainElement);
        this.leftSection.render();
        this.rightSection.render();
    }
}

class BankyLeftSection {
    mainElement;

    constructor(mainElement) {
        this.mainElement = mainElement;
        /* Left Section */
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";

        this.eyeButtonElement = document.createElement("button");
        this.eyeButtonElement.classList = "banky__eyeButton";
        this.eyeButtonElement.onclick = this.eyeButtonClicked;

        this.eyeFigureElement = document.createElement("figure");
        this.eyeFigureElement.classList = "banky__eye";

        this.eyeIElement = document.createElement("i");
        this.eyeIElement.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";
    }

    eyeButtonClicked = () => {
        this.transactionsElement.classList.toggle("banky__transactions--blur");
        this.bankyLogoText.classList.toggle("banky__money--blur");
    }

    makeTransactionsFromData(accountToShow, data) {
        let totalMoney = 0;
        for(let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
        }

        this.bankyLogoText.innerText = "Saldo " + "€" + totalMoney;
        // empty ul before we make li
        this.transactionsElement.innerHTML = "";
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);
        for (let i = 0; i < data[accountToShow].length; i++) {
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";

            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = data[accountToShow][i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = data[accountToShow][i]["amount"];

            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFrom);
            this.transactionElement.appendChild(this.transactionAmount);
        }
    }

    render() {
        this.mainElement.appendChild(this.leftSectionElement);
        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);

        this.bankyHeaderElement.appendChild(this.eyeButtonElement);
        this.eyeButtonElement.appendChild(this.eyeFigureElement);
        this.eyeFigureElement.appendChild(this.eyeIElement);

        this.leftSectionElement.appendChild(this.transactionsElement);
        this.leftSectionElement.appendChild(this.transferButton);
    }
}

class BankyRightSection {
    mainElement;
    bankyMain;

    constructor(mainElement, bankyMain) {
        this.mainElement = mainElement;
        this.bankyMain = bankyMain;

        /* Right section */
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.accountsElement = document.createElement("ul");
        this.accountsElement.classList = "banky__accounts";
    }

    makeButtonsFromData(data) {
        Object.entries(data).forEach((entry) => {
            this.accountElement = document.createElement("li");
            this.accountElement.classList = "banky__account";
            this.accountElement.onclick = () => {
                this.bankyMain.callFromRightSection(entry[0], data);
            }

            this.bankySwitchButton = document.createElement("button")
            this.bankySwitchButton.classList = "banky__switchAccount";

            this.bankySwitchAccountFigure = document.createElement("figure");
            this.bankySwitchAccountFigure.classList = "banky__logo";

            this.bankySwitchI = document.createElement("i")
            this.bankySwitchI.classList = entry[1][0].icon;

            this.bankyNameOfAccount = document.createElement("h4");
            this.bankyNameOfAccount.classList = "banky__nameOfAccount";
            this.bankyNameOfAccount.innerText = entry[0];

            this.accountsElement.appendChild(this.accountElement);
            this.accountElement.appendChild(this.bankySwitchButton);
            this.bankySwitchButton.appendChild(this.bankySwitchAccountFigure);
            this.bankySwitchAccountFigure.appendChild(this.bankySwitchI);
            this.accountElement.appendChild(this.bankyNameOfAccount);
        })
    }

    render() {
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.accountsElement);
    }
}

class App {
    bankyHeader
    bankyMain;
    getDataFromApi;

    constructor() {
        this.bankyHeader = new Header("body");
        this.bankyMain = new BankyMain("body");

        this.getDataFromApi = new GetDataFromApi("./data/transactions.json");
        this.getDataFromApi.getData().then((data) => {
            this.bankyMain.makeTransactionsFromData(data);
            this.bankyMain.makeButtonsFromData(data);
        });

        this.bankyHeader.render();
        this.bankyMain.render();
    }
}

const app = new App();
