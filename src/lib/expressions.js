const expressionsImages = {
  "happy": [
    "gifs/happy1.gif",
    "gifs/happy2.gif",
    "gifs/happy3.gif",
    "gifs/happy4.gif",
    "gifs/happy5.gif",
    "gifs/happy6.gif",
    "gifs/happy7.gif",
    "gifs/happy8.gif",
    "gifs/happy9.gif"
  ],
  "neutral": [
    "gifs/neutral1.gif",
    "gifs/neutral2.gif",
    "gifs/neutral3.gif",
    "gifs/neutral4.gif",
    "gifs/neutral5.gif",
    "gifs/neutral6.gif",
    "gifs/neutral7.gif",
    "gifs/neutral8.gif"
  ],
  "sad": [
    "gifs/sad1.gif",
    "gifs/sad2.gif",
    "gifs/sad3.gif",
    "gifs/sad4.gif",
    "gifs/sad5.gif",
    "gifs/sad6.gif"
  ],
  "angry": [
    "gifs/angry1.gif",
    "gifs/angry2.gif",
    "gifs/angry3.gif",
    "gifs/angry4.gif",
    "gifs/angry5.gif",
    "gifs/angry6.gif",
    "gifs/angry7.gif",
    "gifs/angry8.gif"
  ],
  "fearful": [
    "gifs/fear1.gif",
    "gifs/fear2.gif",
    "gifs/fear3.gif",
    "gifs/fear4.gif"
  ],
  "disgusted": [
    "gifs/disgusted1.gif",
    "gifs/disgusted2.gif",
    "gifs/disgusted3.gif",
    "gifs/disgusted4.gif",
    "gifs/disgusted5.gif",
    "gifs/disgusted6.gif"
  ],
  "surprised": [
    "gifs/surprised1.gif",
    "gifs/surprised2.gif",
    "gifs/surprised3.gif",
    "gifs/surprised4.gif",
    "gifs/surprised5.gif",
    "gifs/surprised6.gif",
    "gifs/surprised7.gif",
    "gifs/surprised8.gif",
    "gifs/surprised9.gif"
  ]
};

export const getExpressionImage = (expression) => {
  const images = expressionsImages[expression];
  return images[Math.floor(Math.random() * images.length)];
};
