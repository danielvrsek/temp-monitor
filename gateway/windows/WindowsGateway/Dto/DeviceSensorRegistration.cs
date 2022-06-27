using LibreHardwareMonitor.Hardware;

namespace WindowsGateway.Dto;

public class DeviceSensorRegistration
{
    public Identifier Identifier { get; set; }
    public string DeviceSensorId { get; set; }
}