# iroco-ui

[![Circle CI](https://circleci.com/gh/iroco-co/iroco-ui.png?circle-token=218e3654fb138427bb709b068ed847b58f8d4ac7&style=svg)](https://app.circleci.com/pipelines/github/iroco-co/iroco-ui)

Design system for Iroco.

See the [Documentation](https://iroco-co.github.com/iroco-ui/)

# develop

To install dependencies : 

```shell
~/src/iroco-ui$ yarn
```

Building : 

```shell
~/src/iroco-ui$ yarn build
```

# documentation

The docs directory contains the documentation app deployed on github pages. To install dependencies :

```shell
~/src/iroco-ui/docs$ yarn
```

You can add/update components documentation into `docs/src/pages/components` and update the left menu in `docs/src/includes/sidebar.md`.

When you have to work on the CSS for components, you can have hot reloading. To do so you have to make the iroco-ui build watched with : 

```shell
~/src/iroco-ui$ npx npm-watch build
```
And in the same time launch the dev server for docs : 

```shell
~/src/iroco-ui/docs$ yarn dev
```


To build the documentation with (in docs) :

```shell
~/src/iroco-ui/docs$ yarn build
```

To copy the documentation (given that you have a `../iroco-ui-docs/` directory on the `gh-pages` branch)

```shell
~/src/iroco-ui$ yarn copy-docs
```
