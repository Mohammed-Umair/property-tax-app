
# Property Tax Appeals Application

A React application built with TypeScript and Redux to manage property tax appeals.

## Features

### 1. Collapsible Sidebar
- Expandable/collapsible sidebar with navigation menu
- Menu items include Dashboard, Accounts, Batches, Resolution, Assessments, Appeal Letter, Summary, and Settings

### 2. Data Table with CRUD Operations
- Display assessment records in a table
- Create, read, update, and delete assessments
- Select multiple assessments for batch operations
- Import/export data functionality

### 3. Calendar with Events and Reminders
- Interactive calendar for scheduling
- Add events and reminders to specific dates
- Color-coded display of events and reminders
- View list of upcoming events

## Technology Stack

- React with TypeScript
- Redux Toolkit for state management
- Redux Persist for data persistence
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components

## Usage

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the application at `http://localhost:8080`

## Implementation Details

- Redux store with assessment and calendar slices
- Persistent data storage using Redux Persist
- Component-based architecture for easy maintenance
- Responsive design for various screen sizes
