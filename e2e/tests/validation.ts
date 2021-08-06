import { adminRole } from "../helpers/roles";
import { clearAuthCookies } from "../helpers/utils";
import { BASE_URL } from "../helpers/constants";
import { addClientButton } from "../helpers/selectors";

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/design?projectId=10003
fixture`Валидация`.beforeEach(async (t) => {
  clearAuthCookies();
  await t.useRole(adminRole).navigateTo(BASE_URL);
});
// .page(CLIENTS_URL);

test("OLVETEST-T115", async (t) => {
  await t.click(addClientButton);

  // await t.expect();
});
