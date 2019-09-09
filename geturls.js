var fs = require('fs');
var urllib = require('url');
 
var pendingGets = 0;
 
const https = require('https');
 
function head(url, handler) {
    var siteurl = urllib.parse(url);
 
    var options = {
        hostname: siteurl.host,
        port: null,
        timeout: 300000,
        path: siteurl.pathname,
        method: 'GET',
        headers : {
            'User-Agent': 'curl/7.47.0'
        }
    };
 
    var request = https.request(options, handler);
    request.end();
    return request;
}
 
function trygrab(url, index, andThen) {
 
 
    return head(url, (resp) => {
 
      console.log(url + "," + resp.statusCode + "," + retries);
    resp.destroy();
    retries = 1;
    andThen();
    });
 
}
 
 
var filename = process.argv[2];
 
var parse = require('csv-parse');
 
var i = -1;
var retries = 1;
var parser = parse({delimiter: ','}, function(err, data){
 
 
    function grabNext() {
        i++;
        if(i >= data.length) { return; }
        var url = data[i][0];
        process.stderr.clearLine();
        process.stderr.cursorTo(0);
        process.stderr.write(url + " attempt: " + retries);
        trygrab(url, i, grabNext).on('error', function(e) {
            i--;
            retries++;
           
            grabNext();
        });
    }
 
    grabNext();
 
 
 
});
 
fs.createReadStream(filename).pipe(parser);