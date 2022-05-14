
# copybot.xyz

copybot is your copywriting companion. It takes a text input and condeses it into a short, easy-to-read social media post. 
Using the power of Open AI's GPT-3, copybot makes life easier for small-medium business owners who don't have the time (or budget) to hire a full-time social media specialist or copywriter.

Future iterations of the project will include: 

* Translation ability (EN-FR)
* A list of trending topics/hashtags
* Authentication so you can log in with Google or Twitter


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


## Lessons Learned

Lessons learned include: 

* best practices when using MUI
* security limitations to be aware of when using a database, or AI tech
* time limitations and underestimating the length of time to complete a task




## Tech Stack

**Client:** React, HTML, MUI, SCSS/CSS

**Server:** Node, Express, Firebase, GPT-3

