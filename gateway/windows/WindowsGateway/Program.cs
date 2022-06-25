// See https://aka.ms/new-console-template for more information

using System.Text.Json;
using LibreHardwareMonitor.Hardware;
using WindowsGateway;
using WindowsGateway.Dto;

var hwMonitor = new HardwareMonitor();
var client = new WsClient(new Uri("ws://localhost:4000/"));
client.AddGatewayAuthorization(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYXRld2F5SWQiOiI2MmIzN2M0MDRlMWI1ZDYxMzQ5NjA1NGQiLCJ3b3Jrc3BhY2VJZCI6IjYyYjM3YzQwNGUxYjVkNjEzNDk2MDU0NSIsInRva2VuVHlwZSI6MSwiaWF0IjoxNjU2MTY5NTM0LCJleHAiOjE2NTYxNjk3NzR9.Fgub75HeIgD4VJcISl1AZpPRuQscPBNL-GRWVscyi0U");
await client.ConnectAsync();

while (true)
{
    DateTime timestamp = DateTime.UtcNow;
    
    var storages = hwMonitor.GetStorages();
    await client.EmitAsync("userData/insert", new InsertUserDataDto()
    {
        UserDataGroupId = "62b37c404e1b5d6134960545",
        Data = storages.Select(x => new UserDataDto
        {
            Value = (int)x.Sensors.First(s => s.SensorType == SensorType.Temperature).Value!,
            Timestamp = GetTimestamp(timestamp)
        }).ToArray()
    });
    await Task.Delay(1000);
    hwMonitor.Update();
}

ulong GetTimestamp(DateTime dateTime)
{
    var timeSpan = dateTime - new DateTime(1970, 1, 1);
    return (ulong)timeSpan.TotalMilliseconds;
} 
