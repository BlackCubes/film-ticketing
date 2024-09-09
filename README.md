<p align="center">
  <img src="https://github.com/BlackCubes/film-ticketing/assets/29642735/6dd1e1a9-0ede-4779-9952-cfdcada7467f" width="90%" height="auto" alt="Website logo" />
</p>
<h3 align="center">
  A ticketing website that users can geographically locate, create, and buy rare tickets from classical movies to television shows, and to limited time and special venue shows with the casts and crews as special guests
</h3>
<p align="center">
    <br>
    <a href="https://nodejs.org/en">
        <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    </a>
    <a href="https://nestjs.com/">
        <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    </a>
    <a href="https://www.mongodb.com/">
        <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
</p>

<br>

![Kinetotickets screenshot](https://github.com/BlackCubes/portfolio/assets/29642735/bc240488-e8c2-4e48-aef2-b17a7b4a09de)

## 🔥 Demo

You can see a demo of the portfolio on the [production site](https://www.eliastgutierrez.com/).

## 📌 Project Requirements

- Node `v20.14.0+` (API, Web, Mobile)
- NPM `v10.7.0`

## 📖 Project Setup

## 🥼 Development Process

### Versioning

When starting work on a new release version, increment `minor` version (`v2.0.0` -> `v2.1.0`), `major` version (`v2.0.0` -> `v3.0.0`), or `patch` (`v2.0.0` -> `v2.0.1`).

### Updating Code Owners

In the repository there should be a `.github/` folder with a `CODEOWNERS` file inside. This file represents who the owners of the repository code are. When you clone this repo, or use it as a template for a new project, you need to update this file to represent the new owners (you and whomever may be on your project). Simply remove the current owners in the file, and replace them with you and your teamates! The syntax is simply:

```
@<github username>
```

Be sure to add the github usernames of all developers on your project. Now, anytime a pull request is created, all codeowners are added as reviews automatically! It also becomes a reference point when the project is picked back up in the future. We can easily see who has the best context for the code even years down the line. For more information you can click this link:

[Github Codeowners](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/about-code-owners)

### Updating Issue Templates

Currently the issue templates may have some things you don't want or need in your new project. This can be anything from the tags being set, to the person assigned for each issue. Be sure to go to the settings for the repository, and click `Set up templates` to configure them in a way that suits your needs. For more information you can click this link:

[Setting up issue templates](https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/configuring-issue-templates-for-your-repository)

### Prettier

This project uses Prettier to enforce code style. It is highly opinionated by design with relatively scant options for customization. The thought process behind it is to ignore personal styling preferences and instead embrace consistency. There is a `.prettierrc` configuration file in the root directory to adjust some options.

Prettier can be configured within editors so that it formats files on save.
