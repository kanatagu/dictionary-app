# Dictionary APP

This app lets users create their own word lists with categories using a dictionary sourced from UrbanDictionary through a free API. Right now, it's just storing data in memory, but I'm transitioning to a MongoDB database.

<img width="1463" alt="Screenshot 2024-02-24 at 9 41 53 PM" src="https://github.com/kanatagu/dictionary-app/assets/66394413/ef114afb-0a81-4ed1-a6ca-154211744b52">

## Features
* Authentication
* Show random UrbanDictionary words
* Search from  UrbanDictionary
* CRUD Category
* Add words list with memo

## Requirements

- Node v20.8.0 or above

## Setup

### Env

- Make environment file in both server and client

server

```
JWT_SECRET_KEY=
JWT_EXPIRES_IN=
```

client

Key from Rapid API: https://rapidapi.com/
```
VITE_RAPID_DICTIONARY_URL =
VITE_RAPID_API_KEY=
VITE_RAPID_API_HOST=

VITE_API_URL="http://[YOUR SERVER URL]/api"
```

### Installation

server

```
cd server
npm install
```

client

```
cd client
npm install
```


## Run client and server

### Server

```
cd server
npm run dev
```

### Client

```
cd client
npm run dev
```

Open http://localhost:5173/

## Upcoming Feature
- DB server
- Filter myWords by categoryId in backend side
- router to first load page after login (not top page)
- Search from My LIST
- Refactor form validation
