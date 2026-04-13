//TODO: reimplementar o sistema de geração aleatória
//como crypto não funciona direito no react native, talvez mover essa
//parte pro backend ou então fazer um algoritmo mais complexo na mão

const fillRandom = (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) 
        arr[i] = Math.floor(Math.random() * 10);
}

const generate = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const arr = new Array(length);
    fillRandom(arr);
    return Array.from(arr).map(b => chars[b % chars.length]).join('');
};

const RandomCode = ()=>{
    return `${generate(3)}-${generate(3)}-${generate(3)}-${generate(3)}`
}

export default RandomCode;