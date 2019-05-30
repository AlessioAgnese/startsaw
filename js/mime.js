function checkMIME(filet){
    return new Promise((resolve,reject)=>{getBlobType(filet).then(x=>{resolve(true);}).catch(e=>{reject(false);})})
}

function getBlobType(filet){

    return new Promise((resolve,reject)=>{
    var blob=filet;
    var header = "";
    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {
    var arr = (new Uint8Array(e.target.result));
    for(var i = 0; i < arr.length; i++) header += arr[i].toString(16);  
        var arrayBuffer = fileReader.result;
    if(convertHeader(header)) resolve(true);
    else reject(false);};
    fileReader.readAsArrayBuffer(blob.slice(0,4));})
    }
    
function convertHeader(header){
    switch (header) {
        case "89504e47"://png
            return true;
        case "47494638"://gif
            return true;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2"://jpeg
            return true;
        default:
            return false;}  
}

  
