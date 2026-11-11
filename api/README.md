# Pulse.API

The project was generated using the [Clean.Architecture.Solution.Template](https://github.com/jasontaylordev/CleanArchitecture) version 10.8.0.

## Build

Run `dotnet build` to build the solution.

## Run

To run the application:

```bash
dotnet run --project .\src\AppHost
```

The Aspire dashboard will open automatically, showing the application URLs and logs.

## Azure deployment

The `../.github/workflows/api-deploy.yml` workflow builds the API solution,
runs its unit tests, provisions the Azure resources from `infra/main.bicep`,
then builds and deploys the API container to Azure Container Apps. The
deployment includes a private Azure Database for PostgreSQL Flexible Server,
an Azure Container Registry, and a Container Apps environment.

Configure these repository settings before running the workflow:

- Secrets `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID` for
  an Azure service principal configured for GitHub Actions OIDC.
- Secret `POSTGRES_ADMIN_PASSWORD` with a strong alphanumeric password.
- Variables `AZURE_RESOURCE_GROUP` and `AZURE_CLIENT_OBJECT_ID` for the
  resource group and the service principal's object ID.
- Optionally, variable `AZURE_LOCATION`; it defaults to `eastus`.

The service principal needs Contributor and User Access Administrator
permissions on the target resource group so the workflow can deploy resources
and grant the required container registry roles. Configure a federated
credential on the service principal for this repository's `main` branch and
the GitHub Actions OIDC issuer. PostgreSQL is private to the virtual network.

## Code Styles & Formatting

The template includes [EditorConfig](https://editorconfig.org/) support to help maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. The **.editorconfig** file defines the coding styles applicable to this solution.

## Code Scaffolding

The template includes support to scaffold new commands and queries.

Start in the `.\src\Application\` folder.

Create a new command:

```
dotnet new ca-usecase --name CreateTodoList --feature-name TodoLists --usecase-type command --return-type int
```

Create a new query:

```
dotnet new ca-usecase -n GetTodos -fn TodoLists -ut query -rt TodosVm
```

If you encounter the error *"No templates or subcommands found matching: 'ca-usecase'."*, install the template and try again:

```bash
dotnet new install Clean.Architecture.Solution.Template::10.8.0
```

## Test

The solution contains unit, integration, and functional tests.

To run the tests:
```bash
dotnet test
```

## Help
To learn more about the template go to the [project website](https://cleanarchitecture.jasontaylor.dev). Here you can find additional guidance, request new features, report a bug, and discuss the template with other users.