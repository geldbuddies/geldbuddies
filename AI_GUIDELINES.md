This document provides specific guidelines for AI assistants working on the Project Arena codebase. Following these instructions will ensure that AI-generated code is consistent, high-quality, and adheres to the project's standards.

**IMPORTANT: AI assistants MUST read and follow ALL guidelines in this document completely. No exceptions.**

## Project Overview

Project Arena is a modern ticketing platform for concert and festival organizers with competitive commission rates. The platform is designed for venues with capacities up to 40,000 attendees.

### Tech Stack

- **Frontend:** Next.js 15+, React 19+, TailwindCSS 4+
- **Backend:** Next.js API routes
- **Database:** PostgreSQL (via Neon Database)
- **ORM:** Drizzle ORM
- **Package Manager:** pnpm

## Code Generation Guidelines

### General Principles

1. **Production-Grade Code**

   - Write code that is robust, secure, and performant
   - Include proper error handling and validation
   - Optimize for both performance and maintainability
   - Follow the principle of least surprise

2. **Type Safety**

   - Always use TypeScript with proper typing
   - Avoid using `any` type
   - Use interface or type for complex data structures
   - Leverage TypeScript's utility types when appropriate

3. **Consistency**

   - Follow existing patterns in the codebase
   - Maintain consistent naming conventions
   - Use consistent file structure and organization
   - Adhere to the project's established architecture

4. **Documentation**
   - Add JSDoc comments for functions, classes, and interfaces
   - Explain "why" not just "what" in comments
   - Document complex logic or business rules
   - Include examples for non-obvious usage

### Change Management

1. **Scope Limitation**

   - Limit changes to a manageable scope in each iteration
   - Focus on one feature, fix, or improvement at a time
   - Avoid changing more than 3-5 files in a single update unless absolutely necessary
   - When making large changes, break them down into smaller, logical chunks

2. **Change Visibility**

   - Clearly communicate all changes being made
   - Highlight critical modifications that might affect other parts of the codebase
   - Provide before/after comparisons for significant changes
   - Explicitly mention any removed functionality

3. **Progressive Implementation**

   - Implement complex features incrementally
   - Start with core functionality before adding enhancements
   - Allow for developer review between significant implementation phases
   - Use feature flags for major changes when appropriate

4. **Documentation of Changes**

   - Document all changes made to the codebase
   - Explain the reasoning behind architectural decisions
   - Note any technical debt created and plans to address it
   - Update relevant documentation when changing functionality

5. **Branch Management**

   - **CRITICAL: ALWAYS check the current branch with `git branch` at the start of ANY conversation or task**
   - **ALWAYS create a new branch FROM MAIN when starting a new feature/fix if one doesn't exist**
   - Never make changes directly to `main` or `develop` branches
   - If not already in a feature/fix branch, create a new branch with: `git checkout main && git checkout -b branch-name`
   - Follow branch naming conventions: `feat/feature-name`, `fix/issue-name`, `docs/update-name`, etc.
   - Ensure branch names are descriptive and relate to the work being done
   - When creating a branch, ALWAYS include the full commands:
     ```
     git branch  # Check current branch
     git checkout main  # Switch to main branch
     git pull  # Ensure main is up to date
     git checkout -b feat/new-feature-name  # Create and switch to new branch
     ```
   - Verify the new branch was created successfully with `git branch` after creation

### Using Current Documentation

1. **Documentation Verification**

   - Always verify you're working with the latest documentation
   - Check file timestamps and version information when available
   - Ask for clarification if documentation appears outdated
   - Cross-reference multiple documentation sources when available

2. **Codebase Exploration**

   - Examine the actual codebase to understand current patterns
   - Look for recent commits or changes that might not be documented
   - Use code search to find similar implementations
   - Check test files to understand expected behavior

3. **Staying Updated**

   - Request the latest documentation if uncertain
   - Ask about recent changes that might affect your task
   - Verify assumptions about project structure or patterns
   - Check for recent dependency updates or version changes

4. **Handling Inconsistencies**
   - If documentation contradicts the codebase, prioritize the codebase
   - Highlight documentation inconsistencies to the developer
   - Suggest documentation updates when appropriate
   - Document your understanding and ask for confirmation

### Specific Coding Standards

#### File Structure

