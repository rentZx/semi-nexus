# SemiNexus Deployment

This project is a Vite static frontend. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds `dist/` and deploys it to your server when `main` is pushed.

## Live Deployment

- **Server**: 49.233.197.213 (Tencent Cloud CVM, Ubuntu 24.04)
- **URL**: http://49.233.197.213:3002
- **Nginx config**: `/etc/nginx/sites-available/semi-nexus` (port 3002)
- **Deploy root**: `/var/www/semi-nexus`
- **Current symlink**: `/var/www/semi-nexus/current` → latest release
- **Releases**: `/var/www/semi-nexus/releases/<timestamp>`

## GitHub Secrets

Secrets configured in `rentZx/semi-nexus`:

| Secret | Value |
|--------|-------|
| `SERVER_HOST` | `49.233.197.213` |
| `SERVER_USER` | `ubuntu` |
| `SERVER_PORT` | `22` |
| `SERVER_SSH_KEY` | ed25519 private key (`github_actions_seminexus`) |
| `SERVER_DEPLOY_PATH` | `/var/www/semi-nexus` |

## Server Directory

Each release is published under:

```text
/var/www/semi-nexus/releases/<timestamp>
```

and the `current` symlink is updated:

```text
/var/www/semi-nexus/current → /var/www/semi-nexus/releases/<latest>
```

## Nginx Config

```nginx
server {
    listen 3002;
    server_name _;

    root /var/www/semi-nexus/current;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## Deploy

Commit and push to `main`:

```bash
git push origin main
```

GitHub Actions will build and deploy automatically. You can also run the workflow manually from the GitHub Actions page.
