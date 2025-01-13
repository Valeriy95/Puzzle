import React, { useEffect, useState } from 'react';
import wordCollectionLevel1 from "../wordCollection/wordCollectionLevel1.json";
import '../styles/gamePage.scss';


// import myBackground from './assets/images/my-background.jpg';


// type WordWithIndex = { word: string; id: number };

// const GamePage: React.FC = () => {


//     // const initialWords = wordCollectionLevel1.rounds[0].words[0].textExample.split(" ");

//     const [sourceWords, setSourceWords] = useState<WordWithIndex>();
//     // const [resultWords, setResultWords] = useState<string[]>([]);
//     const [resultWords, setResultWords] = useState<string[][]>([]);
//     const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
//     const [round, setRound] = useState<number>(0);
//     const [sentence, setSentence] = useState<number>(0);

//     const generateIndexedWords = (words: string[]) => {
//         return words.map((word, index) => ({ word, id: index }));
//     };

//     const getInitialWords = () => {
//         return wordCollectionLevel1.rounds[round].words[sentence].textExample.split(" ");
//     };

//     // const initialWords = wordCollectionLevel1.rounds[round].words[sentence].textExample.split(" ");
//     const [initialWords, setInitialWords] = useState<string[]>(getInitialWords());
    
//     const shuffle = (array: string[]) => {
//         return array.sort(() => Math.random() - 0.5);
//     }

//     // const handleWordClick = (word: string, fromSource: boolean) => {

//     //         if (fromSource) {
//     //         // Удаляем слово из sourceWords и добавляем его в resultWords
//     //             setSourceWords((prev) => prev.filter((w) => w !== word));
//     //             setResultWords((prev) => {
//     //                 const updated = [...prev];
//     //                 updated[updated.length - 1].push(word); // Добавляем слово к текущему предложению
//     //                 return updated;
//     //             });
//     //         } else {
//     //         // Удаляем слово из resultWords и добавляем его в sourceWords
//     //             setResultWords((prev) => {
//     //                 const updated = [...prev];
//     //                 updated[updated.length - 1] = updated[updated.length - 1].filter((w) => w !== word);
//     //                 return updated;
//     //             });
//     //             setSourceWords((prev) => [...prev, word]);
//     //         }
//     // };
//     const handleWordClick = (wordObj: WordWithIndex, fromSource: boolean) => {
//         if (fromSource) {
//             // Удаляем слово из sourceWords и добавляем его в resultWords
//             setSourceWords((prev) => prev.filter((w) => w.id !== wordObj.id));
//             setResultWords((prev) => {
//                 const updated = [...prev];
//                 updated[updated.length - 1].push(wordObj); // Добавляем объект в последний подмассив
//                 return updated;
//             });
//         } else {
//             // Удаляем слово из resultWords и добавляем его в sourceWords
//             setResultWords((prev) => {
//                 const updated = [...prev];
//                 updated[updated.length - 1] = updated[updated.length - 1].filter((w) => w.id !== wordObj.id);
//                 return updated;
//             });
//             setSourceWords((prev) => [...prev, wordObj]);
//         }
//     };

//     const checkCompletion = () => {
//         // Получаем слова текущего предложения (последний подмассив в resultWords)
//         const currentWords = resultWords[resultWords.length - 1] || [];
//         console.log(currentWords)
//         console.log(`currentWords.length  --- ${currentWords.length}`)
//         console.log(`initialWords.length  --- ${initialWords.length}`)
    
//         // Проверяем, совпадают ли currentWords с initialWords по порядку
//         if (currentWords.length === initialWords.length) {
//             const isCorrect = currentWords.every((word, index) => word === initialWords[index]);
//             setIsButtonActive(isCorrect); // Активируем кнопку, если порядок слов правильный
//         } else {
//             setIsButtonActive(false); // Иначе деактивируем
//         }
//     };


