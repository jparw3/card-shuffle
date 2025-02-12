function generateDeck(): string[] {
  const suits = ["♠", "♥", "♦", "♣"]
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  return suits.flatMap((suit) => values.map((value) => `${value}${suit}`))
}

function shuffleDeck(deck: string[]): string[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

self.onmessage = (event) => {
  const { originalDeck } = event.data
  let count = 0
  let shuffledDeck: string[]

  do {
    shuffledDeck = shuffleDeck(generateDeck())
    count++

    if (count % 12345 === 0) {
      self.postMessage({ shuffledDeck, count })
    }
  } while (shuffledDeck.join(",") !== originalDeck)

  self.postMessage({ shuffledDeck, count })
}

