using WindowsGateway;

Gateway gw = new Gateway(new Uri("http://localhost:4000"));
await gw.ConnectAsync("62b8692c9a8580cf9decfbea", "0dc7c1ff34cc");

while (true)
{
    await gw.LoopAsync();
}