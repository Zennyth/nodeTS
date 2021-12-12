enum Roles {
  WEBSOCKET_R,
  API_W,
}

const formatEnumToNumber = (enumerator) => {
  return Object.keys(enumerator).filter(key => !isNaN(Number(enumerator[key])));
}

const permissions: Map<Roles, string> = new Map<Roles, string>();
for (const role in formatEnumToNumber(Roles)) {
  permissions.set(Number(role), process.env[Roles[role]]);
}

const hasAccess = (key: string, role: Roles): boolean => {
  return key === permissions.get(role);
}

export {
  Roles,
  hasAccess
}