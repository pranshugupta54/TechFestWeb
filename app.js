//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

let events = [
    {title: 'Fill in Code',
    code: 'test',
    date: '4d marhc',
    time: '2 pm ',
    venue: 'block e',
    size: '5',
    prize: '100k',
    contact: '82388238823',
    rules: 'https://github.com/pranshugupta54/TechFestWeb',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl orci. Nunc a justo et tellus sagittis vestibulum. Duis ac consectetur mi, eget volutpat leo. Ut mi ante, efficitur luctus arcu eu, rhoncus placerat nibh. Nulla congue sodales mauris sed interdum. Etiam felis turpis, porta et nisl dignissim, laoreet ornare',
    img: 'https://yt3.ggpht.com/ytc/AMLnZu-LoDd3BlAJ3dh7B4qMez5hGCBS8axheuX2TIlz=s900-c-k-c0x00ffffff-no-rj'
},
{title: 'Fill in  the the Code',
    code: 'fc101',
    date: '4d marhc',
    time: '2 pm ',
    venue: 'block e',
    size: '5',
    prize: '100k',
    contact: '82388238823',
    rules: 'https://github.com/pranshugupta54/TechFestWeb',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl orci. Nunc a justo et tellus sagittis vestibulum. Duis ac consectetur mi, eget volutpat leo. Ut mi ante, efficitur luctus arcu eu, rhoncus placerat nibh. Nulla congue sodales mauris sed interdum. Etiam felis turpis, porta et nisl dignissim, laoreet ornare',
    img: 'https://yt3.ggpht.com/ytc/AMLnZu-LoDd3BlAJ3dh7B4qMez5hGCBS8axheuX2TIlz=s900-c-k-c0x00ffffff-no-rj'
}];

const homeContent = "";
const aboutContent = "";
const contactContent = "";
const eventsContent = "";
const registerContent = "Registration krna nahi aata"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

urlReq = ['/about', '/contact', '/register']

app.get(urlReq, function(req,res){
  const str = req.path;
  const urlName = str.substring(str.indexOf('/') + 1);
  displayContent = `${urlName}Content`.valueOf();

  // res.send(eval(displayContent));
  res.render(urlName, {startingContent: eval(displayContent)});
})

app.get(["/events"], function(req,res){
    res.render("events", {events: events});
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

app.post("/contact", function(req,res){
    res.send(`Working on it <br> <a href="/">HOME</a>`)
})

app.get("/events/:eventCode", function(req,res){
  const requestCode = _.lowerCase(req.params.eventCode);
  events.forEach(function(event){
    const storedCode = _.lowerCase(event.code);
    if(storedCode == requestCode){
      res.render("event", {eventFull: event})
    }
    // else{
    //     res.render("404");
    //     res.send(`Can't find ${requestCode} || ${storedCode}`);
    // }
  })
  res.render("404");
})

app.get("*", function(req,res){
    res.render("404");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});