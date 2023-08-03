# Quizzy Match API

Quizzy Match is a social app that allows users to match based on their values. Users can upload questions, and the app can match individuals based on their answers.

# Prerequest

1. Install nvm:

Follow the instructions at https://github.com/nvm-sh/nvm to install nvm.

2. Install Node.js 18:
Run the following command to install Node.js 18 using nvm:
```bash
nvm install 18
```

3. Install Yarn:
    Run the following command to install Yarn globally:
```bash
npm i -g yarn
```

4. Create an AWS account

5. Create a .env.local file in the project's root folder with the following content:
```env
AWS_ACCESS_KEY_ID=your access key id
AWS_SECRET_ACCESS_KEY=your secret access key
# Region ap-northeast-1 is at tokyo
AWS_REGION=ap-northeast-1
NODE_ENV=development
```

# Getting Started

1. Open the JavaScript Debug Terminal and execute the following command:
```bash
yarn dev
```

2. Open another terminal and execute the following command:
```bash
yarn dev:web
```

# About Packages

# React tips

Pass all the props from a parent component to a child component:
https://medium.com/coding-at-dawn/how-to-pass-all-props-to-a-child-component-in-react-bded9e38bb62

# Graphql tutorial

https://stackoverflow.com/questions/61526823/what-is-on-doing-in-this-graphql

# TODOS:

1. When user sign in, ask them their gender and dob, and the gendder they want to match, below is the User type

```typescript
type User = { gender: 'male' | 'female'; dob: "1993-09-29", matchGender: 'male' | 'female', createdAt: number; updatedAt: number }
```

1. Let the user can send question to server and store in DB, the Question type will be like:

```typescript
type Question = { _id: ObjectId, questions: string; popularity: number, createdAt: number }
```

Question examples:

Your toothpaste squeeze from where?

A: Top
B: Bottom
C: Middle
D: Ramdon

When to dispose of the toothbrush?

A: Never
B: Something stuck in toothbrush

2. User can answer the question, and store the answer into DB, the item data type will be like:

```typescript
type Answer = { answers: "DBACB", dob: "2001-01-03", gender: "male" | "female", matchGender: "male" | "female", userId: "avjiojw2e30ff", questionId: "jbvi3ifgoi9" }
```

3. Use mongodb query to list the answers. List the answers that from most matched.
    If the user "Jason" want view answer list, Jason's answer is "DBACB", and the pagination is set to 2 item per page, the answer1.answers is  DBAAA and anwser2.answers is DBACC, the list will be answer1, answer2

```typescript
async function getAnswersByMatched(ageRange: [number, number], answers: string, questionId: string): Promise<Answer[]> {
  const matchRegex = new RegExp(`^${answers}`); // /a(n(s(w(e(r?)?)?)?)?)?/g

  const answers = await Answer.find({
    questionId,
    dob: {
      $gte: new Date(new Date().getFullYear() - ageRange[1], 0, 1), // ageRange[1] is the upper bound of age
      $lt: new Date(new Date().getFullYear() - ageRange[0], 0, 1), // ageRange[0] is the lower bound of age
    },
    answers: {
      $regex: matchRegex,
    },
  }).sort({
    answers: {
      $cond: [
        { $eq: [{ $substr: ['$answers', 0, 5] }, 'DABCDE'] },
        0,
        {
          $cond: [
            { $eq: [{ $substr: ['$answers', 0, 4] }, 'DABCD'] },
            1,
            {
              $cond: [
                { $eq: [{ $substr: ['$answers', 0, 3] }, 'DABC'] },
                2,
                {
                  $cond: [
                    { $eq: [{ $substr: ['$answers', 0, 2] }, 'DAB'] },
                    3,
                    {
                      $cond: [
                        { $eq: [{ $substr: ['$answers', 0, 1] }, 'DA'] },
                        4,
                        5, // for anything else
                      ]
                    },
                  ]
                },
              ]
            },
          ]
        },
      ]
    }
  });

  return answers;
}
```

# Troble shooting:

## DNS setting

Typically update NS record at domain registar will change the nameserver, but in AWS it need more steps:
https://community.cloudflare.com/t/properly-changing-nameservers-on-route53/418135
Why this happend:
https://stackoverflow.com/questions/70853960/ns-records-in-route53-not-updating
Official document:
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-name-servers-glue-records.html#domain-name-servers-glue-records-adding-changing
https://docs.aws.amazon.com/zh_tw/Route53/latest/DeveloperGuide/domain-configure-dnssec.html
What is DNS?
https://www.cloudflare.com/zh-tw/learning/dns/what-is-dns/
How DNS working
https://serverfault.com/questions/116359/what-happens-when-i-change-a-name-server-record-or-an-a-record-in-the-zone-file

## Mix content error

https://kinsta.com/blog/mixed-content-warnings/#:~:text=Share-,What%20Is%20a%20Mixed%20Content%20Warning%3F,HTTPS%20are%20completely%20separate%20protocols.
https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/#:~:text=Automatic%20HTTPS%20Rewrites%20prevents%20end,can%20be%20served%20with%20HTTPS.

