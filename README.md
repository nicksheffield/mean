# Mean
by Nick Sheffield

---

## Install

```
git clone https://github.com/nicksheffield/mean.git
cd mean
npm install
```

Then run index.js with node, nodemon, forever, pm2, whatever you like.

---

## Generator

```
node generate --help
```

```
Usage: generate [options] <name>

Options:

  -h, --help          output usage information
  -V, --version       output the version number
  -n, --n-controller  Make an Express controller
  -m, --model         Make a Mongoose model
  -e, --event         Make a Socket.io event
  -a, --a-controller  Make an Angular controller
  -r, --resource      Make an Angular resource
  -d, --directive     Make an Angular directive
  -f, --filter        Make an Angular filter
  -s, --service       Make an Angular service
```

The generator.js file is capable of creating most of the necessary files you will need to build your mean project. This includes mongodb models, restful express controllers, and angular resources, among other things.

eg. Creating an angular resource, an express controller, and a mongodb model for a user.

```
node generate -nrm user
```

---

##Todo:

-	Add passport