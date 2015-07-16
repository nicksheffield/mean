# Mean
by Nick Sheffield

---

## Install

```
$ git clone https://github.com/nicksheffield/mean.git
$ cd mean
$ npm install
```

Then run index.js with node, nodemon, forever, pm2, whatever you like.

---

## Generator

```
$ node generate --help

    Usage: generate [options] <name>
    
    Options:
    
      -h, --help          output usage information
      -V, --version       output the version number
      -n, --n-controller  make an Express controller
      -m, --model         make a Mongoose model
      -e, --event         make a Socket.io event
      -a, --a-controller  make an Angular controller
      -r, --resource      make an Angular resource
      -d, --directive     make an Angular directive
      -f, --filter        make an Angular filter
      -s, --service       make an Angular service
      -o, --sublime       open newly created files in sublime
```

The generator.js file is capable of creating most of the necessary files you will need to build your mean project. This includes mongodb models, restful express controllers, and angular resources, among other things.

**The -o flag will only work if you have a "sublime" command to open files in sublime**

eg. Creating an angular resource, an express controller, and a mongodb model for a user.

```
$ node generate -nrm user

    Creating 3 new files:
    new server/controllers/user.js
    new server/models/user.js
    new client/app/resources/User.js
```

---

##Todo:

-	Add passport
- Add 404 if resource doesn't exist. ie, GET /api/user/55a5cdb8d1cc4e6d28a2a3cd