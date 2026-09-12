const http=require("http"),fs=require("fs"),path=require("path");
const PORT=process.env.PORT||10000, HOST="0.0.0.0", root=__dirname;
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".ico":"image/x-icon"};
http.createServer((req,res)=>{
  const u=new URL(req.url,`http://${req.headers.host||"localhost"}`);
  if(u.pathname==="/health"||u.pathname==="/healthz"){res.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});return res.end("ok")}
  let p=decodeURIComponent(u.pathname); if(p==="/")p="/index.html";
  const f=path.resolve(root,"."+p);
  if(!f.startsWith(root)){res.writeHead(403);return res.end("Forbidden")}
  fs.stat(f,(e,s)=>{
    if(!e&&s.isFile()){res.writeHead(200,{"Content-Type":mime[path.extname(f).toLowerCase()]||"application/octet-stream"});return fs.createReadStream(f).pipe(res)}
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});fs.createReadStream(path.join(root,"index.html")).pipe(res)
  });
}).listen(PORT,HOST,()=>console.log(`The Last Port running on ${HOST}:${PORT}`));
