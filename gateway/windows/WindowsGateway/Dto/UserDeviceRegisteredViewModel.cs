namespace WindowsGateway.Dto;

public class UserDeviceRegisteredViewModel
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string ExternalId { get; set; }
    
    public UserDeviceSensorViewModel[] Sensors { get; set; }
}