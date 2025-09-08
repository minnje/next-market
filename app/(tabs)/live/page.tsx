async function getPosts() {
     await new Promise((r) => setTimeout(r, 10000));
}

export default async function Live() {
     const posts = await getPosts();
     return (
          <div>
               <h1 className="text-white text-4xl">Live!</h1>
          </div>
     );
}
