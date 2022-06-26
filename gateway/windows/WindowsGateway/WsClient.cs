using System.Text.Json;
using SocketIOClient;
using SocketIOClient.JsonSerializer;
using WindowsGateway.Dto;

namespace WindowsGateway;

public class WsClient : IDisposable
{
    private readonly SocketIO _client;

    public WsClient(Uri url)
    {
        _client = new SocketIO(url);
        _client.OnConnected += (sender, args) => RegisterGatewayAsync();
        _client.OnReconnected += (sender, i) => RegisterGatewayAsync();

        var jsonSerializer = _client.JsonSerializer as SystemTextJsonSerializer;
        jsonSerializer!.OptionsProvider = () => new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    public Action<SocketIOResponse> OnGetAvailableDevices
    {
        set { _client.On("gateway/getAvailableDevices", value); }
    }
    
    public Action<SocketIOResponse> OnGetAvailableSensors
    {
        set { _client.On("gateway/getAvailableSensors", value); }
    }

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

    private async void RegisterGatewayAsync()
    {
        Console.WriteLine("Register");

        try
        {
            await _client.EmitAsync("gateway/register");

            await _client.EmitAsync("cloud/getRegisteredDevices",
                response =>
                {
                    Console.WriteLine(response);
                });
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

}