# Page snapshot

```yaml
- alert
- dialog:
  - heading "Build Error" [level=1]
  - paragraph: Failed to compile
  - text: Next.js (14.2.5) is outdated
  - link "(learn more)":
    - /url: https://nextjs.org/docs/messages/version-staleness
  - link "src/app/layout.tsx":
    - text: src/app/layout.tsx
    - img
  - text: "An error occurred in `next/font`. Error: Malformed PostCSS Configuration at /Users/ryota/VScode/suptia-cms/suptia-frontend/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:151:19 at Array.forEach (<anonymous>) at getPostCssPlugins (/Users/ryota/VScode/suptia-cms/suptia-frontend/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:125:13) at async /Users/ryota/VScode/suptia-cms/suptia-frontend/node_modules/next/dist/build/webpack/config/blocks/css/index.js:124:36 at async /Users/ryota/VScode/suptia-cms/suptia-frontend/node_modules/next/dist/build/webpack/loaders/next-font-loader/index.js:86:33 at async Span.traceAsyncFn (/Users/ryota/VScode/suptia-cms/suptia-frontend/node_modules/next/dist/trace/trace.js:154:20)"
  - contentinfo:
    - paragraph: This error occurred during the build process and can only be dismissed by fixing the error.
```