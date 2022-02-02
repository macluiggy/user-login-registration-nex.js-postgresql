const areCredentialAvailable = (
  credentials: (string | null | undefined)[]
): boolean => credentials.every(Boolean);

export default areCredentialAvailable;
