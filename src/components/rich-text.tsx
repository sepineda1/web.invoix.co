export function RichText({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);
  return (
    <div className="prose-invoix text-base leading-8 text-muted">
      {blocks.map((block) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={block} className="font-display text-2xl font-semibold tracking-tight text-ink">
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("- ")) {
          const items = block.split("\n").map((line) => line.replace(/^- /, ""));
          return (
            <ul key={block}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={block}>{block}</p>;
      })}
    </div>
  );
}
