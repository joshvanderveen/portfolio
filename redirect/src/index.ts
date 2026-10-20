// Permanently redirects www.joshvdv.com to the same path on joshvdv.com.
export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'joshvdv.com';
    return Response.redirect(url.toString(), 301);
  },
};
