function shuffle(array) {
  const arrayCopy = array.slice(0);
  for (let i = 0; i < array.length - 1; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temp;
  }
  return arrayCopy;
}

export default function InitializeDeck() {
  let id = 0;
  const cards = [
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-5",
    "card-6",
  ].reduce((newArray, type) => {
    newArray.push({
      id: id++,
      type,
    });
    newArray.push({
      id: id++,
      type,
    });
    return newArray;
  }, []);

  return shuffle(cards);
}
