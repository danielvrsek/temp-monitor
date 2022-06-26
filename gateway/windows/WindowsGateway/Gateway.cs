using LibreHardwareMonitor.Hardware;
using SocketIOClient;
using WindowsGateway.Dto;
using WindowsGateway.Mappers;

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
            OnGetAvailableDevices = GetAvailableDevicesAsyncHandler,
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

    async void GetAvailableDevicesAsyncHandler(SocketIOResponse response)
    {
        Console.WriteLine("Get available devices");
        
        var sensors = _hwMonitor.GetStorages().Select(x => new AvailableDevice()
        {
            Identifier = x.Identifier.ToString(),
            Name = x.Name,
            DeviceType = DeviceTypeDto.Storage
        });
    
        await response.CallbackAsync(sensors);
    }
    
    async void GetAvailableSensorsAsyncHandler(SocketIOResponse response)
    {
        string deviceId = response.GetValue<string>();
        var device = _hwMonitor.GetStorages().First(x => x.Identifier.ToString() == deviceId);
        
        var sensors = device.Sensors
            .Where(x => x.SensorType == SensorType.Temperature)
            .Select(x => new AvailableDeviceSensor
        {
            Identifier = x.Identifier.ToString(),
            Name = x.Name,
            SensorType = SensorTypeMapper.MapToDto(x.SensorType)
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