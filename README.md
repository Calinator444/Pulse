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

### Local HTTPS certificates

The Aspire AppHost dashboard and the API's HTTPS launch profile use the
ASP.NET Core development certificate. On each developer machine, create and
trust it with:

```bash
dotnet dev-certs https --trust
```

Verify that the certificate is trusted with:

```bash
dotnet dev-certs https --check --trust
```

The operating system may ask you to confirm trusting the certificate. The
AppHost uses `localhost` for its HTTPS launch URL, and Aspire manages the
service endpoints; no checked-in PFX file or custom local domain is required.

## Backend transition

The API is now part of this repository, but the mobile app has not yet been
connected to it. Supabase remains the app's active backend until API endpoints,
authentication, and the corresponding mobile client integration are implemented.
