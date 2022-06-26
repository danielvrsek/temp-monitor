namespace WindowsGateway.Dto;

public class AvailableDevice
{
    public string? Identifier { get; set; }
    
    public string? Name { get; set; }
    
    public DeviceTypeDto DeviceType { get; set; }
}