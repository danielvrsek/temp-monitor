using LibreHardwareMonitor.Hardware;

namespace WindowsGateway;

public class HardwareMonitor : IDisposable
{
    private readonly Computer _computer;
    private readonly UpdateVisitor _updateVisitor;
    
    public HardwareMonitor()
    {
        _computer = new Computer
        {
            IsStorageEnabled = true
        };
        _updateVisitor = new UpdateVisitor();
        
        _computer.Open();
        _computer.Accept(_updateVisitor);
    }

    public IHardware[] GetStorages()
    {
        return _computer.Hardware.Where(x => x.HardwareType == HardwareType.Storage).ToArray();
    }
    
    public void Monitor()
    {
        foreach (IHardware hardware in _computer.Hardware)
        {
            Console.WriteLine("Hardware: {0}", hardware.Name);
        
            foreach (IHardware subhardware in hardware.SubHardware)
            {
                Console.WriteLine("\tSubhardware: {0}", subhardware.Name);
            
                foreach (ISensor sensor in subhardware.Sensors)
                {
                    Console.WriteLine("\t\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
                }
            }

            foreach (ISensor sensor in hardware.Sensors)
            {
                Console.WriteLine("\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
            }
        }
    }

    public void Update()
    {
        _updateVisitor.Update();
    }
    
    public void Dispose()
    {
        _computer.Close();
    }
}