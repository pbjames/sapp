<img width="1085" alt="image" src="https://github.com/user-attachments/assets/9c26cf4f-0835-4923-9bfc-90c87d80b612" />

# SAPP - Sentimental Analysis for Profitable Posts

SAPP is an all in one intelligent dashboard and content creation tool purpose purpose built to assist creators on the Zora platform.

Using the SAPP platform you can effortlessly view your own assets, see upcoming trending coins, analyze your own profile, other creators profiles or individual coins, generate new coin ideas, and deploy new coins all from a simple intuitive and easy to use dashboard.

Built ontop of the Zora SDK, we seamlessly integrate with the platform providing the most up to date and accurate information.

## How it works

We use transformer models of various capabilities, notably this includes image _vision_ and _creation_. On top of this, we use _agents_ in order to freely decide what feedback
to report to the user, including a chat function with long-term memory for multi-turn conversations.

First, prompts are chained together through a pipeline incrementally refines the output until it conforms to strict standards using a negative feedback loop. Next, we aggregate
LLM invocations in to one complete response. Finally, we report results as _General Coin Analysis_ as part of the profile analysis.

![image](https://github.com/user-attachments/assets/60d094fa-9ce8-40aa-8ab2-aefd63bd0519)

## Features

### Index

On the index of the page, we showcase the features of our application in more detail, you can also find the login page in the Navbar. Here, you can register for a free account, or signin to an existing account.

<img width="1128" alt="image" src="https://github.com/user-attachments/assets/d36024ae-b19b-4822-bb87-d808db675f8f" />

<img width="1063" alt="image" src="https://github.com/user-attachments/assets/f2b94a93-ae76-48c1-b86e-eb40416f2bf5" />


### View your own assets

On the main dashboard, you'll find all your assets listed sorted by your current holdings, with a button to open a modal to view the value of your holdings over the last few days. Clicking on the coin will take you to the respective Zora page.

### View upcoming trending coins

On the main dashboard, you'll find coins on Zora that are currently trending. You can quickly see their current market cap, as well as their change in the last 24 hours. Clicking on the coin will take you to the respective Zora page.

<img width="1181" alt="image" src="https://github.com/user-attachments/assets/5bb925b8-248d-41f6-a3ab-a2523b78b673" />

<img width="904" alt="image" src="https://github.com/user-attachments/assets/cc480f6c-cd57-4454-bfb4-924daac7abf9" />


### Analyze your own profile

<img width="1184" alt="image" src="https://github.com/user-attachments/assets/6ea69894-89a1-462d-a695-26f14aa0c66b" />

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

<img width="1190" alt="image" src="https://github.com/user-attachments/assets/658a59b9-57de-4687-af4d-0dfa7e24a8f3" />

### Analyze other creators profiles

Similar to the above, but rather choosing "Another profile", this will instead do the above but on someone elses profile instead.

<img width="1208" alt="image" src="https://github.com/user-attachments/assets/078003c0-c544-4535-b150-0101fe68f4a8" />

### Analyze individual coins

Similar to the above but more focused on when you want to know about a specific coin - The AI will look at all the metrics the same and do sentimental analsysis, and give a final report on the coin.

<img width="1197" alt="image" src="https://github.com/user-attachments/assets/91e58389-ef76-402a-ac67-518a2e674950" />

<img width="991" alt="image" src="https://github.com/user-attachments/assets/d7863792-20c0-4582-9e82-4434bc78ee3e" />


### Generate ideas

Going to the generate ideas tab, you can now generate coin ideas. This is based on a custom prompt, and your latest reports are also fed in as context to the artificial intelligence. You will now be given post suggestions to make to maximise your earnings!

<img width="1203" alt="image" src="https://github.com/user-attachments/assets/1b2bda59-fcd3-41ad-9bd5-f2f3e9be150a" />

<img width="1175" alt="image" src="https://github.com/user-attachments/assets/24d33021-f5fd-482b-935e-d6e3cd7107cc" />

You can also generate an image by using the "Generate Image" button. This will call a DALL-E model and feed it the generated information, generating you a custom image to use for your coin.

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/41266187-65f8-42a3-bade-acb21e1661d2" />

### Reports Tab

Analyzing your profile, other profiles, coins, or generating an idea will save the report to the reports tab. The reports tab maintains a historical record of all the reports we have generated for you!

<img width="1213" alt="image" src="https://github.com/user-attachments/assets/a1cdf0d2-b69f-49fd-9c91-755f27b47ccb" />

You can go to a report to see the full text

<img width="1187" alt="image" src="https://github.com/user-attachments/assets/f5f497b8-582d-4fb9-a81f-f4eff0a0bdce" />


