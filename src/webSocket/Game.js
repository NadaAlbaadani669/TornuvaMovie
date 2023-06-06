const Game = ()=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NzY5ODMsImlkIjoiMTciLCJpcCI6Ijg5MmNmZjljYTdiZjdjN2E3Mzc1MDZlZTMyOGQwNTRlODZjMzVjMTkifQ._stuHSWE9xShFyvJ8p6BwWy1_EFFG2GvlMRQYF6aAOM";
    let socket = new WebSocket("wss://apisrv0001.tournamovie.com/websocket/main?jwt=" + token);

    socket.onopen = function (e) {
        // socket.send("CONNECTION SUCCESFUL");
    };

    socket.onmessage = function (event) {
        const e = JSON.parse(event.data);
        const header = e["header"];
        const data = e["data"];
        switch (header) {
            case "all_rooms":
                console.log("TÜM ODALAR GELDİ");
                console.log(data);
                break;

            default:
                console.log("TANIMLANAMAYAN HEADER: " + header);
        }
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died');
        }
    };

    socket.onerror = function (error) {
        console.log(JSON.stringify(error));
    };
};

export default Game;