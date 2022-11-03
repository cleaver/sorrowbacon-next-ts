function NotFoundPage() {
  return (
    <div>
      <p>Not found! Maybe try searching...</p>
      <form method="get" id="ddgSearch" action="https://duckduckgo.com/">
        <input type="hidden" name="sites" value="sorrowbacon.com" />
        <input
          type="text"
          name="q"
          placeholder="Search…"
          aria-label="Search  on DuckDuckGo"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default NotFoundPage;
