# DPKG Package Analyser

A simple front end application built using React. On Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. This app exposes some key information about packages in the file via an HTML interface.

- The index page lists installed packages alphabetically with package names as links.
- When following each link, you arrive at a piece of information about a single package. The following information is included:
    - Name
    - Description
    - The names of the packages the current package depends on
    - Reverse dependencies, i.e. the names of the packages that depend on the current package
- The dependencies and reverse dependencies are clickable and the user can navigate the package structure by clicking from package to package.


* [Live Demo](https://dpkg-analyser.web.app/)

## Quick start

1. [Clone the repo](#1-clone-the-repo).
1. [Install app](#2-install-app).
1. [Run the app](#3-run-the-app).

### 1. Clone the repo

Clone the `dpkg` repository locally. In a terminal, run:

```
$ git clone https://github.com/pankaj-pant/dpkg.git
$ cd dpkg
```

### 2. Install app

To install the dependencies run the command:

    $ npm install

### 3. Run the app

This command serves the app at `http://localhost:3000/`.

    $ npm start

## License
[MIT](https://choosealicense.com/licenses/mit/)