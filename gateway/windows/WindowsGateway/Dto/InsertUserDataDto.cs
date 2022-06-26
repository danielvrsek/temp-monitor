namespace WindowsGateway.Dto;

public class InsertUserDataDto
{
    public string UserDeviceSensorId { get; set; }
    public UserDataDto[]? Data { get; set; }
}