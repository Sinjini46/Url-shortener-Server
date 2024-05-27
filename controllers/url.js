const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handlegeneratedurl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  const shortID = nanoid(8);
  await URL.create({
    shortid: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID, shortUrl: `${req.protocol}://${req.get('host')}/${shortID}` });
}

async function handlegetAnalytics(req, res) {
  const fullUrl = req.params.shortUrl;
  const urlObj = new URL(fullUrl);
  const shortid = urlObj.pathname.slice(1); // Extract the shortid from the URL path
  const result = await URL.findOne({ shortid });
  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handlegeneratedurl,
  handlegetAnalytics,
};
