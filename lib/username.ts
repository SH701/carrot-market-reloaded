export function makeRandomUsername(baseUsername: string): string {
    const suffix = Math.floor(Math.random() * 9000) + 1000;
    return `${baseUsername}${suffix}`;
  }