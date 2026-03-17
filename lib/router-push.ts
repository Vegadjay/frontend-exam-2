export const routerPush = (pathname: string) => {
  if (typeof window !== "undefined") {
    window.location.href = `/${pathname}`;
  }
};
