# BoilerPlate Project

Project for better tracking and collaboration projects at Mediaweb

## How to setup the project on your Computer

**Make sure you have Node and NPM installed on your pc.**
If you don't, please follow these links:

- https://nodejs.org/en/download/
- https://www.npmjs.com/get-npm


You can check if it's installed with this commands:

    $> node --version
    $> npm --version


**Make sure you have gulp installed on your computer**

    $> npm install --global gulp-cli

*Now you a ready to start using the project.*


## How to use the Repository


**1st Step:** Make sure you have all needed modules installed with the following command:

        $> npm install

**2nd Step:** Use the following task to start gulp compiler:

        $> gulp

Additionally you can use one of the following tasks:

| Gulp Tasks        | Purpose                               |
| ----------------- | ------------------------------------- |
| *$> gulp style*   | Compile the styles only once          |
| *$> gulp clean*   | Clean "1-dist" folder compiled files  |
| *$> gulp watch*   | Starts the build / watch series of gulp, which will keep waiting and compiling the files every time you save.                |
| *$> gulp*         | Same as previous line                 |
