# Part-2 (Publish as NPM Package )
Creating your first package
This section is for you if you haven’t published a package to npm before. Feel free to skip to the next section if you’ve published one before.

To publish your first package to npm, you need to go through these steps:

- First, you need to have an npm account. Create one here if you don’t have one yet.

- Second, you need to login to your npm account through the command line. (You need to have Node and npm installed on your system before you perform this step. Install them here).
You can now do npm Login and pusblish 

- npm login 
- npm publish --access public


```bash
➜  publish-nodejs-typescript-modules git:(master) ✗ npm publish --access public
npm notice 
npm notice 📦  @tkssharma/test-package@1.0.1
npm notice === Tarball Contents === 
npm notice 2.5kB package.json        
npm notice 37B   README.md           
npm notice 88B   lib/cjs/index.d.ts  
npm notice 196B  lib/cjs/index.js    
npm notice 205B  lib/cjs/index.js.map
npm notice 88B   lib/esm/index.d.ts  
npm notice 108B  lib/esm/index.js    
npm notice 205B  lib/esm/index.js.map
npm notice === Tarball Details === 
npm notice name:          @tkssharma/test-package                 
npm notice version:       1.0.1                                   
npm notice package size:  1.6 kB                                  
npm notice unpacked size: 3.4 kB                                  
npm notice shasum:        92b5c278e35a7a573d00cdedc6635f5b01842f33
npm notice integrity:     sha512-9HvXq7+ZH94xV[...]lDVxsCxiSBjBA==
npm notice total files:   8                                       
npm notice 
+ @tkssharma/test-package@1.0.1
```


# Part-2 (Publish as Github Package )
Github package repository is where you can publish npm, gem, mvn, nuget, gradle, docker packages and is currently now in beta. In this tutorial, we will see how we can publish an npm package to the github package respository.

- Code the node.js project you want to publish as npm module in github repo.

- Create a github repository in which you will be publishing the package.

Lets make your package.json ready
---------------------------------

Amend the repository to the ssh URL of the repo (e.g. git@github.com:tkssharma/package-name.git). You can find this by using the ‘Clone or download’ button using the ‘Clone with SSH’ option.

Update the name of the package. This must match the repo URL but with @tksssharma rather than just tkssharma (e.g. git@github.com:tkssharma/package-name.git becomes @tkssharma/package-name).

``Add a description for the package``.

You must not change or remove the URL in publishConfig. That ensures that the package is published on ``GitHub rather than npmjs.com``.
```json
  "name": "@tkssharma/package-name",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "repository": {
    "url": "git@github.com:tkssharma/package-name.git"
  }
```  

- Lets check on package.json

```json
{
  "dependencies": {},
  "description": "npm module for node js development",
  "devDependencies": {
    "reflect-metadata": "^0.1.13",
    "@types/node": "^13.9.0",
    "typescript": "^3.8.3"
  },
  "keywords": [
    "typescript",
    "package"
  ],
  "main": "lib/index.js",
  "name": "@tkssharma/package-name",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "repository": {
    "url": "git@github.com:tkssharma/package-name.git"
  },
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc -w",
    "prepublishOnly": "tsc"
  },
  "types": "lib/index.d.ts",
  "version": "1.0.0"
}
```
Login to the github npm registry from the console using the below command
```bash
    npm login --registry=https://npm.pkg.github.com --scope=@tkssharma
```
@tkssharma is the username of your github account.
Executing this query will ask for username and password. Username is your github username. Password is Personal Access Token which can be generated from your github account settings page.

Run npm publish command from the project directory. This will publish your node.js project as npm module to github repository. The github repository link is @tkssharma/packages . The module will be published in the scoped mode.


Now the module can be installed by anyone from this repository. To do this, the user who intends to install the module should set the npm registry in .npmrc file as registry=https://npm.pkg.github.com/github_user . Once this configuration is done, the npm module can be installed by running the command npm install @tkssharma/npm_module_name


* host npm source code in GitHub

* host npm package (both publicly and privately) in [Github Packages](https://github.com/features/packages)

* build, version and publish a npm package via [GitHub Actions](https://github.com/features/actions)

* Install GitHub hosted npm package in your project

We will use yarn as the package management tool (in most of the cases). You can replace it with npm and get the same result.
### Host NPM package in Github Packages

The NPM package hosted by GitHub is [scoped](https://docs.npmjs.com/about-scopes) with your GitHub account name: @github-username/package-name. This can be set by the name attribute in package.json.

It supports both public and private package (based on your GitHub repo is public or private).

The NPM publishing destination (rather than the default npmjs.com) is controlled by publishConfig setting in package.json:
```json
    "publishConfig": {
        "registry": "https://npm.pkg.github.com/"
      }
```
If you want to publish from your local machine, please follow the steps:

1. You need a **Personal access token** from GitHub to be used as password on command line. It can be generated from *Settings > Developer settings > Personal access tokens* with correct permissions (at least read:packages, write:packages and repo, delete:packages optional).

1. Run ``npm login --registry=https://npm.pkg.github.com`` and follow the prompt. (Note that yarn login doesn’t support specifying registry :( )

1. Run ``yarn publish``

(You only need to do steps 1 and 2 once and the authentication details will be stored in your ~/.npmrc).

```json
//npm.pkg.github.com/:_authToken=XXXXXXXX
```

**Notes**:

1. You cannot delete a public package yourself (similarly, npmjs only supports to delete a public package within 72 hours).


### Build, Version and Publish NPM package via GitHub Actions

Place this publish.yml under .github/workflows/publish.yml:
```yaml
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://help.github.com/actions/language-and-framework-guides/publishing-nodejs-packages

name: Node.js Package deploy
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - run: npm test
  publish-gpr:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://npm.pkg.github.com/
          scope: "@tkssharma"
      - run: yarn install
      - run: git config --global user.email "$GITHUB_ACTOR@users.noreply.github.com" && git config --global user.name "$GITHUB_ACTOR"
      - run: yarn version --minor
      - run: git push --tags && git push
      - run: yarn publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}

```
**Notes**:

1. Remember to replace scope with your own GitHub account name

1. It triggers on new commits pushed onto master branch (the automatic push in the publish-gpr job won’t trigger!)

1. Two jobs: **build** will run tests, if that passes, **publish-gpr** job will be triggered

1. **publish-gpr** job will firstly bump the minor version number (e.g. 1.8.0 -> 1.9.0), tag git repo with the new version v1.9.0 and push back the new commit to GitHub (this has been done by yarn version). Then finally build and publish the new npm package to Github Packages (via yarn publish).

1. Note that the authentication is done via the default GITHUB_TOKEN from the GitHub Actions environment.

### Install GitHub hosted NPM package in your project

A project level ``.npmrc`` is required, so package manager knows where to download the package:

    @tkssharma:registry=https://npm.pkg.github.com

If your NPM package is hosted privately, you also need to login first via npm login --registry=https://npm.pkg.github.com. See previous section for details.

Now yarn add @tkssharma/package-name will install my latest version of package-name to your project.
