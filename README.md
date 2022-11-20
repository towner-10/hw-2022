##Inspiration
We have all been there, stuck on a task, with no one to turn to for help. We all love wikiHow but there isn't always a convenient article there for you to follow. So we decided to do something about it! What if we could leverage the knowledge of the entire internet to get the nicely formatted and entertaining tutorials we need. That's why we created wikiNow. With the power of Cohere's natural language processing and stable diffusion, we can combine the intelligence of millions of people to get the tutorials we need.

##What it does
wikiNow is a tool that can generate entire wikiHow articles to answer any question! A user simply has to enter a query and our tool will generate a step-by-step article with images that provides a detailed answer tailored to their exact needs. wikiNow enables users to find information more efficiently and to have a better understanding of the steps involved.

##How we built it
wikiNow was built using a combination of Cohere's natural language processing and stable diffusion algorithms. We trained our models on a large dataset of existing wikiHow articles and used this data to generate new articles and images that are specific to the user's query. The back-end was built using Flask and the front-end was created using Next.js.

##Challenges we ran into
One of the biggest challenges we faced was engineering the prompts that would generate the articles. We had to experiment with a lot of different methods before we found something that worked well with multi-layer prompts. Another challenge was creating a user interface that was both easy to use and looked good. We wanted to make sure that the user would be able to find the information they need without being overwhelmed by the amount of text on the screen.

Properly dealing with Flask concurrency and long-running network requests was another large challenge. For an average wiki page creation, we require ~20 cohere generate calls. In order to make sure the wiki page returns in a reasonable time, we spent a considerable amount of time developing asynchronous functions and multi-threading routines to speed up the process.

##Accomplishments that we're proud of
We're proud that we were able to create a tool that can generate high-quality articles. We're also proud of the user interface that we created, which we feel is both easy to use and visually appealing. The generated articles are both hilarious and informative, which was our main goal. We are also super proud of our optimization work. When running in a single thread synchronously, the articles can take up to 5 minutes to generate. We have managed to bring that down to around 30 seconds, which a near 10x improvement!

##What we learned
We learned a lot about using natural language processing and how powerful it can be in real world applications. We also learned a lot about full stack web development. For two of us, this was our first time working on a full stack web application, and we learned a lot about running back-end servers and writing a custom API's. We solved a lot of unique optimization and threading problems as well which really taught us a lot.

##What's next for wikiNow
In the future, we would like to add more features to wikiNow, such as the ability to generate articles in other languages and the ability to generate articles for other types of content, such as recipes or instructions. We would also like to make the articles more interactive so that users can ask questions and get clarification on the steps involved. It would also be handy to add the ability to cache previous user generated articles to make it easier for the project to scale without re-generating existing articles.
