using System.Text.Json;
using SocketIOClient;
using SocketIOClient.JsonSerializer;

namespace WindowsGateway;

public class WsClient : IDisposable
{
    private readonly SocketIO _client;

    public WsClient(Uri url)
    {
        _client = new SocketIO(url);

        var jsonSerializer = _client.JsonSerializer as SystemTextJsonSerializer;
        jsonSerializer!.OptionsProvider = () => new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    public EventHandler OnConnected
    {
        set => _client.OnConnected += value;
    }
    
    public EventHandler<int> OnReconnected
    {
        set => _client.OnReconnected += value;
    }
    
    public Action<SocketIOResponse> OnDeviceSensorAdded
    {
        set => _client.On("gateway/deviceSensorAdded", value);
    }
    
    public Action<SocketIOResponse> OnDeviceSensorRemoved
    {
        set => _client.On("gateway/deviceSensorRemoved", value);
    }
    
    public Action<SocketIOResponse> OnGetAvailableDevices
    {
        set => _client.On("gateway/getAvailableDevices", value);
    }
    
    public Action<SocketIOResponse> OnGetAvailableSensors
    {
        set => _client.On("gateway/getAvailableSensors", value);
    }
    
    public Action<SocketIOResponse> OnGetAvailableSensorValue
    {
        set => _client.On("gateway/getDeviceSensorValue", value);
    }

    public bool IsConnected => _client.Connected;
    
    public void AddGatewayAuthorization(string token)
    {
        if (_client.Connected)
        {
            throw new InvalidOperationException("Client is already connected.");
        }

        _client.Options.ExtraHeaders ??= new Dictionary<string, string>();
        _client.Options.ExtraHeaders.Add("Authorization", "Bearer " + token);
    }

    public Task ConnectAsync()
    {
        return _client.ConnectAsync();
    }

    public Task EmitAsync(string eventName)
    {
        return _client.EmitAsync(eventName);
    }
    
    public Task EmitAsync(string eventName, Action<SocketIOResponse> ack)
    {
        return _client.EmitAsync(eventName, ack);
    }
    
    public Task EmitAsync<T>(string eventName, T data)
    {
        return _client.EmitAsync(eventName, data);
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}