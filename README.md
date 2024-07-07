# Vinyl Shelf

![Static Badge](https://img.shields.io/badge/PostgreSQL-%234169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Static Badge](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=express&logoColor=white)
![Static Badge](https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=React&logoColor=black)
![Static Badge](https://img.shields.io/badge/Node.js-%235FA04E?style=for-the-badge&logo=Node.js&logoColor=white)
![Static Badge](https://img.shields.io/badge/Prisma-%232D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Static Badge](https://img.shields.io/badge/discogs-%23333333?style=for-the-badge&logo=discogs&logoColor=white)

## Table of Contents
- [About Vinyl Shelf](#about-vinyl-shelf)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)


## About Vinyl Shelf
Vinyl Shelf is a PERN stack application that allows music enthusiasts to track and share their favorite albums. Authenticated users can create collections, known as shelves, and then discover albums they can add to their shelves through the application's search page. When the user searches for albums, the data is fetched from the Discogs API via the Disconnect package, and then send back to users to be added to their respective shelves.

## Prerequisites

Please install the following tools before attempting installation and usage.

[Node.js v20.15](https://nodejs.org/en/download/prebuilt-installer)

[PostgreSQL v16](https://www.postgresql.org/download/)

Set up an developer account at Discogs, then create an app to obtain a consumer key and secret.

[Discogs API](https://www.discogs.com/developers/#page:authentication)

## Installation

Clone the repository.
```bash
git clone git@github.com:StaticCloud/Vinyl-Shelf.git
```

Navigate into the cloned repository.
```bash
cd Vinyl-Shelf
```

Run the install script.
```bash
npm run install
```

## Usage