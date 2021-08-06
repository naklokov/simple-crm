import { adminRole } from "../helpers/roles";
import { BASE_URL } from "../helpers/constants";

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/design?projectId=10003
fixture`Валидация`;

test("OLVETEST-T115", async (t) => {
  t.useRole(adminRole).page(BASE_URL);
});
