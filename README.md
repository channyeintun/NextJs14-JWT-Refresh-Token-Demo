# General Rules Must Follow In Project

## Clean Code Rules

-   Write meaningful and descriptive variable, function, and class names.
-   Keep functions and methods short and focused on a single task.
-   Use comments sparingly and only when necessary to clarify intent or explain complex code.
-   Write code that is easy to read and understand, avoiding overly clever or obscure constructs.
-   Avoid duplication of code and strive for code reuse and modular design.
-   Avoid using string or number constants directly without defining them into separate constants or other constructs available for the given language
-   See more [here](./CLEANCODE.md)

## Conventional Git Commits

This project uses conventional Git commits to keep the commit history readable and organized. Conventional Git commits follow a specific format: `<type>(<scope>): <description>`.

The available types for commits are:

-   `feat`: A new feature.
-   `fix`: A bug fix.
-   `docs`: Changes to documentation.
-   `style`: Changes to code style (no code changes).
-   `refactor`: Code changes that neither fixes a bug nor adds a feature.
-   `perf`: Code changes that improve performance.
-   `test`: Adding or updating tests.
-   `chore`: Changes to the build process, development tools, or other miscellaneous tasks.

The optional scope can indicate the area of the code affected by the commit.

For example, a conventional commit might look like this:

`feat(login): add ability to remember login credentials`

## Pull Requests

When creating a pull request, please follow these guidelines:

1. Use a clear and descriptive title.
2. Include a description of the changes made and any relevant context.
3. Ensure that all tests pass and the code is properly formatted and documented.
4. Assign at least one reviewer.
5. Wait for approval before merging the pull request.

For example,

```
# Description
[Describe what changes this pull request makes and why it should be merged.]

# Checklist
- [ ] I have read the contributing guidelines and this PR complies with them
- [ ] I have tested this PR locally and ensured that it works as expected
- [ ] I have added unit tests for the changes made in this PR
- [ ] I have updated the documentation to reflect any changes made in this PR
- [ ] I have assigned a reviewer to this PR

# Related Issues
[If there are any related issues or pull requests, link them here.]
```

## Specifications

-   Next.js
-   TailwindCSS
-   React-hook-form
-   Axios
-   Nookies

## Expected JWT Response format

```json
{
    "expiration": "2024-09-20T18:56:05.721+00:00",
    "refreshToken": "45f73a50-3b88-4cd6-be86-2b747768a899",
    "tokenType": "Bearer",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMTEzMCIsInN1YiI6IiAgICIsInJvbGVzIjoiUk9MRV9BVVRIT1IiLCJpYXQiOjE3MjY3NzIxNjUsImV4cCI6MTcyNjg1ODU2NX0.a96zJrCY1bJrfV6EvmQbfZVgt0Dmh6D7tCeuRICWG2OG8hi0PysqjSpT59JBnD4E7mgNH2P4aKuBN50pSyLNaw"
}
```

## Getting started

First, prepare .env.local ,and then run the development server:

```bash
npm install --force
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