//     const handleContinue = () => {
//         if (sentence < wordCollectionLevel1.rounds[round].words.length - 1) {
//           setSentence((prev) => prev + 1);
//           setSourceWords([]);
//           setIsButtonActive(false);
//           setResultWords((prev) => [...prev, []]);
//         } else {
//           console.log("Раунд завершён");
//         }
//     };


//     useEffect(() => {
//         const newInitialWords = getInitialWords();
//         setInitialWords(newInitialWords);
//         setSourceWords(shuffle(generateIndexedWords(newInitialWords)));
//         setResultWords((prev) => [...prev, []]);
//         setIsButtonActive(false);
//       }, [sentence]);

//     useEffect(() => {
//         setSourceWords(shuffle(generateIndexedWords(newInitialWords)));
//     }, []);

//     useEffect(() => {
//         console.log(`ARR  ---  ${initialWords}`);
//         checkCompletion();
//     }, [resultWords]);

//     return (
//         <div className='game-page-container'>
//             <h1> Game 111 Page</h1>
//             <div className="result-block-container">
//                 {resultWords.map((sentenceWords, sentenceIndex) => (
//                 <div key={`result-sentence-${sentenceIndex}`} className="result-block">
//                     {sentenceWords.map((word, index) => (
//                     <div
//                         key={`result-word-${sentenceIndex}-${index}`}
//                         className="block-word"
//                         style={{ "--word-length": word.length } as React.CSSProperties}
//                         onClick={() => handleWordClick(word, false)} // Передаем false, так как это resultWords
//                     >
//                     {word}
//                     </div>
//                 ))}
//                 </div>
//             ))}
//             </div>
//             <div className='source-data-block'>
//                 {sourceWords.map((word, index) => (
//                 <div
//                 key={`source-${index}`}
//                 className='block-word'
//                 style={{ "--word-length": word.length } as React.CSSProperties}
//                 onClick={() => handleWordClick(word, true)} // Передаем true, так как это sourceWords
//                 >
//                     {word}
//                 </div>
//                 ))}
//             </div>
//             {isButtonActive && (
//             <button onClick={handleContinue} className="continue-btn">
//             Продолжить
//             </button>
//             )}
//         </div>
//     )
//   };
  
//   export default GamePage;

type WordWithIndex = { word: string; id: number };

