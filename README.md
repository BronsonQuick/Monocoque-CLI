# Monocoque CLI

A command line application to generate `docker-compose.yml` files using [Monocoque](https://hub.docker.com/r/monocoque/monocoque) Docker images for your local WordPress development environments.

# Installation
```
# Install globally:
npm install -g @monocoque/monocoque

# Run it

monocoque
```

## TODO

- Prompt for WordPress installation details. e.g. 'Single Site, Multisite with subomains, Multisite with subfolders' and install with WP-CLI.
- Add the ability to use custom domains using VIRTUAL_HOST environmental variables and Nginx Proxy.
- Use [hostile](https://www.npmjs.com/package/hostile) to manage host entries. 