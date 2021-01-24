console.log("wczytano plik Ui.js")
class Ui {

    constructor() {
        this.nextside = 0
        this.blockclick = 0
        this.flaga = -1
        this.data = ""
        this.liczba = 0
        console.log("konstruktor klasy Ui")
        this.kolej = 0
        this.playlista = {
            "dirs": [],
            "tittle": [],
            "waga": []
        }
        net.first(this.kolej, this.playlista)
    }
    //obsługa kliknięć w Ui
    simpleBar() {
        new SimpleBar($('#left')[0], { autoHide: false })
        new SimpleBar($('#main')[0], { autoHide: false })
    };
    plytyappend(dirs, kolej, plyty) {
        console.log(kolej)
        if (kolej != 1000) {
            for (let i = 0; i < dirs.length; i++) {
                let div = document.createElement("div")
                div.id = i
                div.style.width = "100%"
                div.style.height = "25%"
                div.style.backgroundSize = "100% 100%"
                div.style.backgroundImage = "url('/jpg/" + dirs[i] + ".jpg')"
                document.getElementById("left").append(div)
            }
        }
        else {
            for (let i = 0; i < plyty.length; i++) {
                let div = document.createElement("div")
                div.id = i
                div.style.width = "100%"
                div.style.height = "25%"
                div.style.backgroundSize = "100% 100%"
                div.style.backgroundImage = "url('/jpg/" + plyty[i] + ".jpg')"
                document.getElementById("left").append(div)
            }
        }


    }
    mainAppend(dirs, files, kolej, waga) {
        console.log(files)
        for (let i = 0; i < files.length * 6; i++) {
            let div = document.createElement("div")
            div.style.width = "21%"
            div.style.height = "100%"
            div.style.cssFloat = "left"
            div.style.fontSize = "20px"
            div.style.color = "white"
            div.style.fontStyle = "italic"
            div.style.overflow = "hidden"
            div.style.fontFamily = "Tahoma, Geneva, sans-serif"
            if (i % 6 == 0) {
                div.id = "a" + (i / 6)
                div.style.width = "92%"
                div.style.height = "15%"
                div.style.borderTop = "1px solid black"
                div.style.backgroundColor = "#5b8e7d"
                document.getElementById("main").append(div)
            }
            if (i % 6 == 1) {
                div.style.textAlign = "center"
                if (kolej == 1000) div.textContent = dirs[(i - 1) / 6] + ":"
                else div.textContent = dirs[kolej] + ":"
                div.style.fontStyle = "normal"
            }
            if (i % 6 == 2) {
                div.textContent = files[(i - 2) / 6]
                div.style.width = "58%"
            }
            if (i % 6 == 3) {
                div.style.width = "13%"
                let waga1 = waga[(i - 3) / 6]
                div.textContent = Math.floor(waga1 / (1024 * 1024)) + "," + Math.floor((waga1 % (1024 * 1024)) / 10485) + "MB"
            }
            if (i % 6 == 4) {
                div.id = "b" + ((i - 4) / 6)
                div.style.width = "8%"
            }
            if (i % 6 == 5) {
                div.id = "add" + ((i - 5) / 6)
                div.style.height = "15%"
                div.style.width = "8%"
                div.style.borderTop = "1px solid black"
                div.style.backgroundColor = "#5b8e7d"
                document.getElementById("main").append(div)
            }
            if (i % 6 != 0 && i % 6 != 5) document.getElementById("a" + Math.floor(i / 6)).append(div)
        }
    }
    clicksMain(kolej) {
        console.log(kolej)
        let that = this
        let liczba = document.getElementById("left").querySelectorAll('*[id]').length
        for (let i = 0; i < liczba; i++) {
            $("#" + i).unbind("click")
            $("#" + i).click(function () {
                kolej = this.id
                net.first(kolej)
            })
        }
        $("#playlista").unbind("click")
        $("#playlista").click(function () {
            console.log("klik")
            kolej = 1000
            net.first(kolej, that.playlista)
        })
    };
    clearButton(liczba) {
        for (let j = 0; j < liczba; j++) {
            if (document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/play.jpg")'
                || document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/pause.jpg")'
                || document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/play2.jpg")') {
                document.getElementById("b" + j).style.backgroundImage = "none"
            }
            if (document.getElementById("add" + j).style.backgroundImage == 'url("/jpg/add.jpg")'
                && this.flaga != j) {
                document.getElementById("add" + j).style.backgroundImage = 'none'
            }
        }
    }
    clicksBottom(kolej, data) {
        var muzykadolny = 0
        var liczba = document.getElementById("main").querySelectorAll('*[id]').length / 3
        console.log(liczba)
        var trueclick = 0
        var that = this
        if (this.blockclick == 0) that.kolej = kolej

        const nextPrev = () => {
            that.clearButton(liczba)
            if (that.kolej == kolej) {
                document.getElementById("b" + that.flaga).style.backgroundImage = 'url("/jpg/pause.jpg")'
                document.getElementById("b" + that.flaga).style.backgroundSize = "100% 100%"
                document.getElementById("add" + that.flaga).style.backgroundSize = '100% 100%'
                document.getElementById("add" + that.flaga).style.backgroundImage = 'url(/jpg/add.jpg)'
            }
            if (that.blockclick == 0) {
                that.flaga = 0
                music.muzyka(kolej, data, that.flaga)
                console.log("XD")
            }
            else {
                marian()
                music.muzyka(that.kolej, that.data, that.flaga)
            }
            that.blockclick++
            document.getElementById("startstop").style.backgroundImage = 'url("/jpg/pause.jpg")'
            that.nextside = 2
        }
        $("#next").unbind("click")
        $("#next").click(function () {
            console.log(that.flaga)
            that.flaga++
            if (that.flaga == that.liczba) that.flaga = 0
            nextPrev()
        });
        $("#prev").unbind("click")
        $("#prev").click(function () {
            console.log("prev")
            that.flaga--
            if (that.flaga < 0) that.flaga = that.liczba - 1
            nextPrev()
        })
        $("#startstop").unbind("click")
        $("#startstop").click(function () {
            for (let i = 0; i < liczba; i++) {
                if (document.getElementById("b" + i).style.backgroundImage == 'url("/jpg/play.jpg")' ||
                    document.getElementById("b" + i).style.backgroundImage == 'url("/jpg/pause.jpg")') {
                    that.blockclick = 1
                    that.flaga = i
                    break
                }
                else if (that.blockclick > 0 && i == liczba - 1) {
                    console.log(that.blockclick, that.flaga, that.nextside)
                    if (that.nextside % 2 == 1) {
                        music.playMuz()
                        document.getElementById("startstop").style.backgroundImage = 'url("/jpg/pause.jpg")'
                    }
                    if (that.nextside % 2 == 0) {
                        document.getElementById("startstop").style.backgroundImage = 'url("/jpg/play.jpg")'
                        music.stopMuz()
                    }
                    that.nextside += 1
                    break
                }
            }
            if (that.blockclick == 0 && that.nextside < 1) {
                that.nextside = 2
                console.log(that.nextside)
                that.flaga = 0
                document.getElementById("b0").style.backgroundSize = "100% 100%"
                document.getElementById("b0").style.backgroundImage = 'url("/jpg/pause.jpg")'
                document.getElementById("add0").style.backgroundSize = "100% 100%"
                document.getElementById("add0").style.backgroundImage = 'url("/jpg/add.jpg")'
                music.muzyka(kolej, data, that.flaga)
                muzykadolny = 1
            }
            if (that.flaga >= 0 && that.kolej == kolej) {
                console.log(that.kolej)
                if (document.getElementById("b" + that.flaga).style.backgroundImage == 'url("/jpg/play.jpg")' ||
                    muzykadolny == 1) {
                    muzykadolny = 0
                    music.playMuz()
                    document.getElementById("b" + that.flaga).style.backgroundImage = 'url("/jpg/pause.jpg")'
                    document.getElementById("startstop").style.backgroundImage = 'url("/jpg/pause.jpg")'
                }
                else if (document.getElementById("b" + that.flaga).style.backgroundImage == 'url("/jpg/pause.jpg")') {
                    document.getElementById("b" + that.flaga).style.backgroundImage = 'url("/jpg/play.jpg")'
                    document.getElementById("startstop").style.backgroundImage = 'url("/jpg/play.jpg")'
                    music.stopMuz()
                }
            }
            that.blockclick++
            marian()
        })
        for (let i = 0; i < liczba; i++) {
            $("#a" + i).click(function () {
                if (that.flaga != i) trueclick = 0
                if (document.getElementById("b" + i).style.backgroundImage == 'url("/jpg/pause.jpg")') {
                    document.getElementById("b" + i).style.backgroundImage = 'url(/jpg/play.jpg)'
                    document.getElementById("startstop").style.backgroundImage = 'url(/jpg/play.jpg)'
                    music.stopMuz()
                    that.nextside = 1
                }
                else {
                    for (let j = 0; j < liczba; j++) {
                        document.getElementById("b" + j).style.backgroundImage = 'none'
                        document.getElementById("add" + j).style.backgroundImage = 'none'
                    }
                    that.flaga = i
                    document.getElementById("b" + i).style.backgroundSize = "100% 100%"
                    document.getElementById("b" + i).style.backgroundImage = 'url(/jpg/pause.jpg)'
                    document.getElementById("startstop").style.backgroundImage = 'url(/jpg/pause.jpg)'
                    document.getElementById("add" + i).style.backgroundImage = 'url(/jpg/add.jpg)'
                    document.getElementById("add" + i).style.backgroundSize = "100% 100%"
                    if (trueclick == 0) {
                        music.muzyka(kolej, data, that.flaga)
                        that.nextside = 2
                    }
                    if (trueclick > 0) {
                        music.playMuz()
                        that.nextside = 2
                    }
                }
                trueclick++
                that.blockclick++
                marian()
            })
            $("#a" + i).hover(function () {
                for (let j = 0; j < liczba; j++) {
                    if (document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/play2.jpg")'
                        && that.flaga != j) {
                        document.getElementById("b" + j).style.backgroundImage = 'none'
                    }
                    if (document.getElementById("add" + j).style.backgroundImage == 'url("/jpg/add.jpg")'
                        && that.flaga != j) {
                        document.getElementById("add" + j).style.backgroundImage = 'none'
                    }

                }
                if (that.flaga != i || that.kolej != kolej) {
                    document.getElementById("b" + i).style.backgroundSize = "100% 100%"
                    document.getElementById("b" + i).style.backgroundImage = 'url(/jpg/play2.jpg)'
                    if (kolej != 1000) {
                        document.getElementById("add" + i).style.backgroundSize = '100% 100%'
                        document.getElementById("add" + i).style.backgroundImage = 'url(/jpg/add.jpg)'
                    }
                }
            })
            if (kolej != 1000) {
                $("#add" + i).hover(function () {
                    $("#add" + i).unbind("click")
                    $(this).click(function () {
                        console.log("Do playlisty dodano: " + data.dirs[kolej] + " : " + data.files[i])
                        console.log("TO JEST DIRS", that.playlista.dirs)
                        that.playlista.dirs.push(data.dirs[kolej])
                        that.playlista.tittle.push(data.files[i])
                        that.playlista.waga.push(data.waga[i])
                        console.log(that.playlista)

                    })

                    for (let j = 0; j < liczba; j++) {
                        if (document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/play2.jpg")'
                            && that.flaga != j) {
                            document.getElementById("b" + j).style.backgroundImage = 'none'
                        }
                        if (document.getElementById("add" + j).style.backgroundImage == 'url("/jpg/add.jpg")'
                            && that.flaga != j) {
                            document.getElementById("add" + j).style.backgroundImage = 'none'
                        }

                    }
                    if (that.flaga != i || that.kolej != kolej) {
                        document.getElementById("add" + i).style.backgroundSize = '100% 100%'
                        document.getElementById("add" + i).style.backgroundImage = 'url(/jpg/add.jpg)'

                    }
                })
            }

        }
        const marian = () => {
            if (this.liczba == 0) this.liczba = liczba
            if (this.data == "") this.data = data
            for (let j = 0; j < liczba; j++) {
                if (document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/play.jpg")'
                    || document.getElementById("b" + j).style.backgroundImage == 'url("/jpg/pause.jpg")') {
                    this.data = data
                    this.kolej = kolej
                    this.liczba = liczba
                }
            }
        }
        marian()
    }
}
