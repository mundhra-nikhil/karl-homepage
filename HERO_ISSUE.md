# Unoptimized Hero Media

**Smell:** The hero section uses a raw `<video>` tag for a background video, and standard `a href="#"` for its primary CTA.

**Why it's a problem:** Background videos can drastically impact First Contentful Paint (FCP) and Largest Contentful Paint (LCP). `a href="#"` is an anti-pattern for CTAs that don't actually navigate anywhere yet.

**Fix:** Ensure the video uses a `<link rel="preload">` tag in the document head for faster loading, or provide a `poster` image to show while the video buffers. Replace the `#` link with a proper Next.js `<Link>` or a `<button>` if it triggers a modal.
