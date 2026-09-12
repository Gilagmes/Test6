const http=require("http"),fs=require("fs"),path=require("path");
const PORT=process.env.PORT||10000, HOST="0.0.0.0", root=__dirname;
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".ico":"image/x-icon",".wasm":"application/wasm"};
http.createServer((req,res)=>{
  try{
    const u=new URL(req.url,`http://${req.headers.host||"localhost"}`);
    if(u.pathname==="/health"||u.pathname==="/healthz"){
      res.writeHead(200,{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"});return res.end("ok");
    }
    let p=decodeURIComponent(u.pathname); if(p==="/")p="/index.html";
    const f=path.resolve(root,"."+p);
    if(f!==root && !f.startsWith(root+path.sep)){res.writeHead(403);return res.end("Forbidden")}
    fs.stat(f,(e,s)=>{
      if(!e&&s.isFile()){
        res.writeHead(200,{"Content-Type":mime[path.extname(f).toLowerCase()]||"application/octet-stream","Cache-Control":"no-cache"});
        return fs.createReadStream(f).pipe(res);
      }
      res.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache"});
      fs.createReadStream(path.join(root,"index.html")).pipe(res);
    });
  }catch(e){res.writeHead(500);res.end("Server error")}
}).listen(PORT,HOST,()=>console.log(`The Last Port running on ${HOST}:${PORT}`));