- Place components in appropriate directories based on their purpose
- Follow the Next.js App Router conventions
- Keep related files together (component, styles, tests)
- Use index files for cleaner imports

#### React Components

- Use functional components with hooks
- Follow the component composition pattern
- Implement proper error boundaries
- Maintain clear separation of concerns
- Use React Server Components where appropriate
- Client components should be explicitly marked with "use client" directive

```tsx
// Example of a well-structured React component
'use client';

import { useState } from 'react';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
  onSelect?: (eventId: string) => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onSelect) {
      onSelect(event.id);
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
      {isExpanded && (
        <div className="mt-2">
          <p>{event.description}</p>
        </div>
      )}
      <button
        onClick={handleClick}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
}
```

#### CSS/Styling

- Use TailwindCSS utility classes for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and sizing
- Use semantic class names when creating custom components

```tsx
// Example of proper TailwindCSS usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  <div className="rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition-shadow">
    {/* Content */}
  </div>
</div>
```

#### Database Operations

- Use Drizzle ORM for all database operations
- Follow the repository pattern for database access
- Include proper error handling for database operations
- Use transactions for operations that modify multiple tables

```ts
// Example of proper Drizzle ORM usage
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserById(id: string) {
  try {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}
```

#### API Routes

- Implement proper request validation
- Return appropriate HTTP status codes
- Structure response data consistently
- Handle errors gracefully

```ts
// Example of a well-structured API route
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const event = await getEventById(id);

    if (!event) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    return Response.json({ data: event });
  } catch (error) {
    console.error('Error in GET /api/events:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Security Best Practices

1. **Input Validation**

   - Validate all user inputs
   - Use zod or similar libraries for schema validation
   - Sanitize data before using in queries or rendering

2. **Authentication & Authorization**

   - Implement proper authentication checks
   - Use role-based access control
   - Follow the principle of least privilege

3. **Data Protection**

   - Never expose sensitive information
   - Use environment variables for secrets
   - Implement proper data encryption where needed

4. **CSRF & XSS Protection**
   - Implement CSRF tokens for forms
   - Use Next.js built-in XSS protection
   - Avoid using dangerouslySetInnerHTML

### Performance Considerations

1. **Rendering Optimization**

   - Use React Server Components where appropriate
   - Implement proper code splitting
   - Optimize images and assets
   - Use proper caching strategies

2. **Database Queries**

   - Optimize database queries
   - Use indexes appropriately
   - Implement pagination for large datasets
   - Minimize N+1 query problems

3. **API Efficiency**
   - Implement proper caching
   - Use appropriate HTTP methods
   - Return only necessary data
   - Consider implementing rate limiting

## Commit Message Format

When suggesting commits, follow the semantic commit message format:

```
<type>(<scope>): <subject>

<body>

<footer>
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

Closes #123
```

## Testing Guidelines

When implementing features, consider how they would be tested:

1. **Unit Tests**

   - Test individual functions and components
   - Mock external dependencies
   - Focus on business logic

2. **Integration Tests**

   - Test interactions between components
   - Verify data flow through the application
   - Test API endpoints

3. **Accessibility Testing**
   - Ensure proper ARIA attributes
   - Maintain keyboard navigation
   - Support screen readers

## Example Implementations

### User Schema Example

```ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role', { enum: ['user', 'admin', 'organizer'] })
    .notNull()
    .default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### Form Component Example

```tsx
'use client';

import { useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      loginSchema.parse(formData);
      setErrors({});

      // Submit form
      setIsLoading(true);
      // API call would go here
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Sign In'}
      </button>
    </form>
  );
}
```

## Final Checklist

Before submitting code, ensure it meets these criteria:

- [ ] Code follows TypeScript best practices with proper typing
- [ ] Components follow React best practices and project patterns
- [ ] Database operations use Drizzle ORM correctly
- [ ] API routes include proper validation and error handling
- [ ] UI is responsive and follows TailwindCSS conventions
- [ ] Security best practices are implemented
- [ ] Code is optimized for performance
- [ ] Documentation is clear and comprehensive
- [ ] Code is consistent with existing project patterns
- [ ] Changes are limited to a manageable scope
- [ ] All changes are clearly communicated and documented

By following these guidelines, AI assistants can generate high-quality, consistent code that meets the standards of the Project Arena codebase.
