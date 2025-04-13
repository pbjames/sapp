# SAPP

SAPP is an all in one intelligent dashboard and content creation tool purpose purpose built to assist creators on the Zora platform.

Using the SAPP platform you can effortlessly view your own assets, see upcoming trending coins, analyze your own profile, other creators profiles or individual coins, generate new coin ideas, and deploy new coins all from a simple intuitive and easy to use dashboard.

Built ontop of the Zora SDK, we seamlessly integrate with the platform providing the most up to date and accurate information.

## Features

### View your own assets

On the main dashboard, you'll find all your assets listed sorted by your current holdings, with a button to open a modal to view the value of your holdings over the last few days. Clicking on the coin will take you to the respective Zora page.

### View upcoming trending coins

On the main dashboard, you'll find coins on Zora that are currently trending. You can quickly see their current market cap, as well as their change in the last 24 hours. Clicking on the coin will take you to the respective Zora page.

### Analyze your own profile

Going to Analyze Profile, then choose "My profile", and the AI will do a deep dive into your profile. This includes:

- Analyzing your bio
- Analyzing your profile picture
- Analyzing your coins

For your top 5 coins, the AI will analyze:
- The name of the asset
- The picture
- The total supply
- The market volume, and it's change in the last 24 hours
- How much the creator has earned
- How old the coin is
- How many unique holders own the coin
- The comments sentimental score, based on a custom SVM model is used to determine a score. If people are being more positive, the score will be higher.
- Based on all these factors, a machine learning model is used to determine a ROI score.

Finally, using all these metrics, a custom GPT prompt is used to generate a human readable report breaking down the above metrics.

### Analyze other creators profiles

Similar to the above, but rather choosing "Another profile", this will instead do the above but on someone elses profile instead.

### Analyze individual coins

Similar to the above but more focused on when you want to know about a specific coin - The AI will look at all the metrics the same and do sentimental analsysis, and give a final report on the coin.

### Generate ideas

Going to the generate ideas tab, you can now generate coin ideas. This is based on a custom prompt, and your latest reports are also fed in as context to the artificial intelligence. You will now be given post suggestions to make to maximise your earnings!

You can also generate an image by using the "Generate Image" button. This will call a DALL-E model and feed it the generated information, generating you a custom image to use for your coin.

### Reports Tab

Analyzing your profile, other profiles, coins, or generating an idea will save the report to the reports tab. The reports tab maintains a historical record of all the reports we have generated for you!
