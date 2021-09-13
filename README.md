# Static Generator Template

To start, you can use the GitHub template functionality to create a new repository with a clean git tree.

Name your new project repository accurately. That will be important on the step where we share a development Github Pages URL with our stakeholders.

[![image](https://user-images.githubusercontent.com/102277/130860179-1eb56b1c-e184-4ab5-95a5-5f37360d8ad6.png)](https://github.com/youthradio/static-nuxt-template/generate)

Use `git clone --recursive` to clone the main repository and also fetch the [base-components](https://github.com/youthradio/base-components) submodule

```bash
git clone --recursive git@github.com:youthradio/static-nuxt-template.git
```

## Build Setup

We're using yarn as package management. You could use npm, but you will need to changes some scripts on `package.json` not yet covered here.

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# export static files
$ yarn export

```
## Publish Setup

Publishing on Github Pages is automatic. After you push to main branch to GitHub, there is an [action worflow](https://github.com/youthradio/static-nuxt-template/blob/main/.github/workflows/main.yml) that will build and publish it under

`youthradio.github.io/YOUR_REPO_NAME`


## Backend

We use Google Docs as a backend. The doc will be embed with a special markup laguage, [ArchieML](http://archieml.org/), making it easy to structure text as data. 

Copy our [Google Doc Template](https://docs.google.com/document/d/1imJ0esjaeeq_rxh5XFTs9VCpsREOuTshZU1GRCswxN0/edit) and share it with your Google service account, or check the box to share with the same people.

* [How to make a Google Service Account](https://github.com/The-Politico/gootenberg/blob/main/docs/GoogleServiceAccount.md)

![image](https://user-images.githubusercontent.com/102277/131023575-7ae5d28d-3efe-4ccc-b4a1-d645da0adf52.png)

## [post.config.js](https://github.com/youthradio/static-nuxt-template/blob/main/post.config.js)

`post.config.js` has a bunch of configurations, including the <head> data, i.e. <title> <meta> tags but also information about the google docs linked to the project, Poll Server, DBs, etc

You can customize the GH Pages URL. The default is the repository name.

#### Dev URL [<>](https://github.com/youthradio/static-nuxt-template/blob/main/post.config.js#L4)
```js
const projectName = process.env.GIT_REPO_NAME || ''
```


#### Docs Ids [<>](https://github.com/youthradio/static-nuxt-template/blob/d9d56c2c706bf27e87c905880136e01e89f8fbf0/post.config.js#L37-L42)


Grab the Google Doc id from the copied document, you could have as many docs as you need.

```js
...
  docs: [
    {
      name: 'YOUR GOOGLE DOC",
      id: '1imJ0esjaeeq_rxh5XFTs9VCpsREOuTshZU1GRCswxN0',
    },
  ],
  ...
```

  
### Fetching new data

After the last step of issuing a new Google service account and sharing the copied template with it, you can export a `credentials.json` file. Copy it to `/static/`.

You can now run the script to fetch and parse the data from your google docs

```bash
yarn fetch-data
```
  
The script will save it to `/data/` or `dataPath: '../data/data.json'` acording to you setup
