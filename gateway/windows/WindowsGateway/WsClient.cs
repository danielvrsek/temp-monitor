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
        _client = new SocketIO(url, new SocketIOOptions
        {
            ExtraHeaders = new Dictionary<string, string>
            {
                {"X-Client-Type", "gateway"}
            }
        });
        _client.OnConnected += async (sender, args) =>
        {
            Console.WriteLine("Register");
            await _client.EmitAsync("gateway/register");
        };

        _client.OnReconnected += async (sender, args) =>
        {

            Console.WriteLine("Register");
            await _client.EmitAsync("gateway/register");
        };

        var jsonSerializer = _client.JsonSerializer as SystemTextJsonSerializer;
        jsonSerializer!.OptionsProvider = () => new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    public Action<SocketIOResponse> OnGetAvailableSensors
    {
        set
        {
            _client.On("gateway/getAvailableSensors", value);
        }
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