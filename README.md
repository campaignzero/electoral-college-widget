![Campaign Zero Logo](https://github.com/campaignzero/artwork/raw/master/logo/campaign-zero/web/306x128/campaign-zero.png "Campaign Zero Logo")

Electoral College Widget
===

![Demo](http://i.imgur.com/lpZ648g.gif "Demo")

Usage Instructions
---

To use this script, you simply need to add the following code anywhere on your website that you want the widget to show up:

```html
<script async src="https://electoral-college.joincampaignzero.org/widget.js" charset="utf-8"></script>
```

This will inject a widget into a newly created HTML element with the ID `electoral-college-widget` directly above where you placed our script.


Alternate Usage Instructions
---

If you are unable to place JavaScript where you want the widget to go, you can use the following HTML directly:

```html
<div id="electoral-college-widget"></div>
```

Then, include the following script tag anywhere else on your page:

```html
<script async src="https://electoral-college.joincampaignzero.org/widget.js" charset="utf-8"></script>
```

If you are using something like WordPress that just asks you for the URL for the script to put in your footer, you can use the following URL:

```
https://electoral-college.joincampaignzero.org/widget.js
```

For browsers that let you use iFrames, you can also use:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="600" height="630" frameborder="0" ></iframe>
```

Demos
---

* [DEMO](https://electoral-college.joincampaignzero.org/embed.html): Widget using just the script tag
