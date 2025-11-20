export default function cookieExtractor(req: any): string | null {
  if (req && req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
}
