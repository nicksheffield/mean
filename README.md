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

To create a new resource type, and a pathway between angular and mongodb, I have included a generator.

For example, making a blog, you might want users, posts and comments. You can create a mongodb model, a restful api, and an angular resource in one go.

eg. from within the root directory of the project
```
node generate user
```

---

##Todo:

-	Add passport