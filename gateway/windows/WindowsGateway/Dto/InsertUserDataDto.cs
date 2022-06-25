namespace WindowsGateway.Dto;

public class InsertUserDataDto
{
    public string UserDataGroupId { get; set; }
    public UserDataDto[]? Data { get; set; }
}