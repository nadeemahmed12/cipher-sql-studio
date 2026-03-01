import Editor from "@monaco-editor/react";

function SqlEditor({ query, setQuery }) {
  return (
    <Editor
      height="300px"
      defaultLanguage="sql"
      value={query}
      onChange={(value) => setQuery(value)}
    />
  );
}

export default SqlEditor;