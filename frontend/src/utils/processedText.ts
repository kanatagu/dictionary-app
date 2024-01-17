export const processedText = (text: string) => {
  const linkRegex = /\[(.*?)\]/g;
  const matches = text.match(linkRegex);

  // Make the text into an array of objects.
  const result: { link: boolean; text: string }[] = text
    .split(linkRegex)
    .map((item, index) => {
      if (matches && matches[index]) {
        const linkText = matches[index].slice(1, -1); // delete `[]
        return {
          link: true,
          text: linkText,
        };
      } else {
        return {
          link: false,
          text: item,
        };
      }
    });

  return result;
};
