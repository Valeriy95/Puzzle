import React, { useEffect, useState } from 'react';
import wordCollectionLevel1 from "../wordCollection/wordCollectionLevel1.json";
import '../styles/gamePage.scss';


type WordWithIndex = { word: string; id: number };

const GamePage: React.FC = () => {
  const [sourceWords, setSourceWords] = useState<WordWithIndex[]>([]);
  const [resultWords, setResultWords] = useState<WordWithIndex[][]>([]);

  const [draggedWord, setDraggedWord] = useState<WordWithIndex | null>(null); // Хранит слово, которое перетаскивается
  const [dragSource, setDragSource] = useState<string | null>(null);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null); // Индекс перетаскиваемого слова
  const [draggedSentenceIndex, setDraggedSentenceIndex] = useState<number | null>(null); // Индекс предложения

  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  // const [round, setRound] = useState<number>(0);
  const [round, setRound] = useState<number>(44);
  const [sentence, setSentence] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false); // Завершение игры

  const [isRoundComplete, setIsRoundComplete] = useState<boolean>(false);

  const [isCheckButtonVisible, setIsCheckButtonVisible] = useState<boolean>(false);

  const [checkResults, setCheckResults] = useState<
  { word: string; isCorrect: boolean }[]
>([]);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [allSentences, setAllSentences] = useState<WordWithIndex[][]>([]); // Хранит все угаданные предложения

  const [guessedSentences, setGuessedSentences] = useState<boolean[]>([]);

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

  const [initialWords, setInitialWords] = useState<string[]>(getInitialWords());

  const shuffle = (array: WordWithIndex[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleWordClick = (wordObj: WordWithIndex, fromSource: boolean, sentenceIndex?: number) => {

    if (sentenceIndex !== undefined && guessedSentences[sentenceIndex]) {
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
      // setCheckResults([]);
    }
  };

  const checkCompletion = () => {
    // Получаем слова текущего предложения (последний подмассив в resultWords)
    const currentWords = resultWords[resultWords.length - 1] || [];

    // Проверяем, совпадают ли currentWords с initialWords по порядку
    if (currentWords.length === initialWords.length) {
      const isCorrect = currentWords.every((wordObj, index) => wordObj.word === initialWords[index]);
      setIsButtonActive(isCorrect); // Активируем кнопку, если порядок слов правильный
      setIsCheckButtonVisible(false);

      if (isCorrect) {
        setGuessedSentences((prev) => {
          const updated = [...prev];
          updated[resultWords.length - 1] = true; // Помечаем текущее предложение как угаданное
          return updated;
        });
      }
    } else {
      setIsButtonActive(false); // Иначе деактивируем
    }
  };

  const handleContinue = () => {
    console.log(round)
    if (sentence < wordCollectionLevel1.rounds[round].words.length - 1) {
      
      // Добавляем текущее предложение в allSentences
      setAllSentences((prev) => [...prev, resultWords[resultWords.length - 1]]);

      setSentence((prev) => prev + 1);
      setSourceWords([]);
      // setIsButtonActive(false);
      setResultWords((prev) => [...prev]); 

      setGuessedSentences((prev) => {
        const updated = [...prev];
        updated[resultWords.length - 1] = true; // Помечаем текущее предложение как угаданное
        return updated;
      });

    } else if (sentence === wordCollectionLevel1.rounds[round].words.length - 1) {
      setIsGameComplete(true);
      if (round === 44) return 
      if (isRoundComplete) {
        setRound((prev) => prev + 1);
        setSentence(0); // Сбрасываем предложение
        setSourceWords([]); // Очищаем sourceWords
        setResultWords([]); // Очищаем resultWords
        setAllSentences([]); // Сбрасываем все предложения
        setIsGameComplete(false); // Снимаем флаг завершения игры
        setIsButtonActive(false); // Деактивируем кнопку
        setIsRoundComplete(false); // Сбрасываем состояние раунда
        setGuessedSentences([]); // Очищаем guessedSentences
        console.log("Заново");
      } else {
        setIsRoundComplete(true)
        console.log("Раунд завершён");
      }
    }
  };

  const handleCheck = () => {
    checkCompletion();
    const currentWords = resultWords[resultWords.length - 1] || [];
    const results = currentWords.map((wordObj, index) => ({
      word: wordObj.word,
      isCorrect: wordObj.word === initialWords[index], // Проверка правильности
    }));
    setCheckResults(results); // Сохраняем результаты
    setIsChecked(true); // Отмечаем, что проверка выполнена
  };

  const handleAutoFill = () => {
    const currentSentence = resultWords.length - 1;
  
    // Перемещаем все слова из sourceWords в resultWords в правильном порядке
    setResultWords((prev) => {
      const updated = [...prev];
      updated[currentSentence] = initialWords.map((word, index) => ({
        word,
        id: sourceWords.find((w) => w.word === word)?.id || index, // Используем существующий ID или генерируем новый
      }));
      return updated;
    });
  
    // Очищаем sourceWords, так как все слова перемещены
    setSourceWords([]);
  
    // Деактивируем кнопку проверки
    setIsButtonActive(true);
  
    // Опционально: показываем проверку результата
    setCheckResults(initialWords.map((word, index) => ({ word, isCorrect: true })));
    setIsChecked(true);
  };

  const handleDragStart = (
    wordObj: WordWithIndex,
    source: string,
    index: number,
    sentenceIndex?: number
  ) => {
    setDraggedWord(wordObj);
    setDragSource(source);
    setDraggedIndex(index);
    if (sentenceIndex !== undefined) {
      setDraggedSentenceIndex(sentenceIndex);
    }
  };

  const isSentenceGuessed = (sentenceIndex: number): boolean => {
    console.log(resultWords[sentenceIndex].length === allSentences[sentenceIndex].length &&
      resultWords[sentenceIndex].every(
        (word, idx) => word.id === allSentences[sentenceIndex][idx].id
      ))
    return resultWords[sentenceIndex].length === allSentences[sentenceIndex].length &&
      resultWords[sentenceIndex].every(
        (word, idx) => word.id === allSentences[sentenceIndex][idx].id
      );
  };

  
  const handleDrop = (
    target: string,
    targetIndex?: number,
    sentenceIndex?: number
  ) => {
    if (!draggedWord || dragSource === null) {
      console.log('11111111111111')
      return;
    }

    if (sentenceIndex !== undefined && guessedSentences[sentenceIndex]) {
      console.log('22222222222222')
      return; // Игнорируем перетаскивание для угаданных предложений
    }

    // Если перетаскивание внутри блока результатов
    if (
      dragSource === "result" &&
      target === "result" &&
      draggedSentenceIndex !== null &&
      sentenceIndex === draggedSentenceIndex
    ) {
      console.log('33333333333333')
      console.log(resultWords)
      setResultWords((prev) => {
        const updated = [...prev];
        const currentSentence = [...updated[draggedSentenceIndex]];

        if (draggedIndex !== null && targetIndex !== undefined) {
          // Перемещаем слово внутри предложения
          console.log('YYYYYYYYYYYYYYYYYY')
          const [movedWord] = currentSentence.splice(draggedIndex, 1);
          console.log(movedWord)
          // currentSentence.splice(targetIndex, 0, movedWord);
          console.log(currentSentence.splice(targetIndex, 0, movedWord))
          console.log(currentSentence)
        }

        updated[draggedSentenceIndex] = currentSentence;
        console.log(updated)
        return updated;
      });
    }

    // Если перетаскивание из исходного блока в блок результата
    else if (
      dragSource === "source" &&
      target === "result" &&
      sentenceIndex !== undefined
    ) {
      console.log('44444444444444')
      setSourceWords((prev) => prev.filter((word) => word.id !== draggedWord.id));
      setResultWords((prev) => {
        const updated = [...prev];

        // Если массив для текущего предложения отсутствует, создаем его
        if (!updated[sentenceIndex]) {
          updated[sentenceIndex] = [];
        }
  
        // Проверяем, есть ли уже слово в целевом массиве, чтобы избежать дублирования
        if (!updated[sentenceIndex].some((word) => word.id === draggedWord.id)) {
          updated[sentenceIndex].push(draggedWord);
        }
  
        return updated;
      });
    }

    // Если перетаскивание из блока результата обратно в исходный блок
    else if (dragSource === "result" && target === "source") {

      console.log('5555555555555555555')
      if (draggedSentenceIndex !== null && isSentenceGuessed(draggedSentenceIndex)) {
        console.log('66666666666666666')
        return;
      }

      setResultWords((prev) => {
        const updated = [...prev];
        updated.forEach(
          (sentence, idx) =>
            (updated[idx] = sentence.filter((word) => word.id !== draggedWord.id))
        );
        return updated;
      });
      setSourceWords((prev) => {
        // Проверяем, нет ли уже слова в sourceWords, чтобы избежать дубликатов
        if (!prev.some((word) => word.id === draggedWord.id)) {
          return [...prev, draggedWord];
        }
        return prev;
      });
    }

    // Сброс временных данных
    setDraggedWord(null);
    setDragSource(null);
    setDraggedIndex(null);
    setDraggedSentenceIndex(null);
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const [draggingElement, setDraggingElement] = useState<HTMLElement | null>(null);

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    wordObj: WordWithIndex,
    source: string,
    index: number,
    sentenceIndex?: number
  ) => {
    // e.preventDefault();
    const touch = e.touches[0];
    const target = e.currentTarget;
    
    // Clone the element for visual feedback
    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.top = `${touch.clientY}px`;
    clone.style.left = `${touch.clientX}px`;
    clone.style.pointerEvents = "none";
    clone.classList.add("dragging-element");
    
    document.body.appendChild(clone);
    setDraggingElement(clone);
    
    // Set dragging state
    setDraggedWord(wordObj);
    setDragSource(source);
    setDraggedIndex(index);
    if (sentenceIndex !== undefined) {
      setDraggedSentenceIndex(sentenceIndex);
    }
    // setDraggedWord(wordObj);
    // setDragSource(source);
    // setDraggedIndex(index);
    // if (sentenceIndex !== undefined) {
    //   setDraggedSentenceIndex(sentenceIndex);
    // }
    console.log(resultWords)
    console.log(sentence)
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const touch = e.touches[0];
    const width = e.touches[0].target?.clientWidth / 4;
  
    if (draggingElement) {
      draggingElement.style.top = `${touch.clientY - 20}px`;
      draggingElement.style.left = `${touch.clientX - width}px`;
    }
  };
  
  // const handleTouchEnd = (
  //   e: React.TouchEvent<HTMLDivElement>,
  //   target: string,
  //   targetIndex?: number,
  //   sentenceIndex?: number
  // ) => {
  //   // e.preventDefault();
  //   const touch = e.changedTouches[0];
  //   const element = document.elementFromPoint(touch.clientX, touch.clientY);

  //   if (draggingElement) {
  //     draggingElement.remove();
  //     setDraggingElement(null);
  //   }
  
  //   if (!draggedWord || dragSource === null || !element) return;
  
  //   const isResultTarget = element.closest(".result-block");
  //   const isSourceTarget = element.closest(".source-data-block");
  
  //   console.log(` target --- ${target }`);
  //   console.log(` isResultTarget --- ${isResultTarget}`);
  //   console.log(` isSourceTarget --- ${isSourceTarget}`);


  //   if (isResultTarget && target === "result") {
  //     handleDrop("result", targetIndex, sentenceIndex);
  //   } else if (isSourceTarget && target === "source") {
  //     handleDrop("source");
  //   }
  
  //   // Сброс временных данных
  //   setDraggedWord(null);
  //   setDragSource(null);
  //   setDraggedIndex(null);
  //   setDraggedSentenceIndex(null);
  //   console.log(resultWords)
  //   console.log(sentence)
  // };

  const handleTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>,
    target: string,
    targetIndex?: number,
    sentenceIndex?: number
  ) => {
    // e.preventDefault();
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (draggingElement) {
      draggingElement.remove();
      setDraggingElement(null);
    }
  
    if (!draggedWord || dragSource === null || !element) return;
  
    const isResultTarget = element.closest(".result-block");
    const isSourceTarget = element.closest(".source-data-block");
  
    // console.log(` target --- ${target }`);
    // console.log(` isResultTarget --- ${isResultTarget}`);
    // console.log(` isSourceTarget --- ${isSourceTarget}`);

    handleDrop(target, targetIndex, sentenceIndex)

    console.log(` target --- ${target }`);
    console.log(isResultTarget && target === "result")
    console.log(isSourceTarget && target === "source")
    console.log(`targetIndex  ---  ${targetIndex}`)
    console.log(`sentenceIndex  ---  ${sentenceIndex}`)
    console.log('TOOOOOOOOOOOOOOOOOOOOOUUUUUUUUUUUCCCCCCCCCCCHHHHHHHHHHHH')

    // if (isResultTarget && target === "result") {
    //   handleDrop("result", targetIndex, sentenceIndex);
    // } else if (isSourceTarget && target === "source") {
    //   handleDrop("source");
    // }
  
    // Сброс временных данных
    // setDraggedWord(null);
    // setDragSource(null);
    // setDraggedIndex(null);
    // setDraggedSentenceIndex(null);
    // console.log(resultWords)
    // console.log(sentence)
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
    console.log(sourceWords)
    console.log(resultWords)
    // checkCompletion();
    const currentWords = resultWords[resultWords.length - 1] || [];
    setIsCheckButtonVisible(currentWords.length === initialWords.length);
    setIsChecked(false); // Сбрасываем проверку при изменении resultWords
  }, [resultWords]);

  useEffect(() => {
    if (allSentences.length === 0) {
      setAllSentences([[]]); // Начинаем с пустого предложения
    }
  }, []);

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
      <div className='game-container'>
      <div>
        <button
        onClick={handleAutoFill}
        className={`auto-fill-btn ${isChecked || resultWords[resultWords.length - 1]?.length === initialWords.length ? "disabled" : "auto-fill-btn-hover"}`}
        disabled={isChecked || resultWords[resultWords.length - 1]?.length === initialWords.length}
        >
          Auto-Complete 
        </button>
      </div>
      <div className="result-block-container"> 
        {resultWords.map((sentenceWords, sentenceIndex) => (
          <div key={`result-sentence-${sentenceIndex}`} 
            className="result-block"

            onDragOver={(e) => {
              if (!guessedSentences[sentenceIndex]) allowDrop(e);
            }}

            // onDrop={() => handleDrop("result", undefined, sentenceIndex)}>
            onDrop={() => {
              if (!guessedSentences[sentenceIndex]) handleDrop("result", undefined, sentenceIndex);
            }}

            onTouchEnd={(e) => {
              if (!guessedSentences[sentenceIndex]) handleTouchEnd(e, "result", undefined, sentenceIndex);
            }}
            
            // onTouchEnd={(e) => { handleTouchEnd(e, "result", undefined, sentenceIndex)}}

            >

            {sentenceWords.map(({ word, id }, wordIndex) => {
              const isGuessed = guessedSentences[sentenceIndex];
              const isCorrect =
                isChecked &&
                !isGuessed &&
                // isCurrentSentence &&
                checkResults.length > 0 &&
                // sentenceIndex === resultWords.length - 1 &&
                checkResults[wordIndex]?.isCorrect;
              return (
              <div
                key={`${id}-${sentenceIndex}-${wordIndex}`} // Уникальный ключ
                className={`block-word ${
                  !isGuessed && isChecked
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                } ${
                  !isGuessed 
                      ? ""
                      : "block-word-guessed"
                }`}

                draggable={!isGuessed}

                onDragStart={
                  !isGuessed
                    ? () =>
                        handleDragStart(
                          { word, id },
                          "result",
                          wordIndex,
                          sentenceIndex
                        )
                    : undefined
                }

                // onTouchStart={
                //   !isGuessed
                //     ? (e) =>
                //         handleDragStart(
                //           { word, id },
                //           "result",
                //           wordIndex,
                //           sentenceIndex
                //         )
                //     : undefined
                // }

                onTouchStart={(e) => handleTouchStart(e, { word, id }, "result", wordIndex, sentenceIndex)}

                onTouchMove={handleTouchMove}
                // onTouchEnd={(e) => handleTouchEnd(e, "result", wordIndex, sentenceIndex)}

                // onTouchEnd={!isGuessed ? (e) => handleTouchEnd(e, "result", wordIndex, sentenceIndex) : undefined}
                onTouchEnd={(e) => handleTouchEnd(e, "result", wordIndex, sentenceIndex)}

                onDrop={!isGuessed ? () => handleDrop("result", wordIndex, sentenceIndex) : undefined}

                onDragOver={allowDrop}

                style={{ "--word-length": word.length } as React.CSSProperties}

                onClick={
                  !isGuessed
                    ? () => handleWordClick({ word, id }, false, sentenceIndex)
                    : undefined
                }
              >
                {word}
              </div>
            )})}
          </div>
        ))}
      </div>
    </div>
    )}

      <div className="source-data-block"
        onDragOver={allowDrop}

        onDrop={() => handleDrop("source")}
        
        onTouchEnd={(e) => handleTouchEnd(e, "source")}
        >
        {sourceWords.map(({ word, id }) => (
          <div
            // key={id}
            key={`source-${id}`} // Добавьте контекст, чтобы ключ был уникален
            className="block-word"
            draggable
            onDragStart={() => handleDragStart({ word, id }, "source", 0)}

            onTouchStart={(e) => handleTouchStart(e, { word, id }, "source", 0)}
            // onDragStart={() => handleDragStart({ word, id }, "source")}
            style={{ "--word-length": word.length } as React.CSSProperties}
            onClick={() => handleWordClick({ word, id }, true)}
          >
            {word}
          </div>
        ))}
      </div>

      {isButtonActive && (
        <button onClick={handleContinue} className="continue-btn">
          Continue
        </button>
      )}

      {isCheckButtonVisible && (
        <button onClick={handleCheck} className="check-btn">
          Check
        </button>
      )}

    </div>

  );
};

export default GamePage;