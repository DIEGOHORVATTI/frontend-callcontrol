# Frontend Callcontrol

A modern call control interface built with React, Material-UI, and Socket.IO.
Testing in production https://frontend-callcontrol.vercel.app/

## Features

- Real-time call management with WebSocket communication
- Virtualized list for efficient handling of large call volumes
- Dark/Light theme support with customizable color presets
- Responsive design for all screen sizes
- Authentication system with JWT
- Real-time notifications for call events

## Tech Stack

- React 18
- TypeScript
- Material-UI v5
- Socket.IO Client
- TanStack Virtual for efficient list rendering
- React Router v6
- React Hook Form for form management
- Day.js for date handling
- Notistack for notifications
- Vite for development and building

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Authentication

The system uses a simple JWT-based authentication:

- Username and maximum calls limit are required
- Token is generated and stored in localStorage
- Automatic reconnection handling

## Call Management

Features include:

- Real-time call updates
- Call details view
- Call termination
- Duration tracking
- Service identification

## Performance

- Virtualized list rendering for handling large numbers of calls
- Optimized re-renders using React.memo and useMemo
- Efficient WebSocket event handling

## Theme Customization

- Light/Dark mode toggle
- Multiple color presets
- Custom shadows and transitions
- Responsive design breakpoints

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

<img width="1213" alt="image" src="https://github.com/user-attachments/assets/b19feb10-cdee-44cd-aa04-004d98515e97">
<img width="1213" alt="image" src="https://github.com/user-attachments/assets/38316443-15d4-4f3b-9a2d-8cde1a30cdeb">
<img width="1213" alt="image" src="https://github.com/user-attachments/assets/ded6d473-d325-4a75-a389-a6245db6dd84">
<img width="1213" alt="image" src="https://github.com/user-attachments/assets/60a83eb8-c345-453c-9c31-7189bd74b622">



## License

This project is licensed under the MIT License.
