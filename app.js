//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

let events = [
    {title: 'Fill Code',
    code: 'fc101',
    date: '4d marhc',
    time: '2 pm ',
    venue: 'block e',
    size: '5',
    prize: '100k',
    contact: '82388238823',
    rules: 'https://github.com/pranshugupta54/TechFestWeb',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl orci. Nunc a justo et tellus sagittis vestibulum. Duis ac consectetur mi, eget volutpat leo. Ut mi ante, efficitur luctus arcu eu, rhoncus placerat nibh. Nulla congue sodales mauris sed interdum. Etiam felis turpis, porta et nisl dignissim, laoreet ornare',
    img: 'https://lh3.googleusercontent.com/drive-viewer/AJc5JmSgz-fH4hv6XoAvrPTtpD3f41JJp8z5siIHkoUX_jRukxaENRUA63pZrHV0lD_mPH2iv5zWn7tAER--bPwj2kvFM_fxRQ=w2764-h1592'
}
];

const homeContent = "Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretim quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const eventsContent = "";
const registerContent = "Registration krna nahi aata"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

urlReq = ['/about', '/contact', '/events', '/register']

app.get(urlReq, function(req,res){
  const str = req.path;
  const urlName = str.substring(str.indexOf('/') + 1);
  displayContent = `${urlName}Content`.valueOf();

  // res.send(eval(displayContent));
  res.render(urlName, {startingContent: eval(displayContent)});
})

app.get(["/", '/home'], function(req,res){
  res.render("home", {startingContent: homeContent, events : events});
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  const event = {
    title: req.body.eventTitle,
    code: req.body.eventCode,
    date: req.body.eventDate,
    time: req.body.eventTime,
    venue: req.body.eventVenue,
    size: req.body.eventSize,
    prize: req.body.eventPrize,
    contact: req.body.eventContact,
    rules: req.body.eventRules,
    about: req.body.eventAbout,
    img: req.body.eventImg
  };
  events.push(event);
  console.log(events);
  res.redirect("/");
})


app.get("/events/:eventCode", function(req,res){
  const requestCode = _.lowerCase(req.params.eventCode);
  events.forEach(function(event){
    const storedCode = _.lowerCase(event.code);

    if(storedCode == requestCode){
      res.render("event", {eventFull: event})
    }
    else{
        res.render("404");
    }
  })
})




app.get("*", function(req,res){
    res.render("404");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});