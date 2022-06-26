namespace WindowsGateway.Dto;

public class AvailableDeviceSensor
{
    public string? Identifier { get; set; }
    
    public string? Name { get; set; }
    
    public SensorTypeDto SensorType { get; set; }
}