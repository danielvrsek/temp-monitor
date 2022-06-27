using System.Collections.Concurrent;
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

    private readonly ConcurrentDictionary<string, DeviceSensorRegistration> _sensors = new ConcurrentDictionary<string, DeviceSensorRegistration>();

    public Gateway(Uri cloudHost)
    {
        _cloudHost = cloudHost;
        _hwMonitor = new HardwareMonitor();
        _client = new WsClient(_cloudHost)
        {
            OnConnected = (sender, args) => RegisterGatewayAsync(),
            OnReconnected = (sender, args) => RegisterGatewayAsync(),
            OnDeviceSensorAdded = DeviceSensorAddedHandler,
            OnDeviceSensorRemoved = DeviceSensorRemovedHandler,
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
        //new Win32DiskDriveService().Search();
        //Console.WriteLine(String.Join("\n", storages.Select(x => $"Name: {x.Name}, Id: {x.Identifier}, Properties: {String.Join(", ", x.Properties.Keys)}")));

        await EmitDataAsync();
        
        await Task.Delay(5000);
        _hwMonitor.Update();
    }

    async Task EmitDataAsync()
    {
        if (!_client.IsConnected)
        {
            return;
        }
        
        DateTime timestamp = DateTime.UtcNow;
        var sensors = _hwMonitor.GetHardware().SelectMany(x => x.Sensors).ToDictionary(x => x.Identifier);

        foreach (var sensor in _sensors.ToArray())
        {
            await _client.EmitAsync("userDeviceSensorValue/insert", new InsertUserDataDto
            {
                UserDeviceSensorId = sensor.Value.DeviceSensorId,
                Data = new [] 
                {
                    new UserDataDto
                    {
                        Value = (int)sensors[sensor.Value.Identifier].Value!,
                        Timestamp = GetTimestamp(timestamp)
                    } 
                }
            });
        }
    }

    void DeviceSensorAddedHandler(SocketIOResponse response)
    {
        Console.WriteLine("Device sensor added");
        
        var device = response.GetValue<UserDeviceRegisteredViewModel>();
        _sensors.AddOrUpdate(device.Id, (deviceId) => new DeviceSensorRegistration
        {
            Identifier = new Identifier(device.ExternalId.Split('/').Skip(1).ToArray()),
            DeviceSensorId = device.Id
        }, (_, registration) => registration);
    }
    
    void DeviceSensorRemovedHandler(SocketIOResponse response)
    {
        Console.WriteLine("Device sensor removed");
        
        var deviceSensorId = response.GetValue<string>();
        if (!_sensors.ContainsKey(deviceSensorId))
        {
            Console.WriteLine("Sensor not found");
            return;
        }
        
        if (_sensors.TryRemove(deviceSensorId, out _))
        {
            Console.WriteLine("Sensor removed");
        }
    }
    
    async void GetAvailableDevicesAsyncHandler(SocketIOResponse response)
    {
        Console.WriteLine("Get available devices");
        
        var sensors = _hwMonitor.GetHardware().Select(x => new AvailableDevice()
        {
            Identifier = x.Identifier.ToString(),
            Name = x.Name,
            DeviceType = DeviceTypeDto.Storage
        });
    
        await response.CallbackAsync(sensors);
    }
    
    async void GetAvailableSensorsAsyncHandler(SocketIOResponse response)
    {
        Console.WriteLine("Get available device sensors");
        
        string deviceId = response.GetValue<string>();
        var device = _hwMonitor.GetHardware().First(x => x.Identifier.ToString() == deviceId);
        
        var sensors = device.Sensors
            .Select(x => new AvailableDeviceSensor
        {
            Identifier = x.Identifier.ToString(),
            Name = x.Name,
            SensorType = SensorTypeMapper.MapToDto(x.SensorType)
        });
    
        await response.CallbackAsync(sensors);
    }

    void RegisterSensors(UserDeviceSensorViewModel[] sensors)
    {
        foreach (var sensor in sensors)
        {
            if (!_sensors.TryAdd(sensor.Id, new DeviceSensorRegistration
                {
                    Identifier = new Identifier(sensor.ExternalId.Split('/').Skip(1).ToArray()),
                    DeviceSensorId = sensor.Id
                }))
            {
                Console.WriteLine("Failed to add sensor");
            }
        }
    }
    
    async void RegisterGatewayAsync()
    {
        Console.WriteLine("Register");

        try
        {
            await _client.EmitAsync("gateway/register");
            await _client.EmitAsync("cloud/getRegisteredDevices",
                response =>
                {
                    var devices = response.GetValue<UserDeviceRegisteredViewModel[]>();
                    RegisterSensors(devices.SelectMany(x => x.Sensors).ToArray());
                });
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
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