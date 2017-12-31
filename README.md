# Node.js tests on Azure

Check: [Azure App Service Web App](https://docs.microsoft.com/azure/app-service-web)

## Running locally

```sh
npm install
cp config-sample.js config.js # and edit config.js
node index.js
```

## Deploy to Azure

e.g:

```sh
git remote add azure https://<USERNAME>@<APPNAME>.scm.azurewebsites.net/<APPNAME>.git
git commit -am "add config.js" # conf file is needed for db connection
git push azure master
```
