import OpenAI from "openai";

export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const openai = new OpenAI({
    apiKey: process.env?.OPENAI_API_KEY,
  });

  // const completion = openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   store: true,
  //   messages: [{ role: "user", content: "write a haiku about ai" }],
  // });

  // completion.then((result) => {
  //   console.log(result.choices[0].message);
  // });

  const posts = await data.json();
  // console.log(posts);
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
