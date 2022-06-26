using System.Net;
using System.Net.Http.Json;
using WindowsGateway.Dto;

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

        var responseBody = await response.Content.ReadFromJsonAsync<AuthorizeGatewayResponse>();
        return responseBody!.Token;
    }

    public void Dispose()
    {
        _httpClient.Dispose();
    }
}