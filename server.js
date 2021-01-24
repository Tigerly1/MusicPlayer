var http = require("http");
var fs = require("fs")
var path = require("path")
var qs = require("querystring")

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":

            const filePath = req.url
            const fileExt = String(path.extname(filePath)).toLowerCase()
            if (req.url === "/") {
                fs.readFile("./static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (fileExt == ".css") {
                fs.readFile("./static" + filePath, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (fileExt == ".js") {
                fs.readFile("./static" + filePath, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (fileExt == ".jpg") {
                fs.readFile("./static" + filePath, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (decodeURI(req.url.indexOf(".mp3")) != -1) {
                fs.readFile(decodeURI("./static" + filePath), function (error, data) {
                    res.writeHead(200, { "Content-type": "audio/mpeg;charset=utf-8" });
                    res.write(data);
                    res.end();
                })
            }
            else if (fileExt == ".png") {
                fs.readFile("./static" + filePath, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            var allData = "";
            var podfolder = 0
            //kiedy przychodzą dane POSTEM, w postaci pakietów,
            //łącza się po kolei do jednej zmiennej "allData"
            // w poniższej funkcji nic nie modyfikujemy

            req.on("data", function (data) {
                allData += data;
            })

            //kiedy przyjdą już wszystkie dane
            //parsujemy je do obiektu "finish"
            //i odsyłamy do przeglądarki
            var obj = {
                "plyty": [],
                "dirs": [],
                "files": [],
                "waga": []
            }
            req.on("end", function (data) {
                var finish = qs.parse(allData)
                if (finish.a > -1) podfolder = finish.a
                if (finish.b != undefined) var arek = JSON.parse(finish.b)
                console.log("TO jest arek", arek)
                if (+podfolder != 1000) {
                    fs.readdir(decodeURI(__dirname + "/static/mp3"), function (err, files) {
                        if (err) {
                            return console.log(err);
                        }
                        //
                        files.forEach(function (fileName) {
                            obj.dirs.push(fileName)
                            //tu dodaj foldery do wcześniej utworzonej tablicy
                        });
                        // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
                        fs.readdir(decodeURI(__dirname + "/static/mp3/" + files[podfolder]), function (err, filess) {
                            if (err) {
                                return console.log(err);
                            }
                            //
                            filess.forEach(function (file) {
                                var stats = fs.statSync(decodeURI(__dirname + "/static/mp3/" + files[podfolder] + "/" + file));
                                obj.waga.push(stats.size)
                            });
                            filess.forEach(function (fileName) {
                                obj.files.push(fileName)
                            });
                            res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
                            res.end(JSON.stringify(obj, null, 4));
                            // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
                        });
                    });
                }
                else {
                    fs.readdir(decodeURI(__dirname + "/static/mp3"), function (err, files) {
                        if (err) {
                            return console.log(err);
                        }
                        files.forEach(function (fileName) {
                            obj.plyty.push(fileName)
                            //tu dodaj foldery do wcześniej utworzonej tablicy
                        });
                        obj.dirs = arek.dirs
                        obj.files = arek.tittle
                        obj.waga = arek.waga
                        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
                        res.end(JSON.stringify(obj, null, 4));
                        console.log("To prawdziwy obiekt", obj)
                    });

                }
            });
        default: break;

    }

})


server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});