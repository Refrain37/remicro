export async function formateHtmlStr(htmlStr: string) {
  return htmlStr
    .replace(/<head[^>]*>[\s\S]*?<\/head>/i, match => {
      return match
        .replace(/<head/i, '<rm-app-head')
        .replace(/<\/head>/i, '</rm-app-head>');
    })
    .replace(/<body[^>]*>[\s\S]*?<\/body>/i, match => {
      return match
        .replace(/<body/i, '<rm-app-body')
        .replace(/<\/body>/i, '</rm-app-body>');
    });
}
