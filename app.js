let url = 'https://type.fit/api/quotes'; // 'api.quotable.io' is no longer working

const getQuote = async () => {
    console.log('getting data ....');
    let responce = await fetch(url);
    console.log(responce);
    let data = await responce.json();
    console.log('')
}
getQuote();