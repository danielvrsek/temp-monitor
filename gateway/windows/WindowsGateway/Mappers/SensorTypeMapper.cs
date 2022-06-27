using LibreHardwareMonitor.Hardware;
using WindowsGateway.Dto;

namespace WindowsGateway.Mappers;

public static class SensorTypeMapper
{
    public static SensorTypeDto MapToDto(SensorType sensorType)
    {
        switch (sensorType)
        {
            case SensorType.Temperature:
                return SensorTypeDto.Temperature;
            case SensorType.Load:
                return SensorTypeDto.Load;
            default:
                return SensorTypeDto.Unknown;
        }
    }
}