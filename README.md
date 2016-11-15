![Campaign Zero Logo](https://github.com/campaignzero/artwork/raw/master/logo/campaign-zero/web/306x128/campaign-zero.png "Campaign Zero Logo")

Electoral College Widget
===

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/campaignzero/electoral-college-widget/master/LICENSE)  [![GitHub contributors](https://img.shields.io/github/contributors/campaignzero/electoral-college-widget.svg)](https://github.com/campaignzero/electoral-college-widget/graphs/contributors)

![Demo](http://i.imgur.com/pGJAW1X.gif "Demo")


Demo
---

* [Electoral College Widget Demo](https://electoral-college.joincampaignzero.org/embed.html): Widget using Script Tag with Custom HTML Element Placement


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

#### XS Widget:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="300" height="375" frameborder="0"></iframe>
```

#### S Widget:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="400" height="480" frameborder="0"></iframe>
```

#### M Widget:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="500" height="530" frameborder="0"></iframe>
```

#### L Widget:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="600" height="630" frameborder="0" ></iframe>
```

#### XL Widget:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="700" height="690" frameborder="0"></iframe>
```

#### XXL Widget:

```html
<iframe src="https://electoral-college.joincampaignzero.org/embed.html" id="electoral-college" width="800" height="755" frameborder="0"></iframe>
```