export const convertTextToMarkdown = (text: any) => {
  const lines = text.split('\n');
  const convertedLines = lines.map((line:any) => {
    if (line.startsWith('# ')) {
      return <h1>{line.substring(2)}</h1>;
    } else if (line.startsWith('## ')) {
      return (
      <>
      <h2>{line.substring(3)}</h2><br></br>
      </>
      );
    } else if (line.startsWith('### ')) {
      return <><h3>{line.substring(4)}</h3><br></br></>;
    } else if (line.startsWith('- ')) {
      return <li>{line.substring(2)}</li>;
    } else if (line.match(/\[(.*?)\]\((.*?)\)/)) {
      const [, text, url] = line.match(/\[(.*?)\]\((.*?)\)/);
      return <a href={url}>{text}</a>;
    } else {
      // lineが空の場合
      if (line === '') {
        return <p />;
      } else {
        // それ以外の場合はpタグで囲む
        return <p>{line}</p>;
      }
    }
  });
  return convertedLines;
};

