import { useLoaderData } from 'react-router-dom';

export async function loader({ request }) {
    const url = new URL(request.url);
    const search = url.searchParams.get("q");
  return { search };
}

export default function Search() {
    const { search } = useLoaderData();
  return (
    <div>
      <h1>Search for {search}</h1>
    </div>
  );
}
