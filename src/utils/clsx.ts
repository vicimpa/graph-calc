export type TClass = string | null | undefined | [value: string, condition: any];

export const clsx = (...args: TClass[]) => {
  return args
    .map(arg => {
      if (!Array.isArray(arg))
        return arg;

      if (arg[1])
        return arg[0];
    })
    .filter(Boolean)
    .join(' ');
};