const express = require("express");
var helmet = require('helmet');
var compression = require('compression');

const app = express();

const logger = (req, res, next) => {
  console.log("before");

  res.on("finish", function () {
    console.log("after");
  });

  next();
};

app.use(logger);
app.use(helmet);
app.use(helmet);
app.use(compression);

app.get("/resume/api/resume_service/skills", (req, res) => {
  const client = app.db;
  const skillsCollection = client.db("resume").collection("skills");
  skillsCollection.find().toArray((err, data) => {
    res.json({
      skills: {
        list: data,
      },
      error: [err],
    });
  });
});

app.get("/resume/api/resume_service/experiences", (req, res) => {
  const client = app.db;
  const experienceCollection = client.db("resume").collection("experiences");
  experienceCollection.find().toArray((err, data) => {
    res.json({
      experiences: {
        list: data,
      },
      error: [err],
    });
  });
});

app.get("/resume/api/app_service/initialize", (req, res) => {
  const client = app.db;
  const appCollection = client.db("resume").collection("application");
  const linkCollection = client.db("resume").collection("links");
  appCollection.find().toArray((appErr, app) => {
    linkCollection.find().toArray((linkErr, links) => {
      res.json({
        title: app[0],
        header: {
          list: links,
        },
        error: [appErr, linkErr],
      });
    });
  });
});

module.exports = app;
