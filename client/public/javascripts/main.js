const fs = require("fs");
const {BlobServiceClient } = require("@azure/storage-blob");

function upload() {
    try {
        //setup clients, credentials
        const pipeline = newPipeline(new AnonymousCredential(), {
            retryOptions: { maxTries: 4 }, 
            userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" }, 
            keepAliveOptions: {
                enable: false
            }
            });
        
        const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net${accountSas}`,
        pipeline
        );        
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        //upload file
        await blockBlobClient.uploadFile(localFilePath, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        concurrency: 20, // 20 concurrency
        onProgress: (ev) => console.log(ev)
      });
    } catch (err) {
      console.log(
        `uploadFile failed, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
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
