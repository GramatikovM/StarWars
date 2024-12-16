export const checkCacheValidity = (): boolean => {
  const expiryTime = localStorage.getItem("CACHE_EXPIRY_KEY");
  if (!expiryTime) return false;
  return Date.now() < parseInt(expiryTime, 10);
};
