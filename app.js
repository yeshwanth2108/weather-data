const express=require("express");
const https=require("https");
const bodyParser=require("body-Parser")

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    //console.log("request");
    //console.log(req.body.cityName);
    const query=req.body.cityName;
    const apikey="733a42369e874747222d71a0e20bf72a";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(responce){
        //console.log(responce.statusCode);
        responce.on("data",function(data){
            //console.log(data);
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdes=weatherdata.weather[0].description
            const icon=weatherdata.weather[0].icon
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            //console.log(temp);
            //console.log(weatherdes);
            res.write("<p>the weather is currenty "+ weatherdes+"</p>")
            res.write("<h1>the temparature in "+query+" is "+temp+" degre cecius</h1>");
            res.write("<img src="+imgurl+">")

            res.send()
        })
    })
})



app.listen(3000,function(){
    console.log("server is running on port 3000.");
})
