[![Code Quality Grade](https://www.code-inspector.com/project/21134/status/svg)](https://frontend.code-inspector.com/project/21134/dashboard) [![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/rafaelaazevedo/tau-blockchain-course/blob/master/LICENSE) [![Known Vulnerabilities](https://snyk.io/test/github/rafaelaazevedo/tau-blockchain-course/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rafaelaazevedo/tau-blockchain-course?targetFile=package.json)

# Ethereum Blockchain Project (Test Automation University)

A simple Blockchain project developing ethereum smart contracts and tests for a survey website.

<br>

## Run local development

Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

```
truffle compile
truffle migrate
```

Run the liteserver development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.

// Serves the front-end on http://localhost:3000

```
npm run dev
```
