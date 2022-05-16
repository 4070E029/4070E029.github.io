
    const UART_SERVICE = "0000fff0-0000-1000-8000-00805f9b34fb";
    const RX_UUID = "0000fff2-0000-1000-8000-00805f9b34fb";
    const TX_UUID = "0000fff1-0000-1000-8000-00805f9b34fb";
    var BLEDevice = null;
    var UARTService = null;

    async function connectBLE() {
        let opt = {
            filters: [
                //acceptAllDevices:true
                { namePrefix: 'mike' },
                { services: [UART_SERVICE] }
            ],
            //optionalServices: ['battery_service']
        }
        
        try {
            console.log('請求BLE裝置連線…');
            BLEDevice = await navigator.bluetooth.requestDevice(opt);

            $('#connBtn').attr('disabled', 'disabled');
            $('#disconnect').removeAttr("disabled");
            $('#LED_ON').button('enable');
            $('#LED_OFF').button('enable');
            $('#FAN_ON').button('enable');
            $('#FAN_OFF').button('enable');
            $('#FAN_HIGHT').button('enable');
            $('#FAN_LOW').button('enable');
            $('#DOOR_ON').button('enable');
            $('#DOOR_OFF').button('enable');
            $('#LIGHT_ON').button('enable');
            $('#LIGHT_OFF').button('enable');
            $('#temperature_ON').button('enable');
            $('#temperature_OFF').button('enable');

            console.log('裝置名稱：' + BLEDevice.name);
            $("#deviceName").text(BLEDevice.name);


            console.log('連接GATT伺服器…');
            const server = await BLEDevice.gatt.connect();
            BLEDevice.addEventListener('gattserverdisconnected', onDisconnected);


            console.log('取得UART服務…');
            UARTService = await server.getPrimaryService(UART_SERVICE);

            console.log('取得TX特徵…');
            const txChar = await UARTService.getCharacteristic(TX_UUID);
            await txChar.startNotifications();


            txChar.addEventListener('characteristicvaluechanged',
                e => {
                    let val = e.target.value;
                    let str = new TextDecoder("utf-8").decode(val)
                    $('#magnet').text(str)
                }
            );
        
        } catch (err) {
            console.log('請求BLE裝置連線…');
            BLEDevice = await navigator.bluetooth.requestDevice(opt);

            $('#connBtn').attr('disabled', 'disabled');
            $('#disconnect').removeAttr("disabled");
            $('#LED_ON').button('enable');
            $('#LED_OFF').button('enable');
            $('#FAN_ON').button('enable');
            $('#FAN_OFF').button('enable');
            $('#FAN_HIGHT').button('enable');
            $('#FAN_LOW').button('enable');
            $('#DOOR_ON').button('enable');
            $('#DOOR_OFF').button('enable');
            $('#LIGHT_ON').button('enable');
            $('#LIGHT_OFF').button('enable');
            $('#temperature_ON').button('enable');
            $('#temperature_OFF').button('enable');

            console.log('裝置名稱：' + BLEDevice.name);
            $("#deviceName").text(BLEDevice.name);


            console.log('連接GATT伺服器…');
            const server = await BLEDevice.gatt.connect();
            BLEDevice.addEventListener('gattserverdisconnected', onDisconnected);


            console.log('取得UART服務…');
            UARTService = await server.getPrimaryService(UART_SERVICE);

            console.log('取得TX特徵…');
            const txChar = await UARTService.getCharacteristic(TX_UUID);
            await txChar.startNotifications();


            txChar.addEventListener('characteristicvaluechanged',
                e => {
                    let val = e.target.value;
                    let str = new TextDecoder("utf-8").decode(val)
                    $('#magnet').text(str)
                }
            );
            //console.log('未連接設備' + err);
        }
    }

    function disconnect() {
        if (BLEDevice) {
            // disconnect:
            BLEDevice.gatt.disconnect();
        }
    }

   
    function UIinit() {
        $('#connBtn').removeAttr("disabled");  // 啟用「連線」按鈕
        $('#disconnect').attr('disabled', 'disabled');
        $('#deviceName').text('裝置已斷線');
        $('#device').text('');
        $('#LED_ON').button('disable');
        $('#LED_OFF').button('disable');
        $('#FAN_ON').button('disable');
        $('#FAN_OFF').button('disable');
        $('#FAN_HIGHT').button('disable');
        $('#FAN_LOW').button('disable');
        $('#DOOR_ON').button('disable');
        $('#DOOR_OFF').button('disable');
        $('#LIGHT_ON').button('disable');
        $('#LIGHT_OFF').button('disable');
        $('#temperature_ON').button('disable');
        $('#temperature_OFF').button('disable');
    }

    function onDisconnected(e) {
        console.log('藍牙連線斷了～');
        UIinit();
    }


    $("#connBtn").click((e) => {
        if (!navigator.bluetooth) {
            console.log('你的瀏覽器不支援Web Bluetooth API，換一個吧～');
            return false;
        }

        connectBLE();
    });


    $("#LED_SW").buttonset();
    $(".SW").change(async e => {
        if (!BLEDevice) {
            return;
        }
        let state = e.target.value;
        let enc = new TextEncoder();
        console.log("LED: " + state);
        if (BLEDevice.gatt.connected) {
            const rxChar = await UARTService.getCharacteristic(RX_UUID);
            rxChar.writeValue(enc.encode(state));
        } else {
            return;
        }
    });

    $("#FAN_SW").buttonset();
    $(".SW").change(async e => {
        if (!BLEDevice) {
            return;
        }
        let state = e.target.value;
        let enc = new TextEncoder();
        console.log("FAN: " + state);
        if (BLEDevice.gatt.connected) {
            const rxChar = await UARTService.getCharacteristic(RX_UUID);
            rxChar.writeValue(enc.encode(state));
        } else {
            return;
        }
    });

    $("#FAN_HIGHT_LOW_SW").buttonset();
    $(".SW").change(async e => {
        if (!BLEDevice) {
            return;
        }
        let state = e.target.value;
        let enc = new TextEncoder();
        console.log("FAN_HIGHT_LOW: " + state);
        if (BLEDevice.gatt.connected) {
            const rxChar = await UARTService.getCharacteristic(RX_UUID);
            rxChar.writeValue(enc.encode(state));
        } else {
            return;
        }
    });

    $("#DOOR_SW").buttonset();
    $(".SW").change(async e => {
        if (!BLEDevice) {
            return;
        }
        let state = e.target.value;
        let enc = new TextEncoder();
        console.log("DOOR: " + state);
        if (BLEDevice.gatt.connected) {
            const rxChar = await UARTService.getCharacteristic(RX_UUID);
            rxChar.writeValue(enc.encode(state));
        } else {
            return;
        }
    });

    $("#LIGHT_SW").buttonset();
    $(".SW").change(async e => {
        if (!BLEDevice) {
            return;
        }
        let state = e.target.value;
        let enc = new TextEncoder();
        console.log("LIGHT: " + state);
        if (BLEDevice.gatt.connected) {
            const rxChar = await UARTService.getCharacteristic(RX_UUID);
            rxChar.writeValue(enc.encode(state));
        } else {
            return;
        }
    });

    $("#temperature_SW").buttonset();
    $(".SW").change(async e => {
        if (!BLEDevice) {
            return;
        }
        let state = e.target.value;
        let enc = new TextEncoder();
        console.log("temperature: " + state);
        if (BLEDevice.gatt.connected) {
            const rxChar = await UARTService.getCharacteristic(RX_UUID);
            rxChar.writeValue(enc.encode(state));
        } else {
            return;
        }
    });
