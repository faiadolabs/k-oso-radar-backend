# k-oso radar for Star Citizen

## Overview

[k-oso radar](https://github.com/faiadolabs/k-oso-radar) is a utility specifically designed for Star Citizen with the purpose of locating positions on planetary surfaces.

The idea is to place points of interest around a central reference point using a distance and heading vector relative to that center.

It is currently in the concept phase. You can access its [demo](https://faiadolabs.github.io/k-oso-radar/).

This subcomponent using WebSockets allows synchronizing point recognition between multiple users.

![client connection](doc/img/backend.png)

## Quick Start ()

```bash
docker run -p 3000:3000 faiadolabs/k-oso-radar-backend
```

Then you can hit [`http://localhost:3000`](http://localhost:3000) or `http://host-ip:3000` in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
