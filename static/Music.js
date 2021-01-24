console.log("Wczytano plik Music")
class Music {
    constructor() {
    }
    muzyka(kolej, data, flaga) {
        if (kolej == 1000) {
            $("#audio_src").prop("src", '/mp3/' + data.dirs[flaga] + '/' + data.files[flaga]); // ustawienie ścieżki
            document.getElementById("name").innerHTML = ""
            let indexik = data.files.indexOf(data.files[flaga])
            if (indexik < 10) indexik = "0" + indexik
            document.getElementById("name").innerText = indexik + data.dirs[flaga] + ": " + data.files[flaga]
        }
        else {
            $("#audio_src").prop("src", '/mp3/' + data.dirs[kolej] + '/' + data.files[flaga]); // ustawienie ścieżki
            document.getElementById("name").innerHTML = ""
            let indexik = data.files.indexOf(data.files[flaga])
            if (indexik < 10) indexik = "0" + indexik
            document.getElementById("name").innerText = indexik + data.dirs[kolej] + ": " + data.files[flaga]
        }
        $("#audio").trigger('load');
        let that = this
        $("#audio").on("loadeddata", function () {
            that.playMuz()
        })
        $("#audio").unbind("ended")
        $("#audio").on("ended", function () {
            that.nextMuzy()
        })
    }
    playMuz() {
        $("#audio").trigger("play"); // graj plik mp3
        $("#audio").unbind("timeupdate")
        $("#audio").on("timeupdate", function () {
            document.getElementById("progressBar").innerHTML = ""
            let div = document.createElement("div")
            div.style.cssFloat = "left"
            div.style.width = (Math.floor(($("#audio").prop("currentTime") / $("#audio").prop("duration") * 1000))) / 10 + "%"
            div.style.height = "100%"
            div.style.backgroundColor = "#000"
            document.getElementById("progressBar").appendChild(div)
            /* console.log((Math.floor(($("#audio").prop("currentTime") / $("#audio").prop("duration") * 1000))) / 10) */
            let minuty = Math.floor(Math.floor($("#audio").prop("currentTime")) / 60)
            let sekundy = Math.floor($("#audio").prop("currentTime")) % 60
            if (minuty < 10) minuty = "0" + minuty
            if (sekundy < 10) sekundy = "0" + sekundy
            let sekundyd = Math.floor($("#audio").prop("duration")) % 60
            let minutyd = Math.floor(Math.floor($("#audio").prop("duration")) / 60)
            if (isNaN($("#audio").prop("duration")) == true) {
                minutyd = 0
                sekundyd = 0
            }
            if (minutyd < 10) minutyd = "0" + minutyd
            if (sekundyd < 10) sekundyd = "0" + sekundyd
            document.getElementById("czas").innerHTML = minuty + ":" + sekundy + " | " + minutyd + ":" + sekundyd
        });
    }

    stopMuz() {
        $("#audio").trigger('pause');
    }
    nextMuzy() {
        $('#next').trigger('click')
    }
}

