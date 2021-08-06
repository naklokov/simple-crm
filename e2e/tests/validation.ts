import { adminRole } from "../helpers/roles";
import { clearAuthCookies } from "../helpers/utils";
import {
  BASE_URL,
  STUB_CLIENT_DATA,
  TEXT_OVER_1000_CHARS,
} from "../helpers/constants";
import { ClientCardPage } from "../helpers/pages";
import { getFieldByLabel } from "../helpers/selectors";

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/design?projectId=10003
fixture`Валидация`.beforeEach(async (t) => {
  clearAuthCookies();
  await t.useRole(adminRole).navigateTo(BASE_URL);
});

test("OLVETEST-T115", async (t) => {
  t.debug();
  const label = "Полное название";

  await ClientCardPage.addClient(STUB_CLIENT_DATA);
  await ClientCardPage.typeField(label, TEXT_OVER_1000_CHARS);
  await ClientCardPage.clickSave();

  await t.expect(getFieldByLabel(label));
});