const GamePage: React.FC = () => {
  const [sourceWords, setSourceWords] = useState<WordWithIndex[]>([]);
  const [resultWords, setResultWords] = useState<WordWithIndex[][]>([]);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [sentence, setSentence] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false); // Завершение игры

  const [isRoundComplete, setIsRoundComplete] = useState<boolean>(false);

  // const backgroundImage = wordCollectionLevel1.rounds[round].levelData.imageSrc;

  // console.log(all);
  const backgroundImage = `/images/${wordCollectionLevel1.rounds[round].levelData.imageSrc}`;

  const authorImg = `${wordCollectionLevel1.rounds[round].levelData.author}`;
  const yearImg = `${wordCollectionLevel1.rounds[round].levelData.year}`;
  const nameImg = `${wordCollectionLevel1.rounds[round].levelData.name}`;


  // Генерация начальных слов с уникальными идентификаторами
  const generateIndexedWords = (words: string[]) => {
    return words.map((word, index) => ({ word, id: index }));
  };

  const getInitialWords = () => {
    return wordCollectionLevel1.rounds[round].words[sentence].textExample.split(" ");
  };

  console.log(wordCollectionLevel1.rounds[round].levelData.imageSrc);

  const [initialWords, setInitialWords] = useState<string[]>(getInitialWords());

  const shuffle = (array: WordWithIndex[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleWordClick = (wordObj: WordWithIndex, fromSource: boolean, sentenceIndex?: number) => {

    if (sentenceIndex !== undefined && sentenceIndex < resultWords.length - 1) {
      return; // Игнорируем клики по словам из угаданных предложений
    }

    if (fromSource) {
      // Удаляем слово из sourceWords и добавляем его в resultWords
      setSourceWords((prev) => prev.filter((w) => w.id !== wordObj.id));
      setResultWords((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].push(wordObj); // Добавляем объект в последний подмассив
        return updated;
      });
    } else {
      // Удаляем слово из resultWords и добавляем его в sourceWords
      setResultWords((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = updated[updated.length - 1].filter((w) => w.id !== wordObj.id);
        return updated;
      });
      setSourceWords((prev) => [...prev, wordObj]);
    }
  };

  const checkCompletion = () => {
    // Получаем слова текущего предложения (последний подмассив в resultWords)
    const currentWords = resultWords[resultWords.length - 1] || [];

    // Проверяем, совпадают ли currentWords с initialWords по порядку
    if (currentWords.length === initialWords.length) {
      const isCorrect = currentWords.every((wordObj, index) => wordObj.word === initialWords[index]);
      setIsButtonActive(isCorrect); // Активируем кнопку, если порядок слов правильный
    } else {
      setIsButtonActive(false); // Иначе деактивируем
    }
  };

  const handleContinue = () => {
    if (sentence < wordCollectionLevel1.rounds[round].words.length - 1) {
      setSentence((prev) => prev + 1);
      setSourceWords([]);
      // setIsButtonActive(false);
      setResultWords((prev) => [...prev]); 
    //   setResultWords((prev) => [...prev, []]); // Добавляем новый массив для следующего предложения
    } else if (sentence === wordCollectionLevel1.rounds[round].words.length - 1) {
      setIsGameComplete(true);
      if (isRoundComplete) {
        setRound((prev) => prev + 1);
        setSentence(0); // Сбрасываем предложение
        setSourceWords([]); // Очищаем sourceWords
        setResultWords([]); // Очищаем resultWords
        setIsGameComplete(false); // Снимаем флаг завершения игры
        setIsButtonActive(false); // Деактивируем кнопку
        setIsRoundComplete(false); // Сбрасываем состояние раунда
        console.log("Заново");
      } else {
        setIsRoundComplete(true)
        console.log("Раунд завершён");
      }
    }
  };

  useEffect(() => {
    const newInitialWords = getInitialWords();
    console.log(newInitialWords)
    setInitialWords(newInitialWords);
    setSourceWords(shuffle(generateIndexedWords(newInitialWords))); // Генерируем объекты с ID и перемешиваем
    setResultWords((prev) => [...prev, []]); // Новый пустой массив для результата
    setIsButtonActive(false);
  }, [sentence]);

  useEffect(() => {
    checkCompletion();
  }, [resultWords]);

  return (
    <div className="game-page-container">
      <h1>Game Page</h1>

      {isGameComplete ? (
      // Если игра завершена, показываем фоновое изображение вместо result-block-container
      <div className="background-image-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
        </div>
        <h2>{authorImg} - {nameImg}({yearImg})</h2>
      </div>
    ) : (
      // Если игра не завершена, отображаем result-block-container
      <div className="result-block-container">
        {resultWords.map((sentenceWords, sentenceIndex) => (
          <div key={`result-sentence-${sentenceIndex}`} className="result-block">
            {sentenceWords.map(({ word, id }) => (
              <div
                key={id}
                className="block-word"
                style={{ "--word-length": word.length } as React.CSSProperties}
                onClick={() => handleWordClick({ word, id }, false, sentenceIndex)}
              >
                {word}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}

      <div className="source-data-block">
        {sourceWords.map(({ word, id }) => (
          <div
            key={id}
            className="block-word"
            style={{ "--word-length": word.length } as React.CSSProperties}
            onClick={() => handleWordClick({ word, id }, true)}
          >
            {word}
          </div>
        ))}
      </div>

      {isButtonActive && (
        <button onClick={handleContinue} className="continue-btn">
          Продолжить
        </button>
      )}
    </div>
  );
};

export default GamePage;