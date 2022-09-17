[![license](https://img.shields.io/github/license/jamesisaac/react-native-background-task.svg)](https://opensource.org/licenses/MIT)

# Wallets-Tracker

Track Wallets balance (for native currencies and ERC20 tokens) on multiple chain and send report daily by email via GitHut Action or run report from terminal.
- Get value of each currencies and tokens base on DEX Liquidity Pools
- Get value of your balance for each currency and tokens
- Get total value of each wallets and total value of all wallets together


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

## Set new DEX contracts to use

In scripts/constants/pairFactory.ts there is the list of the Pair Factory contract query by network for this tools to calculate the value of each currency and tokens (UniswapV2Factory)
## Set stablecoin and wrapped currency token contracts

In scripts/constants/tokensStablecoin.ts there is the list of the token contracts use as reference to find the stablecoin value of your token and wrapped token to find the cryptocurrency value