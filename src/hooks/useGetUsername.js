export const useGetUsername = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("username");
  } else {
    return null;
  }
};
