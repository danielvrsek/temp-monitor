// See https://aka.ms/new-console-template for more information

using System.Text.Json;
using LibreHardwareMonitor.Hardware;
using WindowsGateway;
using WindowsGateway.Dto;
using WindowsGateway.Windows;

string token;

using (var authClient = new AuthClient(new Uri("http://localhost:4000")))
{
    token = await authClient.GetGatewayTokenAsync("62b730fa0281b5f7c9de9289", "5082cc1efb5f");
}

var hwMonitor = new HardwareMonitor();
using var client = new WsClient(new Uri("ws://localhost:4000/"));
client.AddGatewayAuthorization(token);
await client.ConnectAsync();

while (true)
{
    DateTime timestamp = DateTime.UtcNow;
    
    var storages = hwMonitor.GetStorages();
    new Win32DiskDriveService().Search();
    Console.WriteLine(String.Join("\n", storages.Select(x => $"Name: {x.Name}, Id: {x.Identifier}, Properties: {String.Join(", ", x.Properties.Keys)}")));
    
    /*await client.EmitAsync("userData/insert", new InsertUserDataDto()
    {
        UserDataGroupId = "62b37c404e1b5d6134960545",
        Data = storages.Select(x => new UserDataDto
        {
            Value = (int)x.Sensors.First(s => s.SensorType == SensorType.Temperature).Value!,
            Timestamp = GetTimestamp(timestamp)
        }).ToArray()
    });*/
    await Task.Delay(1000);
    hwMonitor.Update();
}

ulong GetTimestamp(DateTime dateTime)
{
    var timeSpan = dateTime - new DateTime(1970, 1, 1);
    return (ulong)timeSpan.TotalMilliseconds;
} 
