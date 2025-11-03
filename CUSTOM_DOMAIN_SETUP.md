# Custom Domain Setup for GitHub Pages

This repository is configured to use the custom domain **dhinoix.com** with GitHub Pages.

## What's Currently Configured

✅ Created `public/CNAME` file with domain `dhinoix.com`
✅ Updated `vite.config.ts` to use `/` base path for custom domain
✅ Configured GitHub Actions workflow to deploy to GitHub Pages

## DNS Configuration Required

To make the custom domain work, you need to configure DNS records at your domain registrar:

### Option 1: Using A Records (Apex Domain)

Add the following A records for `dhinoix.com`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Option 2: Using AAAA Records (Apex Domain - IPv6)

Optionally, you can also add AAAA records:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### Option 3: Using CNAME Record (www subdomain)

For the `www` subdomain:

```
www.dhinoix.com -> tech-roll.github.io
```

## Accessing the Site

After DNS propagation (typically 10 minutes to 48 hours), the site will be accessible at:

- `https://dhinoix.com`
- `https://www.dhinoix.com` (if CNAME is configured)

## GitHub Pages Settings

After deploying, you should verify the custom domain in GitHub Pages settings:

1. Go to repository Settings → Pages
2. Ensure the custom domain shows as `dhinoix.com`
3. Enable "Enforce HTTPS" once the domain is verified

## References

- [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Verifying Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
