export const pick = function(obj: Record<string, any>, keys: string[]) {
  return keys.reduce(
    (acc, key) => {
      if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};
