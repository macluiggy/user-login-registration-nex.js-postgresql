const areCredentialAvailable = (credentials: string[]): boolean =>
  credentials.every(Boolean);

export default areCredentialAvailable;
