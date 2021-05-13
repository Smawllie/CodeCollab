<h1 align="center">
  <a href="https://codecollab.me">CodeCollab</a>
</h1>

[CodeCollab][1] is a collaborative code editor similar to how Google Docs is a collaborative text editor. Users can create accounts, create projects, preview projects, share projects, and even extract text from images of code.

This project was created for Programming on the Web (CSCC09) at U of T and earned top marks.

## [Demo](https://www.youtube.com/watch?v=vf6fZMGhPdo)

![GifOCR](https://user-images.githubusercontent.com/13020652/118185971-27c82480-b40b-11eb-86e3-f721a00356c5.gif)

## Features

-   **DNS**/**HTTPS**: NameCheap and Cloudflare
-   **Server**: Three-tiered architecture (frontend, backend, and database) on DigitalOcean using Nginx reverse proxy to route to frontend and backend
-   **Frontend**: React, Typescript, Tailwind CSS, Material UI, Codemirror and sharedb-codemirror code editors, and tesseract.js OCR for image-to-text
-   **Backend**: Node, Express and GraphQL (TypeGraphQL and Apollo GraphQL)
-   **Database**: MongoDB (Mongoose and Typegoose)

## Challenges

> What is the #1 most challenging thing that you have learned/developed for your app?

**Code collaboration**: Code collaboration was the feature that took almost two weeks to implement. First we tried to implement it using socket.io but a big issue we had was syncing editors. For example if person A and person B were on the same editor, but person A disconnected for a few seconds, how would we sync the changes to the editor when person A connected again? After this, we decided to use GraphQL subscriptions and have our editor be only read-only since we could not solve the syncing editor problem. We implemented this, but luckily one of us found a library which solved our syncing issue called sharedb. In the end, we implemented code collaboration with sharedb which uses web sockets, so even though we learned 4 technologies (socket.io, GraphQL subscriptions, syncing editors, web sockets with sharedb) over a combined 40+ hours of work we ended up only using 1. Additionally, setting up the web socket through nginx was a bit of work, but we were able to complete that as well.

> What is the #2 most challenging thing that you have learned/developed for your app?

**GraphQL**: Two of us had no web experience and the other had a few months of experience, so all of us were fairly new to everything. We had just learned REST and we decided to take on the challenge of GraphQL, not to mention TypeGraphQL. We spent the first two weeks doing tutorials and in the end we were finally able to develop a working Apollo GraphQL Express server integrated with MongoDB for our application and realized how much more flexible it was than REST. Not only on the backend, but setting up GraphQL on the frontend was tough too because we had to learn React quickly and learn about typescript, functional components, React hooks, and JSX. In the end however, we think the value of learning GraphQL was greater, and the time spent on learning GraphQL was saved in writing many REST endpoints and REST documentation.

> What is the #3 most challenging thing that you have learned/developed for your app?

**Deployment**: Deployment was also another difficult challenge and we were glad we took Thierry’s (CSCC09 professor) advice of deploying early. During the first two weeks we acquired the DigitalOcean server, obtained the NameCheap domain, set up HTTPS through CloudFlare, and configured Nginx to point to the frontend and backend. We had first intended to use Next.js on top of React but because we were new to web development this was more than we could chew and we were running into constant problems during deployment. We decided to simplify and just use Create React App since we expected to run into further problems integrating with other technologies if we used Next.js. After deploying the first time it was relatively smooth sailing to deploy future applications and the only pain point was setting up sockets through nginx. Although there were a myriad of things to learn about deployment we kept pushing through our failures and ended up succeeding.

> Summarize your experience in this course

All in all, although we were new to web development Thierry (CSCC09 professor) really brought us from zero to hero in this course and we are proud to say we are now all on the way to becoming full-stack developers. It was a painful combined 45 hrs/week on this course, and there were many times we failed, did not meet expectations, and had to cut features we had intended but in the end we finished with something we were all satisfied with. We learned many modern and exciting technologies that have jumpstarted our journey into the vast and bottomless depths of web development. After spending 500+ combined hours on this course we are happy with the outcome.

## Links

-   Production website: https://codecollab.me
-   GraphQL playground: https://codecollab.me/graphql
-   Exported documentation: https://docs.codecollab.me

## License

[MIT](./LICENSE) &copy; [Luke Zhang](https://github.com/Smawllie)

[MIT](./LICENSE) &copy; [Bhavya Jain](https://github.com/bjain853)

[MIT](./LICENSE) &copy; [Laphonso Reyes](https://github.com/poncie)

[1]: https://codecollab.me
[2]: https://www.youtube.com/watch?v=vf6fZMGhPdo
