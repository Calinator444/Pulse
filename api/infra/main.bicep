@description('Azure region for the API resources.')
param location string = resourceGroup().location

@description('A strong alphanumeric password for the PostgreSQL administrator.')
@secure()
param postgresAdminPassword string

var webAppName = 'pulse-api-${uniqueString(resourceGroup().id, subscription().id)}'
var postgresServerName = 'pulse-pg-${uniqueString(resourceGroup().id)}'
var postgresDnsZoneName = 'private.postgres.database.azure.com'
var databaseName = 'Pulse-APIDb'

resource virtualNetwork 'Microsoft.Network/virtualNetworks@2024-01-01' = {
  name: 'pulse-api-vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.0.0.0/16'
      ]
    }
  }
}

resource appServiceSubnet 'Microsoft.Network/virtualNetworks/subnets@2024-01-01' = {
  parent: virtualNetwork
  name: 'app-service'
  properties: {
    addressPrefix: '10.0.0.0/27'
    delegations: [
      {
        name: 'app-service'
        properties: {
          serviceName: 'Microsoft.Web/serverFarms'
        }
      }
    ]
  }
}

resource postgresSubnet 'Microsoft.Network/virtualNetworks/subnets@2024-01-01' = {
  parent: virtualNetwork
  name: 'postgres'
  properties: {
    addressPrefix: '10.0.2.0/28'
    delegations: [
      {
        name: 'postgres'
        properties: {
          serviceName: 'Microsoft.DBforPostgreSQL/flexibleServers'
        }
      }
    ]
  }
}

resource postgresDnsZone 'Microsoft.Network/privateDnsZones@2020-06-01' = {
  name: postgresDnsZoneName
  location: 'global'
}

resource postgresDnsZoneLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = {
  parent: postgresDnsZone
  name: 'pulse-api-vnet-link'
  location: 'global'
  properties: {
    registrationEnabled: false
    virtualNetwork: {
      id: virtualNetwork.id
    }
  }
}

resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01' = {
  name: postgresServerName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    administratorLogin: 'pulseadmin'
    administratorLoginPassword: postgresAdminPassword
    version: '16'
    storage: {
      storageSizeGB: 32
      autoGrow: 'Disabled'
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    network: {
      delegatedSubnetResourceId: postgresSubnet.id
      privateDnsZoneArmResourceId: postgresDnsZone.id
      publicNetworkAccess: 'Disabled'
    }
  }
  dependsOn: [
    postgresDnsZoneLink
  ]
}

resource database 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2024-08-01' = {
  parent: postgresServer
  name: databaseName
  properties: {
    charset: 'UTF8'
    collation: 'en_US.utf8'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: 'pulse-api-plan'
  location: location
  kind: 'linux'
  sku: {
    name: 'B1'
    tier: 'Basic'
    size: 'B1'
    capacity: 1
  }
  properties: {
    reserved: true
  }
}

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    virtualNetworkSubnetId: appServiceSubnet.id
    siteConfig: {
      alwaysOn: true
      ftpsState: 'Disabled'
      minTlsVersion: '1.2'
      linuxFxVersion: 'DOTNETCORE|10.0'
      appSettings: [
        {
          name: 'ASPNETCORE_ENVIRONMENT'
          value: 'Production'
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'ConnectionStrings__Pulse-APIDb'
          value: format(
            'Host={0};Database={1};Username=pulseadmin;Pass{2}{3};SSL Mode=VerifyFull',
            postgresServer.properties.fullyQualifiedDomainName,
            databaseName,
            'word=',
            postgresAdminPassword
          )
        }
      ]
    }
  }
  dependsOn: [
    database
  ]
}

output webAppName string = webApp.name
