function upload() {
    //Upload file to blob
    try {
        await blockBlobClient.uploadStream(fs.createReadStream(localFilePath), 4 * 1024 * 1024, 20, {
          abortSignal: AbortController.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
          onProgress: (ev) => console.log(ev)
        });
        console.log("uploadStream succeeds");
      } catch (err) {
        console.log(
          `uploadStream failed, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
        );
      }
    
      const fileSize = fs.statSync(localFilePath).size;
      const buffer = Buffer.alloc(fileSize);
      try {
        await blockBlobClient.downloadToBuffer(buffer, 0, undefined, {
          abortSignal: AbortController.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
          blockSize: 4 * 1024 * 1024, // 4MB block size
          concurrency: 20, // 20 concurrency
          onProgress: (ev) => console.log(ev)
        });
        console.log("downloadToBuffer succeeds");
      } catch (err) {
        console.log(
          `downloadToBuffer failed, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
        );
      }    
    var element = document.getElementById("upmsg");
    element.innerHTML = "The file has been uploaded successfully. Click \"next step\" to continue.";
  }
  function done(){
      const http = new XMLHttpRequest();
      const url = "https://zhentestwechat.azurewebsites.net/api/Inc?code=qUzUGwLj0n8jXbgTSh/OnJm49elggJpkW8lPBy3387PSlnr6LhiupA==&name=student";
      http.onreadystatechange=function(){
        if(http.readyState==4 && http.status==200){
          var x=document.getElementById("donemsg");
          x.innerHTML = http.responseText;
        }
      }
      http.open("GET", url);
      http.send();
  }
  function refresh(){
      var x=document.getElementById("resultmsg");
      x.innerHTML = "1 student has watched the video"
  }
