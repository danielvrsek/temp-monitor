using System.Net;
using System.Net.Http.Json;

namespace WindowsGateway;

public class AuthClient : IDisposable
{
    private readonly HttpClient _httpClient;
    
    public AuthClient(Uri url)
    {
        _httpClient = new HttpClient()
        {
            BaseAddress = url
        };
    }

    public async Task<string> GetGatewayTokenAsync(string workspaceId, string secret)
    {
        var content = JsonContent.Create(new {workspaceId, secret});
        var response = await _httpClient.PostAsync("/auth/gateway/authorize", content);
        if (response.StatusCode != HttpStatusCode.OK)
        {
            throw new Exception();
        }
        
        return await response.Content.ReadAsStringAsync();
    }

    public void Dispose()
    {
        _httpClient.Dispose();
    }
}