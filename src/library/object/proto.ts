export const proto = <T extends object>(target?: T | null) => {
  const output: object[] = [];

  if (!target)
    return output;

  const _proto = Object.getPrototypeOf(target);

  if (_proto) {
    output.push(_proto);
    output.push(...proto(_proto));
  }

  return output;
};