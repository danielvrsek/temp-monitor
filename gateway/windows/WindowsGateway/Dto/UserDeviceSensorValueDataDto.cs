namespace WindowsGateway.Dto;

public class UserDeviceSensorValueDataDto
{
    public float Value { get; set; }
    public float ValueMin { get; set; }
    public float ValueMax { get; set; }
    
    public string Unit { get; set; }
}