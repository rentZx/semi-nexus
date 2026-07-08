# SemiNexus Deployment

This project is a Vite static frontend. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds `dist/` and deploys it to your server when `main` is pushed.

## GitHub Secrets

Add these secrets in GitHub:

- `SERVER_HOST`: server IP or domain
- `SERVER_USER`: SSH user, for example `deploy`
- `SERVER_SSH_KEY`: private key for SSH login
- `SERVER_PORT`: SSH port, usually `22`
- `SERVER_DEPLOY_PATH`: deploy root, for example `/var/www/semi-nexus`

## Server Directory

Create the deploy directory on the server:

```bash
sudo mkdir -p /var/www/semi-nexus/releases
sudo chown -R deploy:deploy /var/www/semi-nexus
```

The workflow publishes each release under:

```text
/var/www/semi-nexus/releases/<timestamp>
```

and updates:

```text
/var/www/semi-nexus/current
```

## Nginx Example

Point Nginx to the `current` symlink:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/semi-nexus/current;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Then test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Deploy

Commit and push to `main`:

```bash
git push origin main
```

GitHub Actions will build and deploy automatically. You can also run the workflow manually from the GitHub Actions page.
