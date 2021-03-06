export const Events = {
    Connect: 'connect',
    Connection: 'connection',
    Disconnect: 'disconnect',
    Exception: 'exception',
    ConnectionError: 'connect_error',
    RegisterGateway: 'gateway/register',
    QueryUserDeviceSensorValueData: 'userDeviceSensorValue/query',
    InsertUserDeviceSensorValueData: 'userDeviceSensorValue/insert',
    QueryAvailableDevices: 'dashboard/getAvailableDevices',
    QueryAvailableSensors: 'dashboard/getAvailableSensors',
    QueryRegisteredDevices: 'cloud/getRegisteredDevices',
    CreateUserDevice: 'userDevice/create',
    DeleteUserDevice: 'userDevice/delete',
    CreateUserDeviceSensor: 'userDeviceSensor/create',
    DeleteUserDeviceSensor: 'userDeviceSensor/delete',
    QueryUserDeviceSensorValue: 'userDeviceSensor/queryValue',
};
