using WindowsGateway;

Gateway gw = new Gateway(new Uri("http://localhost:4000"));
await gw.ConnectAsync("62b78bd7d3bd55adce943fe7", "45a8bcf939a8");

while (true)
{
    await gw.LoopAsync();
}