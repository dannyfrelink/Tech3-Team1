![banner](https://github.com/TristanVarewijck/Block-Tech/blob/master/images/Banner%20GitHub%20READ.ME.png)

## ActiveTogether / Filter - Feature

_Shields that represent my project - They change over time._ (https://shields.io/)

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![Activity](https://img.shields.io/github/last-commit/TristanVarewijck/Block-Tech) ![Isseus](https://img.shields.io/github/issues/TristanVarewijck/Block-Tech) ![Language](https://img.shields.io/github/languages/top/TristanVarewijck/Block-Tech) ![Count](https://img.shields.io/github/languages/count/TristanVarewijck/Block-Tech?color=#a55eea) ![NPM](https://img.shields.io/npm/v/npm) ![MIT-License](https://img.shields.io/apm/l/vim-mode)



## Description

I am a Communication & Multimedia Design student at the Hogeschool van Amsterdam and I am currently in my second year.
For this block (block-web) I was given the task to build a feature for a matching app. it's an app that allows people to create groups or find groups to join.
The groups you can join have restrictions: activities, duration, distance, and number of people. If you have joined a group, you have found a match. In this project I will create a filter feature where people can base their group on or with which they can find a group. We will be using back-end and front-end tools to create this feature.

**Jobstory**

**When** I plan to search for a match **I want to** set a group to allow a maximum of 20 people, **so that I can** search for groups with not too many people.

## Table of Contents

- [Install](#install)
  - [.env Sample](#env-sample)
  - [Database structure](#database-structure)
- [Feature requirements](#feature-requirements)
- [Used Tools](#used-tools)
- [Visuals](#visuals)
- [!important files](#mportant-files)
- [Meta](#meta)
- [License](#license)

## Install

Clone the GitHub Repo locally
```
git clone https://github.com/TristanVarewijck/Block-Tech.git
```
Install the Packages
```
npm install
```
Start the Server
```
npm start
```

### .env Sample
You need the following keys to make a connection to the database.

````
DB_URL="mongodb+srv://<username>:<password>@matching-app.oyitr.mongodb.net/test"
DB_NAME=<databaseName>
````
### Database structure 
The database im using is mongoDB and its structured very simple. You can see the structure in the visual below:

<img src="https://github.com/TristanVarewijck/Block-Tech/blob/master/images/Database-structure.png" alt="database-structure" width="400">
mongoDB -> database -> collection ->> data 

## Feature requirements

This feature should atleast filter:

- All
- Activities
- Distance
- Duration
- Attendence

## Used Tools

- [git](https://git-scm.com/)
- [pug](https://pugjs.org/api/getting-started.html)
- [json](https://www.json.org/json-en.html)
- [Heroku](https://www.heroku.com/)
- [MongoDB](https://www.mongodb.com/)
- [ionicons](https://ionicons.com/)

## Visuals

These are the current visuals of the filter feature.

![homescreen ui](https://github.com/TristanVarewijck/Block-Tech/blob/master/images/design-homepage.png)
![filter ui](https://github.com/TristanVarewijck/Block-Tech/blob/master/images/design-filter.png)

## !mportant files

Of course all files are important but you should at least have a look at these files if you are interested in this repo.
Viewing these files will give you an idea of how this feature is built.

[index.js](https://github.com/TristanVarewijck/Block-Tech/blob/master/index.js) :page_facing_up:

[index.pug](https://github.com/TristanVarewijck/Block-Tech/blob/master/views/index.pug) :page_facing_up:

[styles.css](https://github.com/TristanVarewijck/Block-Tech/blob/master/public/css/style.css) :page_facing_up:

[package.json](https://github.com/TristanVarewijck/Block-Tech/blob/master/package.json) :page_facing_up:

## Meta

Tristan Varewijck - tristan.varewijck@gmail.com - https://github.com/TristanVarewijck/Block-Tech

![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

## License

Usage is provided under the [MIT License](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt) MIT. See [LICENSE](https://github.com/TristanVarewijck/Block-Tech/blob/master/LICENSE) for the full details.