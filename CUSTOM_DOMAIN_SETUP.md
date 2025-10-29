# Custom Domain Setup for GitHub Pages

This repository is configured to use the custom domain **dhinoix.com** with GitHub Pages.

## What's Already Done

✅ Created `CNAME` file in the `public` directory with domain `dhinoix.com`
✅ Updated `vite.config.ts` to use root path (`/`) instead of `/project-k/`
✅ Configured GitHub Actions workflow to deploy to GitHub Pages

## DNS Configuration Required

To complete the custom domain setup, you need to configure DNS records with your domain registrar for **dhinoix.com**:

### Option 1: Using an APEX Domain (Recommended)

If you want to use `dhinoix.com` (without www), add these DNS records:

1. **A Records** (for IPv4):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. **AAAA Records** (for IPv6):
   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

### Option 2: Using WWW Subdomain

If you want to use `www.dhinoix.com`:

1. **CNAME Record**:
   ```
   www.dhinoix.com -> tech-roll.github.io
   ```

2. **APEX Domain** (optional, to redirect apex to www):
   - Add the A/AAAA records above for `dhinoix.com`
   - Or configure a redirect from your registrar

### GitHub Pages Settings

After configuring DNS records:

1. Go to repository settings: `https://github.com/tech-roll/project-k/settings/pages`
2. Verify that Custom domain shows: `dhinoix.com`
3. Wait for DNS check to pass (may take a few minutes to a few hours)
4. Enable "Enforce HTTPS" once DNS propagation is complete

## Verification

After DNS propagation (usually 10 minutes to 48 hours):

1. Visit `https://dhinoix.com` to verify the site is accessible
2. Check that HTTPS is working properly
3. Confirm all assets and links are loading correctly

## Troubleshooting

- **DNS not propagating**: Use tools like `dig dhinoix.com` or `nslookup dhinoix.com` to check DNS records
- **HTTPS not working**: Wait for DNS to fully propagate before enabling HTTPS
- **404 errors**: Ensure the GitHub Actions workflow has completed successfully
- **Assets not loading**: Verify that the `base` path in `vite.config.ts` is set to `/`

## References

- [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Verifying Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
