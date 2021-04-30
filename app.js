const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
/*for static files like the css file and the image
 that are defined on the local variable, we need
 to use the above statement*/
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;
  console.log(firstName,lastName,email);
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us1.api.mailchimp.com/3.0/lists/9725abefbc";
  const options={
    method:"POST",
    auth:"Akanksha1:c3669c9b67702566ac74fc1ab7964ce2-us1"
  }
  const request=https.request(url,options, function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html");
    }


  })
  request.write(jsonData);
  request.end();
  // removes all unnecessary spaces and makes it into 1 line
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

// audience id: 9725abefbc
//api key: c3669c9b67702566ac74fc1ab7964ce2-us1
