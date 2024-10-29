export { };

type Metadata = {
  isAdmin?: true
}

// this is from clerk, so only change this once changing the settings in clerk
declare global {
  interface CustomJwtSessionClaims {
    userId: string;
    metadata: Metadata
  }
}