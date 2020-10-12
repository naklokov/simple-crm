import { Selector, t } from "testcafe";

export async function checkPageHeader(title, breadcrumbsText, buttonText) {
  await t.expect(Selector(".ant-breadcrumb").innerText).eql(breadcrumbsText);

  const pageHeader = Selector(".ant-page-header-heading");

  await t.expect(pageHeader.find("span").innerText).eql(title);

  if (buttonText) {
    const button = pageHeader.find("button");
    await t.expect(button.innerText).eql(buttonText);
    await t.expect(button.hasClass("ant-btn ant-btn-primary")).eql(true);
  }
}

export async function checkClientsPage() {
  await checkPageHeader("Клиенты", "Главная/Клиенты", "＋ Добавить клиента");
}
