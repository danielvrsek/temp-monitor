using LibreHardwareMonitor.Hardware;

namespace WindowsGateway.Mappers;

public class SensorUnitMapper
{
    private static Dictionary<SensorType, string> _units = new Dictionary<SensorType, string>
    {
        { SensorType.Voltage, "V" },
        { SensorType.Current, "A" },
        { SensorType.Clock, "MHz" },
        { SensorType.Temperature, "°C" },
        { SensorType.Load, "%" },
        { SensorType.Fan, "RPM" },
        { SensorType.Flow, "L/h" },
        { SensorType.Control, "%" },
        { SensorType.Level, "%" },
        { SensorType.Factor, "1" },
        { SensorType.Power, "W" },
        { SensorType.Data, "GB" },
        { SensorType.Frequency, "Hz" },
        { SensorType.Energy, "mWh" },
        { SensorType.Throughput, "MB/s" }
    };

    public static string MapToUnit(SensorType sensorType)
    {
        return _units[sensorType];
    }
}