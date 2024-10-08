export function convertNewlinesToHTML(text) {
  text = text.replace(/(\r\n|\n|\r)/g, "<br>");

  return "<p>" + text + "</p>";
}