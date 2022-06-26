using SocketIOClient;
using WindowsGateway.Dto;

namespace WindowsGateway;

public class Gateway : IDisposable
{
    private readonly Uri _cloudHost;

    private readonly WsClient _client;
    private readonly HardwareMonitor _hwMonitor;

    public Gateway(Uri cloudHost)
    {
        _cloudHost = cloudHost;
        _hwMonitor = new HardwareMonitor();
        _client = new WsClient(_cloudHost)
        {
            OnGetAvailableSensors = GetAvailableSensorsAsyncHandler
        };
    }

    public async Task ConnectAsync(string workspaceId, string secret)
    {
        using var authClient = new AuthClient(_cloudHost);
        string token = await authClient.GetGatewayTokenAsync(workspaceId, secret);
        
        _client.AddGatewayAuthorization(token);
        await _client.ConnectAsync();
    }

    public async Task LoopAsync()
    {
        DateTime timestamp = DateTime.UtcNow;
    
        var storages = _hwMonitor.GetStorages();
        //new Win32DiskDriveService().Search();
        //Console.WriteLine(String.Join("\n", storages.Select(x => $"Name: {x.Name}, Id: {x.Identifier}, Properties: {String.Join(", ", x.Properties.Keys)}")));
    
        /*await client.EmitAsync("userDeviceSensorValue/insert", new InsertUserDataDto()
        {
            UserDataGroupId = "62b37c404e1b5d6134960545",
            Data = storages.Select(x => new UserDataDto
            {
                Value = (int)x.Sensors.First(s => s.SensorType == SensorType.Temperature).Value!,
                Timestamp = GetTimestamp(timestamp)
            }).ToArray()
        });*/
        await Task.Delay(1000);
        _hwMonitor.Update();
    }

    async void GetAvailableSensorsAsyncHandler(SocketIOResponse response)
    {
        var sensors = _hwMonitor.GetStorages().Select(x => new AvailableSensor()
        {
            Identifier = x.Identifier.ToString(),
            Name = x.Name,
            SensorType = WindowsGateway.Dto.SensorType.Storage
        });
    
        await response.CallbackAsync(sensors);
    }
    
    static ulong GetTimestamp(DateTime dateTime)
    {
        var timeSpan = dateTime - new DateTime(1970, 1, 1);
        return (ulong)timeSpan.TotalMilliseconds;
    }

    public void Dispose()
    {
        _client.Dispose();
        _hwMonitor.Dispose();
    }
}