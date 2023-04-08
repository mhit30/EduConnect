<p align="center">
  <img src="https://drive.google.com/uc?id=1RgHcsb1VSVuOc_kh9X05NzW27gz9LF0J" />
</p>

# EduConnect (for FBLA Competition)

### Mohammed Hit (Programmer) and Haylie Romero (UI Designer & Artist)

## Formerly SchoolApp.

- Everything works the same, just a different name.
- SchoolApp repo. privated to protect environment variables.

# Features

- User posting, liking, commenting
- Checking school schedule and events
- RSVPing for events
- Associating (linking) student with parent users
- Parent notifying school of absence
- Users can change their profile picture
- A faculty overview panel (website)
- Faculty can create event dates (website)
- Faculty can resolve parent messages (website)

# Development Instructions

1. Install [NodeJS](https://nodejs.org/en/download)
2. Clone the respective directories
3. Install [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
4. Run Yarn Install within each directory
5. For hosting, obtain environment variables from host provider

# Starting all directories

## Application (frontend-typescript)

**Starting the app for development**

```
  yarn start
```

**Deploying the app on Expo app store**

```
  expo publish
```

## Backend API (backend-typescript)

**Starting the backend API for development**

```
  yarn start
```

You can use nodemon for auto reloading

**Building the backend API from TS to JS**

```
  yarn build
```

## Faculty Website (frontend-faculty)

**Starting the faculty website for development**

```
  yarn dev
```

**Starting the faculty website**

```
  yarn start
```

**Building the faculty website TS to JS**

```
  yarn build
```

**Linting**

```
  yarn lint
```
