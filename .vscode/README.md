1. Clone your repo:

git clone https://github.com/Joingo/console_testing.git

2. Now you need to have NodeJS, Chrome browser and Git installed in your machine.

3. Once you have them, install the dependencies running:

npm install --save-dev

We suggest using Visual Studio Code as a code editor.

Before starting, I recommend installing the Prettier and ESLint extensions which is our code formatters. Add the file .vscode/settings.json with the content:

{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"editor.formatOnPaste": false,
"cSpell.words": ["apikey", "badeball", "bahmutov", "Esbuild", "maint", "mochawesome", "Parens", "Totp"],
"[feature]": {
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs": "active"
}
}

And make sure you have the .prettierrc file with the following content:

{
"semi": false,
"singleQuote": true,
"useTabs": true,
"tabWidth": 2,
"bracketSpacing": true,
"arrowParens": "always",
"trailingComma": "es5",
"printWidth": 120
}

This ensures that every time we add new code, it is saved and formatted correctly.

In order to execute the tests, you just need to execute the following commands.

If you prefer in headless mode (running all tests):

npx cypress run
Or if you want to perform with the Cypress test runner:

npx cypress open

If you want to run cypress on BrowserStack consoles you must to use:

npm run bs:master
npm run bs:live

I recommend running all the scenarios before creating the PR to make sure that everything will go smoothly when running the build of our automated suite, using:

node cypress_runner.js
Or to target a specific test:

node cypress_runner.js --spec "cypress/e2e/login/checkAllOptionOpen.js"
Another suggestion is run the new test several times in a row using the command repeat_test:

npm run repeat_test "cypress/e2e/login/checkAllOptionOpen.js"
This will run the test 5 times in a row.

GIT FLOW

When you are going to create a new feature test, be sure to create a new branch, but before creating the new branch, pull your local main branch so that it is up to date with respect to the remote main branch.

To update the main branch:

git checkout main
git fetch upstream
git pull upstream main
Create and switch to the new branch:

git checkout -b descriptive-name-of-the-branch
You are now ready to work on your branch locally, and create the new test, or make a fix or refactor when necessary.

When you are adding new code, remember to make frequent and small commits. Once you finish your work, consider to go to the main branch and update it, and then merge/rebase it to the branch you are working on, so that when you create the PR you avoid conflicts.
