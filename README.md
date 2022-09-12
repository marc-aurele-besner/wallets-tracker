[![license](https://img.shields.io/github/license/jamesisaac/react-native-background-task.svg)](https://opensource.org/licenses/MIT)

# Wallets-Tracker

Track Wallets balance (for native currency) on multiple chain and send report daily by email via GitHut Action.


## Clone or fork this repository

```
git clone https://github.com/marc-aurele-besner/wallets-tracker.git
cd wallets-tracker
```

OR

```
git repo fork https://github.com/marc-aurele-besner/wallets-tracker.git
cd wallets-tracker
```

## Install dependencies

```
npm i
```

## Add environment variables

Copy .env.development.sample, rename it .env.development and fill it with your information

## Run the report locally with result in the terminal

```
npm run track
```

## Run the report locally with result in exports/export.md

```
npm run generateReport
```

## Setup GitHub secrets

Create GitHub secrets with all the environment variables to activate the daily workflows.