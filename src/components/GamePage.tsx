import React, { useEffect, useState } from 'react';
import wordCollectionLevel1 from "../wordCollection/wordCollectionLevel1.json";
import '../styles/gamePage.scss';

const GamePage: React.FC = () => {

    // console.log(wordCollectionLevel1.rounds[0].words[0].textExample);

    const initialWords = wordCollectionLevel1.rounds[0].words[0].textExample.split(" ");
    // const textArr = wordCollectionLevel1.rounds[0].words[0].textExample.split(' ');

    const [sourceWords, setSourceWords] = useState<string[]>([]);
    const [resultWords, setResultWords] = useState<string[]>([]);
    
    // console.log(textArr);
    const shuffle = (array: string[]) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const handleWordClick = (word: string, fromSource: boolean) => {

            if (fromSource) {
            // Удаляем слово из sourceWords и добавляем его в resultWords
                setSourceWords((prev) => prev.filter((w) => w !== word));
                setResultWords((prev) => [...prev, word]);
            } else {
            // Удаляем слово из resultWords и добавляем его в sourceWords
                setResultWords((prev) => prev.filter((w) => w !== word));
                setSourceWords((prev) => [...prev, word]);
            }
    };


    useEffect(() => {
        setSourceWords(shuffle([...initialWords]));
    }, []);

    // const renderingWord = () => {
    //     shuffle(textArr)
    //     const container = document.querySelector('.source-data-block') as HTMLElement;
    //     for (let i = 0; i < textArr.length; i++) {
    //       const element = document.createElement('div');
    //       element.classList.add('block-word')
    //       element.innerHTML = textArr[i]
    //       container.append(element)
    //     }
    // }

    // useEffect(() => {
    //     renderingWord()
    // }, []);

    return (
        <div>
            <h1> Game 111 Page</h1>
            <div className='result-block'>
                {resultWords.map((word, index) => (
                <div
                key={`result-${index}`}
                className='block-word'
                style={{ "--word-length": word.length } as React.CSSProperties}
                onClick={() => handleWordClick(word, false)} // Передаем false, так как это resultWords
                >
                    {word}
                </div>
                ))}
            </div>
            <div className='source-data-block'>
                {sourceWords.map((word, index) => (
                <div
                key={`source-${index}`}
                className='block-word'
                style={{ "--word-length": word.length } as React.CSSProperties}
                onClick={() => handleWordClick(word, true)} // Передаем true, так как это sourceWords
                >
                    {word}
                </div>
                ))}
            </div>
        </div>
    )
  };
  
  export default GamePage;