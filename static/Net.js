console.log("wczytano plik Net.js")

class Net {
    first(kolej, playlista) {
        $.ajax({
            url: "/",
            data: { a: kolej, b: JSON.stringify(playlista) },
            type: "POST",
            success: function (data) {
                console.log("To jest kolej" + kolej)
                console.log(JSON.parse(data))
                var data = JSON.parse(data)
                console.log(data)
                var dirs = data.dirs
                var files = data.files
                var waga = data.waga
                var plyty = data.plyty
                /* let kolej = 0
                ui.clicksBottom(kolej, data) */
                document.getElementById("left").innerHTML = ""
                console.log("kolej")
                document.getElementById("main").innerHTML = ""
                ui.plytyappend(dirs, kolej, plyty)
                ui.clicksMain(kolej)
                ui.mainAppend(dirs, files, kolej, waga)
                ui.simpleBar()
                ui.clicksBottom(kolej, data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}