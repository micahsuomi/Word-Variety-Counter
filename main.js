const form = document.querySelector('.form');
const textArea = document.querySelector('.textarea');
const countWordsBtn = document.querySelector('.count-words-btn');
const totalWords = document.querySelector('.total-words-paragraph');
const longestWordsTitle = document.querySelector('.longest-words__title');
const longestWordsWrapper = document.querySelector('.longest-words__wrapper');
const varietyWordsWrapper = document.querySelector('.words-variety__wrapper');
const mostFrequentWordsTitle = document.querySelector('.words-counted__title');
const wordsWrapper = document.querySelector('.words-counted__wrapper');


let testSentence = 'All yo#u n@eed is love. A?ll you &need is %lov$e. All you nee/d is love. All you need is lov@e. Lo%ve is a&ll you nee@d.'

const testRawText = '%I $am@% a %tea@cher%, &and& I lo%#ve %tea@ching%;. There $is nothing; &as& mo@re rewarding as educa@ting &and& @emp%o@wering peo@ple. ;I found tea@ching m%o@re interesting tha@n any other %jo@bs. %Do@es thi%s mo@tivate yo@u to be a tea@cher!?';

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

const createNode = (e) => {
    return document.createElement(e);
}

const sortWordDiv = createNode('div');
const sortWordBtn = createNode('button');
sortWordBtn.setAttribute('class', 'sort-words');
sortWordBtn.textContent = 'Sort Words Length';

const sortCountDiv = createNode('div');



const checkWordsVariety = (paragraphToArr) => {
    console.log(paragraphToArr)
    let words = paragraphToArr;
    let outputArr = [];
    let value
    //we check the variety of text
        for(const word of words) {
            console.log(word)
            //we check if the word is not repeated, if it exists only one it will return an index of -1, //if it does exist after returning -1 it will return its own index
            if(outputArr.indexOf(word.toLowerCase()) === -1) {
             //we push the words without duplicates into a new array
             outputArr.push(word.toLowerCase())
         }

        }
        console.log(outputArr)
        return outputArr    
    
}

const testWords = () => {
    wordsWrapper.textContent = '';
    totalWords.textContent = '';
    varietyWordsWrapper.textContent = '';
    longestWordsWrapper.textContent = '';
    let contentLongestWords = '';
    let varietyContent = '';
    let contentWordsCounted = '';
    longestWordsTitle.textContent = 'Longest Words';
    mostFrequentWordsTitle.textContent = 'Most Frequent Words';

    wordsWrapper.append(sortWordDiv);

    let regex = /[^A-Za-z ]/ig;
    let regexUI =  /[^A-Za-z,?!.' ]/ig

        let sentence = textArea.value;
        let newSentence = sentence.replace(regex,'');
        let textAreaDisplay = sentence.replace(regexUI, '');
        textArea.value = textAreaDisplay
        console.log(newSentence)
        let paragraphToArr = newSentence.split(' ');
        const sentenceSet = new Set (paragraphToArr);
        const sentenceCount = [];
        const countArr = [];

        for (const w of sentenceSet) {
            if(w.length > 0) {
                const filteredWords = paragraphToArr.filter((word) => word.toLowerCase() === w.toLowerCase());
                sentenceCount.push({word: w, count: filteredWords.length});
                countArr.push(w)
            }
           
  
        }

        //calls the function to check variety of words and displays it
        
        let result = checkWordsVariety(paragraphToArr);
        let varietyPercentage = Math.round((result.length / paragraphToArr.length) * 100);

        varietyContent +=
        `<div class="variety-word__container">
            <p>Words without duplicates: <span class="total">${result.length}</span></p>
            <p>Variety: <span class="percentage"> ${varietyPercentage}%</span></p>

        </div>`


        //sorts the longest words
        //calls the check variety function to eliminate duplicate words
        let sortCountWithVariety = checkWordsVariety(countArr)

        sortCountWithVariety.sort((a, b) => {
            if(a.length > b.length) return -1;
            if(a.length < b.length) return 1;
            return 0;
        })

        //we take the longest 3 words
        let longestCounted = sortCountWithVariety.slice(0, 3);
        console.log(longestCounted)
        
        
        //we loop into the longest words and display them on the UI        
                for(let i = 0; i < longestCounted.length; i++) {
                    let word = longestCounted[i];
                    let len = word.length;

                    contentLongestWords += 
                    `<div class="longest-word-container">
                        <p class="longest-word">${word}</p>
                        <p class="longest-word__length">Length: ${len} characters</p>
                    </div>`


            }
            //we sort all the longest words from ascending
            sentenceCount.sort((a, b) => {
                if(a.count > b.count) return -1;
                if(a.count < b.count) return 1;
                return 0;
                
            })
    
            for(const w of sentenceCount) {
                let{word, count} = w;
    
            contentWordsCounted +=
            `<div class="words-container">
            <div class="word-container"><p class="wordCountedText">word: <span class="word"> ${word}</span></p></div>
            <div class="count-container"><p>word count: <span class="count">${count}</span></p>
            </div>
            </div>`


        
    }

    longestWordsWrapper.innerHTML = contentLongestWords
    varietyWordsWrapper.innerHTML = varietyContent;
    wordsWrapper.innerHTML = contentWordsCounted;
    totalWords.innerHTML = `<p>Total words: <span class="total-words"> ${paragraphToArr.length}</span></p>`;
  
    
}


countWordsBtn.addEventListener('click', () => {

    if(textArea.value.length < 1) {
        wordsWrapper.textContent = "";
        totalWords.textContent = `Please input some text`;
        totalWords.style.color = `rgb(255, 81, 0)`;
        totalWords.style.fontSize = '20px';
    } else {
        totalWords.style.color = `rgb(0, 0, 0)`;
        testWords();


    }
    

})