# AI Assistant Guidelines

This document provides general guidelines for AI assistants working on projects. Following these instructions will ensure that AI-generated code is consistent, high-quality, and adheres to the project's standards.

## Workflow Guidelines

### Critical: Git Workflow

1. **Always Verify Working State First**

   - Check the current state with `git status`
   - Ensure there are no uncommitted changes before starting work
   - If uncommitted changes are not relevant to the problem at hand:
     - Stash them: `git stash save "description"`
     - Push to a different branch: `git checkout -b temp/changes && git add . && git commit -m "message"`
     - Or discard if appropriate: `git restore .`

2. **Branch Management**

   - Check current branch: `git branch`
   - For new features/fixes, always create a branch from main:
     ```
     git checkout main && git pull && git checkout -b <branch-name>
     ```
   - Follow branch naming conventions:
     - `feat/feature-name` - For new features
     - `fix/issue-name` - For bug fixes
     - `docs/update-name` - For documentation
     - `refactor/component-name` - For code refactoring
     - `test/feature-name` - For adding tests

3. **Never make changes directly to the `main` branch**

4. **Commit Frequency and Organization**
   - Make frequent, focused commits with related changes grouped together
   - Commit after completing a logical unit of work
   - Avoid mixing unrelated changes in a single commit
   - Complete and commit documentation changes before starting implementation
   - Use meaningful commit messages that clearly describe the changes

## Code Generation Guidelines

### General Principles

1. **Production-Grade Code**

   - Write robust, secure, and performant code
   - Include proper error handling and validation
   - Follow the principle of least surprise
   - Optimize for both performance and maintainability
   - Consider edge cases and handle them appropriately

2. **Type Safety**

   - Use TypeScript with proper typing
   - Avoid using `any` type
   - Use interface or type for complex data structures
   - Leverage TypeScript's utility types when appropriate
   - Use generics for reusable components and functions

3. **Consistency**

   - Follow existing patterns in the codebase
   - Maintain consistent naming conventions
   - Use consistent file structure and organization
   - Adhere to the project's established architecture
   - Follow established coding standards and style guides

4. **Documentation**
   - Add comments for complex functions and logic
   - Explain "why" not just "what" in comments
   - Document public APIs and interfaces
   - Include examples for non-obvious usage
   - Keep documentation up-to-date with code changes

### Code Organization

1. **Component Structure**

   - Keep components focused on a single responsibility
   - Extract reusable logic into custom hooks
   - Separate business logic from presentation
   - Use appropriate component composition patterns
   - Follow the established component hierarchy

2. **File Organization**

   - Group related files together
   - Use consistent file naming conventions
   - Keep files at a manageable size (< 300 lines when possible)
   - Use index files for cleaner imports
   - Organize imports in a consistent manner

### Error Handling

1. **Client-Side Errors**

   - Implement proper form validation
   - Provide clear error messages to users
   - Handle network errors gracefully
   - Use error boundaries for component errors
   - Log errors appropriately for debugging

2. **Server-Side Errors**

   - Return appropriate HTTP status codes
   - Provide meaningful error messages
   - Log detailed errors server-side
   - Handle database errors properly
   - Implement proper error recovery strategies

### Security Considerations

1. **Input Validation**

   - Validate all user inputs
   - Use schema validation libraries when appropriate
   - Sanitize data before using in queries or rendering
   - Implement proper rate limiting
   - Prevent common security vulnerabilities (XSS, CSRF, etc.)

2. **Authentication & Authorization**
   - Implement proper authentication checks
   - Use secure authentication methods
   - Follow the principle of least privilege
   - Protect sensitive routes and operations
   - Implement proper session management

### Performance Optimization

1. **Frontend Performance**

   - Minimize unnecessary re-renders
   - Implement proper code splitting
   - Optimize images and assets
   - Use appropriate caching strategies
   - Implement lazy loading where beneficial

2. **Backend Performance**
   - Optimize database queries
   - Implement proper indexing
   - Use caching for expensive operations
   - Minimize network requests
   - Consider serverless functions for scalability

### Change Management

1. **Scope Limitation**

   - Limit changes to a manageable scope in each iteration
   - Focus on one feature, fix, or improvement at a time
   - Avoid changing more than necessary to accomplish the task
   - Make incremental changes rather than large rewrites

2. **Progressive Implementation**
   - Implement complex features incrementally
   - Start with core functionality before adding enhancements
   - Get feedback on initial implementations before expanding
   - Use feature flags for major changes when appropriate

## Commit Message Format

Follow the semantic commit message format:

```
<type>(<scope>): <subject>

<body>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to the build process, tools, etc.

### Example

```
feat(auth): implement user registration form

Add form with email, password, and confirmation fields.
Include client-side validation and error handling.
```

## Final Checklist

Before submitting code, ensure it meets these criteria:

- [ ] Code follows best practices with proper typing
- [ ] Components follow project patterns
- [ ] Security best practices are implemented
- [ ] Code is optimized for performance
- [ ] Documentation is clear and comprehensive
- [ ] Code is consistent with existing project patterns
- [ ] Changes are limited to a manageable scope
