package main

import (
    "fmt"
    "net/http"
    "log"
    "crypto/md5"
    "encoding/hex"
    "os"
    "io"
    "path"
    "bytes"
    "encoding/json"
    // "strings"
)

type Message struct {
    Name string
    Hash string
    OriginalName string
    ContentType string
}

type StatusMessage struct {
    Status string
}

func upload(w http.ResponseWriter, r *http.Request) {
    fmt.Println("method:", r.Method)
    var buf bytes.Buffer
    if r.Method == "GET" {
        r.ParseForm()
        fmt.Println(r.Form)
        fmt.Println(r.Form["file_path"][0])
        os.Remove("../uploads/"+r.Form["file_path"][0])
        sm := StatusMessage{Status: "OK"}
        json.NewEncoder(w).Encode(sm)
    }
    if r.Method == "POST" {
        r.ParseMultipartForm(32 << 20)
        file, handler, err := r.FormFile("file")
        if err != nil {
            fmt.Println(err)
            return
        }
        defer file.Close()
        h := md5.New()
        io.Copy(&buf, io.TeeReader(file, h))
        md5String := hex.EncodeToString(h.Sum(nil))
        fileName := md5String+path.Ext(handler.Filename)
        f, err := os.OpenFile("../uploads/"+fileName, os.O_WRONLY|os.O_CREATE, 0666)
        if err != nil {
            fmt.Println(err)
            return
        }
        defer f.Close()
        io.Copy(f, &buf)
        m := Message{
            Name: fileName,
            Hash: md5String,
            OriginalName: handler.Filename,
            ContentType: handler.Header.Get("Content-Type"),
        }
        json.NewEncoder(w).Encode(m)
    }
}

func main() {
    http.HandleFunc("/", upload) // set router
    err := http.ListenAndServe(":9090", nil) // set listen port
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
