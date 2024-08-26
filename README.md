Rebrew
---

This is an app originally written for the Orange County Mashups, a homebrewing club based out of Orange County, CA. 

As a homebrewer, it's great to get feedback on beer/mead/cider you make. This often comes by bringing a bunch to a monthly homebrew club meeting, letting peers taste, and collect verbal critique, etc. This can often be overwhelming, and in cases like the Mashups, it's simply not possible to get feedback from 20+ people in the span of 5-10 minutes.

Enter Rebrew. It's a lightweight app that lets users log in, submit beers they plan to bring to the monthly meeting, and review the beers brought by others. The review form is what I call BJCP-lite, meaning it is similar to an official BJCP homebrew competition scoring sheet, made simpler so it can be filled out in one minute or less. Now, after the meeting, those who brought beer can peruse feedback at their leisure and have it in written form!

Tech stack

* NextJS for both API and frontend
* MaterialUI frontend components
* Auth0 for authN (more robust authZ tbd)
* DynamoDB storage layer
* Fly.io hosting/deployments
