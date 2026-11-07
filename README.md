# Pulse

Pulse is a monorepo containing the mobile app and its future API:

| Project | Location | Stack |
| --- | --- | --- |
| Mobile app | Repository root | Expo / React Native |
| API | `api/` | .NET 10 / ASP.NET Core / Aspire |

## Mobile app

Install dependencies and start the Expo development server:

```bash
npm ci
npm start
```

Run the app checks with:

```bash
npm run lint
```

The app currently uses Supabase directly for authentication and data access.
Set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY` in your local
environment to run the existing Supabase integration.

## API

The API solution requires the .NET SDK specified in `api/global.json`. From the
API directory, build and test the solution with:

```bash
cd api
dotnet build
dotnet test
```

Run the Aspire host and its services with:

```bash
dotnet run --project src/AppHost
```

## Backend transition

The API is now part of this repository, but the mobile app has not yet been
connected to it. Supabase remains the app's active backend until API endpoints,
authentication, and the corresponding mobile client integration are implemented.
