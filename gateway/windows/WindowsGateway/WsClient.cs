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

    public Task EmitAsync<T>(string eventName, T data)
    {
        return _client.EmitAsync(eventName, data);
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}