const capitalize = (word: string) => (word.length > 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word);

export default capitalize;
